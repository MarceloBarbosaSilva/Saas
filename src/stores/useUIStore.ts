import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  isLoading: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'dark',
        sidebarOpen: false,
        isLoading: false,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setIsLoading: (isLoading) => set({ isLoading }),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);