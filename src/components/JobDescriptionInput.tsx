"use client";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MAX_LENGTH = 10000;

export default function JobDescriptionInput({
  value,
  onChange,
  disabled,
}: JobDescriptionInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="job-description"
        className="block text-sm font-medium text-gray-300"
      >
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
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white resize-vertical
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-gray-500 transition-colors"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {value.length < 50
            ? `${50 - value.length} more characters needed`
            : "Ready"}
        </span>
        <span>
          {value.length.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
