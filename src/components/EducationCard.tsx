"use client";

import { EducationMatchResult } from "@/types";

interface EducationCardProps {
  educationMatch: EducationMatchResult;
}

export default function EducationCard({ educationMatch }: EducationCardProps) {
  const { score, resumeLevel, requiredLevel } = educationMatch;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 animate-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {/* GraduationCap icon */}
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
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          Education
        </h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
          {score}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Your Level</p>
          <p className="text-sm font-medium text-white">
            {resumeLevel || "Not detected"}
          </p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Required</p>
          <p className="text-sm font-medium text-white">
            {requiredLevel || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}
