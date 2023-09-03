import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function Complete() {
  const teamFormationStore = useTeamFormationStepsStore();
  const algorithmStore = useAlgorithmStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Complete"
      />
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          console.log(algorithmStore);
        }}
      />
    </>
  );
}
