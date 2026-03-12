import { Router, Request, Response } from 'express';

const router = Router();
const startTime = Date.now();

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export { router as healthRoute };
