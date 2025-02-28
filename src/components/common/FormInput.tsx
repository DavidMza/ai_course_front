import React from 'react';
import { cn } from '../../utils/cn';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#34495E]">
        {label}
      </label>
      <input
        className={cn(
          "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm",
          "shadow-sm placeholder-gray-400",
          "focus:outline-none focus:border-[#3498DB] focus:ring-1 focus:ring-[#3498DB]",
          className
        )}
        {...props}
      />
    </div>
  );
};