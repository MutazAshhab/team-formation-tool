import { useMemo, useState } from 'react';

import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { CheckboxList } from '@/components/MISC/CheckboxList';
import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';
import { getUniqueColumnValues } from '@/utils/getColumnValues';
import { useDefaultAlgorithmStore } from '@/zustand/useDefaultAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../../TeamFormationStepsDialogFooter';
import { ColumnValuesErrorBox } from '../ColumnValuesErrorBox';
import { ColumnValuesErrorType } from '../types';

export function Gender() {
  const teamFormationStore = useTeamFormationStepsStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const tableStore = useTableStore();
  const [error, setError] = useState<ColumnValuesErrorType>(null);

  const showValueSelection = defaultAlgorithmStore.gender.name !== null;

  const possibleGenderValues = useMemo(() => {
    return getUniqueColumnValues(
      tableStore.data,
      defaultAlgorithmStore.gender.name,
    );
  }, [defaultAlgorithmStore.gender, tableStore.data]);

  function turnOffError(errorType: ColumnValuesErrorType) {
    if (error === errorType) {
      setError(null);
    }
  }

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="Gender"
      />
      <DialogContent className="flex flex-col gap-4">
        <ColumnNameSelector
          label="Select the header that maps to Gender"
          onSelect={value => {
            defaultAlgorithmStore.setGender({
              name: value,
              values: [],
            });

            turnOffError('name');
          }}
          selectedValue={defaultAlgorithmStore.gender.name}
        />
        {showValueSelection && (
          <CheckboxList
            label="Select the genders which you want to be spread out in the teams"
            items={possibleGenderValues}
            selectedItems={defaultAlgorithmStore.gender.values}
            setSelectedItems={values => {
              defaultAlgorithmStore.setGender({
                ...defaultAlgorithmStore.gender,
                values: values,
              });

              turnOffError('value');
            }}
          />
        )}
        <ColumnValuesErrorBox type={error} />
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          if (defaultAlgorithmStore.gender.name === null) {
            setError('name');
            return;
          }

          if (defaultAlgorithmStore.gender.values.length === 0) {
            setError('value');
            return;
          }

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
