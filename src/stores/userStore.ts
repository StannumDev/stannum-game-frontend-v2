import { create } from 'zustand';
import type { AppError, FullUserDetails, ProfileStatus } from '@/interfaces';
import { authUserByToken, logout as authLogout } from '@/services/auth';
import { isLoggedIn } from '@/lib/tokenStorage';
import { getUserByTokenClient } from '@/services/user';
import { achievementHandler, callToast, errorHandler } from '@/helpers';
import { getRankByLevel } from '@/config/ranks';

interface UserStore {
    user: FullUserDetails | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: AppError | null;
    _initStarted: boolean;
    _refreshCount: number;
    _isRefreshing: boolean;

    initUser: () => Promise<ProfileStatus | null | undefined>;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
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

            const user = await getUserByTokenClient();
            set({ user, isLoading: false, isAuthenticated: true, error: null, _refreshCount: Date.now() });
            return profileStatus;
        } catch (err: unknown) {
            const appError = errorHandler(err);
            set({ user: null, isLoading: false, isAuthenticated: false, error: appError, _initStarted: false });
            return null;
        }
    },

    refreshUser: async () => {
        if (get()._isRefreshing) return;
        set({ _isRefreshing: true });
        try {
            const currentUser = get().user;
            const user = await getUserByTokenClient();

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
        set({ user: null, isAuthenticated: false, error: null, _initStarted: false });
        try {
            await authLogout();
        } catch (err: unknown) {
            errorHandler(err);
        }
    },
}));
