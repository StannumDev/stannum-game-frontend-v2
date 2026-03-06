import { create } from 'zustand';
import type { AppError, FullUserDetails, ProfileStatus } from '@/interfaces';
import { authUserByToken, logout as authLogout } from '@/services/auth';
import { isLoggedIn } from '@/lib/tokenStorage';
import { isNetworkError } from '@/lib/api';
import { getUserByTokenClient } from '@/services/user';
import { achievementHandler, callToast, errorHandler } from '@/helpers';
import { getRankByLevel } from '@/config/ranks';

interface UserStore {
    user: FullUserDetails | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    connectionError: boolean;
    error: AppError | null;
    _initStarted: boolean;
    _refreshCount: number;
    _isRefreshing: boolean;

    initUser: () => Promise<ProfileStatus | null | undefined>;
    retryInit: () => Promise<ProfileStatus | null | undefined>;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    connectionError: false,
    error: null,
    _initStarted: false,
    _refreshCount: 0,
    _isRefreshing: false,

    initUser: async () => {
        if (get()._initStarted) return null;
        set({ _initStarted: true });

        if (!isLoggedIn()) {
            set({ isLoading: false, isAuthenticated: false });
            return null;
        }

        try {
            const { success, achievementsUnlocked, profileStatus } = await authUserByToken();

            if (!success) {
                set({ isLoading: false, isAuthenticated: false });
                return null;
            }

            if (achievementsUnlocked?.length) {
                achievementHandler(achievementsUnlocked);
            }

            if (profileStatus !== 'complete') {
                set({ isLoading: false, isAuthenticated: true });
                return profileStatus;
            }

            let userData;
            try {
                userData = await getUserByTokenClient();
            } catch (userErr: unknown) {
                if (isNetworkError(userErr)) {
                    const wasAlreadyConnectionError = get().connectionError;
                    set({ isLoading: false, connectionError: true, _initStarted: false });
                    if (!wasAlreadyConnectionError) {
                        callToast({ type: 'warning', message: { title: 'Sin conexión', description: 'No se pudo conectar al servidor. Reintentando...' } });
                    }
                } else {
                    errorHandler(userErr);
                    set({ isLoading: false, isAuthenticated: true, error: null, _initStarted: false });
                }
                return null;
            }

            const { user, shieldConsumed, streakSaved } = userData;
            set({ user, isLoading: false, isAuthenticated: true, connectionError: false, error: null, _refreshCount: Date.now() });

            if (shieldConsumed) {
                callToast({
                    message: streakSaved
                        ? { title: 'Escudo de racha consumido', description: 'Tu racha está a salvo gracias al escudo.' }
                        : { title: 'Escudo de racha consumido', description: 'Faltaste más de un día, tu racha se perdió.' },
                    type: 'streak',
                });
            }

            return profileStatus;
        } catch (err: unknown) {
            if (isNetworkError(err)) {
                const wasAlreadyConnectionError = get().connectionError;
                set({ isLoading: false, connectionError: true, _initStarted: false });
                if (!wasAlreadyConnectionError) {
                    callToast({ type: 'warning', message: { title: 'Sin conexión', description: 'No se pudo conectar al servidor. Reintentando...' } });
                }
                return null;
            }
            const appError = errorHandler(err);
            set({ user: null, isLoading: false, isAuthenticated: false, error: appError, _initStarted: false });
            return null;
        }
    },

    retryInit: async () => {
        set({ _initStarted: false, isLoading: true });
        return get().initUser();
    },

    refreshUser: async () => {
        if (get()._isRefreshing) return;
        set({ _isRefreshing: true });
        try {
            const currentUser = get().user;
            const { user, shieldConsumed, streakSaved } = await getUserByTokenClient();

            if (currentUser) {
                if ((user.achievements?.length ?? 0) > (currentUser.achievements?.length ?? 0)) {
                    const oldIds = new Set(currentUser.achievements?.map(a => a.achievementId) ?? []);
                    const newAchievements = (user.achievements ?? []).filter(a => !oldIds.has(a.achievementId));
                    if (newAchievements.length > 0) {
                        achievementHandler(newAchievements);
                    }
                }

                if (user.level.currentLevel > currentUser.level.currentLevel) {
                    const oldRank = getRankByLevel(currentUser.level.currentLevel);
                    const newRank = getRankByLevel(user.level.currentLevel);
                    const rankChanged = oldRank.id !== newRank.id;

                    callToast({
                        message: rankChanged
                            ? { title: `¡Rango ${newRank.name}!`, description: `Alcanzaste el nivel ${user.level.currentLevel}` }
                            : { title: `¡Nivel ${user.level.currentLevel}!`, description: '¡Subiste de nivel!' },
                        type: 'levelUp',
                    });
                }

                if (user.dailyStreak?.lastActivityLocalDate && user.dailyStreak.lastActivityLocalDate !== currentUser.dailyStreak?.lastActivityLocalDate) {
                    const streakCount = user.dailyStreak.count;
                    callToast({
                        message: {
                            title: `¡Racha de ${streakCount} ${streakCount === 1 ? 'día' : 'días'}!`,
                            description: streakCount === 1 ? '¡Empezaste una nueva racha!' : '¡Seguí así!',
                        },
                        type: 'streak',
                    });
                }

                if (shieldConsumed) {
                    callToast({
                        message: streakSaved
                            ? { title: 'Escudo de racha consumido', description: 'Tu racha está a salvo gracias al escudo.' }
                            : { title: 'Escudo de racha consumido', description: 'Faltaste más de un día, tu racha se perdió.' },
                        type: 'streak',
                    });
                }

                if (user.dailyStreak?.recoveryAvailable && !currentUser.dailyStreak?.recoveryAvailable) {
                    callToast({
                        message: {
                            title: 'Perdiste tu racha',
                            description: 'Podés recuperarla por 30 Tins en las próximas 48h.',
                        },
                        type: 'streak',
                    });
                }
            }

            set({ user, error: null, _refreshCount: get()._refreshCount + 1 });
        } catch (err: unknown) {
            const appError = errorHandler(err);
            set({ error: appError });
        } finally {
            set({ _isRefreshing: false });
        }
    },

    logout: async () => {
        set({ user: null, isAuthenticated: false, connectionError: false, error: null, _initStarted: false });
        try {
            await authLogout();
        } catch (err: unknown) {
            errorHandler(err);
        }
    },
}));
