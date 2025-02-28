import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        {
          'bg-[#2C3E50] text-white hover:bg-[#34495E]': variant === 'primary',
          'bg-[#3498DB] text-white hover:bg-[#2980B9]': variant === 'secondary',
          'border-2 border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white':
            variant === 'outline',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}