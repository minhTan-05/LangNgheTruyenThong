import React, { useState } from 'react';
import '../css/quanlyvideo.css';
import { Plus, Play, Trash2, Search } from 'lucide-react';

const initialVideos = [
  {
    id: 1,
    title: 'Nghệ thuật vuốt gốm thủ công Bát Tràng',
    duration: '04:15',
    lang: 'Làng Gốm Bát Tràng',
    views: '1.2k lượt xem',
    date: '12/06/2026',
    featured: true,
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Quy trình nung lò lò bầu truyền thống',
    duration: '08:30',
    lang: 'Làng Gốm Bát Tràng',
    views: '850 lượt xem',
    date: '05/05/2026',
    featured: false,
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600&auto=format&fit=crop'
  }
];

export default function QuanLyVideo() {
  const [videos, setVideos] = useState(initialVideos);
  const [filter, setFilter] = useState('all');

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa video này?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="vm-main">
      <div className="vm-header">
        <div>
          <h1 className="vm-title">Quản lý Video &amp; Phóng sự Làng nghề</h1>
          <p className="vm-subtitle">Quản lý các video giới thiệu, quy trình sản xuất và phóng sự văn hóa</p>
        </div>
        <button className="vm-btn-add" onClick={() => alert('Đang mở form tải lên Video mới...')}>
          <Plus size={18} style={{ display: 'inline', marginRight: '6px' }} /> Thêm Video mới
        </button>
      </div>

      <div className="vm-stats">
        <div className="vm-stat-card">
          <h3>{videos.length}</h3>
          <p>Tổng số Video</p>
        </div>
        <div className="vm-stat-card">
          <h3>2.05k</h3>
          <p>Tổng lượt xem</p>
        </div>
        <div className="vm-stat-card">
          <h3>100%</h3>
          <p>Độ phân giải Full HD/4K</p>
        </div>
      </div>

      <div className="vm-filter-bar">
        <Search size={18} color="#9ca3af" />
        <input type="text" placeholder="Tìm kiếm video theo tiêu đề..." />
        <button className={`vm-tag ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
        <button className={`vm-tag ${filter === 'featured' ? 'active' : ''}`} onClick={() => setFilter('featured')}>Nổi bật</button>
      </div>

      <div className="vm-grid">
        {videos.map((vid) => (
          <div key={vid.id} className="vm-card">
            <div className="vm-thumb">
              <img src={vid.img} alt={vid.title} />
              {vid.featured && <span className="vm-badge-feat">Nổi bật</span>}
              <span className="vm-badge-lang">{vid.lang}</span>
              <span className="vm-duration">{vid.duration}</span>
            </div>
            <div className="vm-info">
              <h3>{vid.title}</h3>
              <p>{vid.views} &bull; {vid.date}</p>
              <div className="vm-actions">
                <button className="vm-btn-preview" onClick={() => alert(`Đang phát video: ${vid.title}`)}>
                  <Play size={14} /> Xem trước
                </button>
                <button className="vm-btn-icon trash" onClick={() => handleDelete(vid.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="vm-add-card" onClick={() => alert('Đang tải lên Video mới...')}>
          <Plus size={36} style={{ marginBottom: '10px' }} />
          <strong>Tải lên Video mới</strong>
          <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>MP4, MOV (Tối đa 500MB)</span>
        </div>
      </div>
    </div>
  );
}
