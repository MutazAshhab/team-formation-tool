import { useState } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';
import { MinMaxValues } from '@/components/MISC/MinMaxValues';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';
import { ColumnValuesErrorBox } from '../ColumnValuesErrorBox';
import { ColumnValuesErrorType } from '../types';

export function Anxiety() {
  const teamFormationStore = useTeamFormationStepsStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const [error, setError] = useState<ColumnValuesErrorType>(null);

  function turnOffError(errorType: ColumnValuesErrorType) {
    if (error === errorType) {
      setError(null);
    }
  }

  const showMinMaxValueSelector = defaultAlgorithmStore.anxiety.name !== null;

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Anxiety"
      />
      <DialogContent className="flex flex-col gap-4">
        <ColumnNameSelector
          label="Select the header that maps to Anxiety"
          onSelect={value => {
            defaultAlgorithmStore.setAnxiety({
              name: value,
              min: null,
              max: null,
            });

            turnOffError('name');
          }}
          selectedValue={defaultAlgorithmStore.anxiety.name}
        />

        {showMinMaxValueSelector && (
          <MinMaxValues
            label="Set the minimum and maximum possible values for Anxiety"
            minValue={defaultAlgorithmStore.anxiety.min}
            maxValue={defaultAlgorithmStore.anxiety.max}
            onSelect={(min, max) => {
              defaultAlgorithmStore.setAnxiety({
                name: defaultAlgorithmStore.anxiety.name,
                min,
                max,
              });

              turnOffError('min');
              turnOffError('max');
            }}
          />
        )}
        {defaultAlgorithmStore.anxiety.name && (
          <AlertBox variant="info">
            Please make sure that all the values within the
            <strong>{defaultAlgorithmStore.anxiety.name}</strong> column are
            numbers.
          </AlertBox>
        )}
        <ColumnValuesErrorBox type={error} />
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          if (defaultAlgorithmStore.anxiety.name === null) {
            setError('name');
            return;
          }

          if (defaultAlgorithmStore.anxiety.min === null) {
            setError('min');
            return;
          }

          if (defaultAlgorithmStore.anxiety.max === null) {
            setError('max');
            return;
          }

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
