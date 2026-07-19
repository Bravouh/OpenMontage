import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface RedundancySystem { id: string; label: string; color?: string; failAt: number } // failAt in seconds
export interface RedundancyStateProps {
  title?: string; citation?: string; schematicLabel?: string;
  systems: RedundancySystem[];
  backgroundColor?: string; okColor?: string; lostColor?: string; trackColor?: string;
  textColor?: string; mutedColor?: string; fontFamily?: string;
}

export const RedundancyState: React.FC<RedundancyStateProps> = ({
  title = "", citation = "", schematicLabel = "SCHEMATIC · not to scale",
  systems = [],
  backgroundColor = "#0D1117", okColor = "#3FB950", lostColor = "#E5484D", trackColor = "#21262D",
  textColor = "#E6EDF3", mutedColor = "#8B98A5", fontFamily = "IBM Plex Mono, ui-monospace, monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });
  const okCount = systems.filter((s) => frame < s.failAt * fps).length;
  const allLost = okCount === 0 && systems.length > 0;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily, padding: "150px 200px", boxSizing: "border-box", justifyContent: "center", gap: 34 }}>
      {title && <div style={{ color: textColor, fontSize: 38, fontWeight: 700, marginBottom: 20, opacity: titleOpacity }}>{title}</div>}
      {systems.map((s, i) => {
        const failFrame = s.failAt * fps;
        const failing = frame >= failFrame;
        const fillPct = failing ? interpolate(frame, [failFrame, failFrame + 0.6 * fps], [100, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 100;
        const color = failing ? lostColor : (s.color ?? okColor);
        const appear = spring({ frame: frame - i * 4, fps, config: { damping: 20 } });
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 28, opacity: appear }}>
            <div style={{ width: 380, color: textColor, fontSize: 27, fontWeight: 600 }}>{s.label}</div>
            <div style={{ flex: 1, height: 30, background: trackColor, borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${fillPct}%`, height: "100%", background: color }} />
            </div>
            <div style={{ width: 200, textAlign: "right", color, fontSize: 26, fontWeight: 700, letterSpacing: "0.04em" }}>
              {failing ? "LOST" : "PRESSURIZED"}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        {allLost ? (
          <div style={{ color: lostColor, fontSize: 50, fontWeight: 800, opacity: 0.82 + 0.18 * Math.sin(frame / 5) }}>NO FLIGHT CONTROLS</div>
        ) : (
          <div style={{ color: okColor, fontSize: 32, fontWeight: 700 }}>FLIGHT CONTROLS AVAILABLE — {okCount} of {systems.length}</div>
        )}
      </div>
      {schematicLabel && <div style={{ position: "absolute", top: 54, right: 56, color: mutedColor, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${trackColor}`, padding: "4px 10px", borderRadius: 4, opacity: 0.9 }}>{schematicLabel}</div>}
      {citation && <div style={{ position: "absolute", bottom: 40, left: 64, color: mutedColor, fontSize: 22 }}>{citation}</div>}
    </AbsoluteFill>
  );
};
