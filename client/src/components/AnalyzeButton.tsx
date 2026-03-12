import { Search, Loader2 } from 'lucide-react';

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export function AnalyzeButton({ onClick, disabled, isLoading }: AnalyzeButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled || isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Analyzing...</span>
        </>
      ) : (
        <>
          <Search className="w-5 h-5" />
          <span>Analyze Match</span>
        </>
      )}
    </button>
  );
}
