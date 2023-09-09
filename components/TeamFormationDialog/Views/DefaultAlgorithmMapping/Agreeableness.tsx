import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';

export function Agreeableness() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Agreeableness"
      />
      <DialogContent>
        <AlertBox variant="error">incomplete</AlertBox>
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
