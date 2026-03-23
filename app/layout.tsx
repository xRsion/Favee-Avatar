import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Favee - トイフィギュアジェネレーター",
  description: "あなたの写真をかわいいビニールトイフィギュア風に変換します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="h-full">
        {/* PC: 3-column layout with fixed sidebars */}
        <div className="h-full flex">
          {/* Left sidebar - Favee app promotion */}
          <div className="hidden lg:flex lg:flex-1 bg-sidebar sticky top-0 h-screen items-center justify-end">
            <div className="w-full max-w-[380px] pr-12 pl-8">
              {/* Catchcopy */}
              <p className="text-lg font-bold text-foreground/80 leading-relaxed mb-5">
                手のひらに、<br />もう一つのマイルームを。
              </p>

              {/* Favee logo */}
              <img src="/favee_ja.png" alt="Favee" className="h-10 w-auto mb-6" />

              {/* Description */}
              <div className="mb-6">
                <p className="text-[13px] font-bold text-foreground/70 mb-2">
                  デジタルグッズを「集める・飾る・見せる」
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  リアルな空間に収まりきらない「好き」を、<br />
                  スマホの中のもう一つの部屋へ
                </p>
              </div>

              {/* CTA + Store buttons */}
              <p className="text-[11px] font-bold text-foreground/50 mb-3">
                まずは無料でダウンロード
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://favee.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-85 transition-opacity"
                >
                  <img src="/app-store.png" alt="App Storeからダウンロード" className="h-10 w-auto" />
                </a>
                <a
                  href="https://favee.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-85 transition-opacity"
                >
                  <img src="/google-play.png" alt="Google Playで手に入れよう" className="h-10 w-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Main content - scrollable, max 540px */}
          <div className="w-full lg:w-[540px] lg:min-w-[540px] min-h-full flex flex-col bg-background relative">
            {children}
          </div>

          {/* Right sidebar - fixed, hidden on mobile */}
          <div className="hidden lg:block lg:flex-1 bg-sidebar sticky top-0 h-screen" />
        </div>
      </body>
    </html>
  );
}
