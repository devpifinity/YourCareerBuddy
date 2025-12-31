import React from 'react';
import { Languages } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { Language, translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange }) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          
          {/* Branding */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            
            {/* Language Selector */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl cursor-pointer transition-colors">
                 <Languages className="w-5 h-5 text-blue-700" />
                 <select 
                  value={currentLang}
                  onChange={(e) => onLangChange(e.target.value as Language)}
                  className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer appearance-none pr-4"
                 >
                   <option value="en">English</option>
                   <option value="hi">हिंदी (Hinglish)</option>
                   <option value="kn">ಕನ್ನಡ (Kanglish)</option>
                 </select>
              </div>
            </div>

            <div className="hidden sm:block">
              <Button variant="pill">
                {t.login}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;