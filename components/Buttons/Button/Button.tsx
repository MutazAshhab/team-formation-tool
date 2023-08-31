import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({ onClick, children, icon, iconPosition }: ButtonProps) {
  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white font-bold border-none rounded cursor-pointer transition duration-200 hover:bg-blue-700"
      onClick={onClick}
    >
      <div className="flex items-center">
        {iconPosition === 'left' && icon && <div className="mr-2">{icon}</div>}
        <div>{children}</div>
        {iconPosition === 'right' && icon && <div className="ml-2">{icon}</div>}
      </div>
    </button>
  );
}
