import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface AlertBoxProps {
  variant: 'info' | 'error';
  title?: string;
  children: React.ReactNode;
}

export function AlertBox(props: AlertBoxProps) {
  const colors = (() => {
    switch (props.variant) {
      case 'info':
        return {
          background: 'rgb(254 249 195)',
          icon: 'rgb(161 98 7)',
        };
      case 'error':
        return {
          background: '#FDEFEC',
          icon: '#F04B23',
        };
    }
  })();
  return (
    <div
      className={'p-4 rounded-xl'}
      style={{ backgroundColor: colors.background }}
    >
      {props.title && (
        <>
          <p className="text-xl">{props.title}</p>
          <br />
        </>
      )}
      <div className="flex items-center">
        <div className="mr-4">
          <ExclamationTriangleIcon className={'h-6 w-6'} color={colors.icon} />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
