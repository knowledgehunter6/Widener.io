export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  applyUrl: string;
  quickApplyEnabled: boolean;
  matchScore?: number;
  posted: string;
}

export interface Resume {
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  contact: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  rawContent: string;
}

export interface JobPreferences {
  keywords: string[];
  location: string;
  minSalary?: number;
  jobTypes: string[];
  remote: boolean;
  industries?: string[];
  autoApplyThreshold: number;
}