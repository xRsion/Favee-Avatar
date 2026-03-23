"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "写真を分析しています...",
  "フィギュアのスタイルを適用中...",
  "細部を仕上げています...",
  "もうすぐ完成です...",
];

export default function GeneratingLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8 animate-fade-in-up">
      {/* Figure animation */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-ring" />
        <div className="absolute inset-0 rounded-full border-2 border-accent/15 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: "1.2s" }} />

        {/* Center figure */}
        <div className="relative z-10 animate-wiggle">
          <svg
            viewBox="0 0 80 120"
            className="w-16 h-24 drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="24" r="20" fill="#FFB088" />
            <rect x="24" y="44" width="32" height="38" rx="8" fill="var(--primary)" />
            <rect x="12" y="47" width="12" height="28" rx="6" fill="#FFB088" />
            <rect x="56" y="47" width="12" height="28" rx="6" fill="#FFB088" />
            <rect x="26" y="78" width="12" height="28" rx="6" fill="#FFB088" />
            <rect x="42" y="78" width="12" height="28" rx="6" fill="#FFB088" />
            <circle cx="34" cy="22" r="2.5" fill="#2d2424" />
            <circle cx="46" cy="22" r="2.5" fill="#2d2424" />
            <path d="M36 30 Q40 34 44 30" stroke="#2d2424" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Progress message */}
      <div className="text-center space-y-2">
        <p className="text-base font-bold text-foreground/80 transition-all duration-500">
          {MESSAGES[messageIndex]}
        </p>
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce-slow"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Shimmer bar */}
      <div className="w-48 h-1.5 rounded-full overflow-hidden bg-foreground/5">
        <div className="h-full rounded-full animate-shimmer" />
      </div>
    </div>
  );
}
