import OpenAI from 'openai';
import { config } from '../config';
import { MatchResult, AppError } from '../types';
import { logger } from '../utils/logger';

let openai: OpenAI | null = null;

function getClient(): OpenAI {
  if (!config.openaiApiKey) {
    throw new AppError('OPENAI_API_KEY is not configured. Set it in your .env file.', 500);
  }
  if (!openai) {
    openai = new OpenAI({ apiKey: config.openaiApiKey });
  }
  return openai;
}

const SYSTEM_PROMPT = `You are an expert HR analyst and ATS (Applicant Tracking System) specialist.
You analyze resumes against job descriptions with deep domain expertise.

When given a resume text and job description, provide a thorough JSON analysis. Be precise, actionable, and fair.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.`;

function buildUserPrompt(resumeText: string, jobDescription: string): string {
  return `Analyze this resume against the job description and return a JSON object with this EXACT structure:

{
  "overallScore": <number 0-100>,
  "skillMatch": {
    "score": <number 0-100>,
    "matched": ["skill1", "skill2"],
    "missing": ["skill3", "skill4"],
    "partial": [{"skill": "required skill", "relatedFound": "similar skill in resume"}]
  },
  "experienceMatch": {
    "score": <number 0-100>,
    "resumeYears": <number>,
    "requiredYears": <number>,
    "seniorityAlignment": <boolean>
  },
  "educationMatch": {
    "score": <number 0-100>,
    "resumeLevel": "<degree level>",
    "requiredLevel": "<degree level>",
    "fieldRelevance": <number 0-100>
  },
  "keywordRelevance": {
    "score": <number 0-100>,
    "topSharedTerms": ["term1", "term2"]
  },
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2"
  ],
  "aiInsights": {
    "summary": "<2-3 sentence overall assessment>",
    "strengths": ["strength1", "strength2"],
    "concerns": ["concern1", "concern2"],
    "interviewTips": ["tip1", "tip2"],
    "cultureFit": "<assessment of potential culture/role fit>",
    "salaryRange": "<estimated salary range based on skills and experience if determinable, otherwise 'Not determinable'>"
  }
}

Scoring guidelines:
- Skills (50% weight): Direct matches = full credit, related skills = 30% credit
- Experience (25% weight): Compare years and seniority level
- Education (15% weight): Compare degree level and field relevance
- Keywords (10% weight): Domain-specific terminology overlap

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;
}

export interface AIMatchResult extends MatchResult {
  aiInsights?: {
    summary: string;
    strengths: string[];
    concerns: string[];
    interviewTips: string[];
    cultureFit: string;
    salaryRange: string;
  };
}

export async function analyzeWithAI(
  resumeText: string,
  jobDescription: string,
): Promise<AIMatchResult> {
  const client = getClient();

  logger.info('Starting AI-powered analysis');

  const response = await client.chat.completions.create({
    model: config.openaiModel,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(resumeText, jobDescription) },
    ],
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new AppError('AI returned an empty response. Please try again.', 502);
  }

  const parsed = JSON.parse(content) as AIMatchResult;

  if (
    typeof parsed.overallScore !== 'number' ||
    !parsed.skillMatch ||
    !parsed.experienceMatch ||
    !parsed.educationMatch
  ) {
    throw new AppError('AI returned an invalid response format. Please try again.', 502);
  }

  // Clamp scores to 0-100
  parsed.overallScore = clamp(parsed.overallScore);
  parsed.skillMatch.score = clamp(parsed.skillMatch.score);
  parsed.experienceMatch.score = clamp(parsed.experienceMatch.score);
  parsed.educationMatch.score = clamp(parsed.educationMatch.score);
  parsed.keywordRelevance.score = clamp(parsed.keywordRelevance.score);

  logger.info(
    { overallScore: parsed.overallScore, model: config.openaiModel },
    'AI analysis complete',
  );

  return parsed;
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
