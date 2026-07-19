import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MetallurgyStage { label: string; sub?: string; defect?: boolean; missed?: boolean }
export interface MetallurgyOriginProps {
  title?: string; citation?: string; schematicLabel?: string;
  stages: MetallurgyStage[];
  staggerSeconds?: number;
  backgroundColor?: string; boxColor?: string; defectColor?: string; textColor?: string; mutedColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;

export const MetallurgyOrigin: React.FC<MetallurgyOriginProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  stages = [], staggerSeconds = 1.1,
  backgroundColor = "#0D1117", boxColor = "#3A4A5A", defectColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = staggerSeconds * fps;
  const n = stages.length;
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  const boxW = 340, boxH = 220, gap = (W - 128 - n * boxW) / Math.max(1, n - 1);
  const cy = H * 0.48;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {stages.map((st, i) => {
          const x = 64 + i * (boxW + gap);
          const start = 8 + i * stagger;
          const appear = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 90 } });
          const slide = interpolate(appear, [0, 1], [30, 0]);
          const arrowShown = spring({ frame: frame - (start + stagger * 0.5), fps, config: { damping: 18 } });
          return (
            <g key={i}>
              {/* connecting arrow from previous box */}
              {i > 0 && (
                <g opacity={arrowShown}>
                  <line x1={x - gap} y1={cy} x2={x - 12} y2={cy} stroke={mutedColor} strokeWidth={2} />
                  <path d={`M ${x - 12} ${cy} l -14 -7 l 0 14 z`} fill={mutedColor} />
                </g>
              )}
              <g opacity={appear} transform={`translate(${slide}, 0)`}>
                <rect x={x} y={cy - boxH / 2} width={boxW} height={boxH} rx={10}
                      fill="none" stroke={st.defect ? defectColor : boxColor} strokeWidth={st.defect ? 3 : 2} />
                <text x={x + boxW / 2} y={cy - boxH / 2 - 20} textAnchor="middle" fill={mutedColor} fontSize={22}>{`step ${i + 1}`}</text>
                <text x={x + boxW / 2} y={cy - 20} textAnchor="middle" fill={textColor} fontSize={25} fontWeight={600}>{st.label}</text>
                {st.sub && wrap(st.sub).map((ln, k) => (
                  <text key={k} x={x + boxW / 2} y={cy + 24 + k * 28} textAnchor="middle" fill={st.missed ? defectColor : mutedColor} fontSize={22}>{ln}</text>
                ))}
                {/* defect marker */}
                {st.defect && <circle cx={x + boxW - 30} cy={cy - boxH / 2 + 30} r={9} fill={defectColor} />}
              </g>
            </g>
          );
        })}
      </svg>
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && (
        <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${boxColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9, fontFamily }}>{schematicLabel}</div>
      )}
      {citation && <div style={{ position: "absolute", bottom: 40, left: 64, color: mutedColor, fontSize: 22, fontFamily }}>{citation}</div>}
    </AbsoluteFill>
  );
};

function wrap(s: string): string[] {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 24) { lines.push(cur.trim()); cur = w; }
    else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 3);
}
