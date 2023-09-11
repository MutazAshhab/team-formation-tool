import { create } from 'zustand';

type TableStore = {
  data: string[][];
  setTable: (data: string[][]) => void;
  formedTeams: string[][];
  setFormedTeams: (data: string[][]) => void;
};

export const useTableStore = create<TableStore>(set => ({
  data: [],
  setTable: (data: string[][]) => {
    set({ data });
  },
  formedTeams: [],
  setFormedTeams: (formedTeams: string[][]) => {
    set({ formedTeams });
  },
}));
