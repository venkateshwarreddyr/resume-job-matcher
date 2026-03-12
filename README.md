# Resume Job Matcher

Upload a resume (PDF/DOCX) and paste a job description to get an instant match analysis with detailed skill breakdown, experience comparison, and actionable recommendations.

## Features

- **Resume Parsing** - Extracts text from PDF and DOCX files
- **Skill Extraction** - 300+ skills taxonomy with synonym resolution
- **Match Scoring** - Weighted algorithm (Skills 50%, Experience 25%, Education 15%, Keywords 10%)
- **Category Proximity** - Partial credit for related skills (e.g., Vue.js ↔ React)
- **TF-IDF Analysis** - Keyword relevance scoring beyond the skill taxonomy
- **Actionable Recommendations** - Prioritized suggestions to improve your match

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Parsing:** pdf-parse, mammoth
- **Testing:** Jest, Supertest, Vitest

## Quick Start

```bash
# Install all dependencies
npm install && cd server && npm install && cd ../client && npm install && cd ..

# Run development servers (client :5173, server :3001)
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## API

### POST /api/analyze

Upload a resume file and job description for analysis.

```bash
curl -X POST http://localhost:3001/api/analyze \
  -F "resume=@resume.pdf" \
  -F "jobDescription=We are looking for a Senior Engineer..."
```

### GET /api/health

Health check endpoint.

## Docker

```bash
docker compose up --build
```

## Project Structure

```
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/  # UI components
│       ├── hooks/       # useAnalyze custom hook
│       ├── api/         # Axios API client
│       └── types/       # TypeScript interfaces
├── server/          # Express + TypeScript backend
│   ├── src/
│   │   ├── services/    # Parser, Extractor, Matcher, Analyzer
│   │   ├── data/        # Skill taxonomy, synonyms, education levels
│   │   ├── middleware/  # Upload, validation, error handling
│   │   ├── routes/      # API endpoints
│   │   └── utils/       # TF-IDF, text normalization, logger
│   └── tests/           # Unit + integration tests
└── docker-compose.yml
```

## License

MIT
