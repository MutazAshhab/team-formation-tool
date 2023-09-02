import { XMarkIcon } from '@heroicons/react/20/solid';

interface DialogHeaderProps {
  icon?: JSX.Element;
  title: string;
  closeModal: () => void;
}

export function DialogHeader(props: DialogHeaderProps) {
  return (
    <div className="w-full h-max mb-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl">{props.title}</p>
        <button onClick={props.closeModal}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
