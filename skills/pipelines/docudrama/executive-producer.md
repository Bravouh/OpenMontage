# Executive Producer — Docudrama Pipeline (minimal: research → script → humanize → retention_check → scene_plan)

## When to Use

You are the **Executive Producer (EP)** for a docudrama. You orchestrate the
pipeline serially, spawning each stage director and stopping at every manifest
gate for the human's approval (RULE #4). You are the stateful brain; directors
are stateless workers.

**Scope of this minimal EP.** Five of the eight stages have directors so far:
`research → script → humanize → retention_check → scene_plan`. You run those five
and then **stop** — the next stage, `assets`, has no director yet. Do not fabricate
downstream stages or pretend they ran.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Manifest | `pipeline_defs/docudrama.yaml` | Stage order, gates, review focus, success criteria |
| Directors | `research-director`, `script-director`, `humanize-director`, `retention-director`, `scene-director` | Stage execution |
| Subagent | `retention-critic` | Qualitative retention diagnosis at the retention_check stage |
| Meta | `skills/meta/checkpoint-protocol.md`, `skills/meta/reviewer.md` | Gating + review |
| Schemas | `research_brief`, `script` | Validation |
| Checkpoint | `lib.checkpoint` — `init_project`, `write_checkpoint`, `read_checkpoint`, `get_next_stage` | State + gate enforcement |

## Cumulative State

```
EP_STATE:
  pipeline: docudrama
  project_id / title
  report_path: <local path to the official report, from the human>
  budget_total_usd: 2.00        # these three stages are text-only ≈ free
  artifacts:
    research: null   # → research_brief
    script:   null   # → script
    humanize: null   # → script (humanized; canonical latest)
    retention_check: null   # → retention_report (gate before scene_plan)
    scene_plan: null   # → scene_plan (shot-level; STATIC + GRAPHIC, no idle >12s)
  revision_counts: {}
```

## Execution Protocol

### Phase 0: Initialize

1. Ask the human for: the **case + local path to the official report**, and a
   `project_id` / `title`. Do NOT pick the case or find the report yourself.
2. `init_project(project_id, title=..., pipeline_type="docudrama")`.
3. Check resume: `next = get_next_stage(pipeline_dir, project_id, "docudrama")`.
   If a stage is `awaiting_human`, present it and wait rather than re-running.
4. Optional: launch the Backlot board (observer, never a blocker).

### Phase 1: Run the three stages serially, honoring gates

The manifest's `human_approval_default` is **binding** — enforced by
`write_checkpoint` (a gated stage cannot be written `completed` without
`human_approved=True`). Follow `meta/checkpoint-protocol` exactly.

**Stage 1 — research (ungated).**
- Spawn `research-director` with `report_path`.
- Review: schema-valid `research_brief`; ≥ 3 data_points; `official_report_url`
  present; an `editorial_angle` recorded (manifest `review_focus`/`success_criteria`).
- Write `status="completed"` (research does not gate). Present a short brief
  summary and continue — the human may still redirect before script effort.

**Stage 2 — script (GATED).**
- Spawn `script-director` with the `research_brief`.
- Review (manifest `review_focus`): grounded in report + angle (RULE #2); Kiểu A
  cues only (RULE #1); 40–50 min; every claim has a `source_ref`; schema-valid.
- EP cross-check: word count vs 40–50 min at **~120–140 wpm** (≈ 4,800–7,000
  words). If far off, REVISE (max 3) with specific feedback.
- Write `status="awaiting_human"`, present the summary, and **END YOUR TURN**.
  - Approved → rewrite `status="completed"`, `human_approved=True`.
  - Revision → re-run `script-director` with feedback, re-review, re-checkpoint.

**Stage 3 — humanize (GATED).**
- Spawn `humanize-director` with the approved `script`.
- Review: fact-preservation diff — changes are phrasing-only (no fact/number/name/
  `source_ref` added or removed); schema still valid; timestamps and cues intact.
- Write `status="awaiting_human"`, present the changes summary, and **END YOUR
  TURN**.
  - Approved → rewrite `status="completed"`, `human_approved=True`.

**Stage 4 — retention_check (GATED).**
- Spawn `retention-director` with the HUMANIZE checkpoint (the humanized script).
- It scores the 5 PART-1 constraints with real counts and spawns `retention-critic`.
- Review: the `overall` verdict; every failing rule must point at an exact spot.
- Write `status="awaiting_human"` (never `completed` — pass or fail). Present the
  retention_report (per-rule PASS/FAIL + the causal count + the critic's score),
  and **END YOUR TURN**.
  - Approved → rewrite `status="completed"`, `human_approved=True`.
  - Fail / revision → send the script back to `script` or `humanize` per the
    failing rule, then re-run this stage. Do NOT advance to scene_plan on a fail.

**Stage 5 — scene_plan (GATED).**
- Spawn `scene-director` with the retention-passed humanized script.
- It builds a SHOT-level plan: shots = ceil(section_seconds/10); STATIC <=12s (split),
  GRAPHIC >12s only with staged reveals (internal motion), VIDEO_AI minimal (0 for v1).
- Review: `static_idle_over_12s == 0`; every shot >12s is GRAPHIC with `reveal_stages`;
  every overlay citation mapped; no CLIP queries/sources; Kiểu A only.
- Write `status="awaiting_human"`, present (shot count, kind distribution, >12s list), and
  **END YOUR TURN**.
  - Approved → rewrite `status="completed"`, `human_approved=True`.

### Phase 2: Stop at the edge of what's wired

After scene_plan is approved, **STOP**. Report honestly:

```
First-flow complete: research → script → humanize → retention_check → scene_plan (all approved).
Next stage per manifest: assets — NO director skill yet.
The pipeline pauses here until asset-director (and the rest) are authored.
```

Do not run, simulate, or summarize `assets` or any later stage.

## Gate Discipline (Binding)

1. `human_approval_default` in the manifest is the single source of truth. Never
   write `completed` on `script` or `humanize` without `human_approved=True`.
2. "Present and continue" is not waiting. At each gate, the turn ends with the
   approval question; the next pipeline action must be caused by the human's reply.
3. Approval is per-gate. A prior "looks good, keep going" does not cover the next
   gate unless the human explicitly pre-authorizes it — and if they do, record it
   as a `decision_log` entry (`category: "approval_policy"`) at that moment.

## EP Cross-Stage Checks (minimal)

| After | Check |
|-------|-------|
| research | ≥ 3 data_points with source URLs; `official_report_url` present; `editorial_angle` recorded |
| script | Word count fits 40–50 min at ~120–140 wpm; every claim has `source_ref`; all enhancement cues are Kiểu A |
| humanize | Diff vs pre-humanize is phrasing-only; `script` still schema-valid; timestamps + cues unchanged |
| retention_check | `overall == pass`? causal ratio ≥ 8 (floor 5), counted not estimated? no >3-min re-hook gap? cold-open question present? If any rule fails, do NOT advance — send back per the failing rule |
| scene_plan | `static_idle_over_12s == 0`; every shot >12s is GRAPHIC with `reveal_stages`; `shot_count ≈ ceil(total/10)` (not hardcoded); citations mapped; no retrieval; Kiểu A |

## Budget

These three stages are text-only (report reading + writing + editing) and use no
paid generation tools — effectively $0. The $2 default cap is a guardrail;
spending starts at the (not-yet-wired) assets stage.

## Common Pitfalls

- **Continuing past a gate in the same turn.** The most common gate violation. End the turn.
- **Auto-approving your own work.** Only the human approves. You present; you never self-sign.
- **Picking the case or finding the report.** The human supplies both (RULE #4 / RULE #2).
- **Letting facts drift from the report.** Every claim traces to the research_brief, which traces to the report.
- **Pretending downstream ran.** Stop cleanly after humanize; name the missing director.
