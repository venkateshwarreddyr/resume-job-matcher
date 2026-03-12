import { Brain, TrendingUp, AlertTriangle, MessageSquare, Users, DollarSign } from 'lucide-react';
import { AIInsights } from '../types';

interface AIInsightsCardProps {
  insights: AIInsights;
}

export function AIInsightsCard({ insights }: AIInsightsCardProps) {
  return (
    <div className="card animate-slide-up border-2 border-purple-100 bg-gradient-to-br from-purple-50/50 to-white" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-purple-100 rounded-lg">
          <Brain className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
          Powered by OpenAI
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 mb-5 leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
        {insights.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        {insights.strengths.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Strengths
            </h4>
            <ul className="space-y-1.5">
              {insights.strengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Concerns */}
        {insights.concerns.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-amber-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Concerns
            </h4>
            <ul className="space-y-1.5">
              {insights.concerns.map((c, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interview Tips */}
      {insights.interviewTips.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-primary-700 flex items-center gap-1.5 mb-2">
            <MessageSquare className="w-4 h-4" />
            Interview Tips
          </h4>
          <ul className="space-y-1.5">
            {insights.interviewTips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Culture Fit & Salary */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.cultureFit && (
          <div className="p-3 bg-white rounded-lg border border-gray-100">
            <h4 className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
              <Users className="w-3.5 h-3.5" />
              Culture Fit
            </h4>
            <p className="text-sm text-gray-700">{insights.cultureFit}</p>
          </div>
        )}

        {insights.salaryRange && insights.salaryRange !== 'Not determinable' && (
          <div className="p-3 bg-white rounded-lg border border-gray-100">
            <h4 className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              Estimated Salary Range
            </h4>
            <p className="text-sm text-gray-700 font-medium">{insights.salaryRange}</p>
          </div>
        )}
      </div>
    </div>
  );
}
