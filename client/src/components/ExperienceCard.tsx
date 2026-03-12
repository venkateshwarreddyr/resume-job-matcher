import { Briefcase, CheckCircle, XCircle } from 'lucide-react';
import { ExperienceMatchResult } from '../types';

interface ExperienceCardProps {
  experienceMatch: ExperienceMatchResult;
}

export function ExperienceCard({ experienceMatch }: ExperienceCardProps) {
  const { score, resumeYears, requiredYears, seniorityAlignment } = experienceMatch;
  const meetsRequirement = requiredYears === 0 || resumeYears >= requiredYears;
  const progressPercent = requiredYears > 0 ? Math.min((resumeYears / requiredYears) * 100, 100) : 100;

  return (
    <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600" />
          Experience
        </h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
          {score}%
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Your Experience</span>
            <span className="font-medium">
              {resumeYears} {resumeYears === 1 ? 'year' : 'years'}
            </span>
          </div>
          {requiredYears > 0 && (
            <>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Required</span>
                <span className="font-medium">
                  {requiredYears} {requiredYears === 1 ? 'year' : 'years'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ${meetsRequirement ? 'bg-green-500' : 'bg-orange-500'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {seniorityAlignment ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-700">Seniority level matches</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-amber-500" />
              <span className="text-amber-700">Seniority level differs</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
