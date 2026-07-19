# MEMORY.md — Nhật ký quyết định

> Ghi QUYẾT ĐỊNH + LÝ DO. Không ghi tiến độ (đó là ROADMAP). Thêm dòng mới ở cuối, không xóa dòng cũ.
> Claude Code: đọc file này đầu session; thêm dòng sau mỗi quyết định kiến trúc.

## Định hướng
- **[chốt]** Thể loại: docudrama Kiểu A (lời dẫn + tái hiện không khí). LÝ DO: Kiểu B (nhân vật + lip-sync) là biên giới chưa giải được của AI video 2026 → né để v1 khả thi.
- **[chốt]** Niche: điều tra tai nạn hàng không / sự cố kỹ thuật. LÝ DO: giao điểm hiếm của view US lớn + stack fit tối đa (Remotion mạnh ở reconstruction/data-viz) + an toàn policy cao nhất (có official report chứng minh original research) + cạnh tranh thấp.
- **[chốt]** Khán giả: tiếng Anh US. Mục tiêu: 1 video thật tốt trước, chưa nhắm số lượng.

## Kiến trúc
- **[chốt]** Dùng OpenMontage làm khung, không build từ đầu. LÝ DO: nó đã có tool registry + manifest + checkpoint + self-review + Remotion + guard chống-slop (variation_checker, slideshow_risk). Tiết kiệm hàng tháng.
- **[chốt]** OmniVoice cloning KHÔNG tự chạy qua OpenMontage. LÝ DO: `tts_selector.py` chỉ có `voice_id`, không có `ref_audio`; BaseTool không strip param nên runtime cho qua, nhưng schema không khai báo → agent không truyền. PHẢI: thêm ref_audio/ref_text vào input_schema + viết omnivoice_tts.py + xây voice library (voice_id → ref_audio).
- **[chốt]** Không tự động hóa khâu sáng tạo bằng orchestrator-agent. LÝ DO: human editorial là lá chắn policy 2026 (YouTube test: "reviewer có nhận ra mass-produced không người điều hướng?"). Pace đang có notice termination → giữ tay người ở khâu phán đoán.
- **[chốt]** Phong cách nền = voiceover-only + ảnh tĩnh/sơ đồ 2D + reconstruction Remotion + citation trên màn hình, nhịp ~8–12s. LÝ DO: rẻ asset nhất, né RULE #1, citation là lá chắn RULE #2, khai thác Remotion. Đánh đổi: không có lưới an toàn → script/retention/humanize là cửa bắt buộc. (Nguồn: phase0/SYNTHESIS.md từ 4 case study Phase 0.)

## Bài học
- **[lưu]** Retention 45 phút không mua được bằng skill — phải tự đúc từ (a) phân tích top aviation docs bằng claude-watch, (b) retention curve của kênh. Đây là moat.
- **[lưu]** OpenMontage nhắm short-form (ví dụ đều 60s). Long-form 45 phút chưa được chứng minh → phải tự mở rộng pipeline + tầng retention.
