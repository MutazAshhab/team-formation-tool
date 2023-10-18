import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { views } from '@/zustand/useTeamFormationStepsStore';

import { DialogContainer } from '../Dialog/DialogContainer';
import { Complete } from './Views/Complete';
import { ColumnConstraintSetter } from './Views/CustomAlgorithm/Constraints/ColumnConstraintSetter';
import { CustomAlgorithmExplainer } from './Views/CustomAlgorithmExplainer';
import { CustomAlgorithmMapping } from './Views/CustomAlgorithmMapping';
import { Agreeableness } from './Views/DefaultAlgorithm/Mapping/Agreeableness';
import { Anxiety } from './Views/DefaultAlgorithm/Mapping/Anxiety';
import { FirstLanguage } from './Views/DefaultAlgorithm/Mapping/FirstLanguage';
import { Gender } from './Views/DefaultAlgorithm/Mapping/Gender';
import { Wam } from './Views/DefaultAlgorithm/Mapping/Wam';
import { DefaultAlgorithmExplainer } from './Views/DefaultAlgorithmExplainer';
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
        return <ColumnConstraintSetter />;
      // return <CustomAlgorithmMapping />;
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
