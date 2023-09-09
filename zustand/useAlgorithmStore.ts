import { create } from 'zustand';

import { useCustomAlgorithmStore } from './useCustomAlgorithmStore';
import { useDefaultAlgorithmStore } from './useDefaultAlgorithmStore';

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
    const customAlgoStore = useCustomAlgorithmStore.getState();
    const defaultAlgoStore = useDefaultAlgorithmStore.getState();

    // Reset the other algorithm stores
    customAlgoStore.reset();
    defaultAlgoStore.reset();

    set({ chosenAlgorithm: null, teamSize: null });
  },
}));
