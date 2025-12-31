import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { careerCategories, CareerCategory, CareerRole, findRoleByTitle } from '../data/careerData';
import CareerDetailPage from './CareerDetailPage';

interface ExplorePageProps {
  onBack: () => void;
  initialRoleTitle?: string | null;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onBack, initialRoleTitle }) => {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('teal');

  // Handle auto-selection if initialRoleTitle is provided
  useEffect(() => {
    if (initialRoleTitle) {
      const result = findRoleByTitle(initialRoleTitle);
      if (result) {
        setSelectedRole(result.role);
        setSelectedTheme(result.theme);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [initialRoleTitle]);

  const handleRoleClick = (role: CareerRole, theme: string) => {
    // Scroll to top when entering detail view
    window.scrollTo({ top: 0, behavior: 'auto' });
    setSelectedTheme(theme);
    setSelectedRole(role);
  };

  const clearSelection = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setSelectedRole(null);
  }

  // If a role is selected, show the detail page instead of the grid
  if (selectedRole) {
    return (
      <CareerDetailPage 
        role={selectedRole} 
        colorTheme={selectedTheme} 
        onBack={clearSelection}
        onHome={onBack}
      />
    );
  }

  // Helper for Theme Styles
  const getCategoryStyles = (theme: string) => {
    const styles: Record<string, any> = {
      teal: { border: 'border-teal-200', bg: 'bg-teal-50', icon: 'text-teal-600', headerBg: 'bg-teal-100', hover: 'hover:bg-teal-100' },
      sky: { border: 'border-sky-200', bg: 'bg-sky-50', icon: 'text-sky-600', headerBg: 'bg-sky-100', hover: 'hover:bg-sky-100' },
      purple: { border: 'border-purple-200', bg: 'bg-purple-50', icon: 'text-purple-600', headerBg: 'bg-purple-100', hover: 'hover:bg-purple-100' },
      orange: { border: 'border-orange-200', bg: 'bg-orange-50', icon: 'text-orange-600', headerBg: 'bg-orange-100', hover: 'hover:bg-orange-100' },
      yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', icon: 'text-yellow-600', headerBg: 'bg-yellow-100', hover: 'hover:bg-yellow-100' },
      slate: { border: 'border-slate-200', bg: 'bg-slate-50', icon: 'text-slate-600', headerBg: 'bg-slate-100', hover: 'hover:bg-slate-100' },
    };
    return styles[theme] || styles.teal;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-teal-950">Explore Careers</h1>
            <p className="text-xs text-gray-500 font-medium">Find your dream job</p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerCategories.map((category) => {
            const style = getCategoryStyles(category.theme);
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col rounded-[24px] border-2 ${style.border} overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
              >
                {/* Card Header (Folder Tab Look) */}
                <div className={`px-6 py-5 flex items-center justify-between ${style.headerBg}`}>
                  <div className="flex items-center gap-3">
                    <div className={`bg-white p-2 rounded-xl shadow-sm ${style.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-gray-800">{category.title}</h3>
                      <span className="text-xs font-bold uppercase tracking-wide opacity-60 text-gray-700">
                        {category.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body (List of Roles) */}
                <div className={`p-4 flex-grow ${style.bg}`}>
                  <div className="space-y-2">
                    {category.roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleClick(role, category.theme)}
                        className={`w-full text-left px-4 py-3 rounded-xl bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group`}
                      >
                        <span className="font-bold text-gray-700 group-hover:text-gray-900">
                          {role.title}
                        </span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${style.headerBg} opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <ChevronRight className={`w-4 h-4 ${style.icon}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;