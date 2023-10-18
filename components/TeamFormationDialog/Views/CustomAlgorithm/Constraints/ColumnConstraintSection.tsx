import React, { useState } from 'react';

import { Button } from '@/components/Buttons';
import { ColumnNameSelector } from '@/components/MISC/ColumnNameSelector';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

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
      <Button
        iconPosition="left"
        icon={<MinusCircleIcon className="h-6 w-6" />}
        variant="danger"
        onClick={() => props.removeConstraint(props.index)}
      >
        Remove Constraint
      </Button>

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
