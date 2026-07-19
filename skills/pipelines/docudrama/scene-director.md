# Scene Director — Docudrama Pipeline

## When to Use
Post-retention. A humanized script that PASSED retention_check exists. Turn it into a
SHOT-LEVEL scene_plan for the project base style: voiceover + static images (Ken Burns) +
2D diagrams / Remotion reconstruction + on-screen citations. NO stock-footage retrieval,
NO thematic-question decomposition, NO character consistency (Kiểu A — RULE #1).

## What's different from the stock (montage) Scene Director
The montage scene-director decomposes a thematic question into retrieval SLOTS with CLIP
queries + preferred_sources; the asset stage then FETCHES footage. This pipeline does none
of that. The script is already divided into narration sections carrying visual cues. Shots
derive from those sections. You never write queries, never pick sources, never "find
clips". You CLASSIFY each visual need as STATIC / GRAPHIC / VIDEO_AI.

## Two binding cadence rules (the heart of this stage)

**Rule 1 — Cadence 8–12s, DERIVED not hardcoded.** The number of shots in a section is
`ceil(section_seconds / 10)`, driven by that section's own timestamps. Never fix a shot
count, and never hardcode a shot length (no "every graphic is 16s"). STATIC holds target
~10s; split any hold that would exceed 12s. Let the script's timing decide, the same way
the script stage let word-count decide duration.

**Rule 2 — A shot may exceed 12s ONLY if it is a GRAPHIC with a staged reveal** — animated
over time (a flight path draws, a timeline reveals milestone by milestone, a cutaway
highlights parts in sequence). A STATIC still must NEVER stand still beyond 12s: split it,
or drive it with a strong Ken Burns move. A static 16s diagram is retention death. VIDEO_AI
is the last resort (needs GPU); v1 target is 0.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Schema | `schemas/artifacts/scene_plan.schema.json` | Artifact validation |
| Prior artifact | `script` from the HUMANIZE checkpoint (retention-passed) | Sections + enhancement_cues + timestamps |
| Reference | MEMORY.md base-style ([chốt] phong cách nền) | voiceover + static/2D + Remotion + citation, ~8–12s |
| Meta skill | `skills/meta/checkpoint-protocol.md` | Gate + checkpoint |
| Tools | none — pure planning, NO retrieval | — |

## Process

### Step 1: Load the retention-passed script
Read `projects/<id>/checkpoint_humanize.json` → `artifacts.script`. Confirm
`retention_check` is `completed` first — you plan the version that cleared retention.

### Step 2: Shots, not sections
Each shot is a scene tied to its section via `script_section_id`. A section yields
`ceil(section_seconds / 10)` shots (Rule 1). Order follows the script; shots tile each
section's window with no gaps.

### Step 3: Classify each shot's visual need
From the section's `enhancement_cues`:
- **STATIC** (default, prioritise — CPU): a still + Ken Burns. Kiểu A atmosphere
  (silhouettes, object/instrument close-ups, faceless), archival/report stills. The
  workhorse. A `broll` cue seeds the section's stills.
- **GRAPHIC**: a 2D diagram or Remotion reconstruction. A `diagram`/`animation` cue ⇒
  GRAPHIC. Name its `remotion_component`.
- **VIDEO_AI**: only where a still or graphic genuinely cannot carry the beat. Minimise;
  v1 leaves these as placeholders (GPU). Default 0.
An `overlay` cue ⇒ an on-screen citation (an overlay on the shot, not a visual kind).

### Step 4: Apply the two cadence rules
- Rule 1: shots-per-section = `ceil(dur/10)`. Do not invent a count or a fixed length.
- STATIC holds ~10s; if a hold would exceed 12s, split it (`ceil(hold/12)` sub-holds).
- A GRAPHIC reconstruction may run longer than 12s (up to ~18s) **only** if it carries
  `reveal_stages` — 3–4 staged beats of internal motion. The reveal's content sets the
  length within the section; do NOT default to a hardcoded number.
- Result invariant: **no STATIC shot > 12s**; every shot > 12s is a GRAPHIC with
  `reveal_stages`.

### Step 5: Preserve citations (RULE #2 shield)
Every `overlay` cue → the shot's `overlay_notes` + `metadata.visual_plan[].citation` with
its timestamp. Citations never get dropped.

### Step 6: Emit the scene_plan
Per `scene_plan.schema.json`:
- `scenes[]` (schema-valid, SHOT-level): `id` (`<section>_shN`), `type` (STATIC→`broll`,
  GRAPHIC→`animation`, VIDEO_AI→`generated`), `description`, `start_seconds`, `end_seconds`,
  `script_section_id`, `movement` (`staged reveal` for GRAPHIC / Ken Burns for STATIC),
  `hero_moment`, `overlay_notes`, `required_assets[]` (`type`, `description`, `source`).
- `metadata.visual_plan[]` per shot: `{shot_id, script_section_id, visual_kind, seconds,
  remotion_component?, reveal_stages?}`.
- `metadata`: `pipeline: docudrama`, `base_style`, `cadence_target_seconds: "8-12"`,
  `shot_count`, `kind_distribution`, `shots_over_12s`, `static_idle_over_12s` (MUST be 0),
  `citation_overlays`, `graphic_components`.

### Step 7: Kiểu A + no-retrieval check
No consistent human face or lip-sync (RULE #1). No `queries`, no `preferred_sources`, no
"find clips". VIDEO_AI count minimal (ideally 0 for v1).

### Step 8: Self-Evaluate
| Criterion | Question |
|-----------|----------|
| Cadence (Rule 1) | Is `shot_count ≈ ceil(total_duration/10)`, derived from timestamps, not hardcoded? |
| Long shots (Rule 2) | Is `static_idle_over_12s == 0`, and is every shot >12s a GRAPHIC with `reveal_stages`? |
| Coverage | Shots tile every section, no gaps? |
| Kiểu A | All visuals faceless/atmosphere/diagram; no character consistency? |
| CPU-first | STATIC + GRAPHIC carry it; VIDEO_AI minimal/placeholder? |
| Citations | Every overlay cue mapped to screen? |
| No retrieval | Zero queries / preferred_sources? |
| Schema | Validates against `scene_plan.schema.json`? |

### Step 9: Persist and gate
```python
write_checkpoint(pipeline_dir, project_name, stage="scene_plan",
                 status="awaiting_human", artifacts={"scene_plan": plan},
                 pipeline_type="docudrama")
```

## Common Pitfalls
- **Hardcoding a shot length or count** (the 16s trap). Derive shots from section timestamps.
- **A STATIC still standing still >12s.** Split it or drive Ken Burns. Never idle a frame.
- **A GRAPHIC >12s without `reveal_stages`** — a static 16s diagram is retention death.
- **Acting like the montage director** — writing CLIP queries or picking sources. No retrieval here.
- **Reaching for VIDEO_AI.** Last resort (GPU). STATIC + GRAPHIC carry v1.
- **Dropping citations, or implying faces / character consistency** (RULE #2 / RULE #1).

## Gate Reminder (Binding)
`human_approval_default: true`. Checkpoint `awaiting_human`, present the scene_plan summary
(shot count, kind distribution, shots >12s all GRAPHIC-with-reveal, `static_idle_over_12s`
= 0, GRAPHIC component list, citation count), and **END YOUR TURN**. Approval is per-gate
(RULE #4).
