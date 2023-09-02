import { useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';

interface DialogHeaderProps {
  icon?: JSX.Element;
  title: string;
  closeModal: () => void;
}

export function DialogHeader(props: DialogHeaderProps) {
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  const buttonStyling = isHovering ? { backgroundColor: '#FDEFEC' } : {};
  const iconStyling = isHovering ? { color: '#F04B23' } : {};

  return (
    <div className="w-full h-max">
      <div className="flex justify-between items-center">
        <p className="text-2xl">{props.title}</p>
        <button
          onClick={props.closeModal}
          className="transition duration-300 ease-in-out rounded-3xl p-1"
          style={buttonStyling}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <XMarkIcon className="h-7 w-7" style={iconStyling} />
        </button>
      </div>
    </div>
  );
}
