export function getScoreColor(score: number): string {
  if (score >= 76) return '#22c55e'; // green
  if (score >= 61) return '#eab308'; // yellow
  if (score >= 41) return '#f97316'; // orange
  return '#ef4444'; // red
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent Match';
  if (score >= 76) return 'Strong Match';
  if (score >= 61) return 'Good Match';
  if (score >= 41) return 'Moderate Match';
  if (score >= 20) return 'Weak Match';
  return 'Poor Match';
}

export function getScoreBgClass(score: number): string {
  if (score >= 76) return 'bg-green-50 border-green-200';
  if (score >= 61) return 'bg-yellow-50 border-yellow-200';
  if (score >= 41) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
