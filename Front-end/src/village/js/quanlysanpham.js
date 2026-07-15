import React, { useState, useEffect } from 'react';
import '../css/quanlysanpham.css';
import { Plus, Edit2, Trash2, RefreshCw, X, Check, Eye, EyeOff } from 'lucide-react';
import { getDanhSachSanPham, themSanPham, capNhatSanPham, xoaSanPham } from '../../API/apiAdmin';

export default function QuanLySanPham() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tenSanPham, setTenSanPham] = useState('');
  const [giaBan, setGiaBan] = useState('');
  const [soLuongTonKho, setSoLuongTonKho] = useState('10');
  const [trangThai, setTrangThai] = useState('Đang bán');
  const [danhSachAnh, setDanhSachAnh] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300&auto=format&fit=crop');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachSanPham();
      if (data && Array.isArray(data)) {
        // Có thể lọc theo làng nghề hoặc hiển thị toàn bộ danh sách sản phẩm thuộc làng gốm Bát Tràng (ID=1)
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp danh sách sản phẩm từ SQL Server:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        TenSanPham: tenSanPham,
        GiaBan: parseFloat(giaBan) || 0,
        GiaKhuyenMai: 0,
        SoLuongTonKho: parseInt(soLuongTonKho, 10) || 0,
        TrangThai: trangThai,
        DanhSachAnh: danhSachAnh,
        DuongDanSlug: tenSanPham.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        MaLangNghe: 1, // Mặc định Làng gốm Bát Tràng
        MaNgheNhan: 1,
        SanPhamtieuBieu: false,
        ThongSoKyThuat: 'Sản phẩm thủ công mỹ nghệ'
      };

      await themSanPham(newProduct);
      setShowModal(false);
      setTenSanPham('');
      setGiaBan('');
      fetchProducts();
      alert('Thêm sản phẩm mới vào SQL Server thành công!');
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm:', err);
      alert('Lỗi khi lưu vào CSDL SQL Server.');
    }
  };

  const handleToggleStatus = async (p) => {
    const nextStatus = (p.trangThai || p.TrangThai) === 'Đang bán' ? 'Tạm ẩn' : 'Đang bán';
    const id = p.maSanPham || p.MaSanPham;
    try {
      await capNhatSanPham(id, {
        ...p,
        TrangThai: nextStatus
      });
      fetchProducts();
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      alert('Không thể đổi trạng thái trên SQL Server.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi CSDL SQL Server?')) {
      try {
        await xoaSanPham(id);
        fetchProducts();
      } catch (err) {
        console.error('Lỗi khi xóa sản phẩm:', err);
        alert('Lỗi khi xóa sản phẩm khỏi SQL Server.');
      }
    }
  };

  return (
    <div className="vp-main">
      <div className="vp-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="vp-title">Quản lý Danh mục Sản phẩm Làng nghề</h1>
            {loading && <span style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ SQL...</span>}
          </div>
          <p className="vp-subtitle">Cập nhật, chỉnh sửa giá bán và theo dõi tồn kho các sản phẩm thủ công mỹ nghệ trong SQL Server</p>
        </div>
        <button className="vp-btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Thêm sản phẩm mới
        </button>
      </div>

      <div className="vp-table-container">
        <table className="vp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Giá bán (VNĐ)</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Chưa có sản phẩm nào trong cơ sở dữ liệu cho Làng nghề. Hãy nhấn "Thêm sản phẩm mới" để tạo!
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const id = p.maSanPham || p.MaSanPham;
                const name = p.tenSanPham || p.TenSanPham || 'Sản phẩm không tên';
                const price = p.giaBan ?? p.GiaBan ?? 0;
                const stock = p.soLuongTonKho ?? p.SoLuongTonKho ?? 0;
                const status = p.trangThai || p.TrangThai || 'Đang bán';
                const img = (p.danhSachAnh || p.DanhSachAnh || '').split(',')[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200';

                return (
                  <tr key={id}>
                    <td><strong>#{id}</strong></td>
                    <td>
                      <div className="vp-prod-info">
                        <img src={img} alt={name} className="vp-prod-img" />
                        <strong>{name}</strong>
                      </div>
                    </td>
                    <td style={{ fontWeight: 'bold', color: '#b45309' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                    </td>
                    <td>{stock}</td>
                    <td>
                      <span className={`vp-badge ${status === 'Đang bán' ? 'vp-badge-active' : ''}`} style={status !== 'Đang bán' ? { background: '#f1f5f9', color: '#64748b' } : {}}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <button className="vp-btn-icon" title="Đổi trạng thái" onClick={() => handleToggleStatus(p)}>
                        {status === 'Đang bán' ? <EyeOff size={16} color="#64748b" /> : <Eye size={16} color="#059669" />}
                      </button>
                      <button className="vp-btn-icon delete" title="Xóa khỏi CSDL" onClick={() => handleDelete(id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL THÊM SẢN PHẨM */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '12px', width: '500px', maxWidth: '90%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Thêm Sản Phẩm Làng Nghề</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tên sản phẩm *</label>
                <input type="text" value={tenSanPham} onChange={(e) => setTenSanPham(e.target.value)} placeholder="Ví dụ: Lọ hoa gốm men rạn cổ..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Giá bán (VNĐ) *</label>
                  <input type="number" value={giaBan} onChange={(e) => setGiaBan(e.target.value)} placeholder="450000" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Số lượng tồn kho</label>
                  <input type="number" value={soLuongTonKho} onChange={(e) => setSoLuongTonKho(e.target.value)} placeholder="10" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Link hình ảnh minh họa</label>
                <input type="text" value={danhSachAnh} onChange={(e) => setDanhSachAnh(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
                <button type="submit" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#b45309', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Lưu vào CSDL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
