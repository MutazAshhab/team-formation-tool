import { create } from 'zustand';

type DefaultAlgorithmStore = {
  gender: string | null;
  setGender: (gender: string) => void;
  first_language: string[] | null;
  setFirstLanguage: (first_language: string[]) => void;
  wam: string | null;
  setWam: (wam: string) => void;
  anxiety: string | null;
  setAnxiety: (anxiety: string) => void;
  agreeableness: string | null;
  setAgreeableness: (agreeableness: string) => void;
  reset: () => void;
};

export const useDefaultAlgorithmStore = create<DefaultAlgorithmStore>(set => ({
  gender: null,
  setGender: (gender: string) => {
    set({
      gender,
    });
  },
  first_language: null,
  setFirstLanguage: (first_language: string[]) => {
    set({
      first_language,
    });
  },
  wam: null,
  setWam: (wam: string) => {
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
    set({
      gender: null,
      first_language: null,
      wam: null,
      anxiety: null,
      agreeableness: null,
    });
  },
}));
