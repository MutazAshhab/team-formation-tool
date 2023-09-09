import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { views } from '@/zustand/useTeamFormationStepsStore';

import { DialogContainer } from '../Dialog/DialogContainer';
import { Complete } from './Views/Complete';
import { CustomAlgorithmExplainer } from './Views/CustomAlgorithmExplainer';
import { CustomAlgorithmMapping } from './Views/CustomAlgorithmMapping';
import { DefaultAlgorithmExplainer } from './Views/DefaultAlgorithmExplainer';
import { Agreeableness } from './Views/DefaultAlgorithmMapping/Agreeableness';
import { Anxiety } from './Views/DefaultAlgorithmMapping/Anxiety';
import { FirstLanguage } from './Views/DefaultAlgorithmMapping/FirstLanguage';
import { Gender } from './Views/DefaultAlgorithmMapping/Gender';
import { Wam } from './Views/DefaultAlgorithmMapping/Wam';
import { DeveloperError } from './Views/DeveloperError';
import { Explainer } from './Views/Explainer';

export function TeamFormationStepsDialog() {
  const teamFormationStore = useTeamFormationStepsStore();

  const view = (() => {
    switch (teamFormationStore.view) {
      case views.explainer:
        return <Explainer />;
      case views.defaultAlgorithmExplainer:
        return <DefaultAlgorithmExplainer />;
      case views.gender:
        return <Gender />;
      case views.agreeableness:
        return <Agreeableness />;
      case views.anxiety:
        return <Anxiety />;
      case views.wam:
        return <Wam />;
      case views.firstLanguage:
        return <FirstLanguage />;
      case views.customAlgorithmExplainer:
        return <CustomAlgorithmExplainer />;
      case views.customAlgorithmMapping:
        return <CustomAlgorithmMapping />;
      case views.complete:
        return <Complete />;
      case views.developerError:
        return <DeveloperError />;
    }
  })();

  return (
    <DialogContainer
      show={teamFormationStore.showTeamFormationModal}
      closeModal={teamFormationStore.closeTeamFormationModal}
    >
      {view}
    </DialogContainer>
  );
}
