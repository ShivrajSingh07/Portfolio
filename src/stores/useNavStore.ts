import { create } from 'zustand';

interface NavState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
