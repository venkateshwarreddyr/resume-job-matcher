export interface PartialMatch {
  skill: string;
  relatedFound: string;
}

export interface SkillMatchResult {
  score: number;
  matched: string[];
  missing: string[];
  partial: PartialMatch[];
}

export interface ExperienceMatchResult {
  score: number;
  resumeYears: number;
  requiredYears: number;
  seniorityAlignment: boolean;
}

export interface EducationMatchResult {
  score: number;
  resumeLevel: string;
  requiredLevel: string;
  fieldRelevance: number;
}

export interface KeywordRelevanceResult {
  score: number;
  topSharedTerms: string[];
}

export interface AIInsights {
  summary: string;
  strengths: string[];
  concerns: string[];
  interviewTips: string[];
  cultureFit: string;
  salaryRange: string;
}

export interface MatchResult {
  overallScore: number;
  skillMatch: SkillMatchResult;
  experienceMatch: ExperienceMatchResult;
  educationMatch: EducationMatchResult;
  keywordRelevance: KeywordRelevanceResult;
  recommendations: string[];
  aiInsights?: AIInsights;
}
