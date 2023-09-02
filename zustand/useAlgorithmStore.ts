import { create } from 'zustand';

type AlgorithmOptions = 'default' | 'custom';

type AlgorithmStore = {
  chosenAlgorithm: AlgorithmOptions | null;
  setChosenAlgorithm: (option: AlgorithmOptions) => void;
  reset: () => void;
};

export const useAlgorithmStore = create<AlgorithmStore>(set => ({
  chosenAlgorithm: null,
  setChosenAlgorithm: option => {
    set({ chosenAlgorithm: option });
  },
  reset: () => {
    set({ chosenAlgorithm: null });
  },
}));
