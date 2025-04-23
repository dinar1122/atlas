import React, { ReactNode } from 'react';
import './style.css';

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'ghost' | 'default';
  status?: 0 | 1 | 2;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = '',
  children,
  onClick = () => {},
  variant = 'default',
  status
}) => {
  const baseClasses = `CustomButton ${
    variant === 'ghost' 
      ? 'bg-transparent border-transparent' 
      : ''
  } ${
    status !== undefined 
      ? `button-status-${status}` 
      : ''
  } ${className}`;

  return (
    <button
      type="button"
      className={baseClasses.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;