import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface AlertBoxProps {
  variant: 'info' | 'error';
  children: React.ReactNode;
}

export function AlertBox(props: AlertBoxProps) {
  const colors = (() => {
    switch (props.variant) {
      case 'info':
        return {
          background: 'bg-yellow-100',
          icon: 'text-yellow-700',
        };
      case 'error':
        return {
          background: 'bg-red-100',
          icon: 'text-red-700',
        };
    }
  })();
  return (
    <div className={`p-4 rounded ${colors.background}`}>
      <div className="flex items-center">
        <div className="mr-4">
          <ExclamationTriangleIcon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
