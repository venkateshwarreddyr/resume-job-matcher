import OpenAI from "openai";
import { MatchResult } from "@/types";

let openai: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured. Set it in your .env file.");
  }
  if (!openai) {
    openai = new OpenAI({ apiKey });
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

function clamp(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export async function analyzeWithAI(
  resumeText: string,
  jobDescription: string
): Promise<MatchResult> {
  const client = getClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  let response;
  try {
    response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(resumeText, jobDescription) },
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });
  } catch (err: unknown) {
    const error = err as { status?: number; code?: string; message?: string };
    if (error.status === 401) {
      throw new Error("AI service authentication failed. Please check your API key configuration.");
    }
    if (error.status === 429) {
      throw new Error("AI service rate limit exceeded. Please wait a moment and try again.");
    }
    if (error.status === 402 || error.code === "insufficient_quota") {
      throw new Error("AI service quota exceeded. Please check your billing and usage limits.");
    }
    if (error.status === 503 || error.status === 500) {
      throw new Error("AI service is temporarily unavailable. Please try again later.");
    }
    throw new Error("Failed to connect to AI service. Please try again later.");
  }

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("AI returned an empty response. Please try again.");
  }

  let parsed: MatchResult;
  try {
    parsed = JSON.parse(content) as MatchResult;
  } catch {
    throw new Error("AI returned an invalid response. Please try again.");
  }

  if (
    typeof parsed.overallScore !== "number" ||
    !parsed.skillMatch ||
    !parsed.experienceMatch ||
    !parsed.educationMatch
  ) {
    throw new Error("AI returned an invalid response format. Please try again.");
  }

  // Clamp scores to 0-100
  parsed.overallScore = clamp(parsed.overallScore);
  parsed.skillMatch.score = clamp(parsed.skillMatch.score);
  parsed.experienceMatch.score = clamp(parsed.experienceMatch.score);
  parsed.educationMatch.score = clamp(parsed.educationMatch.score);
  parsed.keywordRelevance.score = clamp(parsed.keywordRelevance.score);

  return parsed;
}
