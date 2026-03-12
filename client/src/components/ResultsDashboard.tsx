import { MatchResult } from '../types';
import { MatchScoreGauge } from './MatchScoreGauge';
import { SkillsCard } from './SkillsCard';
import { ExperienceCard } from './ExperienceCard';
import { EducationCard } from './EducationCard';
import { RecommendationsCard } from './RecommendationsCard';
import { AIInsightsCard } from './AIInsightsCard';
import { getScoreBgClass } from '../utils/format';
import { RotateCcw } from 'lucide-react';

interface ResultsDashboardProps {
  result: MatchResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New Analysis
        </button>
      </div>

      <div className={`card border-2 ${getScoreBgClass(result.overallScore)}`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <MatchScoreGauge score={result.overallScore} />
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Match Score</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <span className="text-gray-500">Skills</span>
              <span className="font-medium">{result.skillMatch.score}%</span>
              <span className="text-gray-500">Experience</span>
              <span className="font-medium">{result.experienceMatch.score}%</span>
              <span className="text-gray-500">Education</span>
              <span className="font-medium">{result.educationMatch.score}%</span>
              <span className="text-gray-500">Keywords</span>
              <span className="font-medium">{result.keywordRelevance.score}%</span>
            </div>
          </div>
        </div>
      </div>

      {result.aiInsights && <AIInsightsCard insights={result.aiInsights} />}

      <SkillsCard skillMatch={result.skillMatch} />
      <ExperienceCard experienceMatch={result.experienceMatch} />
      <EducationCard educationMatch={result.educationMatch} />
      <RecommendationsCard recommendations={result.recommendations} />

      {result.keywordRelevance.topSharedTerms.length > 0 && (
        <div className="card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Matching Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {result.keywordRelevance.topSharedTerms.map((term) => (
              <span
                key={term}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
