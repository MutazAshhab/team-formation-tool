import { useState } from 'react';

import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogHeader } from '@/components/Dialog/DialogHeader';
import { useTableStore } from '@/zustand/useTableStore';
import { useTeamFormationStepsStore } from '@/zustand/useTeamFormationStepsStore';

import { TeamFormationStepsDialogFooter } from '../TeamFormationStepsDialogFooter';
import { TeamSizeInput } from '../TeamSizeInput';

export function DefaultAlgorithmMapping() {
  const teamFormationStore = useTeamFormationStepsStore();
  const tableStore = useTableStore();

  const headers = tableStore.data[0];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const handleSelectChange = (col: string, value: string) => {
    setMapping({ ...mapping, [col]: value });

    // Update the list of selected options
    const prevValue = mapping[col];
    setSelectedOptions(prevSelected =>
      prevSelected.filter(opt => opt !== prevValue).concat(value),
    );
  };

  const options = [
    'Gender',
    'First Language',
    'WAM',
    'Anxiety',
    'Agreeableness',
  ];

  return (
    <>
      <DialogHeader
        closeModal={teamFormationStore.closeTeamFormationModal}
        title="DefaultAlgorithmMapping"
      />
      <DialogContent className="flex flex-col gap-4">
        <TeamSizeInput />
        {headers.map(col => (
          <div key={col} className="p-2 border border-gray-300 rounded-lg">
            <label className="block text-md font-medium text-gray-700">
              {col}
            </label>
            <select
              value={mapping[col] || ''}
              onChange={e => handleSelectChange(col, e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="" className="text-gray-400">
                Select an option
              </option>
              {options
                .filter(
                  opt => !selectedOptions.includes(opt) || mapping[col] === opt,
                )
                .map(opt => (
                  <option key={opt} value={opt} className="text-black">
                    {opt}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </DialogContent>
      <TeamFormationStepsDialogFooter
        onNextClick={teamFormationStore.gotoNextView}
      />
    </>
  );
}
