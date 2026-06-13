import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Webbdev Studio — moderna, snabba hemsidor med Next.js";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Hämtar en font från Google Fonts vid byggtid så att ImageResponse kan rendera
 * skarp text. Returnerar null om hämtningen misslyckas — då används systemfonten.
 */
async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`;
  try {
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
    )?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

// Image generation
export default async function Image() {
  const title = "Webbdev Studio";
  const tagline = "Moderna, snabba hemsidor — Next.js · React · Tailwind";
  const allText = title + tagline + "webbdev.se · Leverans på 3–7 dagar";

  const [bold, regular] = await Promise.all([
    loadGoogleFont("Inter", 700, allText),
    loadGoogleFont("Inter", 400, allText),
  ]);

  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#06060f",
          fontFamily: fonts.length ? "Inter" : "sans-serif",
          position: "relative",
        }}
      >
        {/* Mjuk indigo/cyan-glöd i hörnen */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -150,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -120,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 70%)",
            display: "flex",
          }}
        />

        {/* Liten etikett */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "linear-gradient(90deg, #818cf8, #22d3ee)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9aa0c4",
              display: "flex",
            }}
          >
            Webbutveckling
          </div>
        </div>

        {/* Titel med gradient */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.05,
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #c7d2fe 55%, #22d3ee 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            fontWeight: 400,
            color: "#c4c8e6",
            maxWidth: 900,
            lineHeight: 1.3,
            display: "flex",
          }}
        >
          {tagline}
        </div>

        {/* Footer-rad */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 96,
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            color: "#7b80a6",
          }}
        >
          webbdev.se · Leverans på 3–7 dagar
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
