import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { views } from '@/zustand/useTeamFormationStepsStore';

import { DialogContainer } from '../Dialog/DialogContainer';
import { Complete } from './Views/Complete';
import { CustomAlgorithmExplainer } from './Views/CustomAlgorithmExplainer';
import { CustomAlgorithmMapping } from './Views/CustomAlgorithmMapping';
import { DefaultAlgorithmExplainer } from './Views/DefaultAlgorithmExplainer';
import { DefaultAlgorithmMapping } from './Views/DefaultAlgorithmMapping';
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
      case views.defaultAlgorithmMapping:
        return <DefaultAlgorithmMapping />;
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
      <div className="w-auto h-max gap-3">
        {view}
        <button onClick={teamFormationStore.gotoNextView}>go to next</button>
      </div>
    </DialogContainer>
  );
}
