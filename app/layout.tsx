import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Favee風アバタージェネレーター",
  description: "あなたの写真がかわいいFavee風アバターに変身します",
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
                  href="https://apps.apple.com/app/id6756901256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-85 transition-opacity"
                >
                  <img src="/app-store.png" alt="App Storeからダウンロード" className="h-10 w-auto" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=jp.co.xrsion.favee"
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
          <div className="w-full lg:w-[540px] lg:min-w-[540px] lg:h-screen lg:overflow-y-auto flex flex-col bg-background relative">
            {children}
          </div>

          {/* Right sidebar - scrolling avatar gallery */}
          <div className="hidden lg:flex lg:flex-1 bg-sidebar sticky top-0 h-screen overflow-hidden items-center justify-center">
            <div className="flex gap-10 h-full">
              {/* Column 1 - scrolls down */}
              <div className="w-36 overflow-hidden">
                <div className="animate-scroll-down flex flex-col gap-4">
                  {[...Array(2)].map((_, setIdx) => (
                    <div key={setIdx} className="flex flex-col gap-4">
                      {["/samples/sample1.jpeg", "/samples/sample3.jpeg", "/samples/sample5.jpeg", "/samples/sample7.jpeg", "/samples/sample9.jpeg", "/samples/sample11.jpeg"].map((src, i) => (
                        <div key={`${setIdx}-${i}`} className="w-36 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white/80 shrink-0">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Column 2 - scrolls up */}
              <div className="w-36 overflow-hidden">
                <div className="animate-scroll-up flex flex-col gap-4">
                  {[...Array(2)].map((_, setIdx) => (
                    <div key={setIdx} className="flex flex-col gap-4">
                      {["/samples/sample4.jpeg", "/samples/sample6.jpeg", "/samples/sample8.jpeg", "/samples/sample10.jpeg", "/samples/sample12.jpeg"].map((src, i) => (
                        <div key={`${setIdx}-${i}`} className="w-36 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white/80 shrink-0">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
