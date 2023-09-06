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
    <div className="mt-14">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
      >
        Choose a file
        <ArrowUpTrayIcon className="h-5 w-5 ml-2 inline" aria-hidden="true" />
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept=".csv, .xls, .xlsx"
        onChange={handleFileUpload}
      />
      {/* add this styling when we support more file formats w-64 flex-wrap */}
      <p className="mt-3 text-sm text-gray-600 ">
        Accepted file formats are: .csv, .xls, .xlsx
        <br />
        <br />
        But we work best with .csv
      </p>
    </div>
  );
}
