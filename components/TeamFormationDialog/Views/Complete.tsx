import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';
import axios from 'axios';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function Complete() {
  const teamFormationStore = useTeamFormationStepsStore();
  const algorithmStore = useAlgorithmStore();
  const tableStore = useTableStore();

  async function postDefaultAlgorithm() {
    const data = await axios.post('http://127.0.0.1:8000/default_algorithm', {
      mapping: algorithmStore.mapping,
      csv_data: tableStore.data,
    });

    console.log({ data });
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
