export interface SkillAnalysis {
  technical_skills: string[];
  soft_skills: string[];
  all_skills: string[];
  skill_categories: Record<string, string[]>;
}

export interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  salary_range?: string;
  match_score: number;
  required_skills: string[];
  description: string;
  url?: string;
  posted_date?: string;
  job_type?: string;
}

export interface AnalysisResult {
  success: boolean;
  resume_text: string;
  skills: SkillAnalysis;
  job_recommendations: JobRecommendation[];
}

