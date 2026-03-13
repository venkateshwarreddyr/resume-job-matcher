"use client";

interface MatchScoreGaugeProps {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 76) return "#22c55e";
  if (score >= 61) return "#eab308";
  if (score >= 41) return "#f97316";
  return "#ef4444";
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent Match";
  if (score >= 76) return "Strong Match";
  if (score >= 61) return "Good Match";
  if (score >= 41) return "Moderate Match";
  if (score >= 20) return "Weak Match";
  return "Poor Match";
}

export default function MatchScoreGauge({ score }: MatchScoreGaugeProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score-fill transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-400">{label}</span>
    </div>
  );
}
