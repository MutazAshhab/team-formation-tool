import { useEffect, useState } from 'react';

import { AlertBox } from '@/components/AlertBoxes/AlertBox';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';
import { TeamSizeInput } from '../TeamSizeInput';

export function DefaultAlgorithmMapping() {
  const teamFormationStore = useTeamFormationStepsStore();
  const tableStore = useTableStore();
  const algorithmStore = useAlgorithmStore();

  // We only want to set it once, placing it outside of a useEffect will cause it to be set every time the component is rendered then trigger a render again causing an infinite render loop
  useEffect(() => {
    algorithmStore.setTeamSize(5);
    algorithmStore.setChosenAlgorithm('default');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = tableStore.data[0];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const handleSelectChange = (col: string, value: string) => {
    setMapping({ ...mapping, [col]: value });

    // Update the list of selected options
    const prevValue = mapping[col];
    setSelectedOptions(
      prevSelected =>
        prevSelected
          .filter(opt => opt !== prevValue)
          .concat(value !== '' ? value : []), // this removes the value if it is an empty string
    );
  };

  const options = [
    { label: 'Gender', key: 'gender' },
    { label: 'First Language', key: 'first_language' },
    { label: 'WAM', key: 'wam' },
    { label: 'Anxiety', key: 'anxiety' },
    { label: 'Agreeableness', key: 'agreeableness' },
  ];

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="DefaultAlgorithmMapping"
      />
      <DialogContent className="flex flex-col gap-4">
        <AlertBox variant="info">
          For the default algorithm, each team will have 5 team members
        </AlertBox>
        {headers.map(header => (
          <div key={header} className="p-2 border border-gray-300 rounded-lg">
            <label className="block text-md font-medium text-gray-700">
              {header}
            </label>
            <select
              value={mapping[header] || ''}
              onChange={e => handleSelectChange(header, e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="" className="text-gray-400">
                Select an option
              </option>
              {options
                .filter(
                  opt =>
                    !selectedOptions.includes(opt.label) ||
                    mapping[header] === opt.label,
                )
                .map(opt => (
                  <option
                    key={opt.label}
                    value={opt.label}
                    className="text-black"
                  >
                    {opt.label}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          const areAllOptionsAssigned =
            options.length === selectedOptions.length;

          if (!areAllOptionsAssigned) {
            return;
          }

          // Convert the mapping to an `DefaultMapping` array
          const defaultMapping = Object.keys(mapping).map(key => {
            const option = options.find(opt => opt.label === mapping[key]);
            return {
              columnName: key,
              optionName: option ? option.key : 'undefined',
            };
          });

          algorithmStore.setMapping(defaultMapping);

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
