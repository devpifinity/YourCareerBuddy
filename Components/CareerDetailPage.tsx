import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, CheckCircle2, GraduationCap, Briefcase, Star, MapPin, Heart } from 'lucide-react';
import { CareerRole } from '../data/careerData';

interface CareerDetailPageProps {
  role: CareerRole;
  onBack: () => void;
  onHome: () => void;
  colorTheme: string; // e.g., 'teal', 'sky', 'orange'
}

const CareerDetailPage: React.FC<CareerDetailPageProps> = ({ role, onBack, onHome, colorTheme }) => {
  // Helper to map color theme to specific Tailwind classes
  const getColorClasses = (theme: string) => {
    const colors: Record<string, { bg: string, text: string, lightBg: string, border: string, headerGradient: string }> = {
      teal: { bg: 'bg-teal-600', text: 'text-teal-700', lightBg: 'bg-teal-50', border: 'border-teal-200', headerGradient: 'from-teal-50 to-white' },
      sky: { bg: 'bg-sky-600', text: 'text-sky-700', lightBg: 'bg-sky-50', border: 'border-sky-200', headerGradient: 'from-sky-50 to-white' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-700', lightBg: 'bg-purple-50', border: 'border-purple-200', headerGradient: 'from-purple-50 to-white' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200', headerGradient: 'from-orange-50 to-white' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-700', lightBg: 'bg-yellow-50', border: 'border-yellow-200', headerGradient: 'from-yellow-50 to-white' },
      slate: { bg: 'bg-slate-600', text: 'text-slate-700', lightBg: 'bg-slate-50', border: 'border-slate-200', headerGradient: 'from-slate-50 to-white' },
    };
    return colors[theme] || colors.teal;
  };

  const themeClasses = getColorClasses(colorTheme);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <button 
             onClick={onBack}
             className="group flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95"
           >
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             <span className="font-bold text-sm">Back to Explore</span>
           </button>
           
           <button 
             onClick={onHome}
             className="flex items-center gap-2 px-4 py-2 rounded-full text-teal-700 hover:bg-teal-50 hover:text-teal-800 transition-all active:scale-95"
           >
             <Home className="w-5 h-5" />
             <span className="font-bold text-sm">Home</span>
           </button>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
        >
          {/* Header Section */}
          <div className={`bg-gradient-to-b ${themeClasses.headerGradient} pt-12 pb-10 px-6 text-center`}>
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               type="spring"
               className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${themeClasses.bg} text-white shadow-xl shadow-${colorTheme}-500/20 mb-6`}
             >
               <role.icon className="w-12 h-12" />
             </motion.div>
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
               {role.title}
             </h1>
             <p className="text-gray-600 font-medium text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
               {role.description}
             </p>
          </div>

          <div className="px-6 sm:px-10 pb-12 space-y-10">
            
            {/* Section A: Is this for you? */}
            <div className="bg-yellow-50 rounded-3xl p-6 sm:p-8 border border-yellow-100 relative overflow-hidden">
               {/* Decoration */}
               <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-yellow-100 rounded-full blur-2xl opacity-50"></div>

               <h3 className="relative text-xl font-extrabold text-yellow-900 mb-6 flex items-center">
                 <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                    <Star className="w-6 h-6 fill-yellow-500 text-yellow-600" />
                 </div>
                 Is this for you?
               </h3>
               <div className="relative space-y-4">
                 {role.personalityQuestions.map((q, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.1 * idx }}
                     className="flex items-start bg-white p-4 rounded-2xl shadow-sm border border-yellow-100/50"
                   >
                     <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold rounded-full mr-4 text-sm">
                       {idx + 1}
                     </span>
                     <span className="text-gray-800 font-semibold text-lg">{q}</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* Section B: The Roadmap */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${themeClasses.lightBg}`}>
                  <MapPin className={`w-6 h-6 ${themeClasses.text}`} />
                </div>
                The Roadmap
              </h3>
              
              <div className="relative pl-6 ml-4 border-l-2 border-dashed border-gray-200 space-y-10 pb-2">
                {/* Step 1 */}
                <div className="relative group">
                  <div className={`absolute -left-[33px] w-6 h-6 rounded-full border-4 border-white ${themeClasses.bg} shadow-md group-hover:scale-110 transition-transform`} />
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.lightBg} ${themeClasses.text}`}>Step 1: School</span>
                    <p className="font-bold text-gray-800 text-lg">{role.roadmap.school}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className={`absolute -left-[33px] w-6 h-6 rounded-full border-4 border-white ${themeClasses.bg} shadow-md group-hover:scale-110 transition-transform`} />
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.lightBg} ${themeClasses.text}`}>Step 2: College</span>
                    <p className="font-bold text-gray-800 text-lg">{role.roadmap.college}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className={`absolute -left-[33px] w-6 h-6 rounded-full border-4 border-white ${themeClasses.bg} shadow-md group-hover:scale-110 transition-transform`} />
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.lightBg} ${themeClasses.text}`}>Step 3: Next Steps</span>
                    <p className="font-bold text-gray-800 text-lg">{role.roadmap.next}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C: Info Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Widget 1: Top Skills */}
              <div className={`rounded-3xl p-6 ${themeClasses.lightBg} border ${themeClasses.border} flex flex-col`}>
                <h4 className={`font-bold text-xl mb-4 flex items-center ${themeClasses.text}`}>
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  Top Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.topSkills.map((skill, i) => (
                    <span key={i} className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-700 shadow-sm border border-gray-100/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 2: Soft Skills */}
              <div className={`rounded-3xl p-6 ${themeClasses.lightBg} border ${themeClasses.border} flex flex-col`}>
                <h4 className={`font-bold text-xl mb-4 flex items-center ${themeClasses.text}`}>
                  <Heart className="w-6 h-6 mr-2" />
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.softSkills.map((skill, i) => (
                    <span key={i} className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-700 shadow-sm border border-gray-100/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 3: Related Roles */}
              <div className="rounded-3xl p-6 bg-white border border-gray-200 shadow-sm">
                <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                  <div className="bg-gray-100 p-1.5 rounded-lg mr-2">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </div>
                  Related Roles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.relatedRoles.map((r, i) => (
                      <span key={i} className="text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        {r}
                      </span>
                  ))}
                </div>
              </div>

              {/* Widget 4: Future Demand */}
              <div className="rounded-3xl p-6 bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
                <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                  <div className="bg-gray-100 p-1.5 rounded-lg mr-2">
                     <GraduationCap className="w-5 h-5 text-gray-600" />
                  </div>
                  Future Demand
                </h4>
                <div className="flex items-center space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-8 h-8 ${star <= role.demand ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">High Demand</span>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CareerDetailPage;