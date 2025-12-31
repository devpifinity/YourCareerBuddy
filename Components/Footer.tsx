import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-gray-500 font-medium text-sm sm:text-base">
          YourCareerBuddy © 2025. Made for the students of India.
          <span className="hidden sm:inline-flex items-center ml-2 text-blue-600">
             <Heart className="w-4 h-4 mx-1 fill-current" />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;