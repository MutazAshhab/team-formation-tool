import { useState } from 'react';

import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';
import { MinMaxValues } from '@/components/MISC/MinMaxValues';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';
import { ColumnValuesErrorBox } from '../ColumnValuesErrorBox';
import { ColumnValuesErrorType } from '../types';

export function Agreeableness() {
  const teamFormationStore = useTeamFormationStepsStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const [error, setError] = useState<ColumnValuesErrorType>(null);

  function turnOffError(errorType: ColumnValuesErrorType) {
    if (error === errorType) {
      setError(null);
    }
  }

  const showMinMaxValueSelector =
    defaultAlgorithmStore.agreeableness.name !== null;

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Agreeableness"
      />
      <DialogContent className="flex flex-col gap-4">
        <ColumnNameSelector
          label="Select the header that maps to Agreeableness"
          onSelect={value => {
            defaultAlgorithmStore.setAgreeableness({
              name: value,
              min: null,
              max: null,
            });

            turnOffError('name');
          }}
          selectedValue={defaultAlgorithmStore.agreeableness.name}
        />

        {showMinMaxValueSelector && (
          <MinMaxValues
            label="Set the minimum and maximum possible values for Agreeableness"
            minValue={defaultAlgorithmStore.agreeableness.min}
            maxValue={defaultAlgorithmStore.agreeableness.max}
            onSelect={(min, max) => {
              defaultAlgorithmStore.setAgreeableness({
                name: defaultAlgorithmStore.agreeableness.name,
                min,
                max,
              });

              turnOffError('min');
              turnOffError('max');
            }}
          />
        )}
        <ColumnValuesErrorBox type={error} />
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          if (defaultAlgorithmStore.agreeableness.name === null) {
            setError('name');
            return;
          }

          if (defaultAlgorithmStore.agreeableness.min === null) {
            setError('min');
            return;
          }

          if (defaultAlgorithmStore.agreeableness.max === null) {
            setError('max');
            return;
          }

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
