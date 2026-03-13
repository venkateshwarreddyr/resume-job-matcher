"use client";

interface RecommendationsCardProps {
  recommendations: string[];
}

export default function RecommendationsCard({
  recommendations,
}: RecommendationsCardProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 animate-in">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        {/* Lightbulb icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
        Recommendations
      </h3>

      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex gap-3 text-sm text-gray-300">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
