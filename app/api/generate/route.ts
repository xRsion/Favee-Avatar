import { NextRequest, NextResponse } from "next/server";
import { generateToyFigure } from "@/lib/gemini";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const TIMEOUT_MS = 60000;
const MAX_RETRIES = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mimeType } = body as {
      image: string;
      mimeType: string;
    };

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "画像データが不足しています" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: "対応していない画像形式です。JPEG、PNG、WebPのみ対応しています" },
        { status: 400 }
      );
    }

    // Check base64 size (roughly 4/3 of original)
    const estimatedSize = (image.length * 3) / 4;
    if (estimatedSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "ファイルサイズが大きすぎます（上限5MB）" },
        { status: 400 }
      );
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await Promise.race([
          generateToyFigure(image, mimeType),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("タイムアウトしました")), TIMEOUT_MS)
          ),
        ]);

        return NextResponse.json({
          image: result.imageBase64,
          mimeType: result.mimeType,
        });
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < MAX_RETRIES) {
          continue;
        }
      }
    }

    console.error("Generation failed:", lastError);
    return NextResponse.json(
      { error: "画像の生成に失敗しました。もう一度お試しください" },
      { status: 500 }
    );
  } catch (err) {
    console.error("Request error:", err);
    return NextResponse.json(
      { error: "リクエストの処理に失敗しました" },
      { status: 500 }
    );
  }
}
