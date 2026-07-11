import axios from 'react-axios'; // Lưu ý: import axios từ 'axios', không phải 'react-axios' - sửa lỗi nháp.
import axios from 'axios';

// Khởi tạo một đối tượng axios với cấu hình mặc định
const apiClient = axios.create({
  // Thay đổi port 5001 thành port mà Backend ASP.NET Core của bạn đang chạy
  baseURL: 'https://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;