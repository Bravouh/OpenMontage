"""Docudrama pipeline skeleton — gate + ordering regression tests.

Dry-walk of pipeline_defs/docudrama.yaml: no agents, no generation. Drives
write_checkpoint / get_next_stage against the REAL manifest with minimal
schema-valid fake artifacts (United 232) and pins the three properties that
make humanize + retention_check mandatory gates before scene_plan:

  (a) gated stages reject status="completed" without human_approved  -> GATE VIOLATION
  (b) with human_approved=True the same stages complete
  (c) while retention_check is not completed, get_next_stage() != scene_plan;
      once approved, get_next_stage() == scene_plan

If someone reorders the manifest or drops human_approval_default on these
stages, these tests fail.
"""

import pytest

from lib.checkpoint import (
    CheckpointValidationError,
    write_checkpoint,
    get_next_stage,
    get_completed_stages,
)
from lib.pipeline_loader import (
    load_pipeline,
    get_stage_order,
    get_stage_human_approval_default,
)

PIPELINE = "docudrama"


# --------------------------------------------------------------------------
# Minimal schema-valid fake artifacts (mechanism test, not content)
# --------------------------------------------------------------------------

def _research_brief() -> dict:
    return {
        "version": "1.0",
        "topic": "United Airlines Flight 232 (Sioux City, 1989)",
        "research_date": "2026-07-19",
        "landscape": {
            "existing_content": [
                {"title": "Mayday UA232", "source": "youtube", "angle": "reenactment",
                 "what_it_covers": "crash sequence"},
                {"title": "Disaster Breakdown UA232", "source": "youtube", "angle": "systems",
                 "what_it_covers": "hydraulics"},
                {"title": "Admiral Cloudberg UA232", "source": "blog", "angle": "analysis",
                 "what_it_covers": "full report"},
            ],
            "saturated_angles": ["heroic pilots"],
            "underserved_gaps": ["fan disk metallurgy for a lay audience"],
        },
        "data_points": [
            {"claim": "All three hydraulic systems lost after fan disk failure",
             "source_url": "https://www.ntsb.gov/ua232", "credibility": "primary_source"},
            {"claim": "296 aboard, 112 fatalities, 184 survived",
             "source_url": "https://www.ntsb.gov/ua232", "credibility": "primary_source"},
            {"claim": "Crew used differential thrust to steer",
             "source_url": "https://www.ntsb.gov/ua232", "credibility": "primary_source"},
        ],
        "audience_insights": {
            "common_questions": ["How do you fly with no hydraulics?",
                                 "Why did the disk fail?", "How did anyone survive?"],
            "misconceptions": [{"myth": "Pilot error", "reality": "Metal fatigue in the fan disk"}],
            "knowledge_level": "general US audience, no aviation background",
        },
        "angles_discovered": [
            {"name": "The disk that could not fail", "hook": "One hidden flaw took out every backup.",
             "type": "narrative", "why_now": "evergreen engineering lesson"},
            {"name": "Steering with throttles", "hook": "They flew a crippled jet with two levers.",
             "type": "data_driven", "why_now": "counterintuitive control story"},
            {"name": "Why 184 lived", "hook": "The crash was survivable by design and luck.",
             "type": "contrarian", "why_now": "reframes a disaster as partial success"},
        ],
        "sources": [
            {"url": "https://www.ntsb.gov/ua232", "title": "NTSB AAR-90/06", "used_for": "spine"},
            {"url": "https://example.org/a", "title": "src a", "used_for": "landscape"},
            {"url": "https://example.org/b", "title": "src b", "used_for": "data"},
            {"url": "https://example.org/c", "title": "src c", "used_for": "angles"},
            {"url": "https://example.org/d", "title": "src d", "used_for": "context"},
        ],
    }


def _script() -> dict:
    return {
        "version": "1.0",
        "title": "UA232 (dry-walk placeholder script)",
        "total_duration_seconds": 2700,
        "sections": [{"id": "s1", "text": "placeholder hook", "start_seconds": 0, "end_seconds": 30}],
    }


def _retention_report() -> dict:
    return {"rules": {"1": "pass", "2": "pass", "3": "pass", "4": "pass", "5": "pass"}}


# Gated stages under test, with the artifact each carries.
GATED_STAGES = [
    ("script", lambda: {"script": _script()}),
    ("humanize", lambda: {"script": _script()}),
    ("retention_check", lambda: {"retention_report": _retention_report()}),
]


def _wc(pipeline_dir, project, stage, status, artifacts, approved=False):
    return write_checkpoint(
        pipeline_dir, project, stage, status, artifacts,
        pipeline_type=PIPELINE, human_approved=approved,
    )


def _walk_to_retention_pending(pipeline_dir, project):
    """research(completed) -> script(approved) -> humanize(approved) -> retention(awaiting)."""
    _wc(pipeline_dir, project, "research", "completed", {"research_brief": _research_brief()})
    _wc(pipeline_dir, project, "script", "completed", {"script": _script()}, approved=True)
    _wc(pipeline_dir, project, "humanize", "completed", {"script": _script()}, approved=True)
    _wc(pipeline_dir, project, "retention_check", "awaiting_human",
        {"retention_report": _retention_report()}, approved=False)


# --------------------------------------------------------------------------
# Manifest shape — the tests below assume this ordering / gating stays true
# --------------------------------------------------------------------------

def test_manifest_order_and_gates_are_as_expected():
    manifest = load_pipeline(PIPELINE)
    order = get_stage_order(manifest)
    # humanize + retention_check sit between script and scene_plan, in order
    for a, b in [("script", "humanize"), ("humanize", "retention_check"),
                 ("retention_check", "scene_plan")]:
        assert order.index(a) < order.index(b), f"{a} must precede {b}: {order}"
    for stage in ("script", "humanize", "retention_check", "scene_plan"):
        assert get_stage_human_approval_default(manifest, stage) is True, \
            f"{stage} must gate on human approval"


# --------------------------------------------------------------------------
# (a) gated stages reject completed without approval
# --------------------------------------------------------------------------

@pytest.mark.parametrize("stage,artifact_factory", GATED_STAGES,
                         ids=[s for s, _ in GATED_STAGES])
def test_gated_stage_rejects_completed_without_approval(tmp_path, stage, artifact_factory):
    with pytest.raises(CheckpointValidationError, match="GATE VIOLATION"):
        _wc(tmp_path, "ua232", stage, "completed", artifact_factory(), approved=False)


# --------------------------------------------------------------------------
# (b) with human_approved=True the same stages complete
# --------------------------------------------------------------------------

@pytest.mark.parametrize("stage,artifact_factory", GATED_STAGES,
                         ids=[s for s, _ in GATED_STAGES])
def test_gated_stage_completes_with_approval(tmp_path, stage, artifact_factory):
    _wc(tmp_path, "ua232", stage, "completed", artifact_factory(), approved=True)
    assert stage in get_completed_stages(tmp_path, "ua232", PIPELINE)


# --------------------------------------------------------------------------
# (c) retention pending blocks scene_plan; approval unblocks it
# --------------------------------------------------------------------------

def test_scene_plan_blocked_while_retention_not_completed(tmp_path):
    _walk_to_retention_pending(tmp_path, "ua232")
    nxt = get_next_stage(tmp_path, "ua232", PIPELINE)
    assert nxt != "scene_plan", "scene_plan must not be reachable while retention pends"
    assert nxt == "retention_check", f"retention_check is the blocker, got {nxt!r}"


def test_scene_plan_unblocks_after_retention_approved(tmp_path):
    _walk_to_retention_pending(tmp_path, "ua232")
    # approve retention -> completed
    _wc(tmp_path, "ua232", "retention_check", "completed",
        {"retention_report": _retention_report()}, approved=True)
    nxt = get_next_stage(tmp_path, "ua232", PIPELINE)
    assert nxt == "scene_plan", f"scene_plan should be next once retention is approved, got {nxt!r}"
