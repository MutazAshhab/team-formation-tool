'use client';

import { DataTable } from '@/components/Table/DataTable';
import { FileUploadLogic } from '@/logic/FileUploadLogic';
import { useTableStore } from '@/zustand/useTableStore';

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Upload CSV/Excel File</h1>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileUpload}
        />
        <DataTable />
      </div>
    </main>
  );
}
