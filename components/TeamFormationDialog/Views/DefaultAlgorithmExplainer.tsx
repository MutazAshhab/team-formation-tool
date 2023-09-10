import { useEffect } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function DefaultAlgorithmExplainer() {
  const teamFormationStore = useTeamFormationStepsStore();
  const algorithmStore = useAlgorithmStore();

  useEffect(() => {
    algorithmStore.setTeamSize(5);
    algorithmStore.setChosenAlgorithm('default');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Using the Default Algorithm"
      />
      <DialogContent>
        <AlertBox variant="info">
          Our default algorithm aims to create balanced and diverse teams for
          you. It ensures that each team has a mix of genders, language
          backgrounds, and academic performance levels. The algorithm also takes
          into account individual traits like agreeability and anxiety levels to
          foster a harmonious team environment.
          <br />
          <br />
          In the next step, you will be asked to match the data columns to the
          factors, and let the algorithm do the work!
        </AlertBox>
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
