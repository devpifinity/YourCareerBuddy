import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, RefreshCcw, Star, ExternalLink } from 'lucide-react';
import { ResultProfile } from '../data/quizData';

interface ResultsPageProps {
  result: ResultProfile;
  onRetake: () => void;
  onHome: () => void;
  onCareerClick: (careerTitle: string) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onRetake, onHome, onCareerClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden"
        >
          {/* Header / Hero Section of Card */}
          <div className={`relative px-8 py-12 text-center bg-gradient-to-br ${result.theme}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10 mx-auto w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white/30"
            >
              <Star className="w-12 h-12 text-white" fill="currentColor" />
            </motion.div>

            <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {result.title}
            </h1>
            <p className="relative z-10 text-white/90 font-medium text-lg uppercase tracking-widest">
              Your Career Personality
            </p>
          </div>

          {/* Content Body */}
          <div className="px-8 py-10 sm:px-12">
            
            {/* Personality Description */}
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who are you?</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {result.personality}
              </p>
            </div>

            {/* Recommended Careers */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <span className="w-8 h-1 bg-gray-200 rounded-full mr-4"></span>
                Recommended Careers
                <span className="w-8 h-1 bg-gray-200 rounded-full ml-4"></span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.careers.map((career, idx) => (
                  <motion.button 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    onClick={() => onCareerClick(career)}
                    className="group w-full flex items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br ${result.theme} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      <span className="font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="flex-grow font-bold text-gray-800 text-lg group-hover:text-gray-900">{career}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onHome}
                className="flex items-center justify-center px-8 py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Back Home
              </button>
              <button 
                onClick={onRetake}
                className={`flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-gray-400/30 bg-gradient-to-r ${result.theme} hover:opacity-90 transition-opacity transform active:scale-95`}
              >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Retake Quiz
              </button>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResultsPage;