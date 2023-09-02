import { create } from 'zustand';

type AlgorithmOptions = 'default' | 'custom';

type AlgorithmStore = {
  chosenAlgorithm: AlgorithmOptions | null;
  setChosenAlgorithm: (option: AlgorithmOptions) => void;
};

export const useAlgorithmStore = create<AlgorithmStore>(set => ({
  chosenAlgorithm: null,
  setChosenAlgorithm: option => {
    set({ chosenAlgorithm: option });
  },
}));
