import { LucideIcon, Banknote, GraduationCap, User, FileText, Stamp, BookOpen } from 'lucide-react';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  minPercentage: number; // e.g., 60 for 60%
  maxIncome: number; // e.g., 250000 for 2.5 Lakhs
  tags: string[];
  theme: 'blue' | 'green' | 'purple' | 'orange';
  eligibilityShort: string;
  documents: string[];
}

export const scholarshipData: Scholarship[] = [
  {
    id: '1',
    name: "PM Yashasvi Scheme",
    provider: "Govt of India",
    amount: "₹ 75,000 / year",
    deadline: "30th Nov 2025",
    minPercentage: 60,
    maxIncome: 250000,
    tags: ["Govt", "High Value"],
    theme: 'orange',
    eligibilityShort: "For OBC, EBC and DNT students studying in Class 9 or 11.",
    documents: ["Aadhar Card", "Income Certificate", "Caste Certificate", "Mark Sheet"]
  },
  {
    id: '2',
    name: "HDFC Badhte Kadam",
    provider: "HDFC Bank",
    amount: "₹ 30,000 one-time",
    deadline: "15th Oct 2025",
    minPercentage: 60,
    maxIncome: 600000,
    tags: ["Private", "Crisis Support"],
    theme: 'blue',
    eligibilityShort: "For students whose families are facing financial crisis or lost a parent.",
    documents: ["Aadhar Card", "Previous Year Marksheet", "Bank Passbook", "Passport Photo"]
  },
  {
    id: '3',
    name: "Vidyasaarathi Scholarship",
    provider: "NSDL",
    amount: "₹ 20,000 / year",
    deadline: "Rolling Basis",
    minPercentage: 50,
    maxIncome: 500000,
    tags: ["General", "Easy Apply"],
    theme: 'green',
    eligibilityShort: "Open to students pursuing ITI, Diploma, or Undergraduate courses.",
    documents: ["Student ID Card", "Income Proof", "Fee Receipt", "Bonafide Certificate"]
  },
  {
    id: '4',
    name: "Kind Circle Scholarship",
    provider: "Kind Circle",
    amount: "₹ 12,000 / year",
    deadline: "31st Dec 2025",
    minPercentage: 75,
    maxIncome: 400000,
    tags: ["Merit Based", "Mentorship"],
    theme: 'purple',
    eligibilityShort: "Meritorious students from low-income families in any stream.",
    documents: ["Mark Sheet (Class 10/12)", "Family Income Proof", "School ID"]
  },
  {
    id: '5',
    name: "Kotak Kanya Scholarship",
    provider: "Kotak Foundation",
    amount: "₹ 1.5 Lakh / year",
    deadline: "30th Sept 2025",
    minPercentage: 85,
    maxIncome: 320000,
    tags: ["Girls Only", "Professional"],
    theme: 'orange',
    eligibilityShort: "Exclusively for girl students pursuing professional courses (Engg/Med/Law).",
    documents: ["Admission Letter", "Fee Structure", "Income Certificate", "Aadhar Card"]
  },
  {
    id: '6',
    name: "Keep India Smiling",
    provider: "Colgate",
    amount: "₹ 30,000 / year",
    deadline: "31st Jan 2026",
    minPercentage: 60,
    maxIncome: 500000,
    tags: ["Dental", "General"],
    theme: 'blue',
    eligibilityShort: "For students currently enrolled in Class 11 or 3-year graduation.",
    documents: ["Income Proof", "Admission Proof", "Disability Cert (if applicable)"]
  }
];