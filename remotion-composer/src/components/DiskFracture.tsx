import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DiskFractureProps {
  title?: string; citation?: string; schematicLabel?: string;
  diskLabel?: string;
  crackSeconds?: number;   // when crack reaches rim / disk lets go (seconds)
  fragments?: number;
  backgroundColor?: string; diskColor?: string; casingColor?: string; crackColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;
const CX = W * 0.42, CY = H * 0.52, R = 300, CASING = 380;

export const DiskFracture: React.FC<DiskFractureProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  diskLabel = "stage-1 fan disk (titanium)", crackSeconds, fragments = 3,
  backgroundColor = "#0D1117", diskColor = "#6AA9C9", casingColor = "#3A4A5A", crackColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const total = durationInFrames / fps;
  const crackAt = (crackSeconds ?? total * 0.5) * fps;

  // phase 1: crack grows from bore to rim (before crackAt)
  const crackProg = interpolate(frame, [10, crackAt], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // phase 2: liberation — fragments fly outward (after crackAt)
  const burst = frame >= crackAt ? spring({ frame: frame - crackAt, fps, config: { damping: 16, stiffness: 60 } }) : 0;
  const spin = interpolate(frame, [0, crackAt], [0, 40], { extrapolateRight: "clamp" });
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  // fan-blade ticks
  const blades = Array.from({ length: 28 }, (_, i) => (i / 28) * Math.PI * 2);
  const crackAngle = -Math.PI / 2.6;
  const crackTip = R * crackProg;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* engine casing ring */}
        <circle cx={CX} cy={CY} r={CASING} fill="none" stroke={casingColor} strokeWidth={3} strokeDasharray="2 10" opacity={burst > 0.15 ? 0.35 : 0.7} />
        <text x={CX} y={CY - CASING - 18} textAnchor="middle" fill={mutedColor} fontSize={22}>engine casing (containment)</text>

        {/* intact disk (fades as it lets go) */}
        <g opacity={1 - Math.min(0.6, burst)} transform={`rotate(${spin} ${CX} ${CY})`}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={diskColor} strokeWidth={5} />
          <circle cx={CX} cy={CY} r={R * 0.22} fill="none" stroke={diskColor} strokeWidth={4} />
          {blades.map((a, i) => (
            <line key={i} x1={CX + Math.cos(a) * R} y1={CY + Math.sin(a) * R} x2={CX + Math.cos(a) * (R + 26)} y2={CY + Math.sin(a) * (R + 26)} stroke={diskColor} strokeWidth={3} opacity={0.8} />
          ))}
          {/* growing crack from bore to rim */}
          <line x1={CX + Math.cos(crackAngle) * R * 0.22} y1={CY + Math.sin(crackAngle) * R * 0.22}
                x2={CX + Math.cos(crackAngle) * (R * 0.22 + crackTip)} y2={CY + Math.sin(crackAngle) * (R * 0.22 + crackTip)}
                stroke={crackColor} strokeWidth={7} strokeLinecap="round" />
        </g>

        {/* liberated fragments */}
        {burst > 0.02 && Array.from({ length: fragments }).map((_, i) => {
          const a = crackAngle + (i - (fragments - 1) / 2) * 0.5;
          const dist = burst * 420;
          const fx = CX + Math.cos(a) * dist, fy = CY + Math.sin(a) * dist;
          const rot = burst * 220 * (i % 2 ? 1 : -1);
          return (
            <g key={i} transform={`translate(${fx},${fy}) rotate(${rot})`} opacity={Math.min(1, burst * 2)}>
              <path d="M -46 -20 L 40 -34 L 52 30 L -30 40 Z" fill="none" stroke={crackColor} strokeWidth={4} />
            </g>
          );
        })}

        <text x={CX} y={CY + CASING + 46} textAnchor="middle" fill={diskColor} fontSize={24}>{diskLabel}</text>
        {burst > 0.4 && (
          <text x={CX} y={CY + CASING + 84} textAnchor="middle" fill={crackColor} fontSize={26} fontWeight={700} opacity={Math.min(1, (burst - 0.4) * 3)}>
            uncontained — fragments exit the casing
          </text>
        )}
      </svg>
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && (
        <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${casingColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9, fontFamily }}>{schematicLabel}</div>
      )}
      {citation && <div style={{ position: "absolute", bottom: 40, right: 56, color: mutedColor, fontSize: 22, fontFamily }}>{citation}</div>}
    </AbsoluteFill>
  );
};
