import { Hammer, Microscope, Palette, Heart, Briefcase, ClipboardList, LucideIcon, Code, Stethoscope, Landmark, Calculator, HardHat, TrendingUp, Users, PenTool, BookOpen } from 'lucide-react';

export interface CareerRole {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  personalityQuestions: string[];
  roadmap: {
    school: string;
    college: string;
    next: string;
  };
  topSkills: string[];
  softSkills: string[];
  relatedRoles: string[];
  demand: number; // 1 to 5
}

export interface CareerCategory {
  id: string;
  title: string;
  tagline: string; // The text in parenthesis (e.g., Realistic)
  icon: LucideIcon;
  theme: string; // Tailwind color name (e.g., 'teal')
  roles: CareerRole[];
}

// Helper to create generic placeholder data for roles other than Software Engineer
// In a real app, each of these would be manually filled out.
const createPlaceholderRole = (title: string, icon: LucideIcon): CareerRole => ({
  id: title.toLowerCase().replace(/\s+/g, '-'),
  title: title,
  icon: icon,
  description: `A professional career path in ${title}. This role involves specific skills and training to succeed.`,
  personalityQuestions: [
    "Do you enjoy this specific field?",
    "Are you willing to learn new skills?",
    "Do you like working in this environment?"
  ],
  roadmap: {
    school: "Relevant High School Stream",
    college: "Bachelor's Degree or Diploma",
    next: "Internship or Entry Level Job"
  },
  topSkills: ["Core Skill 1", "Core Skill 2", "Technical Knowledge"],
  softSkills: ["Communication", "Dedication", "Time Management"],
  relatedRoles: ["Junior Position", "Senior Position"],
  demand: 4
});

export const careerCategories: CareerCategory[] = [
  {
    id: 'builder',
    title: "The Builder",
    tagline: "Realistic",
    icon: Hammer,
    theme: "teal",
    roles: [
      {
        id: 'civil-engineer',
        title: "Civil Engineer",
        icon: HardHat,
        description: "Plan, design, and oversee the construction of infrastructure like roads, bridges, and buildings. You ensure structures are safe.",
        personalityQuestions: [
          "Do you enjoy seeing how things are built?",
          "Are you good at physics and math?",
          "Do you like working both outdoors and in an office?"
        ],
        roadmap: {
          school: "Class 12th: Science Stream (PCM).",
          college: "B.Tech in Civil Engineering.",
          next: "Site Engineer or M.Tech for specialization."
        },
        topSkills: ["Mathematics", "Physics", "AutoCAD", "Project Management"],
        softSkills: ["Leadership", "Problem Solving", "Teamwork"],
        relatedRoles: ["Architect", "Site Manager", "Structural Engineer"],
        demand: 5
      },
      createPlaceholderRole("Mechanic", Hammer),
      createPlaceholderRole("Architect", Calculator),
      createPlaceholderRole("Electrician", Code), // Placeholder icon
      createPlaceholderRole("Pilot", Briefcase), // Placeholder icon
    ]
  },
  {
    id: 'thinker',
    title: "The Thinker",
    tagline: "Investigative",
    icon: Microscope,
    theme: "sky",
    roles: [
      {
        id: 'software-engineer',
        title: "Software Engineer",
        icon: Code,
        description: "Design and build applications for computers and phones. You solve real-world problems using code.",
        personalityQuestions: [
          "Do you love solving puzzles?",
          "Can you sit for long hours focusing?",
          "Do you like learning new languages?"
        ],
        roadmap: {
          school: "Class 12th: Science Stream (PCM) or Computer Science.",
          college: "Undergraduate: B.Tech in CS or BCA.",
          next: "Specialization: Internships or Masters (M.Tech/MCA)."
        },
        topSkills: ["Java", "Problem Solving", "Logic", "React", "Python"],
        softSkills: ["Teamwork", "Patience", "Communication"],
        relatedRoles: ["App Developer", "Web Designer", "System Admin"],
        demand: 5
      },
      createPlaceholderRole("Doctor", Stethoscope),
      createPlaceholderRole("Scientist", Microscope),
      createPlaceholderRole("Data Analyst", Calculator),
      createPlaceholderRole("Pharmacist", Heart),
    ]
  },
  {
    id: 'creator',
    title: "The Creator",
    tagline: "Artistic",
    icon: Palette,
    theme: "purple", // Using purple/pink mix in UI
    roles: [
      {
        id: 'graphic-designer',
        title: "Graphic Designer",
        icon: Palette,
        description: "Create visual concepts using computer software to communicate ideas that inspire and inform consumers.",
        personalityQuestions: [
          "Do you love drawing or designing?",
          "Do you have a good eye for color and layout?",
          "Do you enjoy working with creative software?"
        ],
        roadmap: {
          school: "Class 12th: Any Stream (Arts/Design preferred).",
          college: "B.Des in Visual Communication or Diploma.",
          next: "Build Portfolio & Freelancing/Internship."
        },
        topSkills: ["Photoshop", "Illustrator", "Typography", "Creativity"],
        softSkills: ["Communication", "Time Management", "Adaptability"],
        relatedRoles: ["UI/UX Designer", "Art Director", "Web Designer"],
        demand: 4
      },
      createPlaceholderRole("Fashion Designer", Palette),
      createPlaceholderRole("Writer", ClipboardList),
      createPlaceholderRole("Musician", Heart),
      createPlaceholderRole("UI/UX Designer", Code),
    ]
  },
  {
    id: 'helper',
    title: "The Helper",
    tagline: "Social",
    icon: Heart,
    theme: "orange",
    roles: [
      {
        id: 'teacher',
        title: "Teacher",
        icon: BookOpen,
        description: "Educate and inspire students in specific subjects. You shape the future by guiding young minds.",
        personalityQuestions: [
          "Do you love explaining things to others?",
          "Are you patient with people?",
          "Do you want to make a difference in society?"
        ],
        roadmap: {
          school: "Class 12th: Any Stream (Subject focus).",
          college: "B.A/B.Sc/B.Com + B.Ed (Bachelor of Education).",
          next: "Clear TET/CTET exams for government jobs."
        },
        topSkills: ["Subject Expertise", "Lesson Planning", "Public Speaking"],
        softSkills: ["Patience", "Empathy", "Communication"],
        relatedRoles: ["Professor", "Counselor", "Principal"],
        demand: 5
      },
      createPlaceholderRole("Nurse", Stethoscope),
      createPlaceholderRole("Social Worker", Heart),
      createPlaceholderRole("Psychologist", Microscope),
      createPlaceholderRole("Police Officer", Briefcase),
    ]
  },
  {
    id: 'leader',
    title: "The Leader",
    tagline: "Enterprising",
    icon: Briefcase,
    theme: "yellow",
    roles: [
      {
        id: 'entrepreneur',
        title: "Entrepreneur",
        icon: TrendingUp,
        description: "Start and run your own business. You identify problems and create innovative solutions to solve them.",
        personalityQuestions: [
          "Do you have many new ideas?",
          "Are you willing to take risks?",
          "Do you like leading teams?"
        ],
        roadmap: {
          school: "Class 12th: Commerce or Any Stream.",
          college: "BBA/B.Com or Engineering (for tech startups).",
          next: "MBA (Optional) or Start your venture immediately."
        },
        topSkills: ["Business Strategy", "Financial Planning", "Marketing", "Sales"],
        softSkills: ["Resilience", "Leadership", "Decision Making"],
        relatedRoles: ["CEO", "Product Manager", "Business Consultant"],
        demand: 5
      },
      createPlaceholderRole("Sales Manager", Calculator),
      createPlaceholderRole("Lawyer", Landmark),
      createPlaceholderRole("Hotel Manager", Briefcase),
      createPlaceholderRole("Marketing Head", Palette),
    ]
  },
  {
    id: 'organizer',
    title: "The Organizer",
    tagline: "Conventional",
    icon: ClipboardList,
    theme: "slate",
    roles: [
      {
        id: 'accountant-ca',
        title: "Accountant (CA)",
        icon: Calculator,
        description: "Manage financial records, taxes, and audits. You ensure businesses comply with financial laws.",
        personalityQuestions: [
          "Are you good with numbers?",
          "Do you pay attention to small details?",
          "Do you like following rules?",
        ],
        roadmap: {
          school: "Class 12th: Commerce Stream.",
          college: "B.Com while preparing for CA Foundation.",
          next: "Clear CA Intermediate & Final exams."
        },
        topSkills: ["Accounting", "Taxation", "Auditing", "Excel"],
        softSkills: ["Integrity", "Analytical Thinking", "Organization"],
        relatedRoles: ["Financial Analyst", "Auditor", "Bank Manager"],
        demand: 5
      },
      createPlaceholderRole("Banker", Landmark),
      createPlaceholderRole("Secretary", ClipboardList),
      createPlaceholderRole("Data Entry", Code),
      createPlaceholderRole("Library Manager", Microscope),
    ]
  }
];

// Helper function to find a role by its title
export const findRoleByTitle = (title: string): { role: CareerRole, theme: string } | null => {
  for (const category of careerCategories) {
    const role = category.roles.find(r => r.title.toLowerCase() === title.toLowerCase());
    if (role) {
      return { role, theme: category.theme };
    }
  }
  return null;
};