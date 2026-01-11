
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
  version?: string;
  updatedAt?: string;
  isFeatured?: boolean;
  status?: 'active' | 'legacy' | 'research';
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  isCurrent?: boolean;
}
