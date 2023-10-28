import { useState } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { Button } from '@/components/Buttons/Button/Button';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogFooter } from '@/components/Dialog/DialogFooter';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { TeamTableLogic } from '@/logic/TeamTableLogic';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { DefaultAlgorithmSummary } from './DefaultAlgorithm/AlgorithmSummary';
import { result } from './result';

export function Complete() {
  const [isLoading, setIsLoading] = useState(false);
  const teamFormationStore = useTeamFormationStepsStore();
  const algorithmStore = useAlgorithmStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const tableStore = useTableStore();
  const router = useRouter();

  async function postDefaultAlgorithm() {
    const algorithmData = {
      gender: defaultAlgorithmStore.gender,
      first_language: defaultAlgorithmStore.first_language,
      wam: defaultAlgorithmStore.wam,
      anxiety: defaultAlgorithmStore.anxiety,
      agreeableness: defaultAlgorithmStore.agreeableness,
    };

    try {
      // const response = await axios.post(
      //   'http://127.0.0.1:8000/default_algorithm',
      //   {
      //     mapping: algorithmData,
      //     csv_data: tableStore.data,
      //   },
      // );

      // if (response.status === 200) {
      //   const teams = TeamTableLogic.convertResponseTo2dArray(
      //     response.data.teams,
      //   );

      tableStore.setFormedTeams(result);
      router.push('/view-teams');
      teamFormationStore.closeTeamFormationModal();
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function postCustomAlgorithm() {}

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Algorithm Configuration Summary"
      />
      <DialogContent>
        <AlertBox variant="info">
          <DefaultAlgorithmSummary />
        </AlertBox>
      </DialogContent>

      <DialogFooter>
        <div className="flex justify-between items-center">
          <Button
            icon={<ArrowLeftIcon className="h-6 w-6" />}
            iconPosition="left"
            onClick={teamFormationStore.goToPreviousView}
            disabled={isLoading}
          >
            Back
          </Button>

          <Button
            icon={<UsersIcon className="h-6 w-6" />}
            iconPosition="right"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              if (algorithmStore.chosenAlgorithm === 'default') {
                await postDefaultAlgorithm();
              } else if (algorithmStore.chosenAlgorithm === 'custom') {
                await postCustomAlgorithm();
              }
              setIsLoading(false);
            }}
          >
            Form teams
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
