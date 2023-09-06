'use client';

import { useEffect } from 'react';

import { FileUploadButton } from '@/components/Buttons';
import { useTableStore } from '@/zustand/useTableStore';
import { useRouter } from 'next/navigation';

export default function Home() {
  const tableStore = useTableStore();
  const router = useRouter();

  useEffect(() => {
    if (tableStore.data.length > 0) {
      router.push('/view-data');
    }
  }, [router, tableStore.data]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-4">
            Upload Data to Form Teams
          </h1>
          <FileUploadButton />
        </div>
      </div>
    </div>
  );
}
