import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Updated to Blue theme
    primary: "bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-700/30 rounded-xl px-6 py-3",
    secondary: "bg-white hover:bg-gray-50 text-blue-900 border border-gray-200 shadow-sm rounded-xl px-6 py-3",
    outline: "border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded-xl px-6 py-3",
    pill: "bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-2.5 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;