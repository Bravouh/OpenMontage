import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface FlightPoint { x: number; y: number } // normalized 0..1
export interface FlightWaypoint extends FlightPoint { label: string; at?: number } // at = reveal progress 0..1
export interface FlightPathProps {
  title?: string;
  citation?: string;
  schematicLabel?: string;
  path: FlightPoint[];
  waypoints?: FlightWaypoint[];
  incident?: { x: number; y: number; label: string; at: number };
  drawSeconds?: number;
  backgroundColor?: string; pathColor?: string; accentColor?: string;
  textColor?: string; gridColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;
const px = (x: number) => x * W, py = (y: number) => y * H;
const dPath = (p: FlightPoint[]) =>
  p.map((q, i) => `${i ? "L" : "M"} ${px(q.x).toFixed(1)} ${py(q.y).toFixed(1)}`).join(" ");
function pointAt(p: FlightPoint[], t: number): FlightPoint {
  if (p.length < 2) return p[0] ?? { x: 0, y: 0 };
  const segs = p.slice(1).map((q, i) => Math.hypot((q.x - p[i].x) * W, (q.y - p[i].y) * H));
  const total = segs.reduce((a, b) => a + b, 0) || 1;
  let d = t * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const u = segs[i] ? Math.max(0, Math.min(1, d / segs[i])) : 0;
      return { x: p[i].x + (p[i + 1].x - p[i].x) * u, y: p[i].y + (p[i + 1].y - p[i].y) * u };
    }
    d -= segs[i];
  }
  return p[p.length - 1];
}

export const FlightPath: React.FC<FlightPathProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  path = [], waypoints = [], incident, drawSeconds,
  backgroundColor = "#0D1117", pathColor = "#7D8CA3", accentColor = "#E5484D",
  textColor = "#E6EDF3", gridColor = "#1B2530", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const drawFrames = (drawSeconds ?? Math.max(1, durationInFrames / fps - 1.5)) * fps;
  const progress = interpolate(frame, [8, drawFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const head = pointAt(path, progress);
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={(i * W) / 10} y1={0} x2={(i * W) / 10} y2={H} stroke={gridColor} strokeWidth={1} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i * H) / 6} x2={W} y2={(i * H) / 6} stroke={gridColor} strokeWidth={1} />
        ))}
        <path d={dPath(path)} fill="none" stroke={pathColor} strokeOpacity={0.18} strokeWidth={4} strokeDasharray="2 12" />
        <path d={dPath(path)} fill="none" stroke={pathColor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} />
        {progress > 0 && progress < 1 && <circle cx={px(head.x)} cy={py(head.y)} r={7} fill={textColor} />}
        {waypoints.map((w, i) => {
          const at = w.at ?? (i + 1) / (waypoints.length + 1);
          const s = progress >= at ? spring({ frame: frame - at * drawFrames, fps, config: { damping: 16 } }) : 0;
          return (
            <g key={`w${i}`} opacity={s} transform={`translate(${px(w.x)}, ${py(w.y)})`}>
              <circle r={6} fill={pathColor} />
              <rect x={12} y={-15} width={w.label.length * 15.5 + 16} height={30} rx={4} fill={backgroundColor} opacity={0.72} />
              <text x={20} y={7} fill={textColor} fontSize={26} fontFamily={fontFamily}>{w.label}</text>
            </g>
          );
        })}
        {incident && (() => {
          const shown = progress >= incident.at;
          const since = frame - incident.at * drawFrames;
          const pulse = shown ? 1 + 0.25 * Math.sin(since / 4) : 0;
          const ring = interpolate(shown ? since : 0, [0, 20], [0, 46], { extrapolateRight: "clamp" });
          return (
            <g transform={`translate(${px(incident.x)}, ${py(incident.y)})`} opacity={shown ? 1 : 0}>
              <circle r={ring} fill="none" stroke={accentColor} strokeWidth={2} opacity={0.5} />
              <circle r={10 * pulse} fill={accentColor} />
              <rect x={-(incident.label.length * 18 + 20) / 2} y={-58} width={incident.label.length * 18 + 20} height={34} rx={5} fill={backgroundColor} opacity={0.85} />
              <text x={0} y={-33} textAnchor="middle" fill={accentColor} fontSize={30} fontWeight={700} fontFamily={fontFamily}>{incident.label}</text>
            </g>
          );
        })()}
      </svg>
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && (
        <div style={{ position: "absolute", top: 54, right: 56, color: pathColor, fontSize: 20, letterSpacing: "0.08em",
                      textTransform: "uppercase", border: `1px solid ${gridColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9 }}>
          {schematicLabel}
        </div>
      )}
      {citation && <div style={{ position: "absolute", bottom: 40, right: 56, color: pathColor, fontSize: 22, opacity: 0.85 }}>{citation}</div>}
    </AbsoluteFill>
  );
};
