import { XMarkIcon } from '@heroicons/react/20/solid';

interface DialogHeaderProps {
  icon?: JSX.Element;
  title: string;
  closeModal: () => void;
}

export function DialogHeader(props: DialogHeaderProps) {
  return (
    <div className="w-full h-max">
      <div className="flex justify-between items-center">
        <p className="text-2xl">{props.title}</p>
        <XMarkIcon className="h-6 w-6" onClick={props.closeModal} />
      </div>
    </div>
  );
}
