import React from 'react';
import { ArrowLeft, Construction, Search, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComingSoonPageProps {
  careerTitle: string;
  onBack: () => void;
  onExplore: () => void;
  onHome: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ careerTitle, onBack, onExplore, onHome }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <button 
             onClick={onBack}
             className="group flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95"
           >
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             <span className="font-bold text-sm">Back</span>
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

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white p-8 sm:p-12 rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 max-w-lg w-full relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400" />
          
          <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-100 shadow-inner">
            <Construction className="w-10 h-10 text-yellow-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Coming Soon!
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We are currently building the comprehensive guide for <br/>
            <span className="font-bold text-teal-700 text-xl block mt-2">{careerTitle}</span>
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={onExplore}
              className="w-full py-3.5 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Other Careers
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ComingSoonPage;