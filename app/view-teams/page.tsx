'use client';

import { useEffect } from 'react';

import { Button } from '@/components/Buttons';
import { FormedTeamsTable } from '@/components/Tables/FormedTeamsTable/FormedTeamsTable';
import { useTableStore } from '@/zustand/useTableStore';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function ViewTeamsPage() {
  const tableStore = useTableStore();
  const router = useRouter();

  useEffect(() => {
    if (tableStore.data.length === 0 && tableStore.formedTeams.length === 0) {
      router.push('/');
    }

    if (tableStore.data.length >= 0 && tableStore.formedTeams.length === 0) {
      router.push('/view-data');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function backToTeamFormation() {
    if (tableStore.data.length === 0) {
      router.push('/');
      return;
    }

    router.push('/view-data');
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:mx-auto w-[85vw]">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full">
          <h1 className="text-2xl font-semibold mb-4">View Formed Teams</h1>

          <Button
            className="mb-4"
            icon={<ArrowLeftIcon className="h-6 w-6" />}
            iconPosition="left"
            onClick={backToTeamFormation}
          >
            Back to Team Formation
          </Button>

          {/* Data Table Section */}
          <div className="bg-gray-200 p-4 rounded overflow-x-auto">
            <FormedTeamsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
