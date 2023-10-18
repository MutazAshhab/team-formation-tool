import React from 'react';

export interface Constraint {
  column: string | null;
  type: string;
  value: string | number;
}

interface ConstraintSelectorProps {
  onConstraintChange: (type: string, value: string | number) => void;
  selectedType?: string;
  selectedValue?: string | number;
}

export function ConstraintSelector({
  onConstraintChange,
  selectedType,
  selectedValue,
}: ConstraintSelectorProps) {
  return (
    <div className="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg w-[96%]">
      <label className="block text-md font-medium text-gray-700">
        Select a constraint for this heading
      </label>
      <div className="flex flex-row justify-between">
        <select
          value={selectedType || ''}
          onChange={e =>
            onConstraintChange(e.target.value, selectedValue || '')
          }
          className="border p-2 rounded"
        >
          <option value="">Select a constraint</option>
          <option value="minUnique">Minimum number of unique values</option>
          <option value="mustContain">Must contain value</option>
        </select>

        <input
          type="text"
          value={String(selectedValue || '')}
          onChange={e => onConstraintChange(selectedType || '', e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter value"
        />
      </div>
    </div>
  );
}
