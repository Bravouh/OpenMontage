---
name: newcase
description: Khởi tạo một video docudrama mới cho một case cụ thể. Gọi bằng /newcase <tên-case>. Tạo thư mục project theo convention OpenMontage + các file điều khiển per-video (sources.md, COMPLIANCE.md).
---

# /newcase — Khởi tạo case mới

Khi được gọi với `$ARGUMENTS` (tên case):

1. Tạo thư mục project theo convention OpenMontage: `projects/$ARGUMENTS/`.
2. Trong đó tạo:
   - `sources.md` — template: [official report URL], [citations], [ngày truy cập]. Để trống chờ người điền nguồn.
   - `COMPLIANCE.md` — checklist per-video:
     - [ ] Nguồn official report đã có trong sources.md
     - [ ] Script đã qua humanize
     - [ ] fact-checker đã pass (không tuyên bố thiếu nguồn)
     - [ ] retention-critic điểm ≥ ngưỡng
     - [ ] Đã bật disclosure "altered/synthetic content" trong metadata
     - [ ] Người đã duyệt cấu trúc + bản render
   - `notes.md` — chỗ người ghi góc nhìn biên tập, lý do chọn case.
3. Nhắc người: cung cấp official accident report trước khi chạy skill `docudrama-script`.
4. KHÔNG tự chọn case hay tự viết nội dung. Chỉ dựng khung.
