import { create } from 'zustand';

export interface CustomMapping {
  // TODO: Implement the actual CustomMapping type
  constraint: string; // String for now
}

type CustomAlgorithmStore = {
  mapping: CustomMapping | null;
  setMapping: (mapping: CustomMapping) => void;
  reset: () => void;
};

export const useCustomAlgorithmStore = create<CustomAlgorithmStore>(set => ({
  mapping: null,
  setMapping: (mapping: CustomMapping) => {
    set({ mapping });
  },
  reset: () => {
    set({ mapping: null });
  },
}));
