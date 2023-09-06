'use client';

import { useEffect } from 'react';

import { DataTable } from '@/components/Table/DataTable';
import { useTableStore } from '@/zustand/useTableStore';
import { useRouter } from 'next/navigation';

export default function ViewCSVPage() {
  const tableStore = useTableStore();
  const router = useRouter();

  useEffect(() => {
    if (tableStore.data.length === 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:mx-auto w-[85vw]">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full">
          <h1 className="text-2xl font-semibold mb-4">
            View Uploaded CSV Data
          </h1>

          {/* Data Table Section */}
          <div className="bg-gray-100 p-4 rounded overflow-x-auto">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
