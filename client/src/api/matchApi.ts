import axios from 'axios';
import { MatchResult } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

export async function analyzeResume(file: File, jobDescription: string): Promise<MatchResult> {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  const { data } = await api.post<MatchResult>('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}
