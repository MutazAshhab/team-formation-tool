import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  onClick,
  children,
  icon = undefined,
  iconPosition,
}: ButtonProps) {
  return (
    <button
      className="inline-flex align-self-start max-w-fit cursor-pointer bg-blue-500 text-white px-4 py-2 rounded duration-300 ease-in-out hover:bg-blue-700"
      onClick={onClick}
    >
      <div className="flex flex-row gap-2">
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </div>
    </button>
  );
}
