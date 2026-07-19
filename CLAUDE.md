# CLAUDE.md — Dự án Pace Docudrama Pipeline

> File này Claude Code đọc mỗi session. Giữ NGẮN, chỉ ghi những gì LUÔN đúng.
> Tiến độ → ROADMAP.md. Lý do đã quyết → MEMORY.md. Đọc cả hai file đó ở đầu mỗi session.

## Dự án là gì
Pipeline sản xuất video **docudrama long-form 40–50 phút** cho khán giả **Hoa Kỳ**, niche **điều tra tai nạn hàng không / sự cố kỹ thuật**. Xây bằng cách **sửa bản clone OpenMontage**, không build orchestrator từ đầu.

## Ràng buộc cứng (RULES — không vi phạm)
1. **KHÔNG character consistency, KHÔNG lip-sync, KHÔNG nhân vật diễn.** Chỉ docudrama Kiểu A: lời dẫn + tái hiện không khí (bóng người, cận cảnh vật, sơ đồ, cảnh không mặt).
2. **KHÔNG scraped-article-to-TTS.** Mọi script phải dựa official accident report + góc nhìn biên tập riêng.
3. **Mọi script PHẢI qua skill `humanize` trước khi đưa vào TTS.** Humanize chạy trên text, không phải sau khi sinh audio.
4. **Con người chốt khâu sáng tạo.** Claude Code KHÔNG tự quyết chọn case, cấu trúc retention, hay merge. Luôn dừng ở checkpoint chờ duyệt.
5. **Không tự merge.** Mở PR / trình diff, chờ người duyệt (giống kỷ luật branch → diff → approval).
6. **Luôn bật disclosure "altered/synthetic content"** khi chuẩn bị metadata upload.

## Luồng pipeline (documentary, đã sửa cho long-form)
research → script → **HUMANIZE** → **RETENTION-CHECK** → scene plan → assets → edit → compose (Remotion/FFmpeg) → self-review → CHỜ DUYỆT → export

## Stack đã chốt
- Khung: OpenMontage (clone, MIT).
- Voice: OmniVoice (k2-fsa, Apache 2.0) — qua voice library `voices.json` (map voice_id → ref_audio). *OpenMontage KHÔNG có sẵn cloning; đây là phần tự đắp.*
- Humanize: skill `humanize` (từ jpeggdev/humanize-writing).
- Retention: skill `retention-longform` (tự đúc, xem MEMORY.md).
- Render: Remotion (đã có trong repo) + FFmpeg NVENC.
- Align: WhisperX (đã có trong repo).

## Subagent (cửa review, KHÔNG thay quyết định của người)
- `retention-critic`: soi script tìm đoạn tụt nhịp trước khi sản xuất.
- `fact-checker`: đối chiếu script với official report.

## Self-maintenance (Claude Code tự làm)
- Đầu session: đọc ROADMAP.md + MEMORY.md.
- Sau mỗi quyết định kiến trúc: thêm 1 dòng vào MEMORY.md (quyết định + lý do).
- Sau mỗi task xong: tick mục tương ứng trong ROADMAP.md.
- Nếu phát hiện mâu thuẫn với MEMORY.md: DỪNG, hỏi người, không tự đảo quyết định cũ.

## Bài học vận hành
- Verify harness pass trên data giả KHÔNG có nghĩa là đúng. Với video: luôn render ra và XEM tận mắt trước khi báo hoàn thành.
