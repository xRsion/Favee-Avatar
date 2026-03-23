"use client";

import { useCallback, useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface PhotoUploaderProps {
  onUpload: (base64: string, mimeType: string) => void;
  hasImage: boolean;
}

export default function PhotoUploader({ onUpload, hasImage }: PhotoUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("JPEG、PNG、WebP形式の画像を選択してください");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("ファイルサイズは5MB以下にしてください");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        const base64 = dataUrl.split(",")[1];
        onUpload(base64, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleClick = () => inputRef.current?.click();

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed
            flex flex-col items-center justify-center gap-3 p-8
            transition-all duration-300 min-h-[200px]
            ${dragActive
              ? "border-primary bg-orange-50/80 scale-[1.02] shadow-lg"
              : "border-gray-300/80 bg-white/60 hover:border-primary-light hover:bg-white/80 hover:shadow-md"
            }
          `}
        >
          {/* Upload icon */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-transform duration-300 ${dragActive ? "scale-110" : ""}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-bold text-[15px] text-foreground/80">
              写真をアップロード
            </p>
            <p className="text-xs text-muted mt-1">
              タップして選択 or ドラッグ&ドロップ
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-muted/60 bg-foreground/5 px-2 py-0.5 rounded-full">JPEG</span>
            <span className="text-[10px] text-muted/60 bg-foreground/5 px-2 py-0.5 rounded-full">PNG</span>
            <span className="text-[10px] text-muted/60 bg-foreground/5 px-2 py-0.5 rounded-full">WebP</span>
            <span className="text-[10px] text-muted/60">5MBまで</span>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg group">
          <img
            src={preview}
            alt="アップロードされた写真"
            className="w-full max-h-64 object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-xs transition-all backdrop-blur-sm"
            aria-label="写真を削除"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
