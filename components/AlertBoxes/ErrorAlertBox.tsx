import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { AlertBox } from './AlertBox';

interface ErrorAlertBoxProps {
  children: React.ReactNode;
}

export function ErrorAlertBox(props: ErrorAlertBoxProps) {
  return (
    <div className="App">
      <AlertBox
        icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-700" />}
        color="bg-red-100"
      >
        {props.children}
      </AlertBox>
    </div>
  );
}
