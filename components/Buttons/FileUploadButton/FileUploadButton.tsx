import React from 'react';

import { FileUploadLogic } from '@/logic/FileUploadLogic';
import { useTableStore } from '@/zustand/useTableStore';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';

export function FileUploadButton() {
  const tableStore = useTableStore();

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await FileUploadLogic.parseData(file);

    if (data) {
      tableStore.setTable(data);
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
      />
      <label
        htmlFor="file-upload"
        className="inline-block px-6 py-3 bg-blue-500 text-white font-bold cursor-pointer rounded transition duration-200 hover:bg-blue-700"
      >
        Upload File
        <ArrowUpTrayIcon className="h-6 w-6 ml-4 inline" aria-hidden="true" />
      </label>
    </div>
  );
}
