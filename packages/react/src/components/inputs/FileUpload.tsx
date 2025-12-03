// FileUpload: file upload component with drag & drop.

import { useState, useRef, forwardRef } from "react";

export interface FileUploadProps {
  /** Change handler with files. */
  onChange?: (files: File[]) => void;
  /** Field name. */
  name?: string;
  /** Accepted file types (e.g., "image/*,.pdf"). */
  accept?: string;
  /** Allow multiple files. */
  multiple?: boolean;
  /** Maximum file size in bytes. */
  maxSize?: number;
  /** Maximum number of files. */
  maxFiles?: number;
  /** Whether disabled. */
  disabled?: boolean;
  /** Whether has error. */
  hasError?: boolean;
  /** Custom label text. */
  label?: string;
  /** Helper text. */
  helperText?: string;
  /** Additional CSS class. */
  className?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      onChange,
      name,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      disabled = false,
      hasError = false,
      label = "Drop files here or click to upload",
      helperText,
      className = "",
    },
    ref
  ) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFiles = (fileList: File[]): { valid: File[]; error: string | null } => {
      let validFiles = fileList;
      let errorMsg: string | null = null;

      // Check max files
      if (maxFiles && validFiles.length > maxFiles) {
        validFiles = validFiles.slice(0, maxFiles);
        errorMsg = `Maximum ${maxFiles} file(s) allowed`;
      }

      // Check file sizes
      if (maxSize) {
        const oversized = validFiles.filter(f => f.size > maxSize);
        if (oversized.length > 0) {
          validFiles = validFiles.filter(f => f.size <= maxSize);
          errorMsg = `Some files exceed the maximum size of ${formatBytes(maxSize)}`;
        }
      }

      return { valid: validFiles, error: errorMsg };
    };

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;
      
      const newFiles = Array.from(fileList);
      const { valid, error: validationError } = validateFiles(
        multiple ? [...files, ...newFiles] : newFiles
      );

      setError(validationError);
      setFiles(valid);
      onChange?.(valid);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleRemove = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onChange?.(newFiles);
    };

    const borderColor = hasError || error
      ? "border-red-500"
      : isDragging
      ? "border-blue-500 bg-blue-50"
      : "border-gray-300 hover:border-gray-400";

    return (
      <div className={className}>
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors ${borderColor}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
            className="sr-only"
          />

          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>

          <p className="mt-2 text-sm text-gray-600">{label}</p>
          {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">({formatBytes(file.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
