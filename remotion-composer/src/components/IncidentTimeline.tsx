import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface TimelineEvent { time?: string; label: string; sub?: string }
export interface IncidentTimelineProps {
  title?: string; citation?: string; events: TimelineEvent[]; staggerSeconds?: number;
  backgroundColor?: string; lineColor?: string; dotColor?: string; accentColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({
  title = "", citation = "", events = [], staggerSeconds = 0.9,
  backgroundColor = "#0D1117", lineColor = "#2A3A4A", dotColor = "#7D8CA3", accentColor = "#E5484D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = staggerSeconds * fps;
  const n = events.length;
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });
  const spineProgress = interpolate(frame, [10, 10 + n * stagger], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily, padding: "120px 160px", boxSizing: "border-box", justifyContent: "center" }}>
      {title && <div style={{ color: textColor, fontSize: 40, fontWeight: 700, marginBottom: 56, opacity: titleOpacity }}>{title}</div>}
      <div style={{ position: "relative", paddingLeft: 56 }}>
        <div style={{ position: "absolute", left: 12, top: 0, width: 3, height: `${spineProgress * 100}%`, backgroundColor: lineColor }} />
        {events.map((e, i) => {
          const start = 10 + i * stagger;
          const appear = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 90 } });
          const slide = interpolate(appear, [0, 1], [24, 0]);
          const isLast = i === n - 1;
          return (
            <div key={i} style={{ position: "relative", opacity: appear, transform: `translateX(${slide}px)`, paddingBottom: isLast ? 0 : 44 }}>
              <div style={{ position: "absolute", left: -50, top: 4, width: 22, height: 22, borderRadius: 11,
                            backgroundColor: isLast ? accentColor : dotColor, border: `3px solid ${backgroundColor}`,
                            boxShadow: isLast ? `0 0 ${interpolate(appear, [0, 1], [0, 24])}px ${accentColor}` : "none" }} />
              {e.time && <div style={{ color: accentColor, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{e.time}</div>}
              <div style={{ color: textColor, fontSize: 34, fontWeight: 600, lineHeight: 1.2 }}>{e.label}</div>
              {e.sub && <div style={{ color: mutedColor, fontSize: 24, marginTop: 4 }}>{e.sub}</div>}
            </div>
          );
        })}
      </div>
      {citation && <div style={{ position: "absolute", bottom: 40, right: 56, color: mutedColor, fontSize: 22 }}>{citation}</div>}
    </AbsoluteFill>
  );
};
