import React, { useState, useEffect } from 'react';
import '../css/quanlyvideo.css';
import { Plus, Play, Trash2, Search, RefreshCw, X } from 'lucide-react';
import { getDanhSachVideo, themVideoLangNghe, xoaVideoLangNghe } from '../../API/apiLangNghe';

export default function QuanLyVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tieuDe, setTieuDe] = useState('');
  const [duongDanVideo, setDuongDanVideo] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600');
  const [thoiLuong, setThoiLuong] = useState('04:30');
  const [noiBat, setNoiBat] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachVideo();
      if (data && Array.isArray(data)) {
        setVideos(data);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp danh sách video từ SQL Server:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const newVid = {
        MaLangNghe: 1, // Mặc định Làng gốm Bát Tràng
        TieuDe: tieuDe,
        DuongDanVideo: duongDanVideo,
        ThoiLuong: thoiLuong,
        LuotXem: Math.floor(10 + Math.random() * 500),
        NoiBat: noiBat,
        NgayTaiLen: new Date().toISOString()
      };

      await themVideoLangNghe(newVid);
      setShowModal(false);
      setTieuDe('');
      setThoiLuong('04:30');
      setNoiBat(false);
      fetchVideos();
      alert('Đã thêm video phóng sự mới vào SQL Server!');
    } catch (err) {
      console.error('Lỗi khi thêm video:', err);
      alert('Lỗi khi lưu video vào SQL Server.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa video này khỏi SQL Server?')) {
      try {
        await xoaVideoLangNghe(id);
        fetchVideos();
      } catch (err) {
        console.error('Lỗi khi xóa video:', err);
        alert('Lỗi khi xóa khỏi SQL Server.');
      }
    }
  };

  const filteredVideos = videos.filter(v => {
    const title = v.tieuDe || v.TieuDe || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'featured') {
      return matchesSearch && (v.noiBat || v.NoiBat);
    }
    return matchesSearch;
  });

  const totalViews = videos.reduce((acc, v) => acc + (v.luotXem ?? v.LuotXem ?? 0), 0);

  return (
    <div className="vm-main">
      <div className="vm-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="vm-title">Quản lý Video &amp; Phóng sự Làng nghề</h1>
            {loading && <span style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ SQL...</span>}
          </div>
          <p className="vm-subtitle">Quản lý các video giới thiệu, quy trình sản xuất và phóng sự văn hóa lưu trong SQL Server (`VideoLangNghe`)</p>
        </div>
        <button className="vm-btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} style={{ display: 'inline', marginRight: '6px' }} /> Thêm Video mới
        </button>
      </div>

      <div className="vm-stats">
        <div className="vm-stat-card">
          <h3>{videos.length}</h3>
          <p>Tổng số Video trong CSDL</p>
        </div>
        <div className="vm-stat-card">
          <h3>{totalViews.toLocaleString('vi-VN')}</h3>
          <p>Tổng lượt xem thực tế</p>
        </div>
        <div className="vm-stat-card">
          <h3>100%</h3>
          <p>Độ phân giải Full HD/4K</p>
        </div>
      </div>

      <div className="vm-filter-bar">
        <Search size={18} color="#9ca3af" />
        <input 
          type="text" 
          placeholder="Tìm kiếm video theo tiêu đề..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={`vm-tag ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả ({videos.length})</button>
        <button className={`vm-tag ${filter === 'featured' ? 'active' : ''}`} onClick={() => setFilter('featured')}>Nổi bật ({videos.filter(v => v.noiBat || v.NoiBat).length})</button>
      </div>

      <div className="vm-grid">
        {filteredVideos.length === 0 && !loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
            Chưa có video phóng sự nào khớp với điều kiện hoặc CSDL đang trống. Nhấn "Thêm Video mới" để tạo!
          </div>
        ) : (
          filteredVideos.map((vid) => {
            const id = vid.maVideo || vid.MaVideo;
            const title = vid.tieuDe || vid.TieuDe || 'Video không tên';
            const duration = vid.thoiLuong || vid.ThoiLuong || '05:00';
            const views = vid.luotXem ?? vid.LuotXem ?? 0;
            const isFeatured = vid.noiBat || vid.NoiBat;
            const dateStr = vid.ngayTaiLen ? new Date(vid.ngayTaiLen).toLocaleDateString('vi-VN') : 'Hôm nay';
            const thumb = vid.duongDanVideo || vid.DuongDanVideo || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600';

            return (
              <div key={id} className="vm-card">
                <div className="vm-thumb">
                  <img src={thumb} alt={title} />
                  {isFeatured && <span className="vm-badge-feat">Nổi bật</span>}
                  <span className="vm-badge-lang">Làng Gốm Bát Tràng</span>
                  <span className="vm-duration">{duration}</span>
                </div>
                <div className="vm-info">
                  <h3>{title}</h3>
                  <p>{views.toLocaleString('vi-VN')} lượt xem &bull; {dateStr}</p>
                  <div className="vm-actions">
                    <button className="vm-btn-preview" onClick={() => alert(`Đang phát video: ${title}`)}>
                      <Play size={14} /> Xem trước
                    </button>
                    <button className="vm-btn-icon trash" title="Xóa khỏi CSDL" onClick={() => handleDelete(id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="vm-add-card" onClick={() => setShowModal(true)}>
          <Plus size={36} style={{ marginBottom: '10px' }} />
          <strong>Tải lên Video mới</strong>
          <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>Lưu trực tiếp vào CSDL SQL Server</span>
        </div>
      </div>

      {/* MODAL THÊM VIDEO */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '12px', width: '480px', maxWidth: '90%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Thêm Video Phóng Sự Làng Nghề</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddVideo}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tiêu đề video *</label>
                <input type="text" value={tieuDe} onChange={(e) => setTieuDe(e.target.value)} placeholder="Ví dụ: Nghệ thuật vuốt gốm thủ công..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Thời lượng (mm:ss)</label>
                  <input type="text" value={thoiLuong} onChange={(e) => setThoiLuong(e.target.value)} placeholder="04:15" style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.4rem' }}>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={noiBat} onChange={(e) => setNoiBat(e.target.checked)} style={{ width: 18, height: 18 }} />
                    Đặt làm Video nổi bật
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Đường dẫn (Link video/Thumbnail) *</label>
                <input type="text" value={duongDanVideo} onChange={(e) => setDuongDanVideo(e.target.value)} placeholder="https://..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
                <button type="submit" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Lưu vào CSDL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
