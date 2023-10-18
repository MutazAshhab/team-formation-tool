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
    <div className="flex gap-4 mt-4">
      <select
        value={selectedType || ''}
        onChange={e => onConstraintChange(e.target.value, selectedValue || '')}
        className="border p-2 rounded"
      >
        <option value="">Choose a constraint</option>
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
  );
}
