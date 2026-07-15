import axios from 'axios';

// Khởi tạo axios client kết nối tới Backend ASP.NET Core API
const apiClient = axios.create({
  // Sử dụng cổng http://localhost:5120 của Backend .NET Core (theo launchSettings.json)
  baseURL: 'http://localhost:5120/api', 
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const getDanhSachLangNghe = async () => {
  try {
    const response = await apiClient.get('/LangNghe');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách làng nghề từ API:', error);
    throw error;
  }
};

export const getChiTietLangNghe = async (id) => {
  try {
    const response = await apiClient.get(`/LangNghe/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết làng nghề ID ${id}:`, error);
    throw error;
  }
};

export const getChiTietLangNgheTheoSlug = async (slug) => {
  try {
    const response = await apiClient.get(`/LangNghe/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết làng nghề slug ${slug}:`, error);
    throw error;
  }
};

export const getDanhSachNhomNghe = async () => {
  try {
    const response = await apiClient.get('/NhomNghe');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách nhóm nghề:', error);
    throw error;
  }
};

export const themLangNghe = async (data) => {
  try {
    const response = await apiClient.post('/LangNghe', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm làng nghề:', error);
    throw error;
  }
};

export const capNhatLangNghe = async (id, data) => {
  try {
    const response = await apiClient.put(`/LangNghe/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật làng nghề ID ${id}:`, error);
    throw error;
  }
};

export const xoaLangNghe = async (id) => {
  try {
    await apiClient.delete(`/LangNghe/${id}`);
    return true;
  } catch (error) {
    console.error(`Lỗi khi xóa làng nghề ID ${id}:`, error);
    throw error;
  }
};

// API Hình ảnh Làng nghề
export const getDanhSachHinhAnh = async () => {
  const response = await apiClient.get('/HinhAnhLangNghe');
  return response.data;
};

export const getDanhSachHinhAnhByVillage = async (maLangNghe) => {
  const response = await apiClient.get(`/HinhAnhLangNghe/byVillage/${maLangNghe}`);
  return response.data;
};

export const themHinhAnhLangNghe = async (data) => {
  const response = await apiClient.post('/HinhAnhLangNghe', data);
  return response.data;
};

export const xoaHinhAnhLangNghe = async (id) => {
  await apiClient.delete(`/HinhAnhLangNghe/${id}`);
  return true;
};

// API Video Làng nghề
export const getDanhSachVideo = async () => {
  const response = await apiClient.get('/VideoLangNghe');
  return response.data;
};

export const getDanhSachVideoByVillage = async (maLangNghe) => {
  const response = await apiClient.get(`/VideoLangNghe/byVillage/${maLangNghe}`);
  return response.data;
};

export const themVideoLangNghe = async (data) => {
  const response = await apiClient.post('/VideoLangNghe', data);
  return response.data;
};

export const xoaVideoLangNghe = async (id) => {
  await apiClient.delete(`/VideoLangNghe/${id}`);
  return true;
};

export default apiClient;

