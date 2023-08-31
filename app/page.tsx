'use client';

import { FileUploadButton } from '@/components/Buttons';
import { Button } from '@/components/Buttons/Button/Button';
import { DataTable } from '@/components/Table/DataTable';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Upload CSV/Excel File</h1>
        <FileUploadButton />
        <DataTable />
      </div>
    </main>
  );
}
