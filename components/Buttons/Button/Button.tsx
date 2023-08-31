import React from 'react';

import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({ onClick, children, icon, iconPosition }: ButtonProps) {
  return (
    <button className="base-button" onClick={onClick}>
      <div className="button-content">
        {iconPosition === 'left' && icon && (
          <div className="button-icon-left">{icon}</div>
        )}
        <div className="button-text">{children}</div>
        {iconPosition === 'right' && icon && (
          <div className="button-icon-right">{icon}</div>
        )}
      </div>
    </button>
  );
}
