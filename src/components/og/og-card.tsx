// Shared 1200×630 share-preview layout for next/og ImageResponse.
// Latin text only: the default OG font has no Hangul glyphs.
export const OG_SIZE = { width: 1200, height: 630 };

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (Math.sin(i * 127.1) * 0.5 + 0.5) * 1200,
  y: (Math.sin(i * 311.7) * 0.5 + 0.5) * 630,
  r: (Math.abs(Math.sin(i * 51.3)) * 2 + 1).toFixed(1),
  o: (Math.abs(Math.sin(i * 73.1)) * 0.6 + 0.2).toFixed(2),
}));

export default function OgCard({
  eyebrow,
  title,
  subtitle,
  tags,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(124,58,237,0.5), transparent 55%), radial-gradient(circle at 5% 95%, rgba(59,130,246,0.3), transparent 55%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: Number(s.r),
            height: Number(s.r),
            borderRadius: 9999,
            background: `rgba(244,244,255,${s.o})`,
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#a78bfa" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 38, color: "#d4d4d8" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", maxWidth: 820 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 22,
                  color: "#e4e4e7",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>vincedev.kr</div>
        </div>
      </div>
    </div>
  );
}
