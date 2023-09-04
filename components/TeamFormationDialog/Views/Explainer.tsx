import { Button } from '@/components/Buttons';
import { DialogFooter } from '@/components/Dialog/DialogFooter';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import {
  useTeamFormationStepsStore,
  views,
} from '@/zustand/useTeamFormationStepsStore';

export function Explainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  function handleDefaultAlgorithmClick() {
    teamFormationStore.gotoView(views.defaultAlgorithmExplainer);
  }

  function handleCustomAlgorithmClick() {
    teamFormationStore.gotoView(views.customAlgorithmExplainer);
  }

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="About the Team Formation Tool"
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
