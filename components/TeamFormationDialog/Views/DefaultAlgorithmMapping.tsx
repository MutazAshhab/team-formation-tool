import { useEffect, useState } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import {
  DefaultMapping,
  useDefaultAlgorithmStore,
} from '@/zustand/useDefaultAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';

export function DefaultAlgorithmMapping() {
  const teamFormationStore = useTeamFormationStepsStore();
  const tableStore = useTableStore();
  const algorithmStore = useAlgorithmStore();
  const defaultAlgorithmStore = useDefaultAlgorithmStore();

  // Component state
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  // We only want to set it once, placing it outside of a useEffect will cause it to be set every time the component is rendered then trigger a render again causing an infinite render loop
  useEffect(() => {
    algorithmStore.setTeamSize(5);
    algorithmStore.setChosenAlgorithm('default');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update component state when
  useEffect(() => {
    if (defaultAlgorithmStore.mapping !== null) {
      const mappingObject = defaultAlgorithmStore.mapping as unknown as Record<
        string,
        string
      >;
      const selectedArray: string[] = Object.values(
        defaultAlgorithmStore.mapping,
      );

      setSelectedOptions(selectedArray);
      setMapping(mappingObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectChange(key: string, headerName: string) {
    setMapping({ ...mapping, [key]: headerName });

    // Update the list of selected options
    const prevValue = mapping[key];
    setSelectedOptions(
      prevSelected =>
        prevSelected
          .filter(opt => opt !== prevValue)
          .concat(headerName !== '' ? headerName : []), // this removes the value if it is an empty string
    );
  }

  const options = [
    { label: 'Gender', key: 'gender' },
    { label: 'First Language', key: 'first_language' },
    { label: 'WAM', key: 'wam' },
    { label: 'Anxiety', key: 'anxiety' },
    { label: 'Agreeableness', key: 'agreeableness' },
  ];

  const headers = tableStore.data[0];

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="DefaultAlgorithmMapping"
      />
      <DialogContent className="flex flex-col gap-4">
        <AlertBox variant="info">
          For the default team formation strategy, the algorithm will aim to
          create team of 5.
        </AlertBox>
        <div className="overflow-auto border rounded-lg flex flex-col gap-4 items-center py-2">
          {options.map(option => (
            <div
              key={option.key}
              className="p-2 border border-gray-300 rounded-lg w-[96%]"
            >
              <label className="block text-md font-medium text-gray-700">
                {option.label}
              </label>
              <select
                value={mapping[option.key] || ''}
                onChange={e => handleSelectChange(option.key, e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="" className="text-gray-400">
                  Select the respective header
                </option>
                {headers.map(header => (
                  <option
                    key={header}
                    value={header}
                    className="text-gray-700"
                    disabled={selectedOptions.includes(header)}
                  >
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          const areAllOptionsAssigned =
            options.length === selectedOptions.length;

          if (!areAllOptionsAssigned) {
            return;
          }

          defaultAlgorithmStore.setMapping({
            gender: mapping.gender,
            first_language: mapping.first_language,
            wam: mapping.wam,
            anxiety: mapping.anxiety,
            agreeableness: mapping.agreeableness,
          });

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
