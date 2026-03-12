import { GraduationCap } from 'lucide-react';
import { EducationMatchResult } from '../types';

interface EducationCardProps {
  educationMatch: EducationMatchResult;
}

export function EducationCard({ educationMatch }: EducationCardProps) {
  const { score, resumeLevel, requiredLevel } = educationMatch;

  return (
    <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary-600" />
          Education
        </h3>
        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
          {score}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Your Level</p>
          <p className="text-sm font-medium text-gray-900">{resumeLevel || 'Not detected'}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Required</p>
          <p className="text-sm font-medium text-gray-900">{requiredLevel || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );
}
