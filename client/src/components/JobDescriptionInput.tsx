interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MAX_LENGTH = 10000;

export function JobDescriptionInput({ value, onChange, disabled }: JobDescriptionInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
        Job Description
      </label>
      <textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste the full job description here. Include requirements, qualifications, and responsibilities for the best match analysis..."
        rows={10}
        maxLength={MAX_LENGTH}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-vertical
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none
          disabled:bg-gray-100 disabled:cursor-not-allowed
          placeholder:text-gray-400 transition-colors"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{value.length < 50 ? `${50 - value.length} more characters needed` : 'Ready'}</span>
        <span>
          {value.length.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
