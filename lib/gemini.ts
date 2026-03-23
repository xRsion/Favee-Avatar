import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export const PROMPT_TEXT = `The first two images are REFERENCE toy figures — use them as the PRIMARY style guide. The third image is the PERSON to transform.

Match the exact visual style of the reference figures including: face design (eyes, nose, mouth, eyebrows), head-to-body proportions, body shape, and overall matte vinyl toy aesthetic. Then apply that style to the person in the third image.

**What to take from the REFERENCE images:**
- Face: replicate the exact same eye shape, eye size, eye spacing, nose, mouth, and eyebrow style from the references — every character must have the same face as the references
- Body proportions: match the same head-to-body ratio and limb length as the references
- Body shape: match the same slim, compact build as the references
- Surface finish: match the same matte skin and clothing texture as the references
- Overall toy aesthetic: the result should look like it belongs in the same product line as the references
- Do NOT take skin color from the references — skin tone must come only from the person's photo

**What to take from the PERSON's photo:**
- Skin tone — THIS IS CRITICAL: match the person's exact skin tone from their photo, do NOT borrow or blend skin color from the reference toy figures. The references are for style only, never for skin color
- Hairstyle and hair color
- Clothing, accessories, shoes, and any text/branding on the outfit
- If parts of the outfit are not visible in the photo, fill in with simple, plain clothing that matches the visible outfit's color and style
- Distinctive features: if the person has any of the following that are clearly prominent and noticeable in the photo, reproduce them on the toy figure in a simplified, stylized way. Only include features that are obviously visible — ignore subtle, faint, or barely noticeable ones:
  - Facial hair (beard, mustache, goatee) → only if thick, full, and clearly intentional. Do NOT reproduce light stubble, thin peach fuzz, or faint shadow
  - Moles, beauty marks → only if clearly visible and prominent. Ignore tiny or faint ones
  - Freckles → only if dense and a defining feature of the person's face
  - Glasses → miniature toy-like style
  - Piercings → only if clearly visible
  - Scars → only if large and prominent
  - Tattoos → only if clearly visible. Flat, simplified shapes keeping overall design, placement, and color

**Rules:**
- Face must be 100% identical across all characters regardless of age, gender, or ethnicity — only skin tone, hair, clothing, and distinctive features change
- Skin must be completely smooth with ZERO wrinkles or age lines, regardless of the person's actual age
- If eyebrows are visible in the person's photo, include them. If not, do not add them
- Mouth must always be present — a small gentle smile, never omit it
- Perfectly straight front-facing view, symmetrical, camera at eye level
- Head facing exactly forward, no tilt, no turn, no 3/4 angle
- Pure white background, no shadows, no base or pedestal

**Do NOT:**
- Do NOT change or interpret the face design — copy it exactly from the references
- Do NOT copy skin color from the reference images — always use the person's actual skin tone
- Do NOT omit the mouth or eyebrows
- No wrinkles, age lines, or skin texture
- No eyelashes
- No glossy or shiny skin or clothing
- No side angle or 3/4 view
- No long limbs — keep proportions matching the references`;

let cachedRef1: string | null = null;
let cachedRef2: string | null = null;

function loadReferenceImages(): { ref1: string; ref2: string } {
  if (cachedRef1 && cachedRef2) {
    return { ref1: cachedRef1, ref2: cachedRef2 };
  }

  const refDir = path.join(process.cwd(), "public", "references");
  cachedRef1 = fs.readFileSync(path.join(refDir, "ref1.png")).toString("base64");
  cachedRef2 = fs.readFileSync(path.join(refDir, "ref2.png")).toString("base64");

  return { ref1: cachedRef1, ref2: cachedRef2 };
}

export async function generateToyFigure(
  userPhotoBase64: string,
  userPhotoMimeType: string
): Promise<{ imageBase64: string; mimeType: string }> {
  const { ref1, ref2 } = loadReferenceImages();

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [
      {
        role: "user",
        parts: [
          { text: PROMPT_TEXT },
          {
            inlineData: {
              mimeType: "image/png",
              data: ref1,
            },
          },
          {
            inlineData: {
              mimeType: "image/png",
              data: ref2,
            },
          },
          {
            inlineData: {
              mimeType: userPhotoMimeType as "image/jpeg" | "image/png" | "image/webp",
              data: userPhotoBase64,
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No response from Gemini API");
  }

  const parts = candidates[0].content?.parts;
  if (!parts) {
    throw new Error("No content in response");
  }

  for (const part of parts) {
    if (part.inlineData) {
      return {
        imageBase64: part.inlineData.data!,
        mimeType: part.inlineData.mimeType!,
      };
    }
  }

  throw new Error("No image generated in response");
}
