import React, { useState } from 'react';

import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';

import { Constraint, ConstraintSelector } from './ConstraintSelector';
import { ConstraintSummary } from './ConstraintSummary';

export function ColumnConstraintSection() {
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [currentConstraint, setCurrentConstraint] = useState<Constraint>({
    column: '',
    type: '',
    value: '',
  });

  const handleAddConstraint = () => {
    setConstraints([...constraints, currentConstraint]);
    setCurrentConstraint({ column: '', type: '', value: '' });
  };

  return (
    <div className="flex flex-col gap-4">
      <ColumnNameSelector
        label="Select the column to apply the constraint on"
        onSelect={value =>
          setCurrentConstraint({
            ...currentConstraint,
            column: value,
          })
        }
        selectedValue={currentConstraint.column}
      />

      {/* <ConstraintSelector ></ConstraintSelector> */}

      <div className="border p-4 rounded">
        <ConstraintSummary constraints={constraints}></ConstraintSummary>
      </div>

      <button className="mt-4 bg-green-500 text-white p-2 rounded">
        Submit Constraints
      </button>
    </div>
  );
}
