# Phase 0 — Case study retention: Mentour Pilot "Pilots Flying Blind!" (Lion Air 904)

> Mục tiêu: **giải mã công thức giữ chân**, KHÔNG tóm tắt nội dung, KHÔNG sản xuất.
> Video #2 (batch 3). Khuôn 7 câu. Chưa tổng hợp, chưa đụng skill `retention-longform`.

## Nguồn & cách lấy
- **Video:** *Pilots Flying Blind! | Air Crash Investigation* — **kênh Mentour Pilot** (Petter Hörnfeldt). Chủ đề thật: **Lion Air Flight 904** (13/04/2013, 737-800 mới, hạ cánh hụt xuống biển gần Ngurah Rai, Bali, trong mây mưa; toàn bộ sống sót).
- **URL:** https://www.youtube.com/watch?v=25O_IJg6BSE · **Dài:** 27:01 (1621s) · **Uploader:** Mentour Pilot.
- **Cách lấy:** `/watch` (claude-video) `--detail balanced --no-whisper`. Transcript từ **auto-caption en**. Frame: **100 frame** downsample từ **146 scene-change candidate**.

### Cảnh báo phương pháp (đọc trước khi tin số)
- **Transcript auto-caption** — sạch hơn Mayday (Mentour nói rõ ràng, caption gần đúng) nhưng vẫn là auto → không trích dẫn nguyên văn tuyệt đối.
- **100 frame downsample** trên 27' → khoảng cách frame KHÔNG phải nhịp cắt. Nhịp cắt suy từ **146 candidate** (Q6). Lưu ý phân bố candidate **lưỡng cực**: cụm cắt animation dày (nhiều frame cùng giây) xen khoảng tĩnh dài (talking-head giữ nguyên khung) → "trung bình" che giấu bản chất bimodal.
- Dựa trên transcript đầy đủ + ~10 frame đọc kỹ trải đều. Chưa xem realtime toàn bộ.

---

## A. Bảng timestamp → beat → kỹ thuật (mật độ đều, KHÔNG nén khúc giữa)

| Mốc | Beat | Kỹ thuật giữ chân |
|---|---|---|
| 00:00–00:04 | Nhắc sponsor Brilliant (1 câu) | Đặt sponsor lướt qua đầu, chưa cắt mạch — tránh mất người ngay |
| 00:05–00:42 | **Cold-open teaser**: 737 Lion Air vào final trong mây mưa, cơ trưởng "vẫn nghĩ thấy đường băng", FO tiếp tục chui vào mây → "Stay tuned" | Đặt **tình huống nguy** + câu hỏi "sao họ lại chui vào?" TRƯỚC tiêu đề (open loop) |
| 00:47–01:00 | Nhạc hiệu + title | Nhịp thở ngắn, đóng khung |
| 01:01–02:28 | Setup: ngày bay, chuyến cuối trong ngày, 737-800 mới 142h, **cơ trưởng 15.000h vs FO 24 tuổi 1.200h**, note CRM cần cải thiện | Gieo mầm nguyên nhân (chênh lệch kinh nghiệm + CRM) — foreshadow |
| 02:29–04:13 | Thiết lập tiếp cận VOR, thời tiết, minima | Xây bối cảnh kỹ thuật, giọng chuyên gia (authority) |
| 05:09–06:31 | Quyết định: qua minima, cơ trưởng tưởng thấy đường băng, ra lệnh tiếp tục | **Decision point** — đặt "lỗi sẽ trả giá" (dramatic irony) |
| 07:04–09:08 | Giải thích FMC/CDU + "glide slope giả", "mọi thứ đúng SOP… nhưng" | Kỹ thuật hoá open loop: đúng quy trình mà vẫn sắp chết → nghịch lý kéo đi |
| 09:18–13:25 | Chìm dần vào mây, mất tham chiếu thị giác, độ cao tụt | **Raising tension** qua flight-sim POV mù sương |
| 14:02–14:09 | **CLIMAX**: gọi go-around quá muộn → "hits the water about a second later" | Payoff vòng lớn (đặt ở ~giữa video) — CU flight-sim + đáp biển |
| 16:03–16:50 | **Mid-roll sponsor Brilliant (đầy đủ)** | ⚠️ điểm chùng: đặt NGAY SAU climax (xem Q7) |
| 17:00–20:28 | Hậu quả + điều tra: khí cụ báo/không báo gì, ra ngoài chu vi sân bay | Đóng dần open loop kỹ thuật (tại sao mù) |
| 22:01–24:00 | Pivot meta: "sao tôi chọn vụ này" → bài học CRM / threat & error management | **Nâng nghĩa** + tạo lý do xem hết (giá trị nghề) |
| 24:50–27:01 | Outro: cảm ơn, plug like/subscribe/khoá học | CTA cộng đồng |

---

## B. Bảy câu

**1. HOOK:** Cấu trúc 3 lớp trong 45s: (a) 1 câu sponsor lướt qua (00:00), (b) **cold-open teaser dramatized bằng flight-sim** — máy bay vào final trong mưa, đặt câu hỏi trung tâm "sao phi công lại tiếp tục chui vào mây khi qua minima?" (00:05–00:42), (c) "Stay tuned" + nhạc hiệu. Khác Mayday: hook Mentour **đặt câu hỏi kỹ thuật/quyết định** (why-did-they) chứ không phải cliffhanger sinh tử; sức kéo đến từ **nghịch lý "đúng SOP mà vẫn tai nạn"**.

**2. OPEN LOOP (mở/đóng):**
- *Sao họ chui vào mây khi qua minima?* (mở 00:29) → đóng dần 05:09 (quyết định) + 20:28 (khí cụ không cảnh báo).
- *Kết cục chuyến bay?* (mở 00:42) → đóng 14:09 (đáp xuống biển).
- *Bài học rút ra là gì / sao đáng kể?* (mở ngầm từ tiêu đề) → đóng 22:01 (CRM). Vòng "ý nghĩa" này giữ người ở **nửa sau** sau khi climax đã trôi qua ở giữa.

**3. RE-HOOK CADENCE:** Thưa hơn Mayday — ~**2–3 phút một bước tiến mới** (setup → quyết định → kỹ thuật FMC → chìm vào mây → go-around trễ → đáp biển → điều tra → bài học). Ít "reveal giật" hơn; thay vào đó là **chuỗi nhân-quả dắt tay** ("so…", "because…", "but…"). Re-hook lớn nhất nửa sau: 22:01 "sao tôi chọn vụ này".

**4. CHƯƠNG + PAYOFF:** ~5 phần, nhưng **bất đối xứng quanh climax giữa video**:
1. Hook + setup (00:00–04:13) → payoff: hiểu ai/cái gì.
2. Quyết định + kỹ thuật (05:09–13:25) → payoff: hiểu "tại sao mù".
3. **Climax** (14:02–14:09) → payoff: kết cục (đáp biển, sống sót).
4. Sponsor + điều tra (16:03–20:28) → payoff: xác nhận cơ chế lỗi.
5. Bài học + outro (22:01–27:01) → payoff: ý nghĩa/CRM.

**5. NỐI BEAT:** Đếm thô: `so` 35 · `but` 23 · `because` 18 · `however` 3 **≈ 79** (nhân-quả/đối lập) so với `then` 10 · `suddenly` 1 · `and then` 0 **≈ 11** (tuần tự). Tỉ lệ **~7:1** — **nghiêng nhân-quả còn mạnh hơn Mayday** (~5:1). Lý do: Mentour là **explainer dạy nghề** → "so/because" thống trị (giảng cơ chế). `now` 16 (chuyển ý/present).

**6. NHỊP HÌNH (thật/giây) + map kỹ thuật theo act:** **146 candidate / 1621s ≈ đổi hình mỗi ~11 giây** (chậm ~2.4× Mayday). Nhưng **bimodal**: cụm animation cắt nhanh (05:16 ×6 frame, 23:52 ×8) xen **khoảng tĩnh talking-head dài** (00:51→02:29 không có candidate nào). Map:
- *Setup/analysis (01:00–04:00, 22:00–27:00):* **talking-head** Petter trên ghế bành studio, poster blueprint, logo sponsor → tĩnh, giữ khung lâu.
- *Incident (07:00–15:00):* **flight-simulator** — cockpit POV mù sương, ngoại cảnh 737 Lion Air trên biển mưa, đáp nước → nơi nhịp hình dồn.
- Chèn: engine closeup CGI, đồ hoạ đường bay/minima.
Không diễn viên, không phỏng vấn, không archival — chỉ **1 narrator + flight-sim**.

**7. ĐIỂM CHÙNG NHỊP + CÁCH CỨU:**
- *Setup kỹ thuật (01:01–04:13):* số liệu dày (15.000h, 142h airframe, VOR, minima) dễ khô. **Cứu bằng:** cold-open đã cắm open loop; mọi số liệu được đóng khung là "manh mối vì sao sẽ hỏng"; giọng parasocial của Petter.
- *Climax ở GIỮA video (14:09):* payoff lớn xong mà còn 13 phút → nguy cơ rơi rụng. **Cứu bằng:** mở vòng "ý nghĩa" (22:01 "sao tôi chọn vụ này") để tái tạo lý do xem tiếp; nửa sau chuyển từ "chuyện gì xảy ra" sang "bài học cho bạn".
- *Mid-roll sponsor 16:03 (ngay sau climax):* điểm rơi kinh điển. **Cứu bằng:** đặt sponsor **sau** payoff (không trước), giữ ngắn, rồi bật ngay sang câu hỏi meta để kéo lại.

---

## C. Phong cách kênh (một dòng)
> Explainer 1-người-dẫn của phi công thật: cold-open đặt **câu hỏi "sao họ làm vậy"**, dựng lại bằng **flight-simulator** + talking-head thẩm quyền, nhịp cắt chậm/bimodal, mạch **nhân-quả "so/because"** dắt tay tới climax giữa video rồi chuyển sang **bài học an toàn** để giữ nửa sau.
