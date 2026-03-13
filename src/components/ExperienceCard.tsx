"use client";

import { ExperienceMatchResult } from "@/types";

interface ExperienceCardProps {
  experienceMatch: ExperienceMatchResult;
}

export default function ExperienceCard({
  experienceMatch,
}: ExperienceCardProps) {
  const { score, resumeYears, requiredYears, seniorityAlignment } =
    experienceMatch;
  const meetsRequirement =
    requiredYears === 0 || resumeYears >= requiredYears;
  const progressPercent =
    requiredYears > 0
      ? Math.min((resumeYears / requiredYears) * 100, 100)
      : 100;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 animate-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {/* Briefcase icon */}
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Experience
        </h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
          {score}%
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Your Experience</span>
            <span className="font-medium text-white">
              {resumeYears} {resumeYears === 1 ? "year" : "years"}
            </span>
          </div>
          {requiredYears > 0 && (
            <>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Required</span>
                <span className="font-medium text-white">
                  {requiredYears} {requiredYears === 1 ? "year" : "years"}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ${
                    meetsRequirement ? "bg-green-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {seniorityAlignment ? (
            <>
              {/* Check circle */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-green-400">Seniority level matches</span>
            </>
          ) : (
            <>
              {/* Alert circle */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span className="text-amber-400">Seniority level differs</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
