import { Lightbulb } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="card animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Recommendations
      </h3>

      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex gap-3 text-sm text-gray-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
