---
name: retention-longform
description: Áp dụng công thức giữ chân cho video documentary long-form 40-50 phút khán giả Hoa Kỳ. Dùng khi viết hoặc rà soát cấu trúc kịch bản docudrama, để đảm bảo hook, open loop, nhịp chương, re-hook cadence đạt chuẩn của kênh.
---

# Retention Long-form (docudrama aviation/engineering, khán giả US)

> **Cảnh báo mẫu:** Ngưỡng rút từ n=4 cùng niche → sàn quan sát, không phải tối ưu. Cập nhật từ retention curve kênh sau mỗi lô video (Phase 5).
> **Cách dùng:** skill này chạy như stage **retention-check** SAU script, TRƯỚC scene plan (theo CLAUDE.md: research → script → HUMANIZE → **RETENTION-CHECK** → scene plan → …).

Nguồn: [phase0/SYNTHESIS.md](../../../phase0/SYNTHESIS.md) — 4 case study (Mayday UA232, Disaster Breakdown AC621, Mentour Lion Air 904, Fascinating Horror Tenerife).

---

## PHẦN 1 — RÀNG BUỘC (luôn áp, mọi video)
5 quy luật. Vi phạm bất kỳ = **fail** retention-check, trả về script để sửa.

### 1. Cấu trúc nhân-quả — ngưỡng gắn với phong cách
- Nối beat bằng **nhân-quả/đối lập** ("nhưng/cho nên/bởi vì/tuy nhiên"), KHÔNG trình tự ("rồi/và rồi/sau đó").
- **Tỉ lệ nghịch với lượng hình:** càng ít hình, ratio phải càng cao (Mayday nhiều hình ~5:1 → DB voiceover ~9:1 → FH ảnh tĩnh ~14:1).
- **Sàn tuyệt đối mọi phong cách: ≥ 5:1.**
- **Phong cách dự án (voiceover, ít hình, KHÔNG lưới an toàn): ≥ 8:1.** LÝ DO: không cắt-nhanh/diễn viên cứu đoạn chùng → lời gánh toàn bộ lực kéo.
- Kiểm: đếm `(but+so+because+however) : (then+and then+suddenly)`. `however` mạnh làm pivot reveal.

### 2. Cold-open ≤ 60s — gieo câu hỏi trước khi giải thích
- Trong ≤60s phải mở ≥1 open loop rõ. **CẤM** mở bằng dàn cảnh/tiểu sử/bối cảnh trước khi có câu hỏi.
- 4 cửa vào (chọn 1 hoặc lai):
  - **(a) In-medias-res sinh tử** — quăng thẳng vào đỉnh khủng hoảng.
  - **(b) Why-question** — dựng nhanh tình huống rồi hỏi "sao họ làm vậy?".
  - **(c) Dread + moral** — hứa kinh hoàng + đạo lý, chưa hé nội dung.
  - **(d) Nghịch lý luận đề** — "thảm hoạ lớn ← nguyên nhân nhỏ".

### 3. Open loop lồng nhau
- **≥1 vòng ngoài** (kết cục/ý nghĩa) mở ở cold-open, chỉ đóng ở vài phút cuối.
- Chuỗi **vòng nhỏ** (cơ chế, điều tra) mở giữa chừng, đóng dần trong ~vài phút — không bỏ lửng.
- **Callback vòng ngoài ở outro.**

### 4. Re-hook cadence
- **Không đoạn nào > 3 phút** thiếu bước ngoặt/tiết lộ/yếu tố mới.
- **Siết ~1–1.5 phút** khi tới climax.
- Công cụ cơ học hữu hiệu: nhãn đếm ngược "X minutes to disaster".

### 5. Sponsor/CTA — không bao giờ trước payoff
- **CẤM** full sponsor/CTA trước một payoff hoặc trong lúc căng thẳng đang lên.
- Đặt full read **ngay sau climax/payoff**, tốt nhất **muộn gần cuối** sau khi câu chuyện đã giải quyết.
- Câu nhắc sponsor 1 dòng ở 00:00 chấp nhận được. Outro CTA đặt **sau** moral.

---

## PHẦN 2 — THAM SỐ MẶC ĐỊNH (điều chỉnh được theo từng video)
> Đây là **điểm khởi đầu**, KHÔNG phải luật. Xoay được khi đổi chủ đề/định dạng.
- **Nhịp hình mặc định: 8–12s/đổi hình** (không khung tĩnh > ~15s). Không dùng 22s thuần FH vì 45' sẽ đơn điệu.
- **Kỹ thuật hình mặc định:** voiceover-only (không mặt-người-nhân-vật) + ảnh tĩnh/sơ đồ 2D + **reconstruction Remotion** (flight path, timeline, system cutaway) + **citation nguồn trên màn hình** + insert không khí Kiểu A (bóng người, cận cảnh vật, slow-mo).
- Lý do chốt mặc định: xem MEMORY.md ([chốt] phong cách nền).

---

## Checklist rà soát (agent tự chạy)
- [ ] Hook 30s đầu có đặt câu hỏi lớn?
- [ ] Có ≥ 3 open loop, mỗi cái được đóng lại rõ?
- [ ] Không đoạn nào > 3 phút thiếu điểm nhấn?
- [ ] Mỗi chương có mini-payoff?
- [ ] Đường cong nhịp có cao trào, không đều đều?

## Nguồn công thức
- phase0/SYNTHESIS.md — 4 case study Phase 0 (2026-07).
- Cập nhật định kỳ từ retention curve kênh (feedback loop, Phase 5).
