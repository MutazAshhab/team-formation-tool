import { create } from 'zustand';

type AlgorithmOptions = 'default' | 'custom';

interface Mapping {
  columnName: string;
}

export interface DefaultMapping extends Mapping {
  optionName: string;
}

export interface CustomMapping extends Mapping {
  constraint: string; // String for now
}

type AlgorithmStore = {
  chosenAlgorithm: AlgorithmOptions | null;
  setChosenAlgorithm: (option: AlgorithmOptions) => void;
  teamSize: number | null;
  setTeamSize: (size: number) => void;
  mapping: (DefaultMapping | CustomMapping)[];
  setMapping: (mapping: (DefaultMapping | CustomMapping)[]) => void;
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
  mapping: [],
  setMapping: (mapping: (DefaultMapping | CustomMapping)[]) => {
    set({ mapping });
  },
  reset: () => {
    set({ chosenAlgorithm: null, teamSize: null, mapping: [] });
  },
}));
