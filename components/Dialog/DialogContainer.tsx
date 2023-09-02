import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DialogContainerProps {
  show: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export function DialogContainer(props: DialogContainerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        props.closeModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!props.show) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <dialog className="flex flex-col items-stretch justify-center w-3/4 rounded bg-white p-4">
        {props.children}
      </dialog>
    </div>,
    document.body,
  );
}
