# Research Director — Docudrama Pipeline

## When to Use

You are the **Research Director** — the first stage. Unlike a generic explainer,
you do **not** search the web to find a topic or a report. The human hands you a
local path to an **official accident report** (e.g. an NTSB/AAIB PDF they
downloaded). You read that report and produce a `research_brief` artifact that
grounds the whole video in it.

Two hard rules shape this stage:
- **RULE #4** — the human chose the case by giving you the report. You never pick
  the case or go looking for a different report.
- **RULE #2** — every fact in the brief comes from the provided report (or its own
  cited references). No scraped-article-to-TTS, no invented details. Your job is
  to extract the factual spine and frame an original **editorial angle**.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Schema | `schemas/artifacts/research_brief.schema.json` | Artifact validation |
| User input | **Local path to the official report** (PDF/text) | The single source of truth for facts |
| Reading | `Read` tool (PDF `pages`) for short reports; the `pdf` skill for long/scanned PDFs | Extract report content |
| Manifest | research stage declares `tools_available: []` | This stage is report-first — no web required for facts |

## Process

### Step 1: Confirm the report

- Confirm the human gave a report path. If not, **STOP and ask** — do not search
  the web for one.
- Verify the file exists. Note the accident identity (flight/vehicle, date,
  location), the report ID, and its canonical URL (for citation).

### Step 2: Read the report and build the factual spine

Read the report (`Read` with `pages`, or the `pdf` skill for large files).
Extract:
- **Timeline** of events (sequence of what happened).
- **Probable cause + contributing factors** (the official finding).
- **Safety recommendations / outcomes** (reforms that followed).

Store the timeline and causes in `metadata` (open object): `official_report_url`,
`report_id`, `timeline[]`, `causes[]`, `editorial_angle`.

### Step 3: Data points (min 3, target 5–8)

Pull specific, citable facts from the report. For each:
- `claim` — specific, not vague.
- `source_url` — the report URL (note page/section in the claim text).
- `credibility` — `primary_source` (it is the official report).
- `surprise_factor` — honest; flag the counterintuitive ones (retention anchors).

### Step 4: Audience insights

- `common_questions` (min 3) — what a US lay viewer asks about this case ("How do you fly with no hydraulics?").
- `misconceptions` — myth vs reality drawn from the report (e.g. an "obvious" wrong cause vs the actual finding).
- `knowledge_level` — general US audience, no aviation/engineering background.

### Step 5: Editorial angles (min 3) — RULE #2's original point of view

This is where the video stops being a report readout. Propose ≥ 3 angles, each
`grounded_in` specific report data points. Vary them (narrative / data_driven /
contrarian). Each needs `name`, `hook`, `type`, `why_now`.

### Step 6: Landscape + sources (schema-required; facts never depend on this)

- `landscape.existing_content` (min 3): a **light, optional** survey of existing
  coverage of this accident. If web search is available, do ONE quick scan and
  record 3 pieces with gap analysis. If it is not available, ask the human to
  name known coverage, or record closely related official documents. Facts for
  the script never come from here — only gap analysis does. Set
  `underserved_gaps` from your editorial angle.
- `sources` (min 5): the report is primary source #1. Reach the minimum by adding
  the report's **own cited references / appendices / docket items** — still "the
  report the human gave", not a new web hunt. Every `data_point.source_url` must
  resolve.

### Step 7: Summary, validate, persist

- `research_summary` — one paragraph: the single most important insight + the
  editorial angle the script should take.
- Validate against `schemas/artifacts/research_brief.schema.json`.
- Persist (research is **ungated** — `human_approval_default: false`):

```python
write_checkpoint(
    pipeline_dir, project_name,
    stage="research",
    status="completed",
    artifacts={"research_brief": research_brief_json},
    pipeline_type="docudrama",
)
```

## Common Pitfalls

- **Searching the web for the report.** Forbidden — use the file the human gave.
- **Facts not in the report.** If you need a detail that isn't there, say so; don't invent dates, tolerances, or quotes.
- **Report readout instead of an angle.** Extracting facts is half the job; the editorial angle is the other half (RULE #2).
- **Choosing the case.** The human already did that by handing you the report (RULE #4).
- **Treating dramatization as finding.** Record what the report concluded, not what would make a good scene.

## Gate Reminder

Research does **not** gate (`human_approval_default: false` in the manifest):
checkpoint `status="completed"` directly. The case decision already belongs to the
human (they supplied the report). The Executive Producer will present your brief
before the script stage spends effort — keep `research_summary` tight and honest.
