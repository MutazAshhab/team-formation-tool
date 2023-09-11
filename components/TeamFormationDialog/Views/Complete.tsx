import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { TeamTableLogic } from '@/logic/TeamTableLogic';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function Complete() {
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

    const response = await axios.post(
      'http://127.0.0.1:8000/default_algorithm',
      {
        mapping: algorithmData,
        csv_data: tableStore.data,
      },
    );

    if (response.status === 200) {
      const teams = TeamTableLogic.convertResponseTo2dArray(
        response.data.teams,
      );

      tableStore.setFormedTeams(teams);
      router.push('/view-teams');
    }
  }

  async function postCustomAlgorithm() {}

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Complete"
      />
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          if (algorithmStore.chosenAlgorithm === 'default') {
            postDefaultAlgorithm();
          } else if (algorithmStore.chosenAlgorithm === 'custom') {
            postCustomAlgorithm();
          }
        }}
      />
    </>
  );
}

/**
 * algorithmData v 
 * {
    "gender": {
        "name": "GENDER",
        "values": [
            "F"
        ]
    },
    "first_language": {
        "name": "NATIONALITY",
        "values": [
            "English"
        ]
    },
    "wam": "WAM",
    "anxiety": {
        "name": "Anxiety",
        "min": 0,
        "max": 5
    },
    "agreeableness": {
        "name": "Agreeableness",
        "min": 0,
        "max": 5
    }
}
 */
