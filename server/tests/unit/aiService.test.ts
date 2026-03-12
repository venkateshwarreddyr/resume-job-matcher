import { analyzeWithAI } from '../../src/services/aiService';

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  overallScore: 78,
                  skillMatch: {
                    score: 80,
                    matched: ['JavaScript', 'React', 'Node.js'],
                    missing: ['Kubernetes'],
                    partial: [{ skill: 'Docker Swarm', relatedFound: 'Docker' }],
                  },
                  experienceMatch: {
                    score: 90,
                    resumeYears: 5,
                    requiredYears: 4,
                    seniorityAlignment: true,
                  },
                  educationMatch: {
                    score: 85,
                    resumeLevel: 'Bachelor',
                    requiredLevel: 'Bachelor',
                    fieldRelevance: 90,
                  },
                  keywordRelevance: {
                    score: 65,
                    topSharedTerms: ['microservices', 'scalable', 'REST API'],
                  },
                  recommendations: [
                    'Learn Kubernetes to fill the container orchestration gap',
                    'Highlight your 5 years of experience prominently',
                  ],
                  aiInsights: {
                    summary:
                      'Strong candidate with solid full-stack experience. Good skill alignment with minor gaps in container orchestration.',
                    strengths: [
                      'Strong JavaScript ecosystem expertise',
                      'Experience exceeds requirements',
                    ],
                    concerns: ['Missing Kubernetes experience'],
                    interviewTips: [
                      'Prepare to discuss system design decisions',
                      'Be ready to explain microservices patterns',
                    ],
                    cultureFit:
                      'Likely a good fit for a collaborative engineering team',
                    salaryRange: '$120,000 - $150,000',
                  },
                }),
              },
            },
          ],
        }),
      },
    },
  }));
});

// Mock config to have an API key
jest.mock('../../src/config', () => ({
  config: {
    openaiApiKey: 'sk-test-key',
    openaiModel: 'gpt-4o-mini',
    logLevel: 'silent',
    nodeEnv: 'test',
  },
}));

// Silence logger
jest.mock('../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('aiService', () => {
  describe('analyzeWithAI', () => {
    const resumeText = 'John Doe, Senior Software Engineer, 5 years experience with JavaScript, React, Node.js, Docker';
    const jobDescription = 'Looking for a Senior Engineer with 4+ years in JavaScript, React, Node.js, Kubernetes. Bachelor degree required.';

    it('should return a valid AI match result', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.overallScore).toBe(78);
      expect(result.skillMatch.score).toBe(80);
      expect(result.skillMatch.matched).toContain('JavaScript');
      expect(result.skillMatch.matched).toContain('React');
      expect(result.skillMatch.missing).toContain('Kubernetes');
    });

    it('should include experience match data', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.experienceMatch.score).toBe(90);
      expect(result.experienceMatch.resumeYears).toBe(5);
      expect(result.experienceMatch.requiredYears).toBe(4);
      expect(result.experienceMatch.seniorityAlignment).toBe(true);
    });

    it('should include education match data', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.educationMatch.score).toBe(85);
      expect(result.educationMatch.resumeLevel).toBe('Bachelor');
    });

    it('should include keyword relevance', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.keywordRelevance.score).toBe(65);
      expect(result.keywordRelevance.topSharedTerms.length).toBeGreaterThan(0);
    });

    it('should include recommendations', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should include AI insights', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.aiInsights).toBeDefined();
      expect(result.aiInsights!.summary).toBeTruthy();
      expect(result.aiInsights!.strengths.length).toBeGreaterThan(0);
      expect(result.aiInsights!.concerns.length).toBeGreaterThan(0);
      expect(result.aiInsights!.interviewTips.length).toBeGreaterThan(0);
      expect(result.aiInsights!.cultureFit).toBeTruthy();
      expect(result.aiInsights!.salaryRange).toBeTruthy();
    });

    it('should clamp scores to 0-100', async () => {
      const result = await analyzeWithAI(resumeText, jobDescription);

      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(result.skillMatch.score).toBeGreaterThanOrEqual(0);
      expect(result.skillMatch.score).toBeLessThanOrEqual(100);
    });
  });
});
