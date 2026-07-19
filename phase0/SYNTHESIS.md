# Phase 0 — SYNTHESIS: công thức retention (4 case study)

> Tổng hợp từ 4 phân tích: [united232-mayday](united232-mayday.md) · [mentour-blind](mentour-blind.md) · [disaster-breakdown](disaster-breakdown.md) · [fh-tenerife](fh-tenerife.md).
> Mục tiêu: tách **quy luật chung** (→ ràng buộc cứng) khỏi **tùy chọn phong cách** (→ chọn cho kênh mình), rồi đề xuất phong cách nền cho ràng buộc Kiểu A.
> **CHƯA đụng skill `retention-longform`** — file này để bạn duyệt trước.

## Giới hạn của mẫu (đọc trước khi tin số)
- **n = 4 video, cùng niche** (tai nạn hàng không), 10–45 phút. Đủ để thấy **quy luật lặp**, KHÔNG đủ để chốt con số tối ưu — hãy đọc các ngưỡng dưới là **"sàn quan sát được"**, không phải "điểm tối ưu đã chứng minh".
- Tỉ lệ "nhưng/cho nên" đếm từ **auto-caption** (nhiễu) → là **proxy xu hướng**, không phải số tuyệt đối.
- Nhịp hình = **ffmpeg scene-change candidate** (proxy cho lần đổi hình), không phải đếm cut thủ công.

## Bảng số liệu 4 video (tham chiếu)
| Kênh (case) | Dài | Nhịp cắt thật | Nối nhân-quả:tuần tự | Dạng cold-open |
|---|---|---|---|---|
| Mayday (UA232) | 45:00 | ~4.7s | **~5:1** | in-medias-res sinh tử |
| Disaster Breakdown (AC621) | 43:50 | ~8.4s | ~9:1 | độc thoại dread + moral |
| Mentour (Lion Air 904) | 27:01 | ~11s (bimodal) | ~7:1 | why-question |
| Fascinating Horror (Tenerife) | 10:44 | ~22s | ~14:1 (n nhỏ) | nghịch lý "lớn←nhỏ" |

---

# NHÓM 1 — QUY LUẬT CHUNG (mọi kênh đều làm → ràng buộc cứng)

### 1. Cấu trúc nhân-quả — **ngưỡng gắn với phong cách (càng ít hình càng phải cao)**
Cả 4 kênh nối beat bằng **"nhưng / cho nên / bởi vì / tuy nhiên"** áp đảo **"rồi / và rồi / sau đó"** — nhưng **mức tỉ lệ nghịch với lượng hình**: kênh càng dựa vào hình thì ratio thấp vẫn ổn, kênh càng ít hình thì ratio phải càng cao.
- Mayday (cắt ~4.7s, diễn viên+CGI — **có lưới an toàn bằng hình**): ~5:1 là đủ.
- Mentour (~11s, có talking-head persona): ~7:1.
- Disaster Breakdown (~8.4s, voiceover): ~9:1.
- Fascinating Horror (~22s, voiceover, ảnh tĩnh): ~14:1.
→ Hình càng ít, **script phải gánh toàn bộ lực kéo** → nối nhân-quả phải càng dày.

→ **Ràng buộc (theo phong cách):** nối beat bằng **quan hệ nhân-quả/đối lập**, không phải trình tự thời gian. Tỉ lệ `(but+so+because+however) : (then+and then+suddenly)`:
- **Sàn tuyệt đối mọi phong cách: ≥ 5:1.**
- **Phong cách đề xuất của dự án (voiceover, ít hình, KHÔNG lưới an toàn): ≥ 8:1.** LÝ DO: không có cắt-nhanh/diễn viên để cứu đoạn chùng → toàn bộ lực giữ chân dồn vào lời, chuỗi nhân-quả phải đủ dày để **tự kéo**. (Hai kênh voiceover trong mẫu đã tự nhiên đạt 9:1 và 14:1 — ngưỡng 8:1 là sàn dưới của vùng đó.)
- `however` đặc biệt mạnh làm **pivot reveal** ("họ tưởng ổn — tuy nhiên…").

### 2. Cold-open: gieo CÂU HỎI trước khi giải thích — 4 cửa vào đã thấy
Cả 4 đều mở bằng một **khoảng trống nhận thức/căng thẳng** trong **≤ ~60 giây**, TRƯỚC mọi setup. Bốn dạng cửa vào:
- **(a) In-medias-res sinh tử** — quăng thẳng vào đỉnh khủng hoảng (Mayday: "lost all three hydraulic systems… you're gonna die").
- **(b) Why-question** — dựng nhanh tình huống rồi hỏi "sao họ lại làm vậy?" (Mentour: chui vào mây khi qua minima).
- **(c) Dread + moral** — hứa hẹn kinh hoàng + đạo lý, chưa hé nội dung (Disaster Breakdown: "one small mistake → monstrous… none of it had to happen").
- **(d) Nghịch lý luận đề** — "thảm hoạ khổng lồ ← nguyên nhân tí hon" (Fascinating Horror).
→ **Ràng buộc:** cold-open ≤ 60s phải **mở một open loop rõ**, chọn 1 trong 4 cửa (hoặc lai). **Cấm** mở bằng dàn cảnh/tiểu sử/bối cảnh trước khi có câu hỏi.

### 3. Open loop lồng nhau — 1 vòng lớn ôm cả video + chuỗi vòng nhỏ
Cả 4 đều dùng: **một vòng ngoài** (kết cục / ý nghĩa / "sống hay chết" / "small mistake là gì") mở ở cold-open, **chỉ đóng ở vài phút cuối**; lồng bên trong là **chuỗi vòng nhỏ** (cơ chế kỹ thuật, điều tra, "workaround có cứu được không") mở giữa chừng và **đóng trong vòng vài phút**.
→ **Ràng buộc:** luôn có **≥1 vòng ngoài chưa đóng tới phút chót**; mỗi vòng nhỏ mở ra phải **đóng trong ~vài phút** (không bỏ lửng). Callback vòng ngoài ở outro (cả 4 làm: "changed aviation forever" / "none of it had to happen").

### 4. Re-hook cadence — **không để trống > ~3 phút**
Reveal/escalation/lỗ-hổng mới: Mayday ~3'/lần · Mentour ~2–3' · Disaster Breakdown ~2–2.5' (dồn ~1–1.5' ở climax) · FH gần như **liên tục** (mỗi ~30–60s một yếu tố nhân-quả mới).
→ **Ràng buộc:** **không đoạn nào > 3 phút mà không có bước ngoặt/tiết lộ/yếu tố mới**; siết còn ~1–1.5' khi tới climax. Công cụ cơ học hữu hiệu: **nhãn đếm ngược "X minutes to disaster"** (Disaster Breakdown).

### 5. Vị trí CTA/sponsor — **không bao giờ trước một payoff**
*(Chỉ 2/4 video có sponsor — Mayday & FH không có; quy luật này rút từ Mentour + Disaster Breakdown, cả hai nhất quán.)*
- **Xấu hơn:** Mentour đặt full mid-roll **ngay sau climax** (16:03, sau khi máy bay đáp biển) — cứu được vì đặt SAU payoff, nhưng vẫn là điểm rơi.
- **Tốt hơn:** Disaster Breakdown đặt full sponsor **rất muộn (~40:00)**, sau cả climax lẫn legacy → gần như không rơi người.
- Một câu nhắc sponsor lướt qua ở 00:00 (Mentour) thì chấp nhận được.
→ **Ràng buộc:** **cấm** full sponsor/CTA **trước một payoff** hoặc **trong lúc căng thẳng đang lên**. Đặt full read **ngay sau một climax/payoff**, tốt nhất là **muộn gần cuối** sau khi câu chuyện đã giải quyết. Outro CTA đặt **sau** moral.

---

# NHÓM 2 — TÙY CHỌN PHONG CÁCH (khác theo kênh → chọn cho kênh mình)

### Nhịp hình — phổ 4.7s → 22s, đánh đổi **asset ⇄ script-chặt**
```
4.7s ───────── 8.4s ──── 11s ─────────────── 22s
Mayday      DisasterBD  Mentour           Fascinating Horror
(asset đắt) ────────────────────────────► (script phải cực chặt)
```
- **Cắt nhanh (≤5s):** cần **rất nhiều** asset (diễn viên, CGI, sim, nhiều shot) → đắt/khó, nhưng "cứu" được đoạn script yếu bằng hình.
- **Cắt chậm (>15s):** cần **rất ít** asset (ảnh tĩnh + sơ đồ) → rẻ, nhưng **không có lưới an toàn** — script yếu là lộ ngay.

### Kỹ thuật hình — 4 lựa chọn đã thấy
| Kiểu | Ví dụ | Chi phí asset | Vướng ràng buộc? |
|---|---|---|---|
| Diễn viên + phỏng vấn + CGI | Mayday | **Cao nhất** | ⚠️ đòi character consistency → **phạm RULE #1** |
| Talking-head + flight-sim | Mentour | Trung bình | cần người dẫn thật lên hình (persona) |
| Voiceover + flight-sim + site-footage + trích dẫn nguồn | Disaster Breakdown | Thấp–TB | hợp policy (citations) |
| Voiceover + ảnh tĩnh + sơ đồ 2D | Fascinating Horror | **Thấp nhất** | hợp Kiểu A hoàn toàn |

---

# ĐỀ XUẤT — phong cách nền cho ràng buộc Kiểu A (asset đắt)

## Đề xuất: **"Động cơ Fascinating Horror" + tầng bằng chứng Disaster Breakdown + Remotion motion-graphics**
Cụ thể: **voiceover-only, không mặt người-nhân-vật** · nền là **ảnh tĩnh + sơ đồ 2D + reconstruction bằng Remotion** (flight path, timeline, system cutaway) · đan **footage địa điểm hiện tại** làm khung cảm xúc · **hiện trích dẫn nguồn trên màn hình** · điểm nhấn bằng **insert không khí Kiểu A** (bóng người, cận cảnh vật, slow-mo, không khuôn mặt) · **carried by giọng đọc mạnh + script nhân-quả cực chặt**.

### Vì sao hợp nhất
1. **Rẻ asset nhất / phút** — đúng ràng buộc "asset đắt". FH chứng minh hình tĩnh vẫn giữ chân NẾU script chặt.
2. **Không phạm RULE #1** — FH và Disaster Breakdown dùng **0 nhân vật-có-mặt**; né hoàn toàn character consistency / lip-sync. (Mayday ngược lại — phạm RULE #1; loại. Mentour cần persona thật lên hình; loại.)
3. **Trích dẫn nguồn trên màn hình = lá chắn policy** (RULE #2): vừa là công cụ tin cậy/retention, vừa là **bằng chứng original research từ official report**. Một mũi tên trúng hai đích.
4. **Khai thác thế mạnh repo:** Remotion mạnh ở **data-viz/reconstruction** (MEMORY) → mỗi lần "reveal sơ đồ / dựng timeline / animate đường bay" **tính là một lần đổi hình rẻ tiền** → giữ nhịp mà không cần b-roll khớp-từng-câu.
5. **Củng cố khoản đầu tư giọng (Phase 2):** trong mô hình này **narration LÀ động cơ retention** → chất lượng OmniVoice là sống-còn (khớp ghi chú ROADMAP về "chất lượng cảm xúc tiếng Anh của TTS").

### Thông số nhịp hình đề xuất (đây là lựa chọn Nhóm-2, bạn chốt)
- **KHÔNG** dùng 22s thuần FH: FH dài 10', ở 45' đơn điệu sẽ cộng dồn.
- Nhắm **băng giữa ~8–12s/đổi hình** (giữa Disaster Breakdown 8.4s và Mentour 11s), dùng biến-thể-rẻ để đạt: reveal sơ đồ, Ken Burns ảnh tĩnh, animate bản đồ, insert không khí.
- Quy tắc thực thi: **không một khung tĩnh nào giữ > ~15s** trong long-form; trung bình đổi hình ~8–12s.
- (Đối chiếu ROADMAP đang ghi "5–8s" — thực tế với ngân sách asset FH-engine thì 8–12s khả thi hơn; con số cuối để bạn chốt.)

### Rủi ro phải nói thẳng
- Mô hình FH **không có lưới an toàn**: ở 45 phút, không có cắt-nhanh để cứu đoạn chùng → **script + retention-check + humanize trở thành cửa bắt buộc, không thương lượng**. Đây chính là **moat** (MEMORY: retention 45' phải tự đúc, không mua được bằng skill).
- Hình tĩnh + long-form dễ **đơn điệu** nếu thiếu biến-thể → Remotion motion-graphics và insert không khí là bắt buộc, không phải trang trí.

---

## Ứng viên ngưỡng để nạp vào `retention-longform` (CHƯA làm — chờ bạn duyệt)
Nếu bạn duyệt bản này, các con số sau là ứng viên đưa vào skill:
- Nối nhân-quả : tuần tự — **≥ 8:1 cho phong cách đề xuất** (voiceover/ít hình, không lưới an toàn); sàn tuyệt đối mọi phong cách **≥ 5:1** (kiểm bằng đếm từ nối).
- Cold-open **≤ 60s**, bắt buộc mở ≥1 open loop (1 trong 4 cửa vào).
- **≥1 vòng ngoài** giữ mở tới phút chót; vòng nhỏ đóng trong ~vài phút.
- Re-hook: **không gap > 3 phút**; ~1–1.5' ở climax.
- Sponsor/CTA: **không trước payoff**; full read sau climax hoặc muộn cuối.
- Nhịp hình: **không khung tĩnh > 15s**; trung bình 8–12s (tùy chọn phong cách).
