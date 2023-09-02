import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

export function CustomAlgorithmMapping() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <DialogHeader
      closeModal={teamFormationStore.closeTeamFormationModal}
      title="CustomAlgorithmMapping"
    />
  );
}
