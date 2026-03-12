import { useCallback, useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { formatFileSize } from '../utils/format';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export function FileUpload({ file, onFileChange, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled],
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
    [disabled, onFileChange],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onFileChange(selectedFile);
      }
    },
    [onFileChange],
  );

  const handleRemove = useCallback(() => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onFileChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Upload Resume</label>

      {file ? (
        <div className="flex items-center gap-3 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <FileText className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={disabled}
            className="p-1 hover:bg-primary-100 rounded-full transition-colors disabled:opacity-50"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg
            cursor-pointer transition-all duration-200
            ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Upload className="w-10 h-10 text-gray-400 mb-3" />
          <p className="text-sm font-medium text-gray-700">
            Drag & drop your resume here, or <span className="text-primary-600">browse</span>
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

function isValidFileType(file: File): boolean {
  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  return validTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.docx');
}
