"use client";

import { useCallback, useRef, useState } from "react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isValidFileType(file: File): boolean {
  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return (
    validTypes.includes(file.type) ||
    file.name.endsWith(".pdf") ||
    file.name.endsWith(".docx")
  );
}

export default function FileUpload({
  file,
  onFileChange,
  disabled,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && isValidFileType(droppedFile)) {
        onFileChange(droppedFile);
      }
    },
    [disabled, onFileChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onFileChange(selectedFile);
      }
    },
    [onFileChange]
  );

  const handleRemove = useCallback(() => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [onFileChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Upload Resume
      </label>

      {file ? (
        <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          {/* FileText icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400 flex-shrink-0"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-400">
              {formatFileSize(file.size)}
            </p>
          </div>
          <button
            onClick={handleRemove}
            disabled={disabled}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Remove file"
          >
            {/* X icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl
            cursor-pointer transition-all duration-200
            ${
              isDragging
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 hover:border-blue-500/50 hover:bg-white/5"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {/* Upload icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 mb-3"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <p className="text-sm font-medium text-gray-300">
            Drag & drop your resume here, or{" "}
            <span className="text-blue-400">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF or DOCX, max 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
