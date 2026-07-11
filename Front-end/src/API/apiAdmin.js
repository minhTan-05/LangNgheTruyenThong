import apiClient from './apiLangNghe';

// 1. API Quản lý Tài khoản / Người dùng (NguoiDung)
export const getDanhSachNguoiDung = async () => {
  const response = await apiClient.get('/NguoiDung');
  return response.data;
};

export const themNguoiDung = async (data) => {
  const response = await apiClient.post('/NguoiDung', data);
  return response.data;
};

export const xoaNguoiDung = async (id) => {
  await apiClient.delete(`/NguoiDung/${id}`);
  return true;
};

// 2. API Quản lý Sản phẩm (SanPham)
export const getDanhSachSanPham = async () => {
  const response = await apiClient.get('/SanPham');
  return response.data;
};

export const themSanPham = async (data) => {
  const response = await apiClient.post('/SanPham', data);
  return response.data;
};

export const capNhatSanPham = async (id, data) => {
  await apiClient.put(`/SanPham/${id}`, data);
  return true;
};

export const xoaSanPham = async (id) => {
  await apiClient.delete(`/SanPham/${id}`);
  return true;
};

// 3. API Quản lý Đơn hàng (DonHang)
export const getDanhSachDonHang = async () => {
  const response = await apiClient.get('/DonHang');
  return response.data;
};

export const themDonHang = async (data) => {
  const response = await apiClient.post('/DonHang', data);
  return response.data;
};

export const capNhatDonHang = async (id, data) => {
  await apiClient.put(`/DonHang/${id}`, data);
  return true;
};

export const xoaDonHang = async (id) => {
  await apiClient.delete(`/DonHang/${id}`);
  return true;
};

// 4. API Quản lý Nghệ nhân (NgheNhan)
export const getDanhSachNgheNhan = async () => {
  const response = await apiClient.get('/NgheNhan');
  return response.data;
};

export const themNgheNhan = async (data) => {
  const response = await apiClient.post('/NgheNhan', data);
  return response.data;
};

export const xoaNgheNhan = async (id) => {
  await apiClient.delete(`/NgheNhan/${id}`);
  return true;
};

// 5. API Quản lý Tour trải nghiệm (TourTraiNghiem)
export const getDanhSachTour = async () => {
  const response = await apiClient.get('/TourTraiNghiem');
  return response.data;
};

export const themTour = async (data) => {
  const response = await apiClient.post('/TourTraiNghiem', data);
  return response.data;
};

export const xoaTour = async (id) => {
  await apiClient.delete(`/TourTraiNghiem/${id}`);
  return true;
};

// 6. API Quản lý Thuyết minh Audio (ThuyetMinhAudio)
export const getDanhSachAudio = async () => {
  const response = await apiClient.get('/ThuyetMinhAudio');
  return response.data;
};

export const themAudio = async (data) => {
  const response = await apiClient.post('/ThuyetMinhAudio', data);
  return response.data;
};

export const xoaAudio = async (id) => {
  await apiClient.delete(`/ThuyetMinhAudio/${id}`);
  return true;
};

export default {
  getDanhSachNguoiDung, themNguoiDung, xoaNguoiDung,
  getDanhSachSanPham, themSanPham, capNhatSanPham, xoaSanPham,
  getDanhSachDonHang, themDonHang, capNhatDonHang, xoaDonHang,
  getDanhSachNgheNhan, themNgheNhan, xoaNgheNhan,
  getDanhSachTour, themTour, xoaTour,
  getDanhSachAudio, themAudio, xoaAudio
};
