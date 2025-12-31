import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, GraduationCap, Briefcase, Star, MapPin, Heart } from 'lucide-react';
import { CareerRole } from '../data/careerData';

interface CareerModalProps {
  role: CareerRole | null;
  onClose: () => void;
  colorTheme: string; // e.g., 'teal', 'sky', 'orange'
}

const CareerModal: React.FC<CareerModalProps> = ({ role, onClose, colorTheme }) => {
  if (!role) return null;

  // Helper to map color theme to specific Tailwind classes for the modal elements
  const getColorClasses = (theme: string) => {
    const colors: Record<string, { bg: string, text: string, lightBg: string, border: string }> = {
      teal: { bg: 'bg-teal-600', text: 'text-teal-700', lightBg: 'bg-teal-50', border: 'border-teal-200' },
      sky: { bg: 'bg-sky-600', text: 'text-sky-700', lightBg: 'bg-sky-50', border: 'border-sky-200' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-700', lightBg: 'bg-purple-50', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-700', lightBg: 'bg-yellow-50', border: 'border-yellow-200' },
      slate: { bg: 'bg-slate-600', text: 'text-slate-700', lightBg: 'bg-slate-50', border: 'border-slate-200' },
    };
    return colors[theme] || colors.teal;
  };

  const themeClasses = getColorClasses(colorTheme);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl scrollbar-hide"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 1. Modal Header (Identity) */}
          <div className="flex flex-col items-center pt-10 pb-6 px-6 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${themeClasses.bg} text-white shadow-lg mb-4`}>
              <role.icon className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{role.title}</h2>
            <p className="text-gray-600 font-medium max-w-md leading-relaxed">
              {role.description}
            </p>
          </div>

          <div className="px-6 pb-10 space-y-8">
            
            {/* 2. Section A: "Is this for you?" (Personality Check) */}
            <div className="bg-[#FFF9C4] rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 fill-yellow-600 text-yellow-600" />
                Is this for you?
              </h3>
              <div className="space-y-3">
                {role.personalityQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-start bg-white/60 p-3 rounded-xl">
                    <span className="font-bold text-yellow-600 mr-3 text-lg">{idx + 1}.</span>
                    <span className="text-gray-800 font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Section B: The Roadmap (Education Path) */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className={`w-6 h-6 mr-2 ${themeClasses.text}`} />
                The Roadmap
              </h3>
              
              <div className="relative pl-4 ml-2 border-l-2 border-dashed border-gray-300 space-y-8">
                {/* Step 1 */}
                <div className="relative">
                  <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-white ${themeClasses.bg} shadow-sm`} />
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${themeClasses.text}`}>Step 1: School</span>
                    <p className="font-bold text-gray-800">{role.roadmap.school}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-white ${themeClasses.bg} shadow-sm`} />
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${themeClasses.text}`}>Step 2: College</span>
                    <p className="font-bold text-gray-800">{role.roadmap.college}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-white ${themeClasses.bg} shadow-sm`} />
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${themeClasses.text}`}>Step 3: Next Steps</span>
                    <p className="font-bold text-gray-800">{role.roadmap.next}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Section C: Info Widgets (The Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Widget 1: Top Skills */}
              <div className={`rounded-2xl p-5 ${themeClasses.lightBg} border ${themeClasses.border}`}>
                <h4 className={`font-bold mb-3 flex items-center ${themeClasses.text}`}>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Top Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.topSkills.map((skill, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 2: Soft Skills */}
              <div className={`rounded-2xl p-5 ${themeClasses.lightBg} border ${themeClasses.border}`}>
                <h4 className={`font-bold mb-3 flex items-center ${themeClasses.text}`}>
                  <Heart className="w-5 h-5 mr-2" />
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.softSkills.map((skill, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 3: Related Roles */}
              <div className="rounded-2xl p-5 bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                  Related Roles
                </h4>
                <p className="text-gray-600 font-medium">
                  {role.relatedRoles.join(', ')}
                </p>
              </div>

              {/* Widget 4: Future Demand */}
              <div className="rounded-2xl p-5 bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-gray-500" />
                  Future Demand
                </h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-6 h-6 ${star <= role.demand ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-500">High Demand</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CareerModal;