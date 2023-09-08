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
      const mappingObject: Record<string, string> = {};
      const selectedArray: string[] = [];

      const defaultMapping = defaultAlgorithmStore.mapping;
      for (const key in defaultMapping) {
        if (Object.prototype.hasOwnProperty.call(defaultMapping, key)) {
          const value = defaultMapping[key as keyof DefaultMapping];
          const option = options.find(o => o.key === key);

          if (option) {
            mappingObject[value] = option.label;
            selectedArray.push(option.label);
          }
        }
      }

      setSelectedOptions(selectedArray);
      setMapping(mappingObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = tableStore.data[0];

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
        <div className="overflow-auto border rounded-lg flex flex-col gap-4 items-center py-2">
          {headers.map(header => (
            <div
              key={header}
              className="p-2 border border-gray-300 rounded-lg w-[96%]"
            >
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
        </div>
        {/* place a thingy here which tells the user what maps to what, in a nice UI, could also show them an error message here */}
        {/* <div></div> */}
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={() => {
          const areAllOptionsAssigned =
            options.length === selectedOptions.length;

          if (!areAllOptionsAssigned) {
            return;
          }

          // Convert the mapping to an `DefaultMapping` array
          const defaultMapping: DefaultMapping = {
            gender: '',
            first_language: '',
            wam: '',
            anxiety: '',
            agreeableness: '',
          };

          // Populate defaultMapping based on mappingObject and options
          for (const key in mapping) {
            const label = mapping[key];
            const option = options.find(o => o.label === label);

            if (option) {
              // Using 'as keyof DefaultMapping' to tell TypeScript that the key exists in DefaultMapping
              defaultMapping[option.key as keyof DefaultMapping] = key;
            }
          }

          defaultAlgorithmStore.setMapping(defaultMapping);

          teamFormationStore.gotoNextView();
        }}
      />
    </>
  );
}
