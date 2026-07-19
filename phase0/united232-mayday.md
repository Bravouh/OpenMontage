# Phase 0 — Case study retention: United 232 (Mayday: Air Disaster)

> Mục tiêu: **giải mã công thức giữ chân**, KHÔNG tóm tắt nội dung, KHÔNG sản xuất.
> Đây là video #1 chạy thử vòng `/watch` → phân tích. Chưa tổng hợp, chưa đụng skill `retention-longform`.

## Nguồn & cách lấy
- **Video:** *The Engine Explosion That Changed Aviation Forever | Mayday: Air Disaster* — United Airlines 232 (Sioux City, DC-10, hỏng đĩa quạt động cơ #2 → mất cả 3 hệ thuỷ lực; Denny Fitch, giáo viên DC-10 đi nhờ, vào buồng lái hỗ trợ).
- **URL:** https://www.youtube.com/watch?v=Lw4uhb8dFs4 · **Dài:** 45:00 (2700s) · **Nhà phân phối:** Cineflix (Mayday 11) 2011.
- **Cách lấy:** skill `/watch` (claude-video) — `--detail balanced --no-whisper`. Transcript từ **auto-caption tiếng Anh** (đúng ràng buộc: không gọi Whisper). Frame: **100 frame scene-aware** downsample từ **578 scene-change candidate**.

### Cảnh báo phương pháp (đọc trước khi tin số)
- **Transcript là auto-caption** → có lỗi chính tả/nhận dạng ("DCT 10"=DC-10, "Sous City"=Sioux City, "Denny fit"=Denny Fitch) và dòng cuộn trùng lặp. Đủ để đọc beat, KHÔNG đủ để trích dẫn nguyên văn.
- **100 frame là bản downsample** trên 45 phút → khoảng cách giữa các frame lấy ra (median ~26s) **KHÔNG phải** nhịp cắt. Nhịp cắt thật suy từ **578 candidate** (xem Q6).
- Phân tích dựa trên transcript đầy đủ + ~13 frame đọc kỹ trải đều tuyến thời gian. Chưa xem realtime toàn bộ 45' (bài học CLAUDE.md: video phải xem tận mắt trước khi "chốt" — đây mới là pass giải mã, không phải kết luận sản xuất).

---

## A. Bảng timestamp → beat → kỹ thuật giữ chân

| Mốc | Beat | Kỹ thuật giữ chân |
|---|---|---|
| 00:03–00:48 | **Cold open in medias res**: nổ động cơ, "out of control", "lost all three hydraulic systems", giới thiệu Denny Fitch ("biết về DC-10 hơn hầu hết mọi người trên Trái Đất"), chốt bằng "today is the day you're gonna die" | Teaser-đặt-climax-lên-đầu; cliffhanger sinh tử TRƯỚC tiêu đề; gắn nhân vật có thẩm quyền vào ngay |
| 01:16–01:53 | Reset về chuyến bay bình thường: 37,000ft, thời tiết quang, 2 phi công cựu lính tiêm kích | **Calm before the storm** — tương phản để cú nổ nặng hơn; hạ nhịp có chủ đích |
| 01:54–02:10 | "Children's day" — 52/285 hành khách là **trẻ em** | Emotional stakes + **open loop** (số phận trẻ em); nhân bản hoá nạn nhân |
| 02:11–03:14 | Interview nhân chứng thật (Fitch, hành khách Schemmel), "no turbulence expected, smooth ride" | **Dramatic irony** (khán giả biết thảm hoạ sắp đến); xây gắn kết nhân vật |
| 03:15–03:42 | **Cú nổ**: "like being thrown into a great big tornado", KHÔNG còi/đèn báo | Inciting incident đúng nhịp; mô tả **cảm giác cơ thể** (visceral) thay vì kỹ thuật khô |
| 04:00–05:25 | Hậu chấn vật lý ("fanny up against the left armrest"), shut down engine #2 | Xen lời chứng ngôi-1 vào giải thích kỹ thuật → giữ nhịp người |
| 05:26–06:30 | Fitch thấy **cánh phải chìm** — "it doesn't make sense" | **Reveal escalation**: vấn đề lớn hơn tưởng → mở open loop mới |
| ~06:30–09:58 | Mất **cả 3 hệ thuỷ lực** → "no flight controls… no idea if they'll be able to land" | **Raising stakes**; đặt câu hỏi trung tâm: điều khiển nổi không? |
| ~11:00–13:00 | Chế ngự bằng **lực đẩy vi sai** ("let's try 10%… only the two forward engines work") | **Mini-payoff**: tia hy vọng kỹ thuật (đường cong lên/xuống, không phẳng lì) |
| ~14:00–20:08 | Fitch **từ hành khách thành crew**; Sioux City hiện ra | Chuyển vai anh hùng; mở open loop hạ cánh |
| ~22:00–28:39 | "**No pilot has ever landed a DC-10 safely at this speed** with or without flight controls" | **Re-hook đỉnh**: tuyên bố "chưa từng có" đẩy stakes ngay trước climax |
| ~31:00–37:00 | **Crash landing** | Climax; dồn CU + [Music] + CGI; kìm rồi giãn nhịp |
| 36:54–38:59 | Điều tra: "tough job to find it" → **3 tháng sau một nông dân tìm thấy đĩa quạt** | Investigation open loop mở & đóng → **payoff nguyên nhân** |
| 42:30–44:00 | "Magnificent feat of flying", survivors, "testament to the skill of the crew" | Resolution + **nâng nghĩa** (legacy → lý do video "changed aviation forever") |
| 45:00 | End card Cineflix/Mayday | Outro |

---

## B. Sáu câu

**1. HOOK (30–60s đầu):** Mở **in medias res** — không giới thiệu, quăng thẳng vào đỉnh khủng hoảng: động cơ nổ, máy bay mất kiểm soát, "lost all three hydraulic systems". Trong 45 giây đã: (a) nêu hiểm hoạ chết người, (b) giới thiệu anh hùng bất đắc dĩ (Fitch, chuyên gia DC-10 tình cờ trên khoang), (c) chốt bằng câu sinh tử "today is the day you're gonna die". Đây là **teaser đặt climax lên đầu** rồi mới tua lại — cliffhanger trước cả tiêu đề.

**2. OPEN LOOP:** Ít nhất 4 vòng lồng nhau:
- *Sinh tử* — "gonna die" (mở 00:48) → đóng ~42:30 (họ sống, được ca ngợi).
- *52 trẻ em* (mở 01:54) → payoff một phần ở phần aftermath (survivors).
- *Điều khiển nổi không khi mất hết thuỷ lực?* (mở ~06:30) → workaround lực đẩy vi sai (~11:00) → hạ cánh (~37:00).
- *Nguyên nhân + đĩa quạt mất tích* (mở ~36:00) → nông dân tìm thấy sau 3 tháng (~38:55).
Vòng lớn (sinh tử) ôm trọn video; các vòng nhỏ (kỹ thuật, điều tra) mở-đóng bên trong → luôn có "chỉ tiêu chưa xong" kéo đi tiếp.

**3. RE-HOOK CADENCE:** Trung bình **~3 phút một escalation/reveal mới** ("nó còn tệ hơn"): nổ → shut down → cánh chìm → mất hết thuỷ lực → không điều khiển → Fitch vào → lực đẩy vi sai → Sioux City → "chưa ai từng làm được" → crash → điều tra → nguyên nhân. Giữa các reveal là soundbite phỏng vấn (giọng người thật) làm nhịp đệm.

**4. CHƯƠNG:** ~6 act (kiểu Mayday, quanh các "ad break" dù bản YouTube liền mạch), mỗi act 1 mini-payoff + kết trên mini-cliffhanger:
1. Cold open + setup + cú nổ (00:00–~06:00) → payoff: xác nhận thảm hoạ.
2. Chẩn đoán / mất hết thuỷ lực (~06:00–~13:00) → payoff: workaround lực đẩy.
3. Fitch + giành lại chút kiểm soát → Sioux City (~13:00–~22:00).
4. Đường tiếp cận bất khả (~22:00–~31:00) → re-hook "chưa ai từng".
5. Crash landing (~31:00–~38:00) → payoff: kết cục hạ cánh.
6. Điều tra + di sản (~38:00–45:00) → payoff: nguyên nhân + ý nghĩa.

**5. NỐI BEAT:** Nghiêng mạnh về **nhân-quả/đối lập** hơn liệt kê. Đếm thô trong transcript: `but` 56 · `so` 41 · `because` 22 · `however/yet` ~10 **≈ 119** lần (căng thẳng, "nhưng/cho nên") so với `and then` 9 · `then` 5 · `suddenly` 4 · `within` 6 **≈ 24** lần (tuần tự). Tỉ lệ **~5:1** nghiêng về "nhưng/cho nên". Thêm `now` 33 lần — thì hiện tại tạo cảm giác **đang-diễn-ra**. Bài học: nối bằng lực căng, không bằng "rồi… và rồi".

**6. NHỊP HÌNH:** **578 scene-change candidate / 2700s ≈ một lần đổi hình mỗi ~4.7 giây** (trung bình toàn video). Dày hơn ở hook/climax, giãn hơn ở đoạn interview tĩnh. Nguồn hình luân phiên: dramatized reconstruction (diễn viên, buồng lái/khoang đúng thời kỳ) · extreme close-up (mặt, mồ hôi, tay, đồng hồ) · overlay đồng hồ bán trong suốt chồng lên mặt · CGI ngoại cảnh DC-10 · talking-head phỏng vấn (studio tối / set gắn đạo cụ hàng không) · insert khí quyển grainy/slow-mo + [Music].

---

## C. Phong cách kênh (một dòng)
> Tái hiện thảm hoạ hàng không **từng phút một như một phim thriller sinh tồn**: cold-open cliffhanger, phỏng vấn người thật, extreme close-up + CGI + overlay đồng hồ, và chuỗi reveal "càng lúc càng tệ" mỗi ~3 phút dồn tới payoff kép **crash + nguyên nhân**.

---

## Ghi chú kỹ thuật (cho lần chạy sau)
- Máy thiếu `yt-dlp`/`ffmpeg` trên PATH dù đã cài qua winget → phải nạp PATH thủ công từ `...\WinGet\Packages\...`. Cân nhắc thêm 2 thư mục đó vào PATH hệ thống, hoặc copy shim vào `WinGet\Links`.
- ffmpeg winget là **build master** đã gỡ option `-vsync` → đã vá `frames.py`: `-vsync vfr` → `-fps_mode vfr` (2 chỗ). **Đã commit + push (`9110d8b`)**.
- Với video 45' mà cần đo nhịp cắt/kỹ thuật hình chi tiết hơn, chạy lại `--detail token-burner` (giữ mọi scene-change) hoặc `--start/--end` để zoom một act.
