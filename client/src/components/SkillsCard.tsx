import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { SkillMatchResult } from '../types';

interface SkillsCardProps {
  skillMatch: SkillMatchResult;
}

export function SkillsCard({ skillMatch }: SkillsCardProps) {
  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Skills Analysis</h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
          {skillMatch.score}%
        </span>
      </div>

      {skillMatch.matched.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-700 mb-2">Matched Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.matched.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-200"
              >
                <CheckCircle className="w-3 h-3" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {skillMatch.partial.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-amber-700 mb-2">Related Skills Found</h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.partial.map((p) => (
              <span
                key={p.skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200"
              >
                {p.relatedFound}
                <ArrowRight className="w-3 h-3" />
                {p.skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {skillMatch.missing.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-700 mb-2">Missing Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillMatch.missing.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700 border border-red-200"
              >
                <XCircle className="w-3 h-3" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
