import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import path from 'path';
import { config } from './config';
import { logger } from './utils/logger';
import { analyzeRoute } from './routes/analyzeRoute';
import { healthRoute } from './routes/healthRoute';
import { errorHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  // Security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: config.corsOrigin,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }),
  );

  // Logging
  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === '/api/health' } }));

  // Rate limiting
  app.use(
    '/api/analyze',
    rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Too many requests, please try again later.' },
    }),
  );

  // Body parsing for non-multipart
  app.use(express.json());

  // API Routes
  app.use('/api', healthRoute);
  app.use('/api', analyzeRoute);

  // Serve static files in production
  if (config.nodeEnv === 'production') {
    const clientPath = path.join(__dirname, 'public');
    app.use(express.static(clientPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientPath, 'index.html'));
    });
  }

  // Error handling (must be last)
  app.use(errorHandler);

  return app;
}
