import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ThrustPhase { left: number; right: number; note: string } // thrust 0..1
export interface ThrustVectorProps {
  title?: string; citation?: string; schematicLabel?: string;
  phases: ThrustPhase[];
  backgroundColor?: string; planeColor?: string; thrustColor?: string; yawColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;
const px = (x: number) => x * W, py = (y: number) => y * H;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ThrustVector: React.FC<ThrustVectorProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  phases = [],
  backgroundColor = "#0D1117", planeColor = "#7D8CA3", thrustColor = "#5AA9E6", yawColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [10, durationInFrames - fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  const n = Math.max(1, phases.length - 1);
  const t = progress * n;
  const idx = Math.min(phases.length - 2, Math.floor(t));
  const frac = phases.length > 1 ? t - idx : 0;
  const cur = phases.length > 1
    ? { left: lerp(phases[idx].left, phases[idx + 1].left, frac), right: lerp(phases[idx].right, phases[idx + 1].right, frac) }
    : (phases[0] ?? { left: 0.5, right: 0.5 });
  const note = phases[Math.round(t)]?.note ?? "";
  const net = cur.left - cur.right; // >0 → nose yaws right

  // top-down plane
  const EX_L = 0.40, EX_R = 0.60, EY = 0.46;   // wing engines
  const maxLen = 0.16;
  const arrow = (ex: number, thrust: number, color: string, label: string) => {
    const x = px(ex), y1 = py(EY), y2 = py(EY + Math.max(0.02, thrust) * maxLen);
    return (
      <g>
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={10} strokeLinecap="round" />
        <path d={`M ${x - 12} ${y2 - 14} L ${x} ${y2 + 8} L ${x + 12} ${y2 - 14} Z`} fill={color} />
        <text x={x} y={y2 + 44} textAnchor="middle" fill={color} fontSize={24}>{label} {Math.round(thrust * 100)}%</text>
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* aircraft (top-down, nose up) */}
        <g stroke={planeColor} strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round">
          <line x1={px(0.5)} y1={py(0.28)} x2={px(0.5)} y2={py(0.60)} />
          <path d={`M ${px(0.5)} ${py(0.28)} l -10 22 l 20 0 z`} fill={planeColor} />
          <line x1={px(0.30)} y1={py(EY)} x2={px(0.70)} y2={py(EY)} />
          <line x1={px(0.43)} y1={py(0.585)} x2={px(0.57)} y2={py(0.585)} />
        </g>
        <circle cx={px(EX_L)} cy={py(EY)} r={9} fill={planeColor} />
        <circle cx={px(EX_R)} cy={py(EY)} r={9} fill={planeColor} />

        {arrow(EX_L, cur.left, thrustColor, "No.1")}
        {arrow(EX_R, cur.right, thrustColor, "No.3")}

        {/* yaw arc at nose */}
        {Math.abs(net) > 0.04 && (() => {
          const right = net > 0;
          const cx = px(0.5), cy = py(0.24), r = 70 + Math.abs(net) * 90;
          const dir = right ? 1 : -1;
          return (
            <g opacity={Math.min(1, Math.abs(net) * 3)}>
              <path d={`M ${cx - dir * r} ${cy} A ${r} ${r} 0 0 ${right ? 1 : 0} ${cx} ${cy - r}`} fill="none" stroke={yawColor} strokeWidth={5} />
              <path d={`M ${cx} ${cy - r} l ${dir * -6} ${-16} l ${dir * 20} ${6} z`} fill={yawColor} />
              <text x={cx + dir * 120} y={cy - r + 8} textAnchor={right ? "start" : "end"} fill={yawColor} fontSize={26} fontWeight={700}>nose yaws {right ? "right" : "left"}</text>
            </g>
          );
        })()}
      </svg>
      {note && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, textAlign: "center", color: textColor, fontSize: 34, fontWeight: 600 }}>{note}</div>
      )}
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${planeColor}44`, padding: "4px 10px", borderRadius: 4, opacity: 0.9, fontFamily }}>{schematicLabel}</div>}
      {citation && <div style={{ position: "absolute", bottom: 40, right: 56, color: mutedColor, fontSize: 22, fontFamily }}>{citation}</div>}
    </AbsoluteFill>
  );
};
