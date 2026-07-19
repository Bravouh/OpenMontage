import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PhugoidProps {
  title?: string; citation?: string; schematicLabel?: string;
  cycles?: number; amplitude?: number; note?: string;
  riseLabel?: string; dropLabel?: string;
  backgroundColor?: string; axisColor?: string; curveColor?: string; planeColor?: string; accentColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;

export const Phugoid: React.FC<PhugoidProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  cycles = 2.5, amplitude = 0.14, note = "",
  riseLabel = "nose rises — speed bleeds off", dropLabel = "nose drops — speed builds",
  backgroundColor = "#0D1117", axisColor = "#2A3A4A", curveColor = "#5AA9E6", planeColor = "#E6EDF3", accentColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const drawFrames = (durationInFrames / fps - 1.5) * fps;
  const progress = interpolate(frame, [10, drawFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  const X0 = 0.10, X1 = 0.90, MID = 0.48;
  const yAt = (t: number) => MID - amplitude * Math.sin(t * cycles * Math.PI * 2); // t in 0..1
  const N = 220;
  const shown = Math.round(progress * N);
  const pts = Array.from({ length: N + 1 }, (_, k) => {
    const t = k / N;
    return { x: (X0 + t * (X1 - X0)) * W, y: yAt(t) * H, t };
  });
  const tip = pts[Math.min(N, shown)];
  const slope = (yAt(Math.min(1, tip.t + 0.01)) - yAt(Math.max(0, tip.t - 0.01))) * H / ((0.02) * (X1 - X0) * W);
  const planeAngle = Math.atan2(slope, 1) * 180 / Math.PI;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* axes */}
        <line x1={X0 * W} y1={0.20 * H} x2={X0 * W} y2={0.78 * H} stroke={axisColor} strokeWidth={2} />
        <line x1={X0 * W} y1={MID * H} x2={X1 * W} y2={MID * H} stroke={axisColor} strokeWidth={1} strokeDasharray="4 10" />
        <text x={X0 * W - 16} y={0.24 * H} textAnchor="end" fill={mutedColor} fontSize={22}>altitude</text>
        <text x={X1 * W} y={MID * H + 40} textAnchor="end" fill={mutedColor} fontSize={22}>time  (~1 min per cycle)</text>

        {/* ghost full curve */}
        <path d={pts.map((p, k) => `${k ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} fill="none" stroke={curveColor} strokeOpacity={0.14} strokeWidth={3} />
        {/* drawn curve */}
        <path d={pts.slice(0, shown + 1).map((p, k) => `${k ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} fill="none" stroke={curveColor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

        {/* rise / drop markers on first cycle */}
        <g opacity={progress > 0.12 ? 1 : 0}>
          <circle cx={(X0 + 0.25 * (X1 - X0)) * W} cy={yAt(0.25) * H} r={5} fill={accentColor} />
          <text x={(X0 + 0.25 * (X1 - X0)) * W} y={yAt(0.25) * H - 18} textAnchor="middle" fill={textColor} fontSize={23}>{riseLabel}</text>
        </g>
        <g opacity={progress > 0.42 ? 1 : 0}>
          <circle cx={(X0 + 0.5 * (X1 - X0)) * W} cy={yAt(0.5) * H} r={5} fill={accentColor} />
          <text x={(X0 + 0.5 * (X1 - X0)) * W} y={yAt(0.5) * H + 40} textAnchor="middle" fill={textColor} fontSize={23}>{dropLabel}</text>
        </g>

        {/* aircraft riding the tip */}
        {progress > 0.01 && progress < 0.999 && (
          <g transform={`translate(${tip.x}, ${tip.y}) rotate(${planeAngle})`}>
            <line x1={-22} y1={0} x2={22} y2={0} stroke={planeColor} strokeWidth={5} strokeLinecap="round" />
            <line x1={-4} y1={-12} x2={-4} y2={12} stroke={planeColor} strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
      </svg>
      {note && <div style={{ position: "absolute", bottom: 140, left: 0, right: 0, textAlign: "center", color: mutedColor, fontSize: 30 }}>{note}</div>}
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${axisColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9, fontFamily }}>{schematicLabel}</div>}
      {citation && <div style={{ position: "absolute", bottom: 40, left: 64, color: mutedColor, fontSize: 22, fontFamily }}>{citation}</div>}
    </AbsoluteFill>
  );
};
