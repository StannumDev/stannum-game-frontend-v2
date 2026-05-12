import { create } from 'zustand';

interface LessonMarkLockStore {
    locked: Set<string>;
    tryLock: (key: string) => boolean;
    unlock: (key: string) => void;
}

export const useLessonMarkLockStore = create<LessonMarkLockStore>((set, get) => ({
    locked: new Set(),
    tryLock: (key) => {
        if (get().locked.has(key)) return false;
        const next = new Set(get().locked);
        next.add(key);
        set({ locked: next });
        return true;
    },
    unlock: (key) => {
        const next = new Set(get().locked);
        next.delete(key);
        set({ locked: next });
    },
}));
