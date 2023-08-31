import React from 'react';

import { FileUploadLogic } from '@/logic/FileUploadLogic';
import { useTableStore } from '@/zustand/useTableStore';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';

import './FileUploadButton.css';

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
    <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-upload-input"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload" className="file-upload-label">
        Upload File
        <ArrowUpTrayIcon className="h-6" />
      </label>
    </div>
  );
}
