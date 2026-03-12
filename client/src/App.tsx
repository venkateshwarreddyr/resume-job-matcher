import { FileUpload } from './components/FileUpload';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { AnalyzeButton } from './components/AnalyzeButton';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ErrorBanner } from './components/ErrorBanner';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useAnalyze } from './hooks/useAnalyze';
import { FileSearch } from 'lucide-react';

export default function App() {
  const {
    file,
    jobDescription,
    result,
    isLoading,
    error,
    canAnalyze,
    setFile,
    setJobDescription,
    analyze,
    reset,
  } = useAnalyze();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileSearch className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Resume Job Matcher</h1>
              <p className="text-sm text-gray-500">
                Upload your resume and job description to get an instant match analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6">
            <ErrorBanner message={error} onDismiss={() => setFile(file)} />
          </div>
        )}

        {result ? (
          <ResultsDashboard result={result} onReset={reset} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload & Configure</h2>
                <div className="space-y-6">
                  <FileUpload file={file} onFileChange={setFile} disabled={isLoading} />
                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={setJobDescription}
                    disabled={isLoading}
                  />
                  <AnalyzeButton onClick={analyze} disabled={!canAnalyze} isLoading={isLoading} />
                </div>
              </div>
            </div>

            {/* Preview/Loading Panel */}
            <div>
              {isLoading ? (
                <div className="card">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="card flex flex-col items-center justify-center py-16 text-center">
                  <FileSearch className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-sm text-gray-400 max-w-sm">
                    Upload your resume and paste the job description, then click
                    "Analyze Match" to see your compatibility score and detailed breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-400 text-center">
            Resume Job Matcher - All analysis is performed locally. Your data is never stored.
          </p>
        </div>
      </footer>
    </div>
  );
}
