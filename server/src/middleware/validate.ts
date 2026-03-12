import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../types';

const analyzeSchema = z.object({
  jobDescription: z
    .string({ required_error: 'Job description is required' })
    .min(50, 'Job description must be at least 50 characters long')
    .max(10000, 'Job description must not exceed 10,000 characters'),
});

export function validateAnalyzeRequest(req: Request, _res: Response, next: NextFunction): void {
  try {
    // Validate job description from form data
    const result = analyzeSchema.safeParse({
      jobDescription: req.body.jobDescription,
    });

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join('. ');
      throw new ValidationError(message);
    }

    // Validate file presence
    if (!req.file) {
      throw new ValidationError('Resume file is required. Please upload a PDF or DOCX file.');
    }

    next();
  } catch (error) {
    next(error);
  }
}
