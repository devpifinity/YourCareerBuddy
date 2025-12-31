import React, { useState, useEffect } from 'react';
import { Sparkles, Search, GraduationCap, PartyPopper } from 'lucide-react';
import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import ExplorePage from './components/ExplorePage';
import ComingSoonPage from './components/ComingSoonPage';
import ScholarshipPage from './components/ScholarshipPage';
import ChatWidget from './components/ChatWidget'; 
import { resultProfiles, ResultProfile } from './data/quizData';
import { findRoleByTitle } from './data/careerData';
import { Language, translations } from './data/translations';

type ViewState = 'home' | 'quiz' | 'results' | 'explore' | 'coming-soon' | 'scholarships';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Initialize from session storage if available
  const [quizResult, setQuizResult] = useState<ResultProfile | null>(() => {
    try {
      const saved = sessionStorage.getItem('careerQuizResult');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State to handle deep linking into Explore page (specific role)
  const [exploreInitialRole, setExploreInitialRole] = useState<string | null>(null);
  const [comingSoonTitle, setComingSoonTitle] = useState<string>('');

  const t = translations[currentLang];

  const handleQuizFinish = (resultId: string) => {
    // Look up the profile from the ID string, fallback to mixed if not found (safety)
    const profile = resultProfiles[resultId] || resultProfiles['MIXED'];
    setQuizResult(profile);
    // Save to session storage
    sessionStorage.setItem('careerQuizResult', JSON.stringify(profile));
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    setCurrentView('quiz');
  };

  const handleCareerClick = (careerTitle: string) => {
    // Check if we have data for this career
    const exists = findRoleByTitle(careerTitle);
    if (exists) {
       setExploreInitialRole(careerTitle);
       setCurrentView('explore');
    } else {
       setComingSoonTitle(careerTitle);
       setCurrentView('coming-soon');
    }
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setExploreInitialRole(null);
  };

  // Render logic variable to keep return statement clean
  let content;

  // If user is in Quiz Mode, show the QuizPage
  if (currentView === 'quiz') {
    content = (
      <QuizPage 
        onExit={handleHomeClick} 
        onFinish={handleQuizFinish} 
        lang={currentLang}
      />
    );
  }
  // Show Results View
  else if (currentView === 'results' && quizResult) {
     content = (
       <ResultsPage 
         result={quizResult} 
         onRetake={handleRetakeQuiz}
         onHome={handleHomeClick}
         onCareerClick={handleCareerClick}
       />
     );
  }
  // Show Explore Careers View
  else if (currentView === 'explore') {
    content = (
      <ExplorePage 
        onBack={handleHomeClick}
        initialRoleTitle={exploreInitialRole}
      />
    );
  }
  // Show Scholarship Finder
  else if (currentView === 'scholarships') {
    content = (
      <ScholarshipPage onBack={handleHomeClick} />
    );
  }
  // Show Coming Soon View
  else if (currentView === 'coming-soon') {
    content = (
      <ComingSoonPage 
        careerTitle={comingSoonTitle}
        onBack={() => {
           // If we have a result, go back to results, otherwise home
           if (quizResult && comingSoonTitle !== "Scholarships & Financial Aid") {
             setCurrentView('results');
           } else {
             handleHomeClick();
           }
        }} 
        onExplore={() => {
           setExploreInitialRole(null);
           setCurrentView('explore');
        }}
        onHome={handleHomeClick}
      />
    );
  }
  // Default Home View
  else {
    content = (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col font-sans text-gray-900">
        <Header currentLang={currentLang} onLangChange={setCurrentLang} />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative px-4 pt-12 pb-10 sm:px-6 lg:px-8 lg:pt-20 lg:pb-14 text-center max-w-5xl mx-auto">
            {/* Decorative background blobs - Updated from Teal to Sky/Blue */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 -z-10" />

            {/* Adjusted typography: Dream Big is dominant, second line is smaller/shorter */}
            <h1 className="font-extrabold text-blue-950 tracking-tight leading-tight mb-6">
              <span className="block text-4xl sm:text-6xl mb-1">
                {t.heroTitle}
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-blue-700 mt-2 relative inline-block">
                {t.heroSubtitle}
                {/* Underline decoration */}
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-yellow-400 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed font-medium">
              {t.heroDesc}
            </p>
          </section>

          {/* The 3 Main Widgets Grid */}
          <section className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Card 1: The Quiz (Dynamic based on state) */}
              {quizResult ? (
                <FeatureCard
                  theme="green"
                  eyebrow="Your Result is Ready!"
                  heading="View Result"
                  description={`You matched as a ${quizResult.title}. Click to see your recommended careers again.`}
                  buttonText="See My Result"
                  Icon={PartyPopper}
                  onClick={() => setCurrentView('results')}
                />
              ) : (
                <FeatureCard
                  theme="green"
                  eyebrow={t.cardQuizEyebrow}
                  heading={t.cardQuizTitle}
                  description={t.cardQuizDesc}
                  buttonText={t.cardQuizBtn}
                  Icon={Sparkles}
                  onClick={() => setCurrentView('quiz')}
                />
              )}

              {/* Card 2: The Directory */}
              <FeatureCard
                theme="blue"
                eyebrow={t.cardExploreEyebrow}
                heading={t.cardExploreTitle}
                description={t.cardExploreDesc}
                buttonText={t.cardExploreBtn}
                Icon={Search}
                onClick={() => {
                  setExploreInitialRole(null);
                  setCurrentView('explore');
                }}
              />

              {/* Card 3: Financial Aid */}
              <FeatureCard
                theme="yellow"
                eyebrow={t.cardMoneyEyebrow}
                heading={t.cardMoneyTitle}
                description={t.cardMoneyDesc}
                buttonText={t.cardMoneyBtn}
                Icon={GraduationCap}
                onClick={() => {
                  setCurrentView('scholarships');
                }}
              />

            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <>
      {content}
      <ChatWidget quizResult={quizResult} lang={currentLang} />
    </>
  );
};

export default App;