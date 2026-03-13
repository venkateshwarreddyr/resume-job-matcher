"use client";

import { SkillMatchResult } from "@/types";

interface SkillsCardProps {
  skillMatch: SkillMatchResult;
}

export default function SkillsCard({ skillMatch }: SkillsCardProps) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 animate-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {/* Target icon */}
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          Skills Analysis
        </h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
          {skillMatch.score}%
        </span>
      </div>

      {skillMatch.matched.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2">
            Matched Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.matched.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
              >
                {/* Check icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {skillMatch.partial.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-amber-400 mb-2">
            Related Skills Found
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.partial.map((p) => (
              <span
                key={p.skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
              >
                {p.relatedFound}
                {/* Arrow icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                {p.skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {skillMatch.missing.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-400 mb-2">
            Missing Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.missing.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
              >
                {/* X icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
