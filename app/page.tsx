"use client";

import { useState, useCallback, useRef } from "react";
import PhotoUploader from "@/components/PhotoUploader";
import GeneratingLoader from "@/components/GeneratingLoader";
import ResultDisplay from "@/components/ResultDisplay";

type AppState = "idle" | "uploaded" | "generating" | "result";

interface GeneratedImage {
  imageBase64: string;
  mimeType: string;
}

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [uploadedImage, setUploadedImage] = useState<{
    base64: string;
    mimeType: string;
  } | null>(null);
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleUpload = useCallback((base64: string, mimeType: string) => {
    setUploadedImage({ base64, mimeType });
    setState("uploaded");
    setError(null);
  }, []);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    setState("generating");
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedImage.base64,
          mimeType: uploadedImage.mimeType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "生成に失敗しました");
      }

      setResult({ imageBase64: data.image, mimeType: data.mimeType });
      setState("result");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "エラーが発生しました。もう一度お試しください"
      );
      setState("uploaded");
    }
  };

  const handleReset = () => {
    setState("idle");
    setUploadedImage(null);
    setResult(null);
    setError(null);
  };

  const currentStep = state === "idle" ? 0 : state === "uploaded" ? 1 : state === "generating" ? 2 : 3;

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Background decorations - contained within main column */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 blob-orange rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 blob-purple rounded-full pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* ===== COMMON HEADER ===== */}
        <div className="flex flex-col items-center pt-12 pb-12 px-3">
          <h1>
            <img src="/favee_ja.png" alt="Favee" className="h-10 w-auto" />
          </h1>
          <p className="text-[11px] text-muted mt-1.5 font-medium tracking-wide">
            AVATAR GENERATOR
          </p>
        </div>

        {/* ===== HERO SECTION ===== */}
        {(state === "idle" || state === "uploaded") && (
          <section className="px-3 pb-8">

            {/* Before → After showcase */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-center gap-3">
                {/* Before */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-gray-100">
                    <img
                      src="/examples/before.png"
                      alt="変身前の写真"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-muted font-medium">あなたの写真</span>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-1 px-1">
                  <div className="animate-arrow-bounce text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                  <span className="text-[9px] text-muted/60 font-bold">変身</span>
                </div>

                {/* After */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white animate-float">
                    <img
                      src="/examples/after.jpeg"
                      alt="完成フィギュアの例"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-primary font-bold">Faveeアバター！</span>
                </div>
              </div>
            </div>

            {/* Catchcopy */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground/85 leading-relaxed">
                あなたの写真が<br />
                <span className="text-primary">Favee風アバター</span>に大変身！
              </h2>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                写真を1枚アップロードするだけで<br />
                あなただけのアバターが完成します
              </p>
            </div>

            {/* CTA if no image yet */}
            {state === "idle" && (
              <div className="max-w-md mx-auto">
                <button
                  onClick={scrollToUpload}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  さっそく作ってみる
                </button>
              </div>
            )}
          </section>
        )}

        {/* ===== STEP INDICATOR ===== */}
        {state !== "result" && (
          <div className="px-3 py-4">
            <div className="max-w-md mx-auto flex items-center justify-between">
              {[
                { num: 1, label: "写真を選ぶ" },
                { num: 2, label: "生成中" },
                { num: 3, label: "完成！" },
              ].map((step, i) => (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                        ${currentStep >= step.num
                          ? "bg-gradient-to-br from-primary to-accent text-white shadow-md"
                          : "bg-foreground/5 text-muted/50"
                        }`}
                    >
                      {currentStep > step.num ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        step.num
                      )}
                    </div>
                    <span className={`text-[10px] font-medium transition-colors duration-500 ${currentStep >= step.num ? "text-primary" : "text-muted/40"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-12 h-0.5 mx-1.5 rounded-full bg-foreground/5 overflow-hidden mb-4">
                      <div
                        className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 rounded-full ${currentStep > step.num ? "w-full" : "w-0"}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 px-3 pb-8">
          <div className="max-w-md mx-auto">

            {/* Upload state */}
            {(state === "idle" || state === "uploaded") && (
              <div ref={uploadSectionRef} className="space-y-4 animate-fade-in-up">
                <PhotoUploader
                  onUpload={handleUpload}
                  hasImage={!!uploadedImage}
                />

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-center">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                {state === "uploaded" && (
                  <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    アバターを生成する
                  </button>
                )}
              </div>
            )}

            {/* Generating state */}
            {state === "generating" && <GeneratingLoader />}

            {/* Result state */}
            {state === "result" && result && (
              <div>
                <ResultDisplay
                  imageBase64={result.imageBase64}
                  mimeType={result.mimeType}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="py-5 px-3">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <p className="text-[10px] text-muted/40 font-medium">
              &copy; Favee
            </p>
            <a
              href="https://favee.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-muted/40 font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              Faveeアプリ
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
