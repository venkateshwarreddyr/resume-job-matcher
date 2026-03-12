import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { validateAnalyzeRequest } from '../middleware/validate';
import { analyzeMatch } from '../services/analyzerService';

const router = Router();

router.post(
  '/analyze',
  upload.single('resume'),
  validateAnalyzeRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file!;
      const jobDescription = req.body.jobDescription as string;

      const result = await analyzeMatch(file.buffer, file.mimetype, jobDescription);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export { router as analyzeRoute };
