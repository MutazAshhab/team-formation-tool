import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function DeveloperError() {
  const teamFormationStore = useTeamFormationStepsStore();

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Developer Error"
      />
      <DialogContent>
        <div className="flex justify-center items-center gap-4">
          <h1>NOT SUPPOSED TO BE HERE, PLEASE FIX THE LOGIC</h1>
        </div>

        <div className="flex justify-center items-center gap-4">
          <ExclamationCircleIcon
            className="w-10 h-10 rounded-2xl"
            style={{ color: '#F04B23', backgroundColor: '#FDEFEC' }}
          />
          <p className="text-left">
            An error has occurred. For now please close the dialog and start
            again.
          </p>
        </div>
      </DialogContent>
    </>
  );
}
