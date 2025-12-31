import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  eyebrow: string;
  heading: string;
  description: string;
  buttonText: string;
  Icon: LucideIcon;
  theme: 'green' | 'blue' | 'yellow';
  onClick?: () => void;
}
