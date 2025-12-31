import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, GraduationCap, Banknote, Calendar, CheckCircle, FileText, ExternalLink, X, Search, Heart } from 'lucide-react';
import { scholarshipData, Scholarship } from '../data/scholarshipData';

interface ScholarshipPageProps {
  onBack: () => void;
}

const ScholarshipPage: React.FC<ScholarshipPageProps> = ({ onBack }) => {
  const [incomeFilter, setIncomeFilter] = useState<number>(1000000); // Default high to show all
  const [marksFilter, setMarksFilter] = useState<number>(0); // Default 0 to show all
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Filter Logic
  const filteredScholarships = scholarshipData.filter(s => {
    return s.maxIncome >= incomeFilter && s.minPercentage <= marksFilter;
  });

  // Helper for Theme Styles
  const getThemeStyles = (theme: string) => {
    const styles: Record<string, string> = {
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      green: "bg-emerald-50 border-emerald-200 text-emerald-900",
      purple: "bg-purple-50 border-purple-200 text-purple-900",
      orange: "bg-orange-50 border-orange-200 text-orange-900",
    };
    return styles[theme] || styles.blue;
  };

  const getGradient = (theme: string) => {
     const styles: Record<string, string> = {
      blue: "from-blue-500 to-cyan-400",
      green: "from-emerald-500 to-teal-400",
      purple: "from-purple-500 to-indigo-400",
      orange: "from-orange-500 to-amber-400",
    };
    return styles[theme] || styles.blue;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold hidden sm:inline">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
              <span className="text-2xl">💎</span> Scholarship Hunt
            </h1>
          </div>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-20">
        
        {/* Intro Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Find Your <span className="text-teal-600">Golden Ticket</span> 🎫
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Don't let money stop your dreams. Tell us a little about you, and we'll show you the treasure hidden for you!
          </p>
        </div>

        {/* Filters Container - Designed to look like a control panel */}
        <div className="bg-white rounded-[24px] shadow-lg shadow-teal-900/5 border border-gray-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            
            {/* Income Filter */}
            <div className="w-full md:w-auto flex-1 max-w-xs">
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">
                Family Income (Yearly)
              </label>
              <div className="relative">
                <select 
                  value={incomeFilter}
                  onChange={(e) => setIncomeFilter(Number(e.target.value))}
                  className="w-full appearance-none bg-blue-50 border-2 border-blue-100 text-blue-900 font-bold rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                >
                  <option value={1000000}>Show All Incomes</option>
                  <option value={250000}>Less than ₹ 2.5 Lakh</option>
                  <option value={500000}>Less than ₹ 5 Lakh</option>
                  <option value={800000}>Less than ₹ 8 Lakh</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                  <Filter className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Marks Filter */}
            <div className="w-full md:w-auto flex-1 max-w-xs">
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">
                Your Last Exam Marks
              </label>
              <div className="relative">
                <select 
                  value={marksFilter}
                  onChange={(e) => setMarksFilter(Number(e.target.value))}
                  className="w-full appearance-none bg-emerald-50 border-2 border-emerald-100 text-emerald-900 font-bold rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all cursor-pointer"
                >
                  <option value={0}>Show All Marks</option>
                  <option value={50}>More than 50%</option>
                  <option value={60}>More than 60%</option>
                  <option value={75}>More than 75%</option>
                  <option value={90}>More than 90%</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Results Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                key={scholarship.id}
                onClick={() => setSelectedScholarship(scholarship)}
                className={`relative group cursor-pointer bg-white rounded-[24px] border-2 border-transparent hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full`}
              >
                {/* Decorative Top Bar */}
                <div className={`h-3 w-full bg-gradient-to-r ${getGradient(scholarship.theme)}`} />
                
                <div className="p-6 flex flex-col h-full">
                  {/* Provider & Tag */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {scholarship.provider}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${getThemeStyles(scholarship.theme)}`}>
                      {scholarship.tags[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-gray-800 mb-4 leading-tight group-hover:text-teal-700 transition-colors">
                    {scholarship.name}
                  </h3>

                  {/* Amount - Big Highlight */}
                  <div className="mt-auto mb-6 bg-green-50 rounded-xl p-3 border border-green-100 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-green-600 uppercase">Amount</p>
                       <p className="text-lg font-black text-green-700">{scholarship.amount}</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center text-gray-500 font-medium text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Deadline: <span className="text-gray-900 font-bold ml-1">{scholarship.deadline}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="w-10 h-10 text-gray-400" />
             </div>
             <h3 className="text-xl font-bold text-gray-700 mb-2">No scholarships found</h3>
             <p className="text-gray-500">Try changing the filters to see more results.</p>
          </div>
        )}
      </main>

      {/* Detail Popup Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScholarship(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={selectedScholarship.id}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
               {/* Modal Header */}
               <div className={`relative p-8 bg-gradient-to-br ${getGradient(selectedScholarship.theme)} text-white`}>
                 <button 
                   onClick={() => setSelectedScholarship(null)}
                   className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>

                 <div className="bg-white/20 w-fit px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-md mb-4 border border-white/20 shadow-sm">
                    {selectedScholarship.provider}
                 </div>
                 
                 <h2 className="text-3xl font-extrabold mb-2">{selectedScholarship.name}</h2>
                 <p className="opacity-90 font-medium text-lg flex items-center gap-2">
                   <Banknote className="w-5 h-5" /> {selectedScholarship.amount}
                 </p>
               </div>

               {/* Modal Body */}
               <div className="p-8 space-y-8">
                 
                 {/* Eligibility */}
                 <div>
                   <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <CheckCircle className="w-5 h-5 mr-2 text-teal-600" />
                     Who can apply?
                   </h4>
                   <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed font-medium">
                     {selectedScholarship.eligibilityShort}
                   </p>
                 </div>

                 {/* Documents */}
                 <div>
                   <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                     <FileText className="w-5 h-5 mr-2 text-teal-600" />
                     Documents Needed
                   </h4>
                   <div className="grid grid-cols-2 gap-3">
                     {selectedScholarship.documents.map((doc, idx) => (
                       <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-teal-200 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600">
                            {idx % 2 === 0 ? <FileText size={14} /> : <CheckCircle size={14} />}
                         </div>
                         <span className="text-xs font-bold text-gray-700 leading-tight">{doc}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Apply Button */}
                 <button 
                   className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-700/30 flex items-center justify-center transform active:scale-95 transition-all"
                   onClick={() => alert("Redirecting to official scholarship portal...")}
                 >
                   Apply Now
                   <ExternalLink className="w-5 h-5 ml-2" />
                 </button>

               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ScholarshipPage;