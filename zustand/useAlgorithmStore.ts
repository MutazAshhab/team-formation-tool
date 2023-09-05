import { create } from 'zustand';

type AlgorithmOptions = 'default' | 'custom';

interface Mapping {
  columnName: string;
}

interface DefaultMapping extends Mapping {
  optionName: string;
}

interface CustomMapping extends Mapping {
  constraint: string; // String for now
}

type AlgorithmStore = {
  chosenAlgorithm: AlgorithmOptions | null;
  setChosenAlgorithm: (option: AlgorithmOptions) => void;
  teamSize: number | null;
  setTeamSize: (size: number) => void;
  reset: () => void;
  mapping: (DefaultMapping | CustomMapping)[];
  setMapping: (mapping: (DefaultMapping | CustomMapping)[]) => void;
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
    set({ chosenAlgorithm: null, teamSize: null });
  },
  mapping: [],
  setMapping: (mapping: (DefaultMapping | CustomMapping)[]) => {
    set({ mapping });
  },
}));
