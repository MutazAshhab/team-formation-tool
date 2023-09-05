import { create } from 'zustand';

type AlgorithmOptions = 'default' | 'custom';

type AlgorithmStore = {
  chosenAlgorithm: AlgorithmOptions | null;
  setChosenAlgorithm: (option: AlgorithmOptions) => void;
  teamSize: number | null;
  setTeamSize: (size: number) => void;
  reset: () => void;
};

export const useAlgorithmStore = create<AlgorithmStore>(set => ({
  chosenAlgorithm: null,
  setChosenAlgorithm: option => {
    set({ chosenAlgorithm: option });
  },
  teamSize: null,
  setTeamSize: (size: number) => {
    set({ teamSize: size });
  },
  reset: () => {
    set({ chosenAlgorithm: null });
  },
}));
