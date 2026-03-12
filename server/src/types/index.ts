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

export interface MatchResult {
  overallScore: number;
  skillMatch: SkillMatchResult;
  experienceMatch: ExperienceMatchResult;
  educationMatch: EducationMatchResult;
  keywordRelevance: KeywordRelevanceResult;
  recommendations: string[];
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ParseError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}
