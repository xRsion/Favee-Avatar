"use client";

interface ResultDisplayProps {
  imageBase64: string;
  mimeType: string;
  onReset: () => void;
}

export default function ResultDisplay({
  imageBase64,
  mimeType,
  onReset,
}: ResultDisplayProps) {
  const dataUrl = `data:${mimeType};base64,${imageBase64}`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = dataUrl;
    const ext = mimeType.split("/")[1] || "png";
    link.download = `favee-figure.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 animate-scale-in">
      {/* Package-style card */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-2xl border border-orange-100/50 relative">
        {/* Top label */}
        <div className="bg-gradient-to-r from-primary to-accent px-4 py-2.5 flex items-center justify-between">
          <span className="text-white text-xs font-bold tracking-wider uppercase">Favee Original</span>
          <span className="text-white/80 text-[10px]">Limited Edition</span>
        </div>

        {/* Image area */}
        <div className="p-5 pb-4 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="rounded-2xl overflow-hidden shadow-inner">
            <img
              src={dataUrl}
              alt="生成されたトイフィギュア"
              className="w-full"
            />
          </div>
        </div>

        {/* Bottom info */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-foreground/70">Your Custom Figure</p>
            <p className="text-[10px] text-muted mt-0.5">Powered by AI</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <span className="text-sm">✨</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={handleDownload}
          className="flex-1 py-3.5 px-6 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          保存する
        </button>
        <button
          onClick={onReset}
          className="py-3.5 px-5 bg-white text-foreground/60 font-bold rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all border border-foreground/10 flex items-center justify-center gap-1.5"
          aria-label="もう一度作る"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          <span className="text-sm">もう一度</span>
        </button>
      </div>
    </div>
  );
}
