import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function DefaultAlgorithmExplainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="DefaultAlgorithmExplainer"
      />
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
