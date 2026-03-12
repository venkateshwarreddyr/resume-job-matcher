import request from 'supertest';
import { createApp } from '../../src/app';

const app = createApp();

describe('API Integration Tests', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.version).toBe('1.0.0');
      expect(typeof res.body.uptime).toBe('number');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/analyze', () => {
    const validJobDescription =
      'We are looking for a Senior Software Engineer with 5+ years of experience in JavaScript, React, Node.js, TypeScript, and AWS. Must have experience with Docker and Kubernetes. Bachelor degree in Computer Science required.';

    it('should return 400 when no file is uploaded', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .field('jobDescription', validJobDescription);

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should return 400 when job description is missing', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .attach('resume', Buffer.from('fake pdf content'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should return 400 when job description is too short', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .attach('resume', Buffer.from('fake pdf content'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        })
        .field('jobDescription', 'Too short');

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 50 characters');
    });

    it('should reject invalid file types', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .attach('resume', Buffer.from('not a resume'), {
          filename: 'resume.txt',
          contentType: 'text/plain',
        })
        .field('jobDescription', validJobDescription);

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });
});
