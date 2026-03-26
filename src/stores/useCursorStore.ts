import { create } from 'zustand';

type CursorVariant = 'default' | 'hover' | 'project' | '3d';

interface CursorState {
  variant: CursorVariant;
  text: string;
  setVariant: (variant: CursorVariant, text?: string) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: 'default',
  text: '',
  setVariant: (variant, text = '') => set({ variant, text }),
}));
