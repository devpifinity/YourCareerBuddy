import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Logo Image */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
        <img 
          src="/logo.png" 
          alt="YourCareerBuddy Logo" 
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
      
      {/* Brand Text with matching logo colors */}
      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">
        <span className="text-blue-900">Your</span>
        <span className="text-sky-500">Career</span>
        <span className="text-amber-500">Buddy</span>
      </span>
    </div>
  );
};

export default Logo;