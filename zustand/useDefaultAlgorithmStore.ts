import { create } from 'zustand';

interface ColumnAndValues {
  name: string | null;
  values: string[];
}

type DefaultAlgorithmStore = {
  gender: ColumnAndValues;
  setGender: (gender: ColumnAndValues) => void;
  first_language: ColumnAndValues;
  setFirstLanguage: (first_language: ColumnAndValues) => void;
  wam: string | null;
  setWam: (wam: string | null) => void;
  anxiety: string | null;
  setAnxiety: (anxiety: string) => void;
  agreeableness: string | null;
  setAgreeableness: (agreeableness: string) => void;
  reset: () => void;
};

export const useDefaultAlgorithmStore = create<DefaultAlgorithmStore>(set => ({
  gender: {
    name: null,
    values: [],
  },
  setGender: (gender: ColumnAndValues) => {
    set({
      gender,
    });
  },
  first_language: {
    name: null,
    values: [],
  },
  setFirstLanguage: (first_language: ColumnAndValues) => {
    set({
      first_language,
    });
  },
  wam: null,
  setWam: (wam: string | null) => {
    set({
      wam,
    });
  },
  anxiety: null,
  setAnxiety: (anxiety: string) => {
    set({
      anxiety,
    });
  },
  agreeableness: null,
  setAgreeableness: (agreeableness: string) => {
    set({
      agreeableness,
    });
  },
  reset: () => {
    const emptyColumnAndValuesObject = {
      name: null,
      values: [],
    };

    set({
      gender: emptyColumnAndValuesObject,
      first_language: emptyColumnAndValuesObject,
      wam: null,
      anxiety: null,
      agreeableness: null,
    });
  },
}));
