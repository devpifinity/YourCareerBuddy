import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestions, ResultType } from '../data/quizData';
import { Language, translations } from '../data/translations';

interface QuizPageProps {
  onExit: () => void;
  onFinish: (resultId: string) => void;
  lang: Language;
}

const QuizPage: React.FC<QuizPageProps> = ({ onExit, onFinish, lang }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({
    'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0
  });

  const t = translations[lang];
  const questions = getQuestions(lang);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionClick = (index: number, type: ResultType) => {
    setSelectedOption(index);
    
    // Update score
    setScores(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    
    // Delay to show selected state before moving next
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCalculating(true);
      }
    }, 400);
  };

  const calculateResult = () => {
    let maxScore = -1;
    let winners: string[] = [];

    Object.entries(scores).forEach(([type, score]) => {
      const currentScore = score as number;
      if (currentScore > maxScore) {
        maxScore = currentScore;
        winners = [type];
      } else if (currentScore === maxScore) {
        winners.push(type);
      }
    });

    // If tie, return MIXED, else return the winner
    if (winners.length > 1) {
      return 'MIXED';
    }
    return winners[0];
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      onExit();
    }
  };

  // Logic for the calculation screen mock timer
  useEffect(() => {
    if (isCalculating) {
      const timer = setTimeout(() => {
        const resultId = calculateResult();
        onFinish(resultId);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCalculating, onFinish, scores]);

  if (isCalculating) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-teal-400 rounded-full flex items-center justify-center shadow-xl mb-8"
            >
               <Compass className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 text-center mb-4">
              {t.analyzing}
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              {t.analyzingSub}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col max-w-2xl mx-auto w-full">
      {/* Header */}
      <header className="px-4 py-6 flex items-center justify-between gap-4">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-xs mx-auto">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
            <span>{t.questionLabel} {currentQuestionIndex + 1}</span>
            <span>{totalQuestions} {t.totalLabel}</span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <button 
          onClick={onExit}
          className="px-3 py-1 rounded-full text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          {t.exitBtn}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center px-4 py-4 sm:px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {/* Question Card */}
            <div className="bg-white rounded-[24px] shadow-xl shadow-teal-900/5 border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 leading-tight mb-8 text-center">
                  {currentQuestion.question}
                </h2>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx, option.type)}
                        disabled={selectedOption !== null}
                        className={`
                          relative group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200
                          ${isSelected 
                            ? 'bg-teal-50 border-teal-500 shadow-inner scale-95' 
                            : 'bg-white border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 hover:-translate-y-1 hover:shadow-md'
                          }
                        `}
                      >
                        <span className="text-4xl sm:text-5xl mb-3 filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110">
                          {option.emoji}
                        </span>
                        <span className={`
                          font-bold text-sm sm:text-base text-center leading-snug
                          ${isSelected ? 'text-teal-800' : 'text-gray-700'}
                        `}>
                          {option.text}
                        </span>
                        
                        {/* Checkmark indicator for selected state */}
                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 text-teal-500"
                          >
                            <Sparkles className="w-5 h-5 fill-current" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuizPage;