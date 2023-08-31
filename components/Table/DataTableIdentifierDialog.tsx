import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useTableStore } from '@/zustand/useTableStore';

import { Button } from '../Buttons';

interface DataTableIdentifierDialogProps {
  show: boolean;
  closeModal: () => void;
}

export function DataTableIdentifierDialog(
  props: DataTableIdentifierDialogProps,
) {
  const tableStore = useTableStore();
  const [fieldTypes, setFieldTypes] = useState<Record<string, string>>({});

  const handleFieldIdentification = (header: string, fieldType: string) => {
    setFieldTypes({
      ...fieldTypes,
      [header]: fieldType,
    });
  };

  if (!props.show) {
    return null;
  }

  if (!tableStore.data.length) return null;

  const headers = tableStore.data[0];

  return createPortal(
    <dialog className="fixed inset-0 flex items-center justify-center w-3/4">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg mb-4">Identify Fields</h2>
        {headers.map((header, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-bold mb-2">{header}</label>
            <select
              className="border rounded w-full py-2 px-3"
              onChange={e => handleFieldIdentification(header, e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="age">Age</option>
            </select>
          </div>
        ))}
        <Button onClick={props.closeModal}>Done</Button>
      </div>
    </dialog>,
    document.body,
  );
}
