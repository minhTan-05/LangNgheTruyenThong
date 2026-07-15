import React, { useState, useEffect } from 'react';
import '../css/quanlyhinhanh.css';
import { Plus, Trash2, RefreshCw, X } from 'lucide-react';
import { getDanhSachHinhAnh, themHinhAnhLangNghe, xoaHinhAnhLangNghe } from '../../API/apiLangNghe';

export default function QuanLyHinhAnh() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tieuDe, setTieuDe] = useState('');
  const [duongDanAnh, setDuongDanAnh] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=500');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachHinhAnh();
      if (data && Array.isArray(data)) {
        setImages(data);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp danh sách hình ảnh từ SQL Server:', err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      const newImg = {
        MaLangNghe: 1, // Mặc định Làng gốm Bát Tràng
        TieuDe: tieuDe,
        DuongDanAnh: duongDanAnh,
        NgayTaiLen: new Date().toISOString()
      };

      await themHinhAnhLangNghe(newImg);
      setShowModal(false);
      setTieuDe('');
      fetchImages();
      alert('Đã thêm hình ảnh mới vào SQL Server!');
    } catch (err) {
      console.error('Lỗi khi thêm hình ảnh:', err);
      alert('Lỗi khi lưu vào SQL Server.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa hình ảnh này khỏi CSDL SQL Server?')) {
      try {
        await xoaHinhAnhLangNghe(id);
        fetchImages();
      } catch (err) {
        console.error('Lỗi khi xóa hình ảnh:', err);
        alert('Lỗi khi xóa khỏi SQL Server.');
      }
    }
  };

  return (
    <div className="vi-main">
      <div className="vi-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="vi-title">Thư viện Hình ảnh &amp; Triển lãm Làng nghề</h1>
            {loading && <span style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ SQL...</span>}
          </div>
          <p className="vi-subtitle">Quản lý kho ảnh độ phân giải cao giới thiệu cảnh quan và tác phẩm nghệ thuật trong SQL Server (`HinhAnhLangNghe`)</p>
        </div>
        <button className="vi-btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Tải ảnh mới lên
        </button>
      </div>

      {images.length === 0 && !loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
          Chưa có hình ảnh nào trong thư viện SQL Server (`HinhAnhLangNghe`). Bạn hãy nhấn "Tải ảnh mới lên" để thêm ngay!
        </div>
      ) : (
        <div className="vi-grid">
          {images.map((img) => {
            const id = img.maHinhAnh || img.MaHinhAnh;
            const title = img.tieuDe || img.TieuDe || 'Không có tiêu đề';
            const url = img.duongDanAnh || img.DuongDanAnh || '';
            const dateStr = img.ngayTaiLen ? new Date(img.ngayTaiLen).toLocaleDateString('vi-VN') : 'Hôm nay';

            return (
              <div key={id} className="vi-card">
                <div className="vi-img-wrapper">
                  <img src={url} alt={title} />
                  <button className="vi-delete-btn" title="Xóa ảnh khỏi SQL Server" onClick={() => handleDelete(id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="vi-info">
                  <h4>{title}</h4>
                  <p>Ngày tải: {dateStr}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL THÊM ẢNH */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '12px', width: '480px', maxWidth: '90%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Tải Ảnh Mới Lên Thư Viện</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddImage}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tiêu đề / Mô tả ảnh *</label>
                <input type="text" value={tieuDe} onChange={(e) => setTieuDe(e.target.value)} placeholder="Ví dụ: Nghệ nhân chế tác tại bàn xoay..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Đường dẫn (Link ảnh/URL) *</label>
                <input type="text" value={duongDanAnh} onChange={(e) => setDuongDanAnh(e.target.value)} placeholder="https://..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
                <button type="submit" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#059669', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Lưu vào CSDL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
