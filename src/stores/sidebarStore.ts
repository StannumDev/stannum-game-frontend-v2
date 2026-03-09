import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
    isExpanded: boolean;
    _hydrated: boolean;
    toggleExpanded: () => void;
    setExpanded: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
    persist(
        (set) => ({
            isExpanded: true,
            _hydrated: false,
            toggleExpanded: () => set((s) => ({ isExpanded: !s.isExpanded })),
            setExpanded: (value: boolean) => set({ isExpanded: value }),
        }),
        {
            name: 'sidebar-expanded',
            onRehydrateStorage: () => () => {
                useSidebarStore.setState({ _hydrated: true });
            },
            partialize: (state) => ({ isExpanded: state.isExpanded }),
        }
    )
);
