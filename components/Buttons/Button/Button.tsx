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
      className="border border-slate-400  text-black py-3 px-4 text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:border-slate-600 rounded-lg"
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
