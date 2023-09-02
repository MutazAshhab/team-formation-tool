import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

export function Complete() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <DialogHeader
      closeModal={teamFormationStore.closeTeamFormationModal}
      title="Complete"
    />
  );
}
