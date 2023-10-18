import React, { useState } from 'react';

import { Button } from '@/components/Buttons';
import { PlusIcon } from '@heroicons/react/24/outline';

import { ColumnConstraintSection } from './ColumnConstraintSection';
import { Constraint } from './ConstraintSelector';
import { ConstraintSummary } from './ConstraintSummary';

export function ConstraintManager() {
  const [constraints, setConstraints] = useState<Constraint[]>([
    { column: '', type: '', value: '' }, // Initial empty constraint for the user to start with
  ]);

  const handleConstraintChange = (
    index: number,
    updatedConstraint: Constraint,
  ) => {
    const newConstraints = [...constraints];
    newConstraints[index] = updatedConstraint;
    setConstraints(newConstraints);
  };

  function addConstraint() {
    setConstraints([...constraints, { column: '', type: '', value: '' }]);
  }

  function removeConstraint(index: number) {
    const newConstraints = [...constraints];
    newConstraints.splice(index, 1);
    setConstraints(newConstraints);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {constraints.map((constraint, index) => (
          <ColumnConstraintSection
            constraint={constraint}
            onConstraintChange={handleConstraintChange}
            removeConstraint={removeConstraint}
            index={index}
            key={index}
          />
        ))}
      </div>

      <Button
        iconPosition="left"
        icon={<PlusIcon className="h-6 w-6" />}
        onClick={addConstraint}
      >
        Add new constraint
      </Button>

      <ConstraintSummary constraints={constraints} />
    </>
  );
}
