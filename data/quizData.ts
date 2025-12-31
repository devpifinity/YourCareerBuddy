import { Language } from './translations';

export type ResultType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Option {
  emoji: string;
  text: string;
  type: ResultType;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface ResultProfile {
  id: string; // 'A', 'B', 'C', 'D', 'E', 'F', 'MIXED'
  title: string;
  theme: string; // Tailwind class string for gradient
  personality: string;
  careers: string[];
}

// Store questions for each language
const localizedQuestions: Record<Language, Question[]> = {
  en: [
    {
      id: 1,
      question: "What do you like doing most?",
      options: [
        { emoji: "📱", text: "Playing on computer or mobile phone", type: 'A' },
        { emoji: "🩹", text: "Taking care of sick people or animals", type: 'B' },
        { emoji: "💰", text: "Counting money or helping in shops", type: 'C' },
        { emoji: "🗣️", text: "Teaching friends or helping them solve problems", type: 'D' },
        { emoji: "🎨", text: "Drawing, singing, or making videos", type: 'E' },
        { emoji: "🔧", text: "Fixing broken things or building something", type: 'F' },
      ]
    },
    {
      id: 2,
      question: "What are you really good at?",
      options: [
        { emoji: "🧩", text: "Using computers and solving puzzles", type: 'A' },
        { emoji: "❤️", text: "Helping others feel better", type: 'B' },
        { emoji: "📋", text: "Organizing things and planning", type: 'C' },
        { emoji: "🤝", text: "Talking to people and making friends", type: 'D' },
        { emoji: "🖌️", text: "Creating beautiful or fun things", type: 'E' },
        { emoji: "🔨", text: "Working with hands and tools", type: 'F' },
      ]
    },
    {
      id: 3,
      question: "Which subject do you enjoy most in school?",
      options: [
        { emoji: "🔢", text: "Maths, Science, or Computer", type: 'A' },
        { emoji: "🧬", text: "Biology or Health Education", type: 'B' },
        { emoji: "📊", text: "Commerce or Business Studies", type: 'C' },
        { emoji: "📖", text: "Hindi, English, or Social Studies", type: 'D' },
        { emoji: "🎭", text: "Art, Music, or Drama", type: 'E' },
        { emoji: "🏃", text: "Workshop or Physical Education", type: 'F' },
      ]
    },
    {
      id: 4,
      question: "Where would you like to work?",
      options: [
        { emoji: "🏢", text: "Office with computers", type: 'A' },
        { emoji: "🏥", text: "Hospital or clinic", type: 'B' },
        { emoji: "🏦", text: "Bank or business office", type: 'C' },
        { emoji: "🏫", text: "School or government office", type: 'D' },
        { emoji: "🖼️", text: "TV studio or art gallery", type: 'E' },
        { emoji: "🏗️", text: "Factory or construction site", type: 'F' },
      ]
    },
    {
      id: 5,
      question: "What makes you most happy?",
      options: [
        { emoji: "💡", text: "Solving difficult problems", type: 'A' },
        { emoji: "🩺", text: "Helping sick people get better", type: 'B' },
        { emoji: "💵", text: "Earning and saving money", type: 'C' },
        { emoji: "🎓", text: "Teaching something to others", type: 'D' },
        { emoji: "🎨", text: "Making something beautiful", type: 'E' },
        { emoji: "🛠️", text: "Building something useful", type: 'F' },
      ]
    }
  ],
  hi: [
    {
      id: 1,
      question: "Tumhe sabse zyada kya karna pasand hai?",
      options: [
        { emoji: "📱", text: "Computer ya mobile par khelna", type: 'A' },
        { emoji: "🩹", text: "Bimaar logon ya janwaron ka khayal rakhna", type: 'B' },
        { emoji: "💰", text: "Paise ginna ya dukaan mein madad karna", type: 'C' },
        { emoji: "🗣️", text: "Doston ko sikhana ya unki help karna", type: 'D' },
        { emoji: "🎨", text: "Drawing, gaana ya video banana", type: 'E' },
        { emoji: "🔧", text: "Tooti cheezein jodna ya kuch banana", type: 'F' },
      ]
    },
    {
      id: 2,
      question: "Tum kis cheez mein best ho?",
      options: [
        { emoji: "🧩", text: "Computers aur puzzles solve karna", type: 'A' },
        { emoji: "❤️", text: "Dusron ki tabiyat theek karna", type: 'B' },
        { emoji: "📋", text: "Planning aur cheezein organize karna", type: 'C' },
        { emoji: "🤝", text: "Logon se baat karna aur dost banana", type: 'D' },
        { emoji: "🖌️", text: "Sundar ya creative cheezein banana", type: 'E' },
        { emoji: "🔨", text: "Auzaar (Tools) se kaam karna", type: 'F' },
      ]
    },
    {
      id: 3,
      question: "School mein kaunsa subject favorite hai?",
      options: [
        { emoji: "🔢", text: "Maths, Science, ya Computer", type: 'A' },
        { emoji: "🧬", text: "Biology ya Health", type: 'B' },
        { emoji: "📊", text: "Commerce ya Business", type: 'C' },
        { emoji: "📖", text: "Hindi, English, ya Social Studies", type: 'D' },
        { emoji: "🎭", text: "Art, Music, ya Drama", type: 'E' },
        { emoji: "🏃", text: "Workshop ya PT (Sports)", type: 'F' },
      ]
    },
    {
      id: 4,
      question: "Tum kahan kaam karna chahoge?",
      options: [
        { emoji: "🏢", text: "Office mein computer ke saath", type: 'A' },
        { emoji: "🏥", text: "Hospital ya Clinic mein", type: 'B' },
        { emoji: "🏦", text: "Bank ya Business office mein", type: 'C' },
        { emoji: "🏫", text: "School ya Sarkari office mein", type: 'D' },
        { emoji: "🖼️", text: "TV Studio ya Art gallery mein", type: 'E' },
        { emoji: "🏗️", text: "Factory ya Construction site pe", type: 'F' },
      ]
    },
    {
      id: 5,
      question: "Kis cheez se sabse zyada khushi milti hai?",
      options: [
        { emoji: "💡", text: "Mushkil problems solve karna", type: 'A' },
        { emoji: "🩺", text: "Bimaar logon ko theek karna", type: 'B' },
        { emoji: "💵", text: "Paise kamana aur bachana", type: 'C' },
        { emoji: "🎓", text: "Dusron ko kuch sikhana", type: 'D' },
        { emoji: "🎨", text: "Kuch sundar banana", type: 'E' },
        { emoji: "🛠️", text: "Apne haathon se kuch banana", type: 'F' },
      ]
    }
  ],
  kn: [
    {
      id: 1,
      question: "Nimge en madoke thumba ishta?",
      options: [
        { emoji: "📱", text: "Computer athva Mobile nalli play madodu", type: 'A' },
        { emoji: "🩹", text: "Husharillada jana athva pranigala seve madodu", type: 'B' },
        { emoji: "💰", text: "Hana count madodu athva shop nalli help madodu", type: 'C' },
        { emoji: "🗣️", text: "Friends ge paatha helikododu athva help madodu", type: 'D' },
        { emoji: "🎨", text: "Drawing, Haadu, athva Videos madodu", type: 'E' },
        { emoji: "🔧", text: "Halada vasthugalanna sari madodu", type: 'F' },
      ]
    },
    {
      id: 2,
      question: "Neev yavdralli Sakathagiddira?",
      options: [
        { emoji: "🧩", text: "Computers mathu puzzles solve madodu", type: 'A' },
        { emoji: "❤️", text: "Bereyavara arogya nodikollodu", type: 'B' },
        { emoji: "📋", text: "Plan madodu mathu Organize madodu", type: 'C' },
        { emoji: "🤝", text: "Janara jothe mathadodu mathu friends madodu", type: 'D' },
        { emoji: "🖌️", text: "Creative agi enadru madodu", type: 'E' },
        { emoji: "🔨", text: "Tools (Auzaar) jothe kelsa madodu", type: 'F' },
      ]
    },
    {
      id: 3,
      question: "School nalli yav subject favorite?",
      options: [
        { emoji: "🔢", text: "Maths, Science, athva Computer", type: 'A' },
        { emoji: "🧬", text: "Biology athva Health", type: 'B' },
        { emoji: "📊", text: "Commerce athva Business", type: 'C' },
        { emoji: "📖", text: "Kannada, English, athva Social Studies", type: 'D' },
        { emoji: "🎭", text: "Art, Music, athva Drama", type: 'E' },
        { emoji: "🏃", text: "Workshop athva Sports", type: 'F' },
      ]
    },
    {
      id: 4,
      question: "Elli kelsa madoke ishta padthira?",
      options: [
        { emoji: "🏢", text: "Office nalli computer jothe", type: 'A' },
        { emoji: "🏥", text: "Hospital athva Clinic nalli", type: 'B' },
        { emoji: "🏦", text: "Bank athva Business office nalli", type: 'C' },
        { emoji: "🏫", text: "School athva Govt office nalli", type: 'D' },
        { emoji: "🖼️", text: "TV Studio athva Art gallery nalli", type: 'E' },
        { emoji: "🏗️", text: "Factory athva Construction site nalli", type: 'F' },
      ]
    },
    {
      id: 5,
      question: "Nimge yavdrinda kushi siguthe?",
      options: [
        { emoji: "💡", text: "Kashtavada problems solve madodu", type: 'A' },
        { emoji: "🩺", text: "Husharillada janaranna gunamukha madodu", type: 'B' },
        { emoji: "💵", text: "Duddu sampadne madodu", type: 'C' },
        { emoji: "🎓", text: "Bereyavarige kalisodu", type: 'D' },
        { emoji: "🎨", text: "Andavada vasthu tayarisodu", type: 'E' },
        { emoji: "🛠️", text: "Upayuktha vasthu kattodu", type: 'F' },
      ]
    }
  ]
};

// Helper function to get questions
export const getQuestions = (lang: Language = 'en'): Question[] => {
  return localizedQuestions[lang] || localizedQuestions['en'];
};

export const resultProfiles: Record<string, ResultProfile> = {
  'A': {
    id: 'A',
    title: "Problem Solver & Tech Expert",
    theme: "from-blue-500 to-cyan-400",
    personality: "You have a logical mind that loves solving complex problems and working with technology.",
    careers: ["Software Engineer", "Data Scientist", "Web Developer", "Cyber Security"]
  },
  'B': {
    id: 'B',
    title: "Helper & Life Sciences Expert",
    theme: "from-emerald-500 to-green-400",
    personality: "You have a caring nature. You want to make the world healthier for people and animals.",
    careers: ["Doctor", "Nurse", "Veterinarian", "Pharmacist"]
  },
  'C': {
    id: 'C',
    title: "Business Leader & Strategic Thinker",
    theme: "from-orange-500 to-amber-400",
    personality: "You have strong business sense. You understand how to manage resources and make decisions.",
    careers: ["Manager", "Accountant (CA)", "Entrepreneur", "Financial Advisor"]
  },
  'D': {
    id: 'D',
    title: "People Person & Community Builder",
    theme: "from-purple-500 to-violet-400",
    personality: "You are drawn to helping others and making society better. You have great communication skills.",
    careers: ["Teacher", "Lawyer", "Social Worker", "Police Officer"]
  },
  'E': {
    id: 'E',
    title: "Creative Innovator & Artist",
    theme: "from-pink-500 to-rose-400",
    personality: "You have a strong creative vision and love expressing yourself through art and media.",
    careers: ["Graphic Designer", "Writer", "Journalist", "Fashion Designer"]
  },
  'F': {
    id: 'F',
    title: "Builder & Technical Craftsperson",
    theme: "from-teal-600 to-cyan-600",
    personality: "You prefer working with your hands and creating tangible, practical solutions.",
    careers: ["Civil Engineer", "Mechanic", "Architect", "Electrician"]
  },
  'MIXED': {
    id: 'MIXED',
    title: "Multi-Talented Star",
    theme: "from-indigo-400 via-purple-400 to-pink-400",
    personality: "You are Multi-Talented! You have diverse interests and can excel in multiple fields.",
    careers: ["Project Manager", "Consultant", "Media Producer", "Researcher"]
  }
};