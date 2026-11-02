import { ImageResponse } from "next/og";

export const alt = "NAGMA.EXE: Nagma, Full Stack Engineer and AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const ring = (rotate: number) => ({
    position: "absolute" as const,
    width: 420,
    height: 140,
    borderRadius: "50%",
    border: "4px solid #8F7BFF",
    transform: `rotate(${rotate}deg)`,
  });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 78% 42%, #2a2360 0%, #0e0f16 55%)",
          color: "#F1EADB",
          padding: 72,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ fontSize: 30, color: "#7CD6BC", display: "flex" }}>nagma.exe</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700 }}>Nagma</div>
            <div style={{ fontSize: 40, marginTop: 18, color: "#c9c3b6" }}>Full Stack Engineer · AI Builder</div>
          </div>
          <div style={{ fontSize: 26, color: "#9C9AB2", display: "flex" }}>
            React · Next.js · Node.js · TypeScript · Generative AI
          </div>
        </div>
        <div style={{ position: "absolute", right: 90, top: 245, width: 420, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={ring(0)} />
          <div style={ring(60)} />
          <div style={ring(-60)} />
          <div style={{ width: 34, height: 34, borderRadius: 17, background: "#7CD6BC" }} />
        </div>
      </div>
    ),
    size,
  );
}
