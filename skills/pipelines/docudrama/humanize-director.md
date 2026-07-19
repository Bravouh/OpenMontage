# Humanize Director — Docudrama Pipeline

## When to Use

You are the Humanize step. A `script` artifact exists from the script stage.
Your job: run the humanize skill over the narration **text**, before any TTS
(RULE #3), and re-emit the humanized script as the `script` artifact so the
Scene Planner consumes the de-AI'd version.

This is a **thin wrapper**. You do not reimplement humanizing — the editing
logic lives entirely in `.claude/skills/humanize`. You apply it to the script
artifact, guard the facts, keep the schema valid, and hold the gate.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Schema | `schemas/artifacts/script.schema.json` | The humanized script must still validate |
| Prior artifact | `script` (from the `script` stage checkpoint) | The text to humanize |
| Engine skill | `.claude/skills/humanize` | **Owns all editing logic. Invoke it; do not duplicate its passes here.** |
| Meta skill | `skills/meta/checkpoint-protocol.md` | How to checkpoint and gate |

## Process

### Step 1: Load the script artifact

Read the `script` artifact from the script-stage checkpoint. Keep the whole
object — you will return the same shape, only with humanized `text`.

### Step 2: Run the humanize skill on the narration text

Invoke `.claude/skills/humanize` on the narration prose — section by section, or
on the concatenated narration then split back by section id. Let that skill do
its passes (structure, inflation, AI vocabulary, rhythm, hedging, soul). You are
its caller, not its editor.

### Step 3: Guard the facts and the schema (the wrapper's real job)

Humanize changes **wording only**. You must ensure it did not touch anything
else:

- **Never alter** numbers, dates, proper nouns, technical terms, `source_ref`,
  or the factual claim of any section. Phrasing changes; facts do not.
- **Preserve the structure**: keep every `id`, `label`, `start_seconds`,
  `end_seconds`, `enhancement_cues`, `delivery_cues`, `pronunciation_guides`,
  `voice_performance`, `title`, `version`, `total_duration_seconds`, and
  `metadata`. Humanize edits `text` (and, if useful, the prose inside
  `delivery_note` / `provider_text`) — nothing structural.
- **Hold the timing**: if a humanized section's word count drifts enough to bust
  its `start`/`end` window at ~120–140 wpm, trim or pad lightly to fit. Do NOT
  move timestamps or change `total_duration_seconds` — retiming is not this
  stage's job.

### Step 4: Re-emit the `script` artifact

Return the full script object with humanized `text`, unchanged everywhere else.
Add to `metadata`:
- `humanized: true`
- `humanize_changes`: the summary table the humanize skill produced (audit trail).

Downstream stages read this humanized `script` — the humanize checkpoint is the
canonical latest script.

### Step 5: Self-Evaluate (fact-preservation diff)

Before submitting, diff the humanized script against the pre-humanize one and
confirm:

| Check | Question |
|-------|----------|
| Phrasing-only | Are all changes wording? No fact, number, name, or `source_ref` added or removed? |
| Schema-valid | Does the artifact still validate against `script.schema.json`? |
| Structure intact | Same section ids, timestamps, enhancement/delivery cues? |
| Timing | Every section still fits its window; `total_duration_seconds` unchanged? |
| Register | Still authoritative for an accident investigation — humanized, not made flippant? |

If any check fails, fix it before submitting.

### Step 6: Persist and gate

```python
write_checkpoint(
    pipeline_dir, project_name,
    stage="humanize",
    status="awaiting_human",          # gated stage — never write "completed" here
    artifacts={"script": humanized_script_json},
    pipeline_type="docudrama",
)
```

## Common Pitfalls

- **Editing facts while humanizing.** The one thing you must never do. Wording only.
- **Running on audio instead of text.** RULE #3 is explicit: humanize on the script, before TTS. Never after.
- **Breaking the schema or dropping cues.** Losing `enhancement_cues` or `source_ref` orphans the Scene Planner and the citations.
- **Over-humanizing into flippancy.** An NTSB-grounded story can read like a person wrote it without sounding careless. Keep the authority.
- **Reimplementing humanize here.** If you find yourself listing AI-tell rules, stop — call the skill.

---

## Gate Reminder (Binding)

This stage gates on human approval (`human_approval_default: true`). After the
fact-preservation self-check passes: checkpoint with `status="awaiting_human"`,
present the changes summary, and **END YOUR TURN**. Do not start the
retention_check stage in the same response. Approval is per-gate (RULE #4).
