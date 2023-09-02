import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function DefaultAlgorithmMapping() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="DefaultAlgorithmMapping"
      />
      <TeamFormationStepsDialogFooter onNextClick={() => {}} />
    </>
  );
}
