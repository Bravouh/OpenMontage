# Script Director — Docudrama Pipeline

## When to Use

You are the Script Writer for a long-form (40–50 min) investigative docudrama
(aviation / engineering accident, US audience). You have a `research_brief`
artifact from the Research Director. Your job is to turn it into a schema-valid
`script` artifact that the **humanize** stage and then the **scene_plan** stage
will consume.

You do NOT invent the accident, choose the case, or add facts. Everything you
write traces back to the research_brief and its official report (RULE #2).

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Schema | `schemas/artifacts/script.schema.json` | Artifact validation — the shape you must emit |
| Prior artifact | `research_brief` | Official report URL, editorial angle, event timeline, causes, sources |
| Craft skill | `.claude/skills/docudrama-script` | The actual writing craft (factual spine, cold open, open loops, policy constraints). **Invoke it — do not re-derive its rules here.** |
| Formula skill | `.claude/skills/retention-longform` | The retention formula. The `retention_check` stage will FAIL this script if PART 1 is violated — write toward it now. |
| Meta skill | `skills/meta/voice-performance-director.md` | Structured TTS delivery cues (`voice_performance`) |
| Meta skill | `skills/meta/checkpoint-protocol.md` | How to checkpoint and gate |

## Process

### Step 1: Invoke the docudrama-script craft skill

This director is the **pipeline wrapper**. The craft — factual spine, the four
cold-open doors, nested open loops, the "no speculation as fact" / "no
scraped-to-TTS" constraints — lives in `.claude/skills/docudrama-script`. Run
that skill to produce the narration. Your job is to shape its output into the
`script` artifact below, not to duplicate its instructions.

### Step 2: Absorb the research_brief

Extract and keep at hand:
- **Official report URL** — every factual claim must be traceable to it or another cited source.
- **Editorial angle** — the original point of view that separates this from a report readout (RULE #2).
- **Event timeline + causes** — your factual spine.
- **Sources** — you will attach `source_ref` to each claim-bearing section.

### Step 3: Write toward retention PART 1 (cheaper than a send-back)

The `retention_check` stage enforces 5 hard rules; a violation bounces the
script back to you. Build them in now:
1. Causal connectors (`but / so / because / however`) over sequence (`then / and then`) — target ≥ 8:1 for this voiceover style.
2. Cold-open ≤ 60s that opens ≥ 1 clear question before any scene-setting.
3. ≥ 1 outer open loop (opened cold, closed near the end, called back in the outro) + inner loops that all close.
4. No stretch > 3 min without a turn/reveal; tighten to ~1–1.5 min at climax.
5. Sponsor/CTA never before a payoff.

### Step 4: Time and chapter the script

- Target 40–50 min = **2400–3000 total_duration_seconds**.
- Narration pace ~120–140 wpm → roughly **4,800–7,000 words**. This style is a
  slow voiceover with deliberate pauses that carry the rhythm — the silence and
  the beats are part of the docudrama's pacing, not empty space to fill with
  more words. Count as you go; TTS pacing is fixed, so over-writing either
  rushes the read or overruns duration.
- Divide into clearly labelled **chapters**; each chapter needs a mini-payoff.
- Give every `section` real `start_seconds`/`end_seconds` that tile the timeline with no gaps.

### Step 5: Emit the `script` artifact

Match `schemas/artifacts/script.schema.json` exactly:

- `version: "1.0"`, `title`, `total_duration_seconds` (2400–3000).
- `voice_performance` — a concrete plan (per `voice-performance-director`): intent, pacing_profile (`cinematic` fits docudrama), energy_curve, pause_policy, sample_section_id. No vague "natural voice".
- `sections[]` — each with `id`, `label`, `text`, `start_seconds`, `end_seconds`, `speaker_directions` and/or structured `delivery_cues`, and a `source_ref` on every claim-bearing section.
- `enhancement_cues[]` — the Scene Planner's instructions. Use `diagram`/`animation` for **Remotion reconstruction** (flight path, timeline, system cutaway) and `overlay` for **on-screen source citations**. Kiểu A only (RULE #1): describe silhouettes, object close-ups, faceless reconstruction — never a consistent human face, never lip-sync.
- `metadata` (open object) — stash `official_report_url`, `editorial_angle`, `chapters[]`, and a `voice_map` marking narrator vs character lines (`voice_id` from `voices.json`, per the craft skill).

### Step 6: Constraint check (policy shields)

- **RULE #1** — no character consistency, no lip-sync, no acting faces. Every enhancement cue is Kiểu A.
- **RULE #2** — no verbatim source read-back (no scraped-to-TTS); rephrase through the editorial angle. Every claim has a `source_ref`.
- Reconstructed/dramatised passages are written as reconstruction, never stated as investigative conclusion.

### Step 7: Self-Evaluate

Score (1–5); revise anything below 3 before submitting:

| Criterion | Question |
|-----------|----------|
| Grounding | Does every factual section have a `source_ref` back to the brief? |
| Angle | Is the editorial angle present, not just a report readout? |
| Retention readiness | Cold-open ≤ 60s with a question? Causal ratio ≥ 8:1? No > 3-min flat stretch? |
| Duration fit | `total_duration_seconds` in 2400–3000 and word count matches at ~120–140 wpm? |
| Kiểu A | Are all enhancement cues faceless/reconstruction, no acting faces? |
| Voice performance | Are pacing, pauses, energy, and a sample section explicit? |
| Schema | Does the artifact validate against `script.schema.json`? |

### Step 8: Persist and gate

Checkpoint via `meta/checkpoint-protocol`:

```python
write_checkpoint(
    pipeline_dir, project_name,
    stage="script",
    status="awaiting_human",          # gated stage — never write "completed" here
    artifacts={"script": script_json},
    pipeline_type="docudrama",
)
```

## Common Pitfalls

- **Adding facts not in the brief.** If you need a detail that isn't there, send it back to Research — don't invent statistics, dates, or attributions.
- **Report readout instead of a documentary.** Re-reading the official report verbatim is a RULE #2 violation and reads flat. Rephrase through the angle.
- **Over-writing.** 8,000 words will not fit 45 minutes. Count words.
- **Speculation stated as fact.** Reconstruction must read as reconstruction.
- **Faces.** Any cue implying a consistent character face or lip-sync breaks RULE #1.

## Example: a claim-bearing section

```json
{
  "id": "ch2_s4",
  "label": "The checklist that wasn't run",
  "text": "The crew had a procedure for exactly this failure. So why didn't they reach for it? Because in the ninety seconds they had, the warning they trusted was pointing the wrong way.",
  "start_seconds": 612,
  "end_seconds": 628,
  "speaker_directions": "Measured, then a beat of silence before 'the wrong way.'",
  "delivery_cues": { "pace": "measured", "pause_before_seconds": 0.4, "emphasis_words": ["wrong", "way"] },
  "enhancement_cues": [
    { "type": "diagram", "description": "Remotion cockpit-panel cutaway; the trusted gauge highlighted, its reading contradicting the actual system state", "timestamp_seconds": 620 },
    { "type": "overlay", "description": "Citation: NTSB AAR-XX/XX §1.6, p.42", "timestamp_seconds": 613 }
  ],
  "source_ref": "research_brief:data_points[7] (NTSB AAR-XX/XX, p.42)"
}
```

---

## Gate Reminder (Binding)

This stage gates on human approval (`human_approval_default: true`). After your
self-evaluation passes: checkpoint with `status="awaiting_human"`, present the
artifact summary (the Backlot board renders it), and **END YOUR TURN**. Do not
start the humanize stage in the same response. Approval is per-gate — an earlier
"go ahead" does not cover this gate (RULE #4).
