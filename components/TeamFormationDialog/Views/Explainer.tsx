import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

export function Explainer() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <DialogHeader
      closeModal={teamFormationStore.closeTeamFormationModal}
      title="Explainer"
    />
  );
}
