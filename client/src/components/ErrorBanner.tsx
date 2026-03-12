import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-700 flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-red-100 rounded-full transition-colors"
        aria-label="Dismiss error"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}
