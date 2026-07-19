---
name: docudrama-script
description: Viết kịch bản docudrama điều tra tai nạn hàng không/kỹ thuật cho khán giả Hoa Kỳ, độ dài 40-50 phút, dựa trên official report. Tự áp cấu trúc retention và các ràng buộc policy. Dùng khi bắt đầu soạn script cho một case mới.
---

# Docudrama Script (aviation/engineering, US, 40–50 phút)

## Trước khi viết
1. Yêu cầu người cung cấp/ xác nhận **case** + đường dẫn **official accident report**. KHÔNG tự chọn case.
2. Đọc report, dựng **factual spine** (mốc thời gian → điều tra → nguyên nhân → hệ quả/cải cách).
3. Ghi mọi nguồn vào `sources.md` của video.

## Cấu trúc (gọi skill `retention-longform` để lấy công thức chi tiết)
research → factual spine → cold open (hook) → open loop lớn → các chương (beat + mini-payoff) → reveal → resolution/cải cách.

## Ràng buộc BẮT BUỘC
- KHÔNG trình bày suy diễn như sự thật. Đoạn dựng lại phải rõ là tái hiện, không phải kết luận điều tra.
- KHÔNG đọc lại nguyên văn nguồn (né scraped-to-TTS). Diễn đạt lại bằng góc nhìn biên tập.
- Đánh dấu chỗ cần **giọng nhân vật** (voice_id nào trong voices.json) vs **narrator**.
- Đánh dấu chỗ cần **visual reconstruction** (sơ đồ đường bay, timeline, cutaway) để khâu sau dựng Remotion.
- Nhịp nói ~130–150 từ/phút để canh độ dài.

## Sau khi viết
- Bàn giao cho skill `humanize` (bắt buộc, trước TTS).
- Rồi gọi subagent `retention-critic` + `fact-checker` review.
- DỪNG chờ người duyệt trước khi sang scene plan.
