'use client';

import { FileUploadButton } from '@/components/Buttons';
import { DataTableSection } from '@/components/Table/DataTableSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Upload CSV/Excel File</h1>
        <FileUploadButton />
        <DataTableSection />
      </div>
    </main>
  );
}
