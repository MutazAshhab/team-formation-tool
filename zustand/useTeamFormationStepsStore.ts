import { create } from 'zustand';

import { useAlgorithmStore } from './useAlgorithmStore';

export const views = {
  explainer: 'explainer', // First page

  // ---------------- DEFAULT ALGORITHM --------------------
  defaultAlgorithmExplainer: 'defaultAlgorithmExplainer', // Default algorithm explainer
  // Where the user maps their data to the default algorithm parameters
  gender: 'gender',
  firstLanguage: 'firstLanguage',
  wam: 'wam',
  anxiety: 'anxiety',
  agreeableness: 'agreeableness',

  // ---------------- CUSTOM ALGORITHM --------------------
  customAlgorithmExplainer: 'customAlgorithmExplainer', // Custom algorithm explainer
  customAlgorithmMapping: 'customAlgorithmMapping', // Where the user maps their data to the constraints that they want

  complete: 'complete', // All steps complete

  developerError: 'developerError', // Shown the flow is configured incorrectly
} as const;

// type ViewNames = keyof typeof views;
type ViewNames = (typeof views)[keyof typeof views];

type TeamFormationStepsStore = {
  view: ViewNames;
  viewHistory: ViewNames[];
  gotoNextView: () => void;
  gotoView: (viewName: ViewNames) => void;
  goToPreviousView: () => void;
  showTeamFormationModal: boolean;
  closeTeamFormationModal: () => void;
  openTeamFormationModal: () => void;
};

export const useTeamFormationStepsStore = create<TeamFormationStepsStore>(
  set => ({
    view: views.explainer,
    viewHistory: [views.explainer],
    gotoNextView: () => {
      set(state => {
        let nextView: ViewNames = views.developerError;

        switch (state.view) {
          case views.explainer:
            // We cannot decide where the user will go after the explainer, use the gotoView, along side the option the user requests.
            nextView = views.developerError;
            break;
          case views.defaultAlgorithmExplainer:
            nextView = views.gender;
            break;
          case views.gender:
            nextView = views.firstLanguage;
            break;
          case views.firstLanguage:
            nextView = views.wam;
            break;
          case views.wam:
            nextView = views.anxiety;
            break;
          case views.anxiety:
            nextView = views.agreeableness;
            break;
          case views.agreeableness:
            nextView = views.complete;
            break;
          case views.customAlgorithmExplainer:
            nextView = views.customAlgorithmMapping;
            break;
          case views.customAlgorithmMapping:
            nextView = views.complete;
            break;
        }

        state.viewHistory = [...state.viewHistory, nextView];
        return { view: nextView };
      });
    },
    gotoView: (viewName: ViewNames) => {
      set(state => {
        return {
          view: viewName,
          viewHistory: [...state.viewHistory, viewName],
        };
      });
    },
    goToPreviousView: () => {
      set(state => {
        const viewHistory = [...state.viewHistory];
        viewHistory.pop();

        if (viewHistory.length == 1) {
          // Reset the algorithm store
          const algorithmStore = useAlgorithmStore.getState();
          algorithmStore.reset();
        }

        return {
          view: viewHistory[viewHistory.length - 1],
          viewHistory,
        };
      });
    },
    showTeamFormationModal: false,
    closeTeamFormationModal: () => {
      // Reset the algorithm store first
      const algorithmStore = useAlgorithmStore.getState();
      algorithmStore.reset();

      set({
        showTeamFormationModal: false,
        view: views.explainer,
        viewHistory: [views.explainer],
      });
    },
    openTeamFormationModal: () => {
      set({ showTeamFormationModal: true });
    },
  }),
);
