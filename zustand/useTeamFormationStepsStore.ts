import { create } from 'zustand';

const views = {
  explainer: 'explainer', // First page

  // Default algorithm
  defaultAlgorithmExplainer: 'defaultAlgorithmExplainer', // Default algorithm explainer
  defaultAlgorithmMapping: 'defaultAlgorithmMapping', // Where the user maps their data to the default algorithm parameters

  customAlgorithmExplainer: 'customAlgorithmExplainer', // Custom algorithm explainer
  customAlgorithmMapping: 'customAlgorithmMapping', // Where the user maps their data to the constraints that they want

  complete: 'complete', // All steps complete

  developerError: 'developerError', // Shown the flow is configured incorrectly
} as const;

// type ViewNames = keyof typeof views;
type ViewNames = (typeof views)[keyof typeof views];

type TeamFormationStepsStore = {
  view: ViewNames;
  gotoNextView: () => void;
  gotoView: (viewName: ViewNames) => void;
  showTeamFormationModal: boolean;
  closeTeamFormationModal: () => void;
  openTeamFormationModal: () => void;
};

export const useTeamFormationStepsStore = create<TeamFormationStepsStore>(
  set => ({
    view: views.explainer,
    gotoNextView: () => {
      set(state => {
        switch (state.view) {
          case views.explainer:
            return {
              // We cannot decide where the user will go after the explainer, use the gotoView, along side the option the user requests.
              view: views.developerError,
            };
          case views.defaultAlgorithmExplainer:
            return {
              view: views.defaultAlgorithmMapping,
            };
          case views.defaultAlgorithmMapping:
            return {
              view: views.complete,
            };
          case views.customAlgorithmExplainer:
            return {
              view: views.customAlgorithmMapping,
            };
          case views.customAlgorithmMapping:
            return {
              view: views.complete,
            };
        }

        return { view: views.developerError };
      });
    },
    gotoView: (viewName: ViewNames) => {
      set({ view: viewName });
    },
    showTeamFormationModal: false,
    closeTeamFormationModal: () => {
      set({ showTeamFormationModal: false, view: views.explainer });
    },
    openTeamFormationModal: () => {
      set({ showTeamFormationModal: true });
    },
  }),
);
