import React from 'react';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#34495E]">
        {label}
      </label>
      <select
        className={cn(
          "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm",
          "shadow-sm",
          "focus:outline-none focus:border-[#3498DB] focus:ring-1 focus:ring-[#3498DB]",
          className
        )}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};