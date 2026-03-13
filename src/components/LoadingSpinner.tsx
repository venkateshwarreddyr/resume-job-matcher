"use client";

import { useState, useEffect } from "react";

const STEPS = [
  "Parsing your resume...",
  "Extracting skills and experience...",
  "Analyzing job requirements...",
  "Comparing qualifications...",
  "Generating AI insights...",
  "Preparing recommendations...",
];

export default function LoadingSpinner() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center py-16 animate-in">
      {/* Animated spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Brain icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400 animate-pulse"
          >
            <path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3 3 3 0 0 0 1 5.2A4 4 0 0 0 10 20h4a4 4 0 0 0 4-4.8A3 3 0 0 0 19 10a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4Z" />
            <path d="M12 2v8" />
            <path d="m8 10 4-2 4 2" />
          </svg>
        </div>
      </div>

      {/* Step indicators */}
      <div className="space-y-3 w-full max-w-xs">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-3 text-sm transition-all duration-500 ${
              i < stepIndex
                ? "text-green-400"
                : i === stepIndex
                ? "text-blue-400"
                : "text-gray-600"
            }`}
          >
            {i < stepIndex ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : i === stepIndex ? (
              <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-600" />
            )}
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
