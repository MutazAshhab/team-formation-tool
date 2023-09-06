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
      className="inline-flex align-self-start max-w-fit"
      onClick={onClick}
    >
      <div className="flex flex-row gap-2 border border-slate-400 text-black py-3 px-4 text-lg transition duration-300 ease-in-out hover:bg-gray-100 hover:border-slate-600 rounded-lg">
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </div>
    </button>
  );
}
