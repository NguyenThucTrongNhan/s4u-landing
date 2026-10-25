import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Article } from '../models/article.model';
const ARTICLES: Article[] = [
  {
    "slug": "quan-ly-vu-viec-va-deadline",
    "title": "Quản lý vụ việc và deadline trong công ty luật: bắt đầu số hóa từ đâu?",
    "excerpt": "Bắt đầu số hóa bằng một luồng vụ việc có người phụ trách, deadline và tiêu chí đánh giá rõ ràng.",
    "content": "<p>Một văn phòng luật có thể đang theo dõi vụ việc bằng nhiều bảng tính, trao đổi công việc qua tin nhắn và lưu hồ sơ ở các thư mục khác nhau. Khi bắt đầu số hóa, việc cần làm trước là chọn một luồng công việc có người chịu trách nhiệm và kết quả quan sát được.</p>\n<h2>Chọn một phạm vi đủ nhỏ</h2>\n<p>Hãy bắt đầu với một nhóm vụ việc đang hoạt động. Với mỗi vụ việc, thống nhất tối thiểu mã hồ sơ, khách hàng, người phụ trách, tình trạng và các công việc tiếp theo. Không cần nhập toàn bộ lịch sử ngay trong tuần đầu.</p>\n<h2>Phân biệt công việc với thời hạn</h2>\n<p>Một vụ việc thường có nhiều nhiệm vụ và nhiều mốc thời gian. Mỗi nhiệm vụ nên có người phụ trách, ngày dự kiến hoàn thành và trạng thái. Những thời hạn có ý nghĩa pháp lý cần được người có chuyên môn kiểm tra; phần mềm theo dõi không thay thế việc xác định đúng thời hạn.</p>\n<h2>Đánh giá bằng một tình huống thực tế</h2>\n<p>Trong buổi demo, yêu cầu người dùng tạo một vụ việc, giao việc, cập nhật tiến độ và tìm lại tài liệu liên quan. Sau đó kiểm tra người quản lý có xác định được việc đến hạn và người chịu trách nhiệm hay không. Đây là tiêu chí quan sát được, thay vì chỉ đánh giá giao diện có đẹp không.</p>\n<h2>Thử nghiệm trước khi mở rộng</h2>\n<p>Pilot cần thống nhất người sử dụng, phạm vi dữ liệu, thời gian và cách ghi nhận lỗi. Chỉ mở rộng khi người dùng thực sự cập nhật công việc và thông tin giúp họ làm việc thuận tiện hơn.</p>\n<p>LawFirm của S4U đang tiếp nhận trao đổi demo/pilot cho nhu cầu này. Phạm vi chức năng và điều kiện triển khai được xác nhận trong từng pilot.</p>",
    "category": "Business",
    "tags": [
      "LawFirm",
      "Vụ việc",
      "Deadline"
    ],
    "author": {
      "name": "Nguyễn Thúc Trọng Nhân",
      "role": "S4U · Solution4U"
    },
    "publishedAt": "2026-10-25",
    "readTimeMin": 2,
    "featured": true,
    "productSlug": "lawfirm",
    "seo": {
      "metaTitle": "Quản lý vụ việc và deadline trong công ty luật: bắt đầu số hóa từ đâu? | S4U",
      "metaDescription": "Bắt đầu số hóa bằng một luồng vụ việc có người phụ trách, deadline và tiêu chí đánh giá rõ ràng."
    }
  },
  {
    "slug": "tai-lieu-ngu-canh-va-phan-quyen",
    "title": "Lưu tài liệu tập trung chưa đủ: cần thêm ngữ cảnh và phân quyền",
    "excerpt": "Tài liệu cần gắn với công việc, quyền truy cập và một quy trình khôi phục đã được kiểm chứng.",
    "content": "<p>Gom tài liệu vào một nơi giúp giảm phân tán, nhưng chưa trả lời được ba câu hỏi: tài liệu phục vụ công việc nào, phiên bản nào cần dùng và ai được truy cập? Một kế hoạch quản lý hồ sơ nên giải quyết cả ba câu hỏi này.</p>\n<h2>Gắn tài liệu với công việc</h2>\n<p>Ngoài tên file, hãy xác định tài liệu thuộc khách hàng, vụ việc hoặc workspace nào. Chọn một nhóm metadata nhỏ và có người chịu trách nhiệm nhập. Metadata chỉ hữu ích khi người dùng hiểu và duy trì được nó.</p>\n<h2>Xác định quyền theo tình huống</h2>\n<p>Người phụ trách hồ sơ có thể cần cập nhật tài liệu, trong khi thành viên khác chỉ cần xem. Khi một người chuyển nhóm hoặc nghỉ việc, phải có cách thu hồi quyền. Không nên coi việc không biết đường link là một biện pháp phân quyền.</p>\n<h2>Kiểm tra bằng hành vi</h2>\n<p>Tạo dữ liệu demo ở hai phạm vi làm việc. Xác nhận người được cấp quyền mở được tài liệu, còn người ngoài phạm vi không đọc hoặc sửa được bằng link trực tiếp. Kiểm tra này cần thực hiện ở phía API, không chỉ bằng cách ẩn nút trên giao diện.</p>\n<h2>Backup phải đi cùng restore</h2>\n<p>Một file backup được tạo thành công chưa chứng minh hồ sơ có thể khôi phục. Hãy thử phục hồi dữ liệu và nội dung file sang môi trường riêng, sau đó đăng nhập và mở lại một tài liệu mẫu. Lưu kết quả để biết quy trình nào đã được kiểm chứng.</p>\n<p>Document Platform của S4U đang được hoàn thiện về khả năng vận hành và tích hợp. Buổi trao đổi nhu cầu giúp chọn phạm vi tài liệu, metadata và quyền cần kiểm chứng trước khi sử dụng thực tế.</p>",
    "category": "Business",
    "tags": [
      "Tài liệu",
      "Phân quyền",
      "Workspace"
    ],
    "author": {
      "name": "Nguyễn Thúc Trọng Nhân",
      "role": "S4U · Solution4U"
    },
    "publishedAt": "2026-10-25",
    "readTimeMin": 2,
    "featured": true,
    "productSlug": "document-platform",
    "seo": {
      "metaTitle": "Lưu tài liệu tập trung chưa đủ: cần thêm ngữ cảnh và phân quyền | S4U",
      "metaDescription": "Tài liệu cần gắn với công việc, quyền truy cập và một quy trình khôi phục đã được kiểm chứng."
    }
  },
  {
    "slug": "ai-tai-lieu-chon-bai-toan-va-kiem-chung",
    "title": "Ứng dụng AI vào tài liệu: chọn bài toán nhỏ và kiểm chứng kết quả",
    "excerpt": "Chọn đầu vào, đầu ra và bộ mẫu phù hợp để đánh giá AI trước khi đưa vào công việc.",
    "content": "<p>AI có thể hỗ trợ đọc và trích xuất nội dung tài liệu, nhưng một bản demo trả lời trôi chảy chưa đủ để quyết định đưa vào công việc. Nên bắt đầu bằng một bài toán có đầu vào, đầu ra và cách đánh giá rõ ràng.</p>\n<h2>Chọn một loại tài liệu và một kết quả</h2>\n<p>Ví dụ, thử trích xuất số hiệu từ một nhóm văn bản hoặc một số trường từ hóa đơn. Liệt kê trường bắt buộc, quy tắc kiểm tra và cách xử lý khi không tìm thấy dữ liệu. Đừng gộp nhiều loại hồ sơ vào bài thử đầu tiên.</p>\n<h2>Chuẩn bị bộ mẫu được phép sử dụng</h2>\n<p>Chọn tài liệu rõ, mờ, thiếu trang và khác định dạng. Người có chuyên môn chuẩn bị kết quả đối chiếu. Trước khi gửi tài liệu cho nhà cung cấp AI, xác nhận quyền sử dụng và yêu cầu bảo vệ dữ liệu; ưu tiên mẫu đã làm sạch trong giai đoạn thử nghiệm.</p>\n<h2>Đo lỗi và công sức kiểm tra</h2>\n<p>Ghi nhận trường đúng, trường sai, trường bỏ trống, thời gian xử lý và thời gian con người sửa kết quả. Chi phí gọi AI cũng cần được ghi lại. Mục tiêu là biết toàn bộ quy trình có hữu ích không, thay vì chỉ nhìn tốc độ phản hồi.</p>\n<h2>Giữ bước xác nhận của con người</h2>\n<p>Kết quả AI cần được kiểm tra trước khi sử dụng cho quyết định quan trọng. Khi độ tin cậy không đủ hoặc xử lý thất bại, hệ thống nên báo rõ trạng thái, giữ tài liệu gốc và cho phép xử lý lại có kiểm soát.</p>\n<p>S4U trao đổi các bài toán AI tài liệu theo phạm vi pilot. Khả năng áp dụng, độ chính xác và chi phí cần được kiểm chứng trên bộ mẫu phù hợp; không mặc định coi kết quả của một loại tài liệu là đại diện cho mọi hồ sơ.</p>",
    "category": "AI",
    "tags": [
      "AI",
      "Trích xuất",
      "Pilot"
    ],
    "author": {
      "name": "Nguyễn Thúc Trọng Nhân",
      "role": "S4U · Solution4U"
    },
    "publishedAt": "2026-10-25",
    "readTimeMin": 2,
    "featured": true,
    "productSlug": "document-platform",
    "seo": {
      "metaTitle": "Ứng dụng AI vào tài liệu: chọn bài toán nhỏ và kiểm chứng kết quả | S4U",
      "metaDescription": "Chọn đầu vào, đầu ra và bộ mẫu phù hợp để đánh giá AI trước khi đưa vào công việc."
    }
  }
];
@Injectable({providedIn: 'root'})
export class ArticleService {
 getAll() { return of(ARTICLES); }
 getBySlug(slug: string) { return of(ARTICLES.find(a => a.slug === slug)); }
 getByCategory(category: string) { return of(category === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === category)); }
 getFeatured() { return of(ARTICLES.filter(a => a.featured)); }
 getAllSlugs() { return ARTICLES.map(a => a.slug); }
}
