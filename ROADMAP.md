# ROADMAP — Pipeline sản xuất video long-form giữ chân 40–50 phút

**Điểm xuất phát:** zero. Chưa có tool, chưa có công thức retention nào được kiểm chứng.
**Mục tiêu cuối:** sản xuất lặp lại được video 40–50 phút đủ sức giữ chân người xem.
**Nguyên tắc lõi:** làm ra 1 video hoàn chỉnh TRƯỚC, tự động hóa SAU. Không build nhà máy trước khi có sản phẩm mẫu.

---

## Định hướng đã chốt

- **Thể loại:** documentary + story drama → format **docudrama** (lời dẫn + tái hiện kịch tính). Đây là công thức true-crime / historical-docudrama đang thống trị long-form US.
- **Khán giả:** tiếng Anh (US/global).
- **Mục tiêu:** làm **1 video thật tốt trước**, tự động hóa sau.

### ⚠️ Chốt kiểu drama TRƯỚC KHI build — quyết định độ khả thi

- **Kiểu A — Docudrama (lời dẫn + tái hiện không khí):** narrator dẫn, hình là cảnh tái hiện mang tính mood (bóng người, cận cảnh vật, cảnh dựng). **KHẢ THI với stack này. Chọn kiểu A cho v1.**
- **Kiểu B — Drama nhân vật thật (thoại + lip-sync + diễn xuất xuyên suốt):** cần *character consistency* — biên giới khó nhất của AI video 2026, chưa có lời giải tốt; lip-sync dài vẫn lộ. **KHÔNG làm full kiểu B ở v1.**

**Nguyên tắc:** tạo "drama" bằng **nhịp kể + nhạc + dựng cảnh căng thẳng**, KHÔNG bằng nhân vật diễn. Chèn phân cảnh nhân vật chỉ khi v1 đã chạy tốt.

---

## PHASE 0 — Làm 1 video bằng tay (KHÔNG build gì cả)

> Mục tiêu: hiểu bài toán retention bằng chính tay mình trước khi tự động hóa. Tuyệt đối không viết code ở phase này.

- [ ] Chọn 1 topic cụ thể trong niche.
- [ ] Tự viết (hoặc dùng Claude thường) 1 script 45 phút, chia chương rõ.
- [ ] Ghép thủ công: narration + hình + nhạc bằng 1 editor GUI (Shotcut/Kdenlive) hoặc CapCut.
- [ ] Đăng, hoặc ít nhất tự xem lại toàn bộ 45 phút và ghi lại **những giây mình muốn bỏ đi**.
- [ ] Rút ra "công thức retention" thô: hook bao lâu, đổi cảnh mấy phút/lần, đoạn nào chán.

**Ra khỏi Phase 0 khi:** anh có 1 video hoàn chỉnh + 1 danh sách cụ thể "chỗ nào giữ chân, chỗ nào rơi". Đây là spec thật cho mọi thứ tự động hóa sau này.

---

## PHASE 1 — Tự động hóa khâu đau nhất: Script + Voice

> Chỉ tự động hóa 2 khâu tốn công lặp lại nhất trước. Chưa đụng visual.

**1.1 — Script engine (2 lớp)**
- Lớp tạo: skill scriptwriting (ví dụ `script-writer` hoặc `creative-writing-skills` + `style-creator` để bắt giọng riêng).
- Lớp giữ chân: bổ sung **retention architecture** — hook 30s, open loops, re-hook mỗi 3–5 phút, chương có payoff. Đây là thứ skill có sẵn KHÔNG tự lo; anh phải tự viết 1 skill/prompt riêng dựa trên công thức rút ra ở Phase 0.
- Lớp humanize: `humanize-writing` tẩy AI-tell (bắt buộc, xem cảnh báo policy cuối file).

**1.2 — Voice engine (voice *acting*, không chỉ narration)**
- OmniVoice (k2-fsa, Apache 2.0) chạy qua FastAPI/OpenAI-compatible server, self-host.
- **Docudrama cần nhiều giọng:** 1 narrator cố định + các giọng nhân vật. Khóa mỗi giọng bằng 1 ref_audio riêng, generate ref 1 lần rồi tái dùng.
- Chèn `[laughter]`, `[sigh]`... cho cảm xúc.
- **Điểm sống còn cho khán giả US:** chất lượng cảm xúc tiếng Anh của TTS. Test kỹ; nếu vai chính chưa đủ "đời", cân nhắc thu giọng thật cho vai đó, TTS cho phần còn lại.

**1.3 — Alignment**
- WhisperX chạy trên audio đã sinh → xuất timestamp cấp từ (JSON). Đây là input bắt buộc cho khâu render sau.

**Milestone Phase 1:** nhập topic → ra được (script humanized + file audio narration + JSON timestamp). Chưa có video, nhưng đây là 60% công sức lặp lại đã được cắt.

---

## PHASE 2 — Visual variety engine (khâu chí mạng của long-form)

> 45 phút chỉ có caption + motion graphics = khán giả bỏ trong 5 phút. Đây là nơi long-form sống hoặc chết.

- [ ] **Render layer:** Revideo (MIT, $0) hoặc Remotion (Free License nếu anh dùng cá nhân) — nhận JSON timestamp làm props, render caption frame-accurate + motion graphics.
- [ ] **B-roll sourcing:** xây funnel phân loại mỗi cảnh → "dùng stock" hay "generate".
  - Stock: Pexels/Pixabay API (miễn phí).
  - Generate: FLUX / Kling / Veo qua fal.ai (trả phí theo lượt).
- [ ] **Docudrama = dựng không khí, không phải minh họa.** Sống nhờ mood: ánh sáng, film grain, slow-motion, cận cảnh gợi. Cái này *dễ tự động hơn* B-roll minh họa vì không cần khớp chính xác từng câu.
- [ ] **v1 NÉ character consistency:** dùng bóng người, cận cảnh bộ phận (tay, mắt), vật thể, cảnh không mặt — thay vì nhân vật có khuôn mặt nhất quán. Đây là cách né bài toán khó nhất mà vẫn ra chất drama.
- [ ] **Nguyên tắc nhịp hình:** đổi visual tối thiểu mỗi 5–8 giây trong long-form. Đây là biến retention lớn nhất về hình.
- [ ] **Ghép tầng:** FFmpeg (NVENC) làm lớp compositing + transcode cuối.

**Milestone Phase 2:** ra được 1 video 45 phút hoàn chỉnh có hình đa dạng, tự động từ topic. Đây là "1 video hoàn chỉnh" mà anh đặt mục tiêu.

---

## PHASE 3 — Audio design (chống ru ngủ)

> Giọng đọc đều 45 phút = thuốc ngủ. Tầng này nâng retention rõ rệt, tốn ít công.

- [ ] Nhạc nền đổi theo cảm xúc từng chương (anh có lợi thế nếu tự làm nhạc jazz/house/indie).
- [ ] SFX điểm nhấn ở các beat quan trọng.
- [ ] **Ducking tự động:** hạ nhạc khi có narration (FFmpeg sidechain compress hoặc xử lý ở khâu mix).

---

## PHASE 4 — Front-end retention: Thumbnail + Title + Hook

> Giữ chân 45 phút vô nghĩa nếu không ai click. Watch-time bắt đầu từ CTR.

- [ ] Skill/tool sinh 3–5 phương án title theo hook formula.
- [ ] Pipeline thumbnail (concept → generate → chọn).
- [ ] A/B ít nhất 2 thumbnail nếu nền tảng cho phép.

**Đây là khâu CUỐI bắt buộc, không phải tùy chọn.**

---

## PHASE 5 — Feedback loop (biến pipeline thành hệ tự cải thiện)

> Không có vòng này, pipeline không bao giờ khá hơn.

- [ ] Kéo retention data (audience retention curve) từ YouTube Analytics.
- [ ] Tìm các đoạn tụt mạnh → map ngược về cấu trúc script.
- [ ] Cập nhật retention architecture ở Phase 1 cho video kỳ sau.

---

## Thứ tự ưu tiên build (đọc kỹ)

1. **Phase 0** — bằng tay, tuần 1. Bỏ qua là hỏng cả plan.
2. **Phase 1** — script + voice + align. Đây là nền.
3. **Phase 2** — visual. Đây là phần khó và tốn tiền nhất; đừng vội trước khi Phase 1 chạy ổn.
4. **Phase 3 + 4** — audio design + front-end. Rẻ, tác động cao, làm song song.
5. **Phase 5** — chỉ có ý nghĩa sau khi đã đăng vài video.

---

## ⚠️ Cảnh báo policy — đọc trước khi build

Một video 45 phút **toàn giọng TTS + hình auto-generate** đúng là mẫu mà chính sách **inauthentic content 2026 của YouTube** nhắm tới. Rủi ro kép: (1) retention thấp vì khán giả cảm nhận được sự máy móc, (2) rủi ro về policy.

**Kết luận thực tế:** pipeline nên tự động hóa phần **lắp ráp**, nhưng giữ **con người ở khâu phán đoán sáng tạo** — chọn topic, duyệt cấu trúc retention, chấm nhịp độ trước khi render. Đây không phải để cho vui; đó là điều kiện để video vừa giữ chân vừa an toàn.

---

## Stack tóm tắt ($0 tối đa)

| Khâu | Tool | License |
|---|---|---|
| Script tạo | script-writer / creative-writing-skills | free |
| Humanize | humanize-writing | free |
| Voice | OmniVoice (k2-fsa) | Apache 2.0 |
| Align | WhisperX | free |
| Render | Revideo (hoặc Remotion Free) | MIT / Free |
| B-roll stock | Pexels/Pixabay API | free |
| B-roll generate | FLUX/Kling/Veo qua fal.ai | trả theo lượt |
| Compositing | FFmpeg (NVENC) | free |

Điểm tốn tiền duy nhất: generate video AI (fal.ai) và có thể Claude Code subscription. Còn lại tự host, $0.
