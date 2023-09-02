import { create } from 'zustand';

type TeamFormationStepsStore = {
  step: number;
  gotoNextStep: () => void;
  gotoStep: (i: number) => void;
  showTeamFormationModal: boolean;
  closeTeamFormationModal: () => void;
  openTeamFormationModal: () => void;
};

export const useTeamFormationStepsStore = create<TeamFormationStepsStore>(
  set => ({
    step: 0,
    gotoNextStep: () => {
      set(state => {
        return {
          step: state.step + 1,
        };
      });
    },
    gotoStep: (i: number) => {
      set({ step: i });
    },
    showTeamFormationModal: false,
    closeTeamFormationModal: () => {
      set({ showTeamFormationModal: false });
    },
    openTeamFormationModal: () => {
      set({ showTeamFormationModal: true });
    },
  }),
);
