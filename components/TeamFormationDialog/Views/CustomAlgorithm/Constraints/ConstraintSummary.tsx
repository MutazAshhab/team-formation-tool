import { Constraint } from './ConstraintSelector';

interface ConstraintSummaryProps {
  constraints: Constraint[];
}

export function ConstraintSummary(props: ConstraintSummaryProps) {
  return (
    <div className="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg w-[96%]">
      <p className="block text-md font-medium text-gray-700">
        Currently Applied Constraints
      </p>
      {props.constraints.map((constraint, index) => (
        <li key={index}>
          {constraint.type === 'minUnique'
            ? `At least ${constraint.value} unique values from '${constraint.column}' column.`
            : constraint.type === 'mustContain'
            ? `'${constraint.column}' column must contain '${constraint.value}'.`
            : ''}
        </li>
      ))}
    </div>
  );
}
