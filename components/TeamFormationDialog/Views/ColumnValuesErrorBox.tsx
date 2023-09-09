import { AlertBox } from '@/components/AlertBoxes/AlertBox';

import { ColumnValuesErrorType } from './DefaultAlgorithmMapping/types';

export function ColumnValuesErrorBox(props: { type: ColumnValuesErrorType }) {
  if (props.type === null) {
    return null;
  }

  const nameErrorMessage = (
    <p>
      Please select a <strong>column name</strong>
    </p>
  );
  const valuesErrorMessage = (
    <p>
      Please select <strong>at least one value</strong>
    </p>
  );

  return (
    <AlertBox variant="error">
      {props.type === 'name' ? nameErrorMessage : valuesErrorMessage}
    </AlertBox>
  );
}
