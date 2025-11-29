import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, rightElement, error, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-text-muted mb-2">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-background-card border border-zinc-800 rounded-lg 
            ${icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} py-3.5
            text-text-main placeholder-zinc-600
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            transition-all duration-200
            shadow-inner
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};