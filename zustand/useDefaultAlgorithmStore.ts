import { create } from 'zustand';

export interface DefaultMapping {
  gender: string;
  first_language: string;
  wam: string;
  anxiety: string;
  agreeableness: string;
}

type DefaultAlgorithmStore = {
  mapping: DefaultMapping | null;
  setMapping: (mapping: DefaultMapping) => void;
  reset: () => void;
};

export const useDefaultAlgorithmStore = create<DefaultAlgorithmStore>(set => ({
  mapping: null,
  setMapping: (mapping: DefaultMapping) => {
    set({ mapping });
  },
  reset: () => {
    set({ mapping: null });
  },
}));
