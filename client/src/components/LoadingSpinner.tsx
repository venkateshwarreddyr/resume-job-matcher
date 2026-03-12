import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">Analyzing your resume...</p>
      <p className="text-sm text-gray-400 mt-1">Extracting skills and computing match score</p>
    </div>
  );
}
