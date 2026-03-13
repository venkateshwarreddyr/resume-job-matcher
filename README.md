<div align="center">

# ResumeMatch - AI-Powered Resume Analyzer

### Match your resume against any job description with AI-powered insights

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)](https://platform.openai.com/)

<br />

<!-- Add a screenshot: <img src="docs/screenshot.png" alt="ResumeMatch Screenshot" width="600" /> -->

<br />

[**Live Demo**](https://resume-job-matcher-five.vercel.app) &nbsp;&middot;&nbsp; [**Report Bug**](../../issues) &nbsp;&middot;&nbsp; [**Request Feature**](../../issues)

</div>

---

## About

ResumeMatch is a web app that analyzes resumes against job descriptions using OpenAI. Upload a resume (PDF or DOCX), paste the job description, and get a comprehensive match analysis with weighted scores, skill breakdowns, experience comparison, and actionable recommendations -- all in seconds.

Hiring managers spend an average of 7 seconds scanning a resume. This tool automates that process with AI, providing an objective, detailed breakdown that helps **HR teams** shortlist candidates faster, **job seekers** identify skill gaps, and **recruiters** compare candidates against role requirements at scale.

### Built With

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **AI** | OpenAI GPT-4o-mini (configurable) |
| **Parsing** | pdf-parse (PDF), mammoth (DOCX) |
| **Deployment** | Vercel / any Node.js host |

---

## Features

<table>
<tr>
<td width="50%">

**Resume Parsing**
- PDF and DOCX file support
- In-memory processing (files never stored)
- Text extraction with smart cleanup
- Handles encrypted PDF detection

</td>
<td width="50%">

**AI-Powered Matching**
- Weighted overall match score (0-100)
- Skills: matched, partial, and missing
- Experience: years and seniority alignment
- Education: degree level and field relevance

</td>
</tr>
<tr>
<td>

**AI Insights**
- Strengths and concerns assessment
- Interview preparation tips
- Culture fit analysis
- Salary range estimates
- Top matching keywords

</td>
<td>

**User Experience**
- Dark-themed glassmorphism UI
- Drag and drop file upload
- Real-time loading animations
- Color-coded score indicators
- Actionable recommendations

</td>
</tr>
</table>

---

## Quick Start

### Prerequisites

- **Node.js** 20+
- **OpenAI API key** ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repo
git clone https://github.com/venkateshwarreddyr/resume-job-matcher.git
cd resume-job-matcher

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
```

Add your API key to `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
```

### Run

```bash
npm run dev
```

Open **http://localhost:3000** and start analyzing resumes.

---

## Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts       # POST endpoint - parse & analyze
│   ├── globals.css                 # Theme & animations
│   ├── layout.tsx                  # SEO metadata & fonts
│   └── page.tsx                    # Main page (Header, Hero, Analyzer)
├── components/
│   ├── Header.tsx                  # Fixed navbar with glassmorphism
│   ├── Hero.tsx                    # Animated hero with stats
│   ├── ResumeAnalyzer.tsx          # Core upload + analysis flow
│   ├── FileUpload.tsx              # Drag & drop PDF/DOCX upload
│   ├── JobDescriptionInput.tsx     # Job description textarea
│   ├── ResultsDashboard.tsx        # Score overview + all result cards
│   ├── MatchScoreGauge.tsx         # Circular score visualization
│   ├── SkillsCard.tsx              # Matched / partial / missing skills
│   ├── ExperienceCard.tsx          # Years & seniority comparison
│   ├── EducationCard.tsx           # Degree & field relevance
│   ├── AIInsightsCard.tsx          # Strengths, tips, culture fit
│   ├── RecommendationsCard.tsx     # Prioritized action items
│   ├── LoadingSpinner.tsx          # Analysis loading state
│   ├── Features.tsx                # Feature showcase section
│   └── Footer.tsx                  # Footer with links
├── lib/
│   ├── ai.ts                      # OpenAI integration & prompt engineering
│   └── parser.ts                   # PDF & DOCX text extraction
└── types/
    └── index.ts                    # TypeScript interfaces
```

---

## API Reference

### `POST /api/analyze`

Analyze a resume against a job description.

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `resume` | File | Yes | PDF or DOCX file (max 5MB) |
| `jobDescription` | String | Yes | Job description text (50-10,000 chars) |

**Response:** `200 OK`

```json
{
  "overallScore": 85,
  "skillMatch": {
    "score": 78,
    "matched": ["AWS", "Angular", "Docker"],
    "missing": ["Mentoring"],
    "partial": [{ "skill": "Design Patterns", "relatedFound": "DevOps" }]
  },
  "experienceMatch": {
    "score": 100,
    "resumeYears": 8,
    "requiredYears": 5,
    "seniorityAlignment": true
  },
  "educationMatch": {
    "score": 94,
    "resumeLevel": "Master",
    "requiredLevel": "Bachelor",
    "fieldRelevance": 90
  },
  "keywordRelevance": {
    "score": 16,
    "topSharedTerms": ["architecture", "design", "systems"]
  },
  "recommendations": [
    "Consider learning Mentoring to strengthen your profile.",
    "Highlight your experience with AWS, Angular, Docker."
  ],
  "aiInsights": {
    "summary": "Strong candidate with solid architecture experience.",
    "strengths": ["Deep cloud infrastructure expertise"],
    "concerns": ["No mentoring experience listed"],
    "interviewTips": ["Prepare system design examples"],
    "cultureFit": "Good fit for a technical leadership role",
    "salaryRange": "$150,000 - $190,000"
  }
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Invalid file type, missing fields, file too large |
| `422` | Resume could not be parsed (encrypted or image-only) |
| `429` | Rate limit exceeded |
| `500` | Server error (missing API key, OpenAI failure) |

---

## How It Works

1. **Upload** -- User uploads a resume (PDF/DOCX) and pastes a job description
2. **Parse** -- Server extracts text from the resume using pdf-parse or mammoth
3. **Analyze** -- Resume text and job description are sent to OpenAI with a structured prompt
4. **Score** -- AI returns weighted scores: skills (50%), experience (25%), education (15%), keywords (10%)
5. **Display** -- Results render in an interactive dashboard with color-coded indicators

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | -- | Your OpenAI API key |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | OpenAI model to use for analysis |

---

## Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/venkateshwarreddyr/resume-job-matcher&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key)

### Manual

```bash
npm run build
npm start
```

---

## Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a PR.

```bash
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**[ResumeMatch](https://github.com/venkateshwarreddyr/resume-job-matcher)** &mdash; Built with Next.js, Tailwind CSS & OpenAI

</div>
