import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Fix: Cast motion.button to any to avoid type errors
const MotionButton = motion.button as any;

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  loading = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-display font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-background-dark hover:bg-primary-hover hover:brightness-110 shadow-[0_0_20px_rgba(0,194,186,0.3)] border border-transparent",
    secondary: "bg-background-surface text-white hover:bg-zinc-700 border border-zinc-700",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary-dim",
    ghost: "bg-transparent text-text-muted hover:text-white hover:bg-white/5"
  };

  const sizes = "py-3 px-6 text-sm sm:text-base";
  const width = fullWidth ? "w-full" : "";

  return (
    <MotionButton
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes} ${width} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </MotionButton>
  );
};