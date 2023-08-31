import { useState } from 'react';

import { useTableStore } from '@/zustand/useTableStore';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

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
        icon={<PencilSquareIcon className="h-6 w-6 inline" />}
        iconPosition="right"
        onClick={() => setShowEditHeadersDialog(true)}
      >
        Update Data Headers
      </Button>
      <DataTableIdentifierDialog
        show={showEditHeadersDialog}
        closeModal={() => setShowEditHeadersDialog(false)}
      />
      <DataTable />
    </>
  );
}
