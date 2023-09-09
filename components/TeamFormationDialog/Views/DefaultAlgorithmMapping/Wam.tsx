import { useState } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';
import { ColumnValuesErrorBox } from '../ColumnValuesErrorBox';
import { ColumnValuesErrorType } from '../types';

export function Wam() {
  const teamFormationStore = useTeamFormationStepsStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const [error, setError] = useState<ColumnValuesErrorType>(null);

  function turnOffError(errorType: ColumnValuesErrorType) {
    if (error === errorType) {
      setError(null);
    }
  }

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="First Language"
      />
      <DialogContent className="flex flex-col gap-4">
        <ColumnNameSelector
          label="Select the header that maps to WAM"
          onSelect={value => {
            defaultAlgorithmStore.setWam(value);

            turnOffError('name');
          }}
          selectedValue={defaultAlgorithmStore.wam}
        />
        {defaultAlgorithmStore.wam && (
          <AlertBox variant="info">
            Please make sure that all the values within the{' '}
            <strong>{defaultAlgorithmStore.wam}</strong> column are numbers.
          </AlertBox>
        )}
        <ColumnValuesErrorBox type={error} />
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          if (defaultAlgorithmStore.wam === null) {
            setError('name');
            return;
          }

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
