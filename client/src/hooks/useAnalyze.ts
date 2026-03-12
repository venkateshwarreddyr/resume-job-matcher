import { useState, useCallback } from 'react';
import { MatchResult } from '../types';
import { analyzeResume } from '../api/matchApi';
import axios from 'axios';

interface AnalyzeState {
  file: File | null;
  jobDescription: string;
  result: MatchResult | null;
  isLoading: boolean;
  error: string | null;
}

export function useAnalyze() {
  const [state, setState] = useState<AnalyzeState>({
    file: null,
    jobDescription: '',
    result: null,
    isLoading: false,
    error: null,
  });

  const setFile = useCallback((file: File | null) => {
    setState((s) => ({ ...s, file, error: null }));
  }, []);

  const setJobDescription = useCallback((jobDescription: string) => {
    setState((s) => ({ ...s, jobDescription, error: null }));
  }, []);

  const analyze = useCallback(async () => {
    if (!state.file || !state.jobDescription) return;

    setState((s) => ({ ...s, isLoading: true, error: null, result: null }));

    try {
      const result = await analyzeResume(state.file, state.jobDescription);
      setState((s) => ({ ...s, result, isLoading: false }));
    } catch (err) {
      let message = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setState((s) => ({ ...s, error: message, isLoading: false }));
    }
  }, [state.file, state.jobDescription]);

  const reset = useCallback(() => {
    setState({
      file: null,
      jobDescription: '',
      result: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    setFile,
    setJobDescription,
    analyze,
    reset,
    canAnalyze: !!state.file && state.jobDescription.length >= 50 && !state.isLoading,
  };
}
