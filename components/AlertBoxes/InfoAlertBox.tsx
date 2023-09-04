import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { AlertBox } from './AlertBox';

interface InfoAlertBoxProps {
  children: React.ReactNode;
}

export function InfoAlertBox(props: InfoAlertBoxProps) {
  return (
    <div className="App">
      <AlertBox
        icon={<ExclamationTriangleIcon className="h-6 w-6 text-yellow-700" />}
        color="bg-yellow-100"
      >
        {props.children}
      </AlertBox>
    </div>
  );
}
