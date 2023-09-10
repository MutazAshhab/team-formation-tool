import { AlertBox } from '@/components/AlertBoxes/AlertBox';

import { ColumnValuesErrorType } from './types';

interface ColumnValuesErrorBoxProps {
  type: ColumnValuesErrorType;
}

export function ColumnValuesErrorBox(props: ColumnValuesErrorBoxProps) {
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

  const minErrorMessage = (
    <p>
      Please set a <strong>minimum value</strong>
    </p>
  );

  const maxErrorMessage = (
    <p>
      Please set a <strong>maximum value</strong>
    </p>
  );

  const messageToDisplay = (() => {
    switch (props.type) {
      case 'name':
        return nameErrorMessage;
      case 'value':
        return valuesErrorMessage;
      case 'min':
        return minErrorMessage;
      case 'max':
        return maxErrorMessage;
      default:
        return null;
    }
  })();

  return <AlertBox variant="error">{messageToDisplay}</AlertBox>;
}
