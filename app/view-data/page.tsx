'use client';

import { useEffect } from 'react';

import { Button } from '@/components/Buttons';
import { DataTable } from '@/components/Tables/DataTable/DataTable';
import { TeamFormationStepsDialog } from '@/components/TeamFormationDialog/TeamFormationStepsDialog';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { PuzzlePieceIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function ViewCSVPage() {
  const { openTeamFormationModal } = useTeamFormationStepsStore();
  const tableStore = useTableStore();
  const router = useRouter();

  const showGoToTeamFormationButton = tableStore.formedTeams.length > 0;

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

          <div className="flex flex-row justify-between">
            <Button
              className="mb-4"
              icon={<PuzzlePieceIcon className="h-6 w-6 inline" />}
              iconPosition="right"
              onClick={openTeamFormationModal}
            >
              Form Teams
            </Button>
            {showGoToTeamFormationButton && (
              <Button
                className="mb-4"
                icon={<ArrowRightIcon className="h-6 w-6" />}
                iconPosition="right"
                onClick={() => router.push('/view-teams')}
              >
                View formed teams
              </Button>
            )}
          </div>

          {/* Data Table Section */}
          <div className="bg-gray-200 p-4 rounded overflow-x-auto">
            <DataTable />
          </div>
        </div>
      </div>
      <TeamFormationStepsDialog />
    </div>
  );
}
