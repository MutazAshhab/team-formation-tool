'use client';

import { FileUploadButton } from '@/components/Buttons';
import { DataTableSection } from '@/components/Table/DataTableSection';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center gap-5">
      <FileUploadButton />
      <div className="flex flex-col gap-5">
        <DataTableSection />
      </div>
    </main>
  );
}
