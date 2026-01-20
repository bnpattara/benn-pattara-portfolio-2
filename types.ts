
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  role: string;
  published?: boolean; // Controls visibility on home page (defaults to true)
}

export interface Skill {
  title: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}
