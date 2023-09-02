import { create } from 'zustand';

type TableStore = {
  data: string[][];
  setTable: (data: string[][]) => void;
};

export const useTableStore = create<TableStore>(set => ({
  data: [],
  setTable: (data: string[][]) => {
    set({ data });
  },
}));
