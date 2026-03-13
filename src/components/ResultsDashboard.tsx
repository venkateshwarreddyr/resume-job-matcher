"use client";

import { MatchResult } from "@/types";
import MatchScoreGauge from "@/components/MatchScoreGauge";
import SkillsCard from "@/components/SkillsCard";
import ExperienceCard from "@/components/ExperienceCard";
import EducationCard from "@/components/EducationCard";
import RecommendationsCard from "@/components/RecommendationsCard";
import AIInsightsCard from "@/components/AIInsightsCard";

interface ResultsDashboardProps {
  result: MatchResult;
  onReset: () => void;
}

function getScoreBorderClass(score: number): string {
  if (score >= 76) return "border-green-500/30";
  if (score >= 61) return "border-yellow-500/30";
  if (score >= 41) return "border-orange-500/30";
  return "border-red-500/30";
}

export default function ResultsDashboard({
  result,
  onReset,
}: ResultsDashboardProps) {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Analysis Results</h2>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {/* RotateCcw icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          New Analysis
        </button>
      </div>

      {/* Overall score card */}
      <div
        className={`rounded-2xl bg-white/5 border-2 ${getScoreBorderClass(
          result.overallScore
        )} backdrop-blur-sm p-6`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <MatchScoreGauge score={result.overallScore} />
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-2">
              Overall Match Score
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <span className="text-gray-500">Skills</span>
              <span className="font-medium text-white">
                {result.skillMatch.score}%
              </span>
              <span className="text-gray-500">Experience</span>
              <span className="font-medium text-white">
                {result.experienceMatch.score}%
              </span>
              <span className="text-gray-500">Education</span>
              <span className="font-medium text-white">
                {result.educationMatch.score}%
              </span>
              <span className="text-gray-500">Keywords</span>
              <span className="font-medium text-white">
                {result.keywordRelevance.score}%
              </span>
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
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 animate-in">
          <h3 className="text-lg font-semibold text-white mb-3">
            Top Matching Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.keywordRelevance.topSharedTerms.map((term) => (
              <span
                key={term}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 text-gray-300"
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
