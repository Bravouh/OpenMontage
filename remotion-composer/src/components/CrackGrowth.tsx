import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CrackStage { at: number; label: string; sub?: string; flag?: boolean }
export interface CrackGrowthProps {
  title?: string; citation?: string; schematicLabel?: string;
  originLabel?: string;
  stages: CrackStage[];
  growSeconds?: number;
  backgroundColor?: string; boreColor?: string; crackColor?: string; accentColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;
const px = (x: number) => x * W, py = (y: number) => y * H;
const BORE_Y = 0.40, X0 = 0.12, X1 = 0.84;

export const CrackGrowth: React.FC<CrackGrowthProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  originLabel = "hard-alpha defect (origin)", stages = [], growSeconds,
  backgroundColor = "#0D1117", boreColor = "#3A4A5A", crackColor = "#E5484D", accentColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const growFrames = (growSeconds ?? Math.max(1, durationInFrames / fps - 1.5)) * fps;
  const progress = interpolate(frame, [8, growFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tipX = X0 + progress * (X1 - X0);
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  // inset fatigue curve (cycles vs crack length), bottom-right
  const ix = px(0.66), iy = py(0.68), iw = px(0.20), ih = py(0.16);
  const curvePts = Array.from({ length: 30 }, (_, k) => {
    const t = k / 29;
    return { X: ix + t * iw, Y: iy + ih - Math.pow(t, 2.4) * ih };
  });
  const curveShown = Math.round(progress * 29);

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* bore surface */}
        <line x1={px(X0)} y1={py(BORE_Y)} x2={px(X1)} y2={py(BORE_Y)} stroke={boreColor} strokeWidth={4} />
        <text x={px(X1)} y={py(BORE_Y) + 40} textAnchor="end" fill={mutedColor} fontSize={22}>stage-1 fan disk bore surface</text>
        {/* defect origin */}
        <circle cx={px(X0)} cy={py(BORE_Y)} r={9} fill={accentColor} />
        <text x={px(X0)} y={py(BORE_Y) + 40} fill={accentColor} fontSize={22}>{originLabel}</text>
        {/* growing crack */}
        <line x1={px(X0)} y1={py(BORE_Y)} x2={px(tipX)} y2={py(BORE_Y)} stroke={crackColor} strokeWidth={9} strokeLinecap="round" />
        {progress > 0.01 && progress < 0.999 && <circle cx={px(tipX)} cy={py(BORE_Y)} r={6} fill={crackColor} />}
        {/* stage markers (alternate above/below) */}
        {stages.map((st, i) => {
          const sx = X0 + st.at * (X1 - X0);
          const shown = progress >= st.at;
          const s = shown ? spring({ frame: frame - st.at * growFrames, fps, config: { damping: 16 } }) : 0;
          const above = i % 2 === 0;
          const dy = above ? -46 : 60;
          const c = st.flag ? accentColor : mutedColor;
          return (
            <g key={i} opacity={s}>
              <line x1={px(sx)} y1={py(BORE_Y)} x2={px(sx)} y2={py(BORE_Y) + dy} stroke={c} strokeWidth={2} />
              <circle cx={px(sx)} cy={py(BORE_Y) + dy} r={5} fill={c} />
              <text x={px(sx)} y={py(BORE_Y) + dy + (above ? -12 : 26)} textAnchor="middle" fill={st.flag ? accentColor : textColor} fontSize={24} fontWeight={st.flag ? 700 : 500}>{st.label}</text>
              {st.sub && <text x={px(sx)} y={py(BORE_Y) + dy + (above ? -12 : 26) + 26} textAnchor="middle" fill={mutedColor} fontSize={20}>{st.sub}</text>}
            </g>
          );
        })}
        {/* fatigue curve inset */}
        <rect x={ix - 16} y={iy - 34} width={iw + 32} height={ih + 60} rx={6} fill="none" stroke={boreColor} strokeWidth={1} opacity={0.5} />
        <text x={ix} y={iy - 12} fill={mutedColor} fontSize={20}>crack length vs engine cycles</text>
        <line x1={ix} y1={iy} x2={ix} y2={iy + ih} stroke={mutedColor} strokeWidth={1} />
        <line x1={ix} y1={iy + ih} x2={ix + iw} y2={iy + ih} stroke={mutedColor} strokeWidth={1} />
        <path d={curvePts.slice(0, curveShown + 1).map((p, k) => `${k ? "L" : "M"} ${p.X.toFixed(1)} ${p.Y.toFixed(1)}`).join(" ")}
              fill="none" stroke={crackColor} strokeWidth={3} />
      </svg>
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && (
        <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${boreColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9, fontFamily }}>{schematicLabel}</div>
      )}
      {citation && <div style={{ position: "absolute", bottom: 40, left: 64, color: mutedColor, fontSize: 22, fontFamily }}>{citation}</div>}
    </AbsoluteFill>
  );
};
