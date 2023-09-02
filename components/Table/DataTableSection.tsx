import { useState } from 'react';

import { useTableStore } from '@/zustand/useTableStore';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

import { Button } from '../Buttons';
import { DataTable } from './DataTable';
import { DataTableIdentifierDialog } from './DataTableIdentifierDialog';

export function DataTableSection() {
  const [showEditHeadersDialog, setShowEditHeadersDialog] = useState(false);
  const tableStore = useTableStore();

  if (!tableStore.data.length) return null;

  return (
    <>
      <Button
        icon={<PuzzlePieceIcon className="h-6 w-6 inline" />}
        iconPosition="right"
        onClick={() => setShowEditHeadersDialog(true)}
      >
        Form Teams
      </Button>
      <DataTableIdentifierDialog
        show={showEditHeadersDialog}
        closeModal={() => setShowEditHeadersDialog(false)}
      />
      <DataTable />
    </>
  );
}
