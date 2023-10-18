import React, { useState } from 'react';

import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';

import { ConstraintSelector } from './ConstraintSelector';

interface Constraint {
  column: string | null;
  type: string;
  value: string | number;
}

interface ColumnConstraintSectionProps {
  constraint: Constraint;
  onConstraintChange: (index: number, updatedConstraint: Constraint) => void;
  removeConstraint: (index: number) => void;
  index: number;
}

export function ColumnConstraintSection(props: ColumnConstraintSectionProps) {
  function updateConstraint(updatedConstraint: Constraint) {
    props.onConstraintChange(props.index, updatedConstraint);
  }

  return (
    <div className="flex flex-col gap-4 border border-gray-200 rounded-lg pt-2 pl-2 pb-2">
      <button
        className="text-red-500"
        onClick={() => props.removeConstraint(props.index)}
      >
        Remove
      </button>
      <ColumnNameSelector
        label="Select the column to apply the constraint on"
        onSelect={value =>
          updateConstraint({
            ...props.constraint,
            column: value,
          })
        }
        selectedValue={props.constraint.column}
      />

      <ConstraintSelector
        onConstraintChange={() => {}}
        selectedType=""
      ></ConstraintSelector>
    </div>
  );
}
