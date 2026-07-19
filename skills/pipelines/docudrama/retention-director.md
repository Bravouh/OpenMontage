# Retention Director — Docudrama Pipeline

## When to Use

You are the **Retention Check** — the stage after humanize, before scene_plan. A
humanized `script` exists. Your job: score it against **PART 1 of the
retention-longform formula (5 hard constraints)** and emit a `retention_report`.

You are a **gate**. If any constraint fails, the script goes back; scene_plan
cannot proceed until a human approves. This is by design (RULE #4/#5), and the
mechanism is proven in `tests/contracts/test_docudrama_gates.py`.

This is a **thin wrapper**. The formula lives in
`.claude/skills/retention-longform`; the qualitative diagnosis comes from the
`retention-critic` subagent. You do NOT invent scoring criteria — you MEASURE
against the skill's thresholds and let the critic surface risk segments.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Formula skill | `.claude/skills/retention-longform` | PART 1's 5 constraints + thresholds. **Invoke it; do not re-derive.** |
| Subagent | `retention-critic` | Qualitative risk diagnosis (risk segments, 1–10 score). Report-only. |
| Prior artifact | `script` from the **HUMANIZE checkpoint** | The text you score — the humanized version scene_plan will consume |
| Meta skill | `skills/meta/checkpoint-protocol.md` | Gate + checkpoint |

## Process

### Step 1: Load the humanized script (not the original)

Read `projects/<id>/checkpoint_humanize.json` → `artifacts.script`. That is the
humanized version. Do NOT score `checkpoint_script.json` (pre-humanize) — the
whole point of the pipeline order is that retention scores what will actually be
produced.

### Step 2: Invoke the retention-longform skill

It carries PART 1's five rules and the project-specific thresholds (voiceover
style: causal ratio **≥ 8:1**, absolute floor 5:1). You measure against these.
You do not set new ones.

### Step 3: Measure each of the 5 constraints — REAL numbers, never estimates

**Rule 1 — Causal structure (COUNT, do not estimate).**
Count whole-word, case-insensitive occurrences across all section `text`:
- causal = `but`, `so`, `because`, `however`
- sequential = `then`, `and then`, `suddenly` (count `and then` as ONE; do not
  also count its inner `then`)
Compute `ratio = causal / max(sequential, 1)`. PASS if `ratio ≥ 8` (project
voiceover style); the absolute floor is 5. Record both raw counts and the ratio.
Count whole words only — `so` inside "also", `then` inside "further" do not count.

**Rule 2 — Cold-open ≤ 60s.**
Take the section(s) up to the 60-second mark. PASS if it opens ≥ 1 clear
question / open loop AND does not front-load biography or scene-setting before
that question. Quote the opening question and record its timestamp.

**Rule 3 — Nested open loops.**
Identify ≥ 1 **outer** loop opened in the cold-open, closed near the end, with an
outro callback. Identify the **inner** loops (mechanism/investigation) and confirm
each one closes. PASS if the outer loop + callback exist AND no inner loop is left
dangling. List loops with their open/close section ids.

**Rule 4 — Re-hook cadence.**
Using section timestamps + labels/mini-payoffs, find the longest stretch with no
turn, reveal, or new element. PASS if no stretch exceeds **3 minutes**; note
whether cadence tightens to ~1–1.5 min near the climax. Record the longest gap
(mm:ss) and where it sits.

**Rule 5 — Sponsor/CTA.**
Locate any sponsor or CTA block. PASS if none appears before a payoff and the full
read sits after the climax (CTA after the moral). If the script has no sponsor
block, record "no sponsor present — PASS (nothing before a payoff)".

### Step 4: Spawn the retention-critic subagent

Hand it the humanized script (or `script_humanized_readable.md`). It returns risk
segments, 3–5 concrete suggestions, and a 1–10 score. Attach that to the report.
The critic is **diagnostic only** — it does not decide pass/fail. The five
mechanical constraints decide failure; the critic informs the human.

### Step 5: Assemble the retention_report

```json
{
  "version": "1.0",
  "scored_artifact": "checkpoint_humanize (humanized script)",
  "rules": {
    "1_causal":    {"verdict": "pass|fail", "causal_count": 0, "sequential_count": 0, "ratio": 0.0, "threshold": 8, "floor": 5},
    "2_cold_open": {"verdict": "pass|fail", "opening_question": "…", "seconds": 0},
    "3_open_loops":{"verdict": "pass|fail", "outer_loop": {"open": "cold_open", "close": "ch8_s2"}, "inner_loops": [], "outro_callback": true},
    "4_re_hook":   {"verdict": "pass|fail", "longest_gap_seconds": 0, "location": "…"},
    "5_sponsor":   {"verdict": "pass|fail", "note": "…"}
  },
  "overall": "pass|fail",
  "failures": ["<rule> — <measurement> — <where>"],
  "critic": { "score": 0, "risk_segments": [], "suggestions": [] }
}
```

`overall` = **fail if ANY rule verdict is fail.**

### Step 6: Checkpoint + gate

ALWAYS write `status="awaiting_human"` — `retention_check` has
`human_approval_default: true`. Never write `completed` here; a human approves.

```python
write_checkpoint(
    pipeline_dir, project_name,
    stage="retention_check",
    status="awaiting_human",
    artifacts={"retention_report": report},
    pipeline_type="docudrama",
)
```

- **If `overall == fail`:** the `failures` list must point at exact spots (which
  rule, the measurement, which section). Present it, and **END YOUR TURN**. Do NOT
  proceed to scene_plan. On the human's decision, either send the script back to
  `script`/`humanize` to fix (then this stage re-runs), or — only if the human
  explicitly overrides — record a `decision_log` entry and let them approve.
- **If `overall == pass`:** still `awaiting_human`. Present the report + the
  critic's score, **END YOUR TURN**, and wait for approval.

Because `get_next_stage` only advances when `retention_check` is `completed`, and
`completed` requires `human_approved=True`, a failed check the human declines to
approve leaves scene_plan blocked — exactly the behavior pinned by
`test_docudrama_gates.py`.

## Common Pitfalls

- **Scoring the pre-humanize script.** Read the HUMANIZE checkpoint.
- **Estimating the causal ratio.** Count whole words. Report the raw numbers.
- **Writing `completed` on a fail to keep moving.** Never. The gate is the point.
- **Treating the critic's 1–10 score as the pass/fail.** The five mechanical
  constraints decide failure; the critic only informs the human.
- **Reimplementing the critic.** Spawn the subagent; don't hand-wave a diagnosis.

## Gate Reminder (Binding)

`human_approval_default: true`. Pass or fail, checkpoint `awaiting_human`, present,
and **END YOUR TURN**. A failed check must never silently advance to scene_plan.
Approval is per-gate (RULE #4).
