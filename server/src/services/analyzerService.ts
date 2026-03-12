import { parseResume } from './parserService';
import { analyzeWithAI, AIMatchResult } from './aiService';
import { logger } from '../utils/logger';

export async function analyzeMatch(
  resumeBuffer: Buffer,
  mimetype: string,
  jobDescription: string,
): Promise<AIMatchResult> {
  logger.info('Starting resume analysis');

  // Step 1: Parse resume file to text
  const rawText = await parseResume(resumeBuffer, mimetype);
  logger.info({ textLength: rawText.length }, 'Resume text extracted');

  // Step 2: AI-powered analysis
  const result = await analyzeWithAI(rawText, jobDescription);
  logger.info({ overallScore: result.overallScore }, 'Analysis complete');

  return result;
}
