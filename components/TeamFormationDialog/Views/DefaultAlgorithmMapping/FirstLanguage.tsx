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

export function FirstLanguage() {
  const teamFormationStore = useTeamFormationStepsStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();
  const tableStore = useTableStore();
  const [error, setError] = useState<ColumnValuesErrorType>(null);

  const showValueSelection = defaultAlgorithmStore.first_language.name !== null;

  const possibleEnglishValues = useMemo(() => {
    return getUniqueColumnValues(
      tableStore.data,
      defaultAlgorithmStore.first_language.name,
    );
  }, [defaultAlgorithmStore.first_language, tableStore.data]);

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
          label="Select the header that maps to English"
          onSelect={value => {
            defaultAlgorithmStore.setFirstLanguage({
              name: value,
              values: [],
            });

            turnOffError('name');
          }}
          selectedValue={defaultAlgorithmStore.first_language.name}
        />
        {showValueSelection && (
          <CheckboxList
            label="Select the values which you want to map to English"
            items={possibleEnglishValues}
            selectedItems={defaultAlgorithmStore.first_language.values}
            setSelectedItems={values => {
              defaultAlgorithmStore.setFirstLanguage({
                ...defaultAlgorithmStore.first_language,
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
          if (defaultAlgorithmStore.first_language.name === null) {
            setError('name');
            return;
          }

          if (defaultAlgorithmStore.first_language.values.length === 0) {
            setError('value');
            return;
          }

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
