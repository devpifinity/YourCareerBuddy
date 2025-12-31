import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  eyebrow, 
  heading, 
  description, 
  buttonText, 
  Icon, 
  theme,
  onClick
}) => {
  // Theme configuration maps
  const themeStyles = {
    green: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      eyebrow: 'text-emerald-800 bg-emerald-100/60',
      button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 text-white',
    },
    blue: {
      bg: 'bg-sky-50',
      border: 'border-sky-100',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-700',
      eyebrow: 'text-sky-800 bg-sky-100/60',
      button: 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20 text-white',
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      eyebrow: 'text-amber-800 bg-amber-100/60',
      button: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white',
    }
  };

  const styles = themeStyles[theme];

  return (
    <div className={`
      relative group flex flex-col h-full p-8 rounded-[32px] border-2 
      transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
      ${styles.bg} ${styles.border} shadow-sm
    `}>
      {/* Eyebrow / Tag */}
      <div className={`
        inline-flex items-center self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6
        ${styles.eyebrow}
      `}>
        {eyebrow}
      </div>

      {/* Header Section with Icon */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {heading}
        </h3>
        <div className={`
          flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center
          ${styles.iconBg}
        `}>
          <Icon className={`w-8 h-8 ${styles.iconColor}`} />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow font-medium">
        {description}
      </p>

      {/* Action Button */}
      <button 
        onClick={onClick}
        className={`
        mt-auto inline-flex items-center justify-center w-full py-4 px-6 rounded-2xl font-bold text-lg
        transition-all duration-200 transform active:scale-95 shadow-lg
        ${styles.button}
      `}>
        {buttonText}
        <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
};

export default FeatureCard;