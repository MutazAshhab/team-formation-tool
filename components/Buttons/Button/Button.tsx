import React, { AllHTMLAttributes } from 'react';

interface ButtonProps extends NativeButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
}

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>;

export function Button({
  onClick,
  children,
  icon = undefined,
  iconPosition,
  className,
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  const classNames = [
    'inline-flex align-self-start max-w-fit cursor-pointer bg-blue-500 text-white px-4 py-2 rounded duration-300 ease-in-out',
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700',
    className ?? '',
  ].join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      <div className="flex flex-row gap-2">
        {loading ? (
          'Loading'
        ) : (
          <>
            {iconPosition === 'left' && icon}
            {children}
            {iconPosition === 'right' && icon}
          </>
        )}
      </div>
    </button>
  );
}
