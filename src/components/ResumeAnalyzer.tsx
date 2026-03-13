"use client";

import { useState, useCallback } from "react";
import { MatchResult } from "@/types";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze =
    !!file && jobDescription.length >= 50 && !isLoading;

  const handleFileChange = useCallback((f: File | null) => {
    setFile(f);
    setError(null);
  }, []);

  const handleJobDescriptionChange = useCallback((v: string) => {
    setJobDescription(v);
    setError(null);
  }, []);

  const analyze = useCallback(async () => {
    if (!file || !jobDescription) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred.");
      }

      setResult(data as MatchResult);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [file, jobDescription]);

  const reset = useCallback(() => {
    setFile(null);
    setJobDescription("");
    setResult(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return (
    <section id="analyzer" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Analyze Your Resume
          </h2>
          <p className="text-gray-400">
            Upload your resume and paste the job description to get an instant
            AI-powered match analysis.
          </p>
        </div>

        {result ? (
          <ResultsDashboard result={result} onReset={reset} />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
              <div className="space-y-6">
                <FileUpload
                  file={file}
                  onFileChange={handleFileChange}
                  disabled={isLoading}
                />
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                {/* AlertCircle icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={analyze}
              disabled={!canAnalyze}
              className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-blue-500/25"
            >
              {/* Search icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Analyze Match
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
