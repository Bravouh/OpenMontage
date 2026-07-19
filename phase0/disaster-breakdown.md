# Phase 0 — Case study retention: Disaster Breakdown "Air Canada 621"

> Mục tiêu: **giải mã công thức giữ chân**, KHÔNG tóm tắt nội dung, KHÔNG sản xuất.
> Video #3 (batch 3), tự chọn từ kênh. Khuôn 7 câu. Chưa tổng hợp, chưa đụng skill `retention-longform`.

## Nguồn & cách lấy
- **Video:** *Did This Small Mistake Kill Everyone? — The Heartbreaking Story of Air Canada 621* — kênh **Disaster Breakdown**. Chủ đề thật: **Air Canada 621** (05/07/1970, DC-8, Montreal→Toronto→LA; FO bung ground spoiler khi còn trên không → va bụng → mất cánh → rơi gần Toronto, 109 người chết).
- **URL:** https://www.youtube.com/watch?v=wSmtnuFoAv0 · **Dài:** 43:50 (2630s) · **~1.4M view** (cao nhất khung 30–45' của kênh) · **Uploader:** Disaster Breakdown.
- **Cách chọn:** `yt-dlp --flat-playlist` liệt kê @DisasterBreakdown/videos, lọc thời lượng 1800–2700s, sort theo view. Air Canada 621 đứng đầu → xác nhận có caption `en` → chạy.
- **Cách lấy:** `/watch` `--detail balanced --no-whisper`. Transcript auto-caption `en`. Frame: **100 frame** downsample từ **313 candidate** (6 near-duplicate bị loại).

### Cảnh báo phương pháp (đọc trước khi tin số)
- **Transcript auto-caption** → dòng cuộn trùng, lỗi nhận dạng; đủ đọc beat, không trích nguyên văn tuyệt đối.
- **100 frame downsample** trên 43:50 → khoảng cách frame KHÔNG phải nhịp cắt. Nhịp cắt suy từ **313 candidate** (Q6). Có khoảng tĩnh cuối (39:16→43:39) = đoạn suy ngẫm/outro với footage địa điểm tĩnh.
- Dựa trên transcript đầy đủ + ~10 frame đọc kỹ trải đều. Chưa xem realtime toàn bộ.

---

## A. Bảng timestamp → beat → kỹ thuật (mật độ đều, KHÔNG nén khúc giữa)

| Mốc | Beat | Kỹ thuật giữ chân |
|---|---|---|
| 00:00–01:04 | **Cold-open độc thoại u ám** trên nền đen + nhạc: "one small mistake… transformed into something truly monstrous… horrific pure terror… **none of it had to happen**" | Hook bằng **dread + lời hứa kinh hoàng** + moral; không tiết lộ chuyện gì → tò mò thuần |
| 01:13–04:00 | Setup: 7h sáng 05/07/1970, AC621 Montreal→Toronto→LA, DC-8, 100 khách, tổ bay (Capt Hamilton + FO) | Neo thời gian/không gian cụ thể; nhân bản hoá ("some only going to Toronto…") |
| 05:48–09:22 | Flight-sim: DC-8 tại gate → cất cánh → lấy độ cao | Chuyển sang tái hiện trực quan; giọng đọc dẫn dắt |
| 10:00–14:16 | Tiếp cận Toronto; thiết lập cơ chế ground spoiler (mầm lỗi) | Gieo **thiết bị Chekhov** (spoiler) — khán giả biết sẽ quan trọng |
| 15:50–20:18 | Quy trình hạ cánh, thói quen tổ bay, khác biệt giữa các cơ trưởng | Xây nhân-quả chậm rãi ("so…", "however…") |
| 21:01–22:56 | **THE MISTAKE**: FO bung ground spoiler khi còn trên không (thói quen bay với Capt Hamilton) → va bụng | Reveal lỗi cốt lõi (trả lời "small mistake" ở tiêu đề) |
| 23:00–25:40 | Tấm ốp bụng cánh rơi lại trên đường băng; go-around trên 3 động cơ | Escalation: "tưởng cứu được, hoá ra…" |
| 26:02–27:12 | **"1 minute to disaster"** — countdown; khó kiểm soát tăng dần | **Nhãn đếm ngược** ép cảm giác cận kề |
| 28:06 | **CVR payoff: "we've lost a wing"** | Trích CVR nguyên văn — cực điểm cảm xúc |
| 29:12–31:22 | Rơi, toàn bộ thiệt mạng | Climax; flight-sim máy bay bốc khói/lửa |
| 32:03–37:35 | Điều tra: cơ chế + lỗi thiết kế spoiler + yếu tố thói quen | Đóng open loop kỹ thuật; chèn **footage địa điểm hiện tại** |
| 38:00–39:16 | Legacy: cấm bung spoiler khi bay + biển cảnh báo; "not that it matters much today" (DC-8 hết dùng) | Nâng nghĩa (di sản an toàn) |
| 40:01–40:50 | **Sponsor Brilliant (muộn, gần cuối)** | Đặt sau climax + legacy → ít rơi người (xem Q7) |
| 41:00–43:50 | Suy ngẫm tại địa điểm/đài tưởng niệm, callback "none of it had to happen", outro | Đóng khung cảm xúc; footage công viên/hoa tulip hiện tại |

---

## B. Bảy câu

**1. HOOK:** Không in-medias-res (Mayday) cũng không why-question (Mentour) mà là **độc thoại điềm gở kiểu văn học**: chữ/hình tối đen + nhạc, hứa hẹn "one small mistake" biến thành "something truly monstrous", "pure terror", chốt bằng moral "none of it had to happen". Kéo bằng **dread + tò mò** (chưa hé lộ gì) + lời hứa cảm xúc mạnh.

**2. OPEN LOOP (mở/đóng):**
- *"Small mistake" là gì?* (mở 00:38, tiêu đề) → đóng 21:01 (FO bung spoiler).
- *Vì sao thành thảm hoạ / kết cục?* (mở 00:49 "monstrous") → đóng dần 26:02 (countdown) → 28:06 ("we've lost a wing") → 31:22 (rơi).
- *"None of it had to happen" — nghĩa là gì?* (mở 01:04) → đóng 38:00 + 41:00 (lỗi thiết kế + thói quen lẽ ra tránh được). Vòng moral ôm cả video, callback ở outro.

**3. RE-HOOK CADENCE:** ~**2–2.5 phút một bước** ở nửa đầu (setup → sim → cơ chế → thói quen), **dồn dày** ở đoạn tai nạn (21:00–31:00: mistake → mất ốp → go-around → countdown → "lost a wing" → rơi, ~mỗi 1–1.5 phút). **Nhãn đếm ngược "X minutes to disaster"** là re-hook cơ học rõ rệt.

**4. CHƯƠNG + PAYOFF:** ~5 phần, cấu trúc countdown:
1. Hook dread (00:00–01:04) → payoff: lời hứa.
2. Setup + sim (01:13–14:16) → payoff: biết ai/cái gì + gieo spoiler.
3. Diễn tiến lỗi (15:50–25:40) → payoff: "the small mistake".
4. **Countdown → climax** (26:02–31:22) → payoff: "we've lost a wing" + rơi.
5. Điều tra + legacy + suy ngẫm (32:03–43:50) → payoff: nguyên nhân + moral.

**5. NỐI BEAT:** Đếm thô: `so` 57 · `but` 44 · `however` 24 · `because` 10 **≈ 135** (nhân-quả/đối lập) so với `then` 15 · `and then` 0 · `suddenly` 0 **≈ 15** (tuần tự). Tỉ lệ **~9:1 — nghiêng nhân-quả mạnh nhất trong 3 video**. Đặc trưng: **`however` 24 lần** làm **pivot reveal** ("họ tưởng ổn — however…"). `now` 28 (present-tense đếm ngược).

**6. NHỊP HÌNH (thật/giây) + map kỹ thuật theo act:** **313 candidate / 2630s ≈ đổi hình mỗi ~8.4 giây** (giữa Mayday ~4.7s và Mentour ~11s). Đều hơn Mentour (ít khoảng tĩnh khổng lồ), trừ đoạn suy ngẫm cuối (39:16→43:39 tĩnh). Map:
- *Tái hiện tai nạn (05:48–31:00):* **flight-simulator (MSFS)** — DC-8 Air Canada tại gate, POV cánh trên thành phố, va bụng, go-around bốc lửa.
- *Khung cảm xúc (00:46, 32:03, 38:55, 43:39):* **footage HIỆN TẠI của địa điểm/đài tưởng niệm** — công viên, hoa tulip, nền gạch, bụi cây → tương phản "nơi bình yên này là nơi nó xảy ra".
- *Bằng chứng:* **số trích dẫn nguồn trên màn hình ("[26]")** — dấu hiệu original research (đáng chú ý cho policy của bạn).
- Không talking-head, không diễn viên, không phỏng vấn — **voiceover-only + sim + site footage**.

**7. ĐIỂM CHÙNG NHỊP + CÁCH CỨU:**
- *Đoạn điều tra/kỹ thuật (32:00–38:00):* sau climax, dễ tụt. **Cứu bằng:** cắt về **footage địa điểm hiện tại** (tái nạp cảm xúc) + vòng moral "none of it had to happen" chưa đóng.
- *Setup nửa đầu (01:13–14:16):* dàn cảnh dài trước khi có kịch tính. **Cứu bằng:** hook dread đã hứa "monstrous/terror"; gieo spoiler như Chekhov's gun (khán giả chờ nó nổ).
- *Sponsor 40:01:* **đặt rất muộn**, sau cả climax lẫn legacy → gần như không rơi người; đây là **cách đặt tốt hơn** mid-roll của Mentour (16:03).

---

## C. Phong cách kênh (một dòng)
> Docu-essay voiceover-only giọng u ám: hook **dread + moral** trên nền đen, tái hiện bằng **flight-sim**, đan **footage địa điểm hiện tại** làm khung cảm xúc và **trích dẫn nguồn trên màn hình**, cấu trúc **đếm ngược "X minutes to disaster"** dồn tới payoff CVR nguyên văn ("we've lost a wing") rồi khép bằng bài học "lẽ ra tránh được".
