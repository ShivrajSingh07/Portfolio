import { create } from 'zustand';

interface LoaderState {
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));
