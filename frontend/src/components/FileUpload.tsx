"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
}

export function FileUpload({
  value,
  onChange,
  onBlur,
  disabled = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  },
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      onChange(file as File);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file as File);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize,
      accept,
      disabled,
      maxFiles: 1,
    });

  const removeFile = () => {
    onChange(null);
    setPreview(null);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.name} className="mt-2 text-sm text-destructive">
      {errors.map((e) => (
        <p key={e.code}>{e.message}</p>
      ))}
    </div>
  ));

  return (
    <div className="space-y-2">
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onBlur={onBlur}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">
              {isDragActive
                ? "Drop the file here"
                : "Drag & drop file here or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF (max. 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={removeFile}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-foreground hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {fileRejectionItems}
    </div>
  );
}
