import { DialogFooter } from '@/components/Dialog/DialogFooter';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

export function CustomAlgorithmExplainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="CustomAlgorithmExplainer"
      />
      <DialogFooter onNextClick={() => {}} />
    </>
  );
}
