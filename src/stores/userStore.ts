import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { AppError, FullUserDetails, ProfileStatus } from '@/interfaces';
import { authUserByToken, logout as authLogout } from '@/services/auth';
import { getUserByTokenClient } from '@/services/user';
import { achievementHandler, errorHandler } from '@/helpers';

interface UserStore {
    user: FullUserDetails | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: AppError | null;
    _initStarted: boolean;
    _refreshCount: number;
    _isRefreshing: boolean;

    initUser: () => Promise<ProfileStatus | null>;
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

        const token = Cookies.get('token');
        if (!token) {
            set({ isLoading: false, isAuthenticated: false });
            return null;
        }

        try {
            const { success, achievementsUnlocked, profileStatus } = await authUserByToken(token);

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
            set({ user: null, isLoading: false, isAuthenticated: false, error: appError });
            return null;
        }
    },

    refreshUser: async () => {
        if (get()._isRefreshing) return;
        set({ _isRefreshing: true });
        try {
            const currentUser = get().user;
            const user = await getUserByTokenClient();

            if (currentUser && (user.achievements?.length ?? 0) > (currentUser.achievements?.length ?? 0)) {
                const oldIds = new Set(currentUser.achievements?.map(a => a.achievementId) ?? []);
                const newAchievements = user.achievements.filter(a => !oldIds.has(a.achievementId));
                if (newAchievements.length > 0) {
                    achievementHandler(newAchievements);
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
