import { Button } from '@/components/Buttons';
import { DialogFooter } from '@/components/Dialog/DialogFooter';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function Explainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  function handleDefaultAlgorithmClick() {}
  function handleCustomAlgorithmClick() {}

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Explainer"
      />
      <DialogFooter>
        <div className="flex justify-around items-center">
          <Button onClick={handleDefaultAlgorithmClick}>
            Default Algorithm
          </Button>
          <Button onClick={handleCustomAlgorithmClick}>Custom Algorithm</Button>
        </div>
      </DialogFooter>
    </>
  );
}
