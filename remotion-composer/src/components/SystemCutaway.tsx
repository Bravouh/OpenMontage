import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CutawayPoint { x: number; y: number }
export interface CutawayPart { id: string; label: string; points: CutawayPoint[]; color?: string }
export interface SystemCutawayProps {
  title?: string; citation?: string; schematicLabel?: string;
  outline?: CutawayPoint[][];
  parts: CutawayPart[];
  failSequence?: string[]; failSeconds?: number; staggerSeconds?: number;
  sourceMarker?: { x: number; y: number; label: string };
  backgroundColor?: string; outlineColor?: string; failColor?: string; textColor?: string; fontFamily?: string;
}

const W = 1920, H = 1080;
const px = (x: number) => x * W, py = (y: number) => y * H;
const dPath = (p: CutawayPoint[]) => p.map((q, i) => `${i ? "L" : "M"} ${px(q.x).toFixed(1)} ${py(q.y).toFixed(1)}`).join(" ");
const midOf = (p: CutawayPoint[]) => p[Math.floor(p.length / 2)] ?? { x: 0.5, y: 0.5 };

export const SystemCutaway: React.FC<SystemCutawayProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC ILLUSTRATION · not to scale · not an engineering drawing",
  outline = [], parts = [], failSequence = [], failSeconds = 4, staggerSeconds = 1.4, sourceMarker,
  backgroundColor = "#0D1117", outlineColor = "#3A4A5A", failColor = "#E5484D",
  textColor = "#E6EDF3", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const failStart = failSeconds * fps, stagger = staggerSeconds * fps;
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        {outline.map((poly, i) => {
          const o = spring({ frame: frame - i * 3, fps, config: { damping: 22 } });
          return <path key={`o${i}`} d={dPath(poly)} fill="none" stroke={outlineColor} strokeWidth={3} opacity={o * 0.8} />;
        })}
        {parts.map((part, i) => {
          const drawn = spring({ frame: frame - 10 - i * 5, fps, config: { damping: 20 } });
          const fi = failSequence.indexOf(part.id);
          const failFrame = fi >= 0 ? failStart + fi * stagger : Infinity;
          const failing = frame >= failFrame;
          const failAnim = failing ? spring({ frame: frame - failFrame, fps, config: { damping: 14 } }) : 0;
          const color = failing ? failColor : (part.color ?? "#6AA9C9");
          const m = midOf(part.points);
          const leftSide = part.points[0].x < 0.5;
          const lx = px(part.points[0].x), ly = py(part.points[0].y) - 16, lw = part.label.length * 14.5 + 16;
          return (
            <g key={part.id}>
              <path d={dPath(part.points)} fill="none" stroke={color} strokeWidth={failing ? 6 : 5} strokeLinecap="round"
                    pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn} opacity={0.35 + 0.65 * drawn} />
              <rect x={leftSide ? lx - lw : lx} y={ly - 22} width={lw} height={30} rx={4} fill={backgroundColor} opacity={0.72} />
              <text x={lx} y={ly} textAnchor={leftSide ? "end" : "start"} fill={color} fontSize={24} fontFamily={fontFamily} opacity={drawn}>{part.label}</text>
              {failing && (
                <g transform={`translate(${px(m.x)}, ${py(m.y)})`} opacity={failAnim}>
                  <line x1={-16} y1={-16} x2={16} y2={16} stroke={failColor} strokeWidth={4} />
                  <line x1={16} y1={-16} x2={-16} y2={16} stroke={failColor} strokeWidth={4} />
                </g>
              )}
            </g>
          );
        })}
        {sourceMarker && (() => {
          const s = spring({ frame: frame - failStart + 20, fps, config: { damping: 16 } });
          const pulse = 1 + 0.2 * Math.sin(frame / 5);
          return (
            <g transform={`translate(${px(sourceMarker.x)}, ${py(sourceMarker.y)})`} opacity={s}>
              <circle r={13 * pulse} fill="none" stroke={failColor} strokeWidth={3} />
              <circle r={5} fill={failColor} />
              <text x={0} y={-26} fill={failColor} fontSize={24} fontWeight={700} textAnchor="middle" fontFamily={fontFamily}>{sourceMarker.label}</text>
            </g>
          );
        })()}
      </svg>
      {title && <div style={{ position: "absolute", top: 48, left: 64, color: textColor, fontSize: 34, fontWeight: 600, opacity: titleOpacity }}>{title}</div>}
      {schematicLabel && (
        <div style={{ position: "absolute", top: 54, right: 56, maxWidth: 520, textAlign: "right", color: outlineColor, fontSize: 18,
                      letterSpacing: "0.06em", textTransform: "uppercase", border: `1px solid ${outlineColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9 }}>
          {schematicLabel}
        </div>
      )}
      {citation && <div style={{ position: "absolute", bottom: 40, right: 56, color: outlineColor, fontSize: 22 }}>{citation}</div>}
    </AbsoluteFill>
  );
};
