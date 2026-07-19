# START HERE — Lộ trình theo phase + prompt paste vào Claude Code

Bộ file điều khiển này copy vào **thư mục gốc của bản clone OpenMontage**. Layout:

```
OpenMontage/                 (bản clone của anh)
├── CLAUDE.md                ← hiến pháp (copy vào)
├── MEMORY.md                ← nhật ký quyết định (copy vào)
├── ROADMAP.md               ← lộ trình (đã có từ trước, copy vào)
└── .claude/
    ├── settings.json        ← hook SessionStart
    ├── agents/
    │   ├── retention-critic.md
    │   └── fact-checker.md
    └── skills/
        ├── retention-longform/SKILL.md   (khung rỗng, điền sau Phase 0)
        ├── docudrama-script/SKILL.md
        └── newcase/SKILL.md
```

**Quy tắc vàng xuyên suốt:** mỗi prompt dưới đây đều để Claude Code DỪNG chờ anh duyệt ở checkpoint. Đừng bỏ dòng đó. Con người chốt khâu sáng tạo.

---

## PHASE 0 — Làm tay + đúc công thức retention (KHÔNG code)

**Mục tiêu:** có 1 video mẫu + bảng "retention beats" của niche. File điều khiển: chưa cần.

**Việc tay:** chọn 1 case tai nạn có official report, tự dựng 1 video 45' bằng Shotcut/CapCut, tự xem lại, ghi chỗ chán.

**Cài `claude-watch` rồi paste prompt này (chạy cho từng video top):**

```
Dùng skill claude-watch. Xem video này: <URL một docudrama aviation top, ví dụ Mayday/Disaster Breakdown>.
Phân tích cho tôi CÔNG THỨC GIỮ CHÂN, không tóm tắt nội dung:
- Hook 30 giây đầu họ làm gì (mở bằng gì)?
- Các open loop lớn đặt ở đâu, đóng lại lúc nào?
- Cứ mấy phút họ có một điểm nhấn / tiết lộ mới (re-hook cadence)?
- Chia chương thế nào, mỗi chương có payoff gì?
- Nhịp hình đổi mỗi bao nhiêu giây?
Xuất ra dạng bảng timestamp → beat để tôi tổng hợp thành công thức.
```

Chạy cho 5–10 video → tổng hợp thành công thức. Đây là nguyên liệu điền vào skill `retention-longform` ở Phase 4.

---

## PHASE 1 — Clone + chạy OpenMontage free path

**Mục tiêu:** khung chạy được trên máy. File điều khiển: copy toàn bộ bộ này vào repo TRƯỚC.

**Prompt:**

```
Đọc CLAUDE.md, MEMORY.md, ROADMAP.md trước.
Đây là bản clone OpenMontage trên máy Windows có GPU NVIDIA. Giúp tôi:
1. Cài dependencies (Python, remotion-composer npm, Piper TTS) theo README. Nếu npm lỗi ERR_INVALID_ARG_TYPE thì dùng `npx --yes npm install`.
2. Chạy thử pipeline documentary-montage ở FREE PATH (Piper + stock Pexels/Pixabay + Remotion) với một brief ngắn 60s để xác nhận khung hoạt động.
3. Báo cáo mọi lỗi môi trường (Python version, node modules, FFmpeg codec) trước khi đi tiếp.
KHÔNG sửa gì trong lõi OpenMontage ở bước này. Chỉ cài và validate.
```

---

## PHASE 2 — Đắp OmniVoice cloning (phần OpenMontage KHÔNG có)

**Mục tiêu:** clone giọng chạy được. File điều khiển liên quan: MEMORY.md (đã ghi lý do).

**Prompt:**

```
Đọc MEMORY.md phần "OmniVoice cloning" trước.
OpenMontage hiện KHÔNG cho clone giọng vì tts_selector.py chỉ có voice_id, không có ref_audio. Giúp tôi đắp thêm, theo đúng pattern BaseTool trong repo:
1. Viết tools/audio/omnivoice_tts.py: một TTS backend gọi OmniVoice server (FastAPI/OpenAI-compatible), đọc inputs.get("ref_audio") và inputs.get("ref_text"), khai supports={"voice_cloning": True}, capability="tts".
2. Thêm ref_audio và ref_text vào input_schema của tools/audio/tts_selector.py (để agent biết truyền).
3. Tạo voice library: file voices.json map voice_id nội bộ → đường dẫn file ref_audio. Backend đọc voice_id → nạp ref_audio tương ứng.
Trình diff cho tôi duyệt TRƯỚC KHI ghi file. Không tự merge.
```

Sau đó anh generate/lưu ref audio cho 1 narrator + vài giọng nhân vật, khai vào `voices.json`.

---

## PHASE 3 — Cắm humanize + retention thành STAGE bắt buộc

**Mục tiêu:** mỗi script tự động qua humanize + retention-check. File liên quan: skills `docudrama-script`, `retention-longform`, `humanize`.

**Prompt:**

```
Đọc CLAUDE.md phần "Luồng pipeline" và "Ràng buộc cứng".
Tôi đã copy skill humanize (từ jpeggdev/humanize-writing) và các skill docudrama-script, retention-longform vào .claude/skills/. Giúp tôi:
1. Sửa pipeline_defs/documentary-montage.yaml: chèn stage `humanize` NGAY SAU stage script, và stage `retention-check` sau humanize, TRƯỚC scene plan.
2. Thêm success gate: pipeline không qua scene plan nếu humanize chưa chạy và retention-critic chưa cho điểm ≥ ngưỡng.
Trình diff cho tôi duyệt trước khi ghi. Giải thích mỗi thay đổi.
```

---

## PHASE 4 — Đúc skill retention-longform (từ Phase 0)

**Mục tiêu:** biến công thức Phase 0 thành skill sống. File: `.claude/skills/retention-longform/SKILL.md`.

**Prompt:** (dán kèm bảng beats tổng hợp từ Phase 0)

```
Đây là bảng "retention beats" tôi rút ra từ 8 video docudrama aviation top: <dán bảng>.
Giúp tôi điền vào .claude/skills/retention-longform/SKILL.md — thay các ô [điền] bằng công thức THẬT từ bảng này: cold open, open loop, số chương, re-hook cadence, nhịp hình. Giữ nguyên phần checklist rà soát.
Không thêm số liệu chung chung; chỉ dùng số từ bảng của tôi.
```

---

## PHASE 5 — Viết component Remotion cho aviation reconstruction

**Mục tiêu:** có đồ họa đặc thù (flight path, timeline sự cố, cutaway). File: `remotion-composer/src/components/`.

**Prompt:**

```
Đọc frontend-design skill nếu có. Trong remotion-composer đã có sẵn charts + caption + title, nhưng thiếu component cho điều tra tai nạn hàng không. Giúp tôi viết các component Remotion mới (React, đúng style repo):
1. FlightPath — vẽ đường bay + điểm sự cố trên bản đồ/không gian, animate theo timeline.
2. IncidentTimeline — dòng thời gian sự kiện, reveal từng mốc.
3. SystemCutaway — cắt lớp một hệ thống (ví dụ động cơ) highlight bộ phận lỗi.
Nhận props dạng JSON để pipeline điền dữ liệu. Trình từng component + preview mô tả cho tôi duyệt trước khi tích hợp vào Root.tsx.
```

---

## PHASE 6 — Mở lên long-form 45' + cắm subagent review

**Mục tiêu:** pipeline chạy được video dài + có 2 cửa review. File: `.claude/agents/*`.

**Prompt:**

```
Đọc CLAUDE.md. Giúp tôi:
1. Điều chỉnh pipeline documentary cho độ dài mục tiêu 40–50 phút (chia chương, quản lý asset số lượng lớn, kiểm soát cost cap trước khi generate).
2. Nối subagent retention-critic và fact-checker vào bước review: sau khi có script (đã humanize), tự động gọi cả hai, tổng hợp báo cáo, rồi DỪNG chờ tôi duyệt.
Không tự merge, không tự sang khâu sản xuất khi tôi chưa duyệt.
```

---

## Thứ tự & thời điểm (nhắc lại)

| Phase | Khi làm | File điều khiển tạo/dùng |
|---|---|---|
| 0 | Ngay | (không) — chạy claude-watch |
| 1 | Sau khi chuẩn bị máy | Copy toàn bộ bộ này vào repo |
| 2 | Sau P1 | omnivoice_tts.py, voices.json (Claude Code tạo) |
| 3 | Sau P2 | skills humanize/docudrama-script |
| 4 | Cần P0 xong | retention-longform/SKILL.md |
| 5 | Song song P3–4 | Remotion components |
| 6 | Cuối | subagents |

**Đừng tạo/điền hết cùng lúc.** Skill retention và subagent chỉ có nghĩa khi có nội dung thật (sau Phase 0). Bộ file này để SẴN khung; điền dần theo phase.
