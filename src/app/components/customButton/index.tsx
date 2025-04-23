import React, { ReactNode } from 'react';
import './style.css';

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick = () => {} }) => {
  return (
    <button type='button' className='CustomButton' onClick={() => onClick()}>{children}</button>
  );
};

export default CustomButton;