import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

import { Button } from '../Buttons';
import { TeamFormationStepsDialog } from '../TeamFormationDialog/TeamFormationStepsDialog';
import { DataTable } from './DataTable';

export function DataTableSection() {
  const { openTeamFormationModal } = useTeamFormationStepsStore();
  const tableStore = useTableStore();

  if (!tableStore.data.length) return null;

  return (
    <>
      <Button
        icon={<PuzzlePieceIcon className="h-6 w-6 inline" />}
        iconPosition="right"
        onClick={openTeamFormationModal}
      >
        Form Teams
      </Button>
      <TeamFormationStepsDialog />
      <DataTable />
    </>
  );
}
