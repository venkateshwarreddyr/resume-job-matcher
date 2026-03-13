"use client";

import { AIInsights } from "@/types";

interface AIInsightsCardProps {
  insights: AIInsights;
}

export default function AIInsightsCard({ insights }: AIInsightsCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm p-6 animate-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-500/20 rounded-lg">
          {/* Brain icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
          >
            <path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3 3 3 0 0 0 1 5.2A4 4 0 0 0 10 20h4a4 4 0 0 0 4-4.8A3 3 0 0 0 19 10a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4Z" />
            <path d="M12 2v8" />
            <path d="m8 10 4-2 4 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
          Powered by OpenAI
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-300 mb-5 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
        {insights.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        {insights.strengths.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-400 flex items-center gap-1.5">
              {/* TrendingUp icon */}
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
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              Strengths
            </h4>
            <ul className="space-y-1.5">
              {insights.strengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-green-400 flex-shrink-0 mt-0.5">
                    +
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Concerns */}
        {insights.concerns.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-amber-400 flex items-center gap-1.5">
              {/* AlertTriangle icon */}
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              Concerns
            </h4>
            <ul className="space-y-1.5">
              {insights.concerns.map((c, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-amber-400 flex-shrink-0 mt-0.5">
                    !
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interview Tips */}
      {insights.interviewTips.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-cyan-400 flex items-center gap-1.5 mb-2">
            {/* MessageSquare icon */}
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Interview Tips
          </h4>
          <ul className="space-y-1.5">
            {insights.interviewTips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Culture Fit & Salary */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.cultureFit && (
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
              {/* Users icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Culture Fit
            </h4>
            <p className="text-sm text-gray-300">{insights.cultureFit}</p>
          </div>
        )}

        {insights.salaryRange &&
          insights.salaryRange !== "Not determinable" && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
                {/* DollarSign icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Estimated Salary Range
              </h4>
              <p className="text-sm text-gray-300 font-medium">
                {insights.salaryRange}
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
