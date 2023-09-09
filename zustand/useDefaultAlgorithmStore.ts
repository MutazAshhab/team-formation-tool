import { create } from 'zustand';

interface ColumnAndValues {
  name: string | null;
  values: string[];
}

interface ColumnAndMinMax {
  name: string | null;
  min: number | null;
  max: number | null;
}

type DefaultAlgorithmStore = {
  gender: ColumnAndValues;
  setGender: (gender: ColumnAndValues) => void;
  first_language: ColumnAndValues;
  setFirstLanguage: (first_language: ColumnAndValues) => void;
  wam: string | null;
  setWam: (wam: string | null) => void;
  anxiety: ColumnAndMinMax;
  setAnxiety: (anxiety: ColumnAndMinMax) => void;
  agreeableness: ColumnAndMinMax;
  setAgreeableness: (agreeableness: ColumnAndMinMax) => void;
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
  anxiety: {
    name: null,
    min: null,
    max: null,
  },
  setAnxiety: (anxiety: ColumnAndMinMax) => {
    set({
      anxiety,
    });
  },
  agreeableness: {
    name: null,
    min: null,
    max: null,
  },
  setAgreeableness: (agreeableness: ColumnAndMinMax) => {
    set({
      agreeableness,
    });
  },
  reset: () => {
    const emptyColumnAndValuesObject = {
      name: null,
      values: [],
    };

    const emptyColumnAndMinMax = {
      name: null,
      min: null,
      max: null,
    };

    set({
      gender: emptyColumnAndValuesObject,
      first_language: emptyColumnAndValuesObject,
      wam: null,
      anxiety: emptyColumnAndMinMax,
      agreeableness: emptyColumnAndMinMax,
    });
  },
}));
