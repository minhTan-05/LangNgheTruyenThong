import React, { useState, useEffect } from 'react';
import '../css/quanlytainguyen.css';
import { 
  AlertTriangle, Image as ImageIcon, Video, Music, 
  CheckCircle2, XCircle, ZoomIn, Check, X, Trash2, 
  ChevronLeft, ChevronRight, RefreshCw, PlusCircle 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';
import { getDanhSachAudio, themAudio, xoaAudio, getDanhSachNgheNhan, themNgheNhan, xoaNgheNhan } from '../../API/apiAdmin';

export default function ResourceManagerPage({ setActiveMenu, onExitToMain }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal Thêm tài nguyên
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    village: 'Làng gốm Bát Tràng',
    type: 'audio', // audio, image, video
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 120,
    status: 'approved'
  });

  const [notification, setNotification] = useState(null);
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadResourcesFromDB();
  }, []);

  const loadResourcesFromDB = async () => {
    setLoading(true);
    try {
      const [audios, ngheNhans] = await Promise.all([
        getDanhSachAudio().catch(() => []),
        getDanhSachNgheNhan().catch(() => [])
      ]);

      const audioMapped = (audios || []).map(a => ({
        id: `aud-${a.maThuyetMinh || a.MaThuyetMinh}`,
        realId: a.maThuyetMinh || a.MaThuyetMinh,
        title: a.tieuDe || a.TieuDe || 'Audio thuyết minh',
        village: a.langNghe?.tenLangNghe || a.LangNghe?.TenLangNghe || 'Làng gốm Bát Tràng',
        uploader: 'Hệ thống AI',
        date: '11/07/2026',
        size: `${Math.round((a.thoiLuongGiay || 120) * 0.03)} MB`,
        type: 'audio',
        status: 'approved',
        duration: `${Math.floor((a.thoiLuongGiay || 120) / 60)}:${(a.thoiLuongGiay || 120) % 60 < 10 ? '0' : ''}${(a.thoiLuongGiay || 120) % 60}`,
        url: a.duongDanAudio || a.DuongDanAudio,
        source: 'audio'
      }));

      const ngheNhanMapped = (ngheNhans || []).map(n => ({
        id: `nn-${n.maNgheNhan || n.MaNgheNhan}`,
        realId: n.maNgheNhan || n.MaNgheNhan,
        title: `Nghệ nhân: ${n.hoTen || n.HoTen}`,
        village: n.langNghe?.tenLangNghe || n.LangNghe?.TenLangNghe || 'Làng gốm Bát Tràng',
        uploader: 'Quản lý làng nghề',
        date: '10/07/2026',
        size: '2.5 MB',
        type: 'image',
        status: 'approved',
        img: n.anhChungNhan || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400',
        source: 'nghenhan'
      }));

      const combined = [...audioMapped, ...ngheNhanMapped];
      setResources(combined);
    } catch (err) {
      console.warn('Lỗi kết nối CSDL Tài nguyên:', err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitResource = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề tài nguyên!', 'error');
      return;
    }

    const villageMap = {
      'Làng gốm Bát Tràng': 1,
      'Làng lụa Vạn Phúc': 2,
      'Làng mộc Kim Bồng': 3,
      'Làng đúc đồng Đại Bái': 4
    };

    try {
      if (formData.type === 'audio') {
        await themAudio({
          maLangNghe: villageMap[formData.village] || 1,
          tieuDe: formData.title,
          maNgonNgu: 'vi',
          duongDanAudio: formData.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          thoiLuongGiay: Number(formData.duration) || 120,
          noiDungVaniBan: 'Nội dung thuyết minh truyền thống...'
        });
      } else {
        await themNgheNhan({
          maLangNghe: villageMap[formData.village] || 1,
          hoTen: formData.title,
          namSinh: 1965,
          danhHieu: 'Nghệ nhân ưu tú',
          chuyenMon: 'Thủ công mỹ nghệ',
          tieuSu: 'Nghệ nhân lâu năm tại làng nghề',
          anhChungNhan: formData.url || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'
        });
      }
      showToast(`Đã thêm tài nguyên "${formData.title}" vào SQL Server thành công!`);
      loadResourcesFromDB();
    } catch (err) {
      showToast('Lỗi khi thêm tài nguyên vào CSDL SQL Server!', 'error');
    }
    setShowModal(false);
  };

  const handleDeleteResource = async (res) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${res.title}" khỏi CSDL?`)) return;
    try {
      if (res.source === 'audio') {
        await xoaAudio(res.realId);
      } else {
        await xoaNgheNhan(res.realId);
      }
      showToast(`Đã xóa "${res.title}" thành công!`);
      loadResourcesFromDB();
    } catch (err) {
      setResources(resources.filter(item => item.id !== res.id));
      showToast(`Đã xóa tài nguyên "${res.title}"!`);
    }
  };

  const renderTypeBadge = (type) => {
    if (type === 'image') return <span className="rm-type-badge type-img">Hình ảnh</span>;
    if (type === 'video') return <span className="rm-type-badge type-vid">Video</span>;
    if (type === 'audio') return <span className="rm-type-badge type-aud">Audio</span>;
  };

  const renderStatusBadge = (status) => {
    if (status === 'pending') return <span className="rm-status-badge status-pen">Chờ duyệt</span>;
    if (status === 'approved') return <span className="rm-status-badge status-app">Đã duyệt</span>;
    if (status === 'rejected') return <span className="rm-status-badge status-rej">Từ chối</span>;
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || res.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || res.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="resources" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="rm-main">
        {notification && (
          <div style={{
            position: 'fixed', top: '24px', right: '32px', zIndex: 9999,
            background: notification.type === 'error' ? '#ef4444' : '#10b981', color: 'white',
            padding: '12px 24px', borderRadius: '12px', fontWeight: '600', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            {notification.type === 'error' ? '⚠️' : '✅'} {notification.message}
          </div>
        )}

        {/* HEADER */}
        <header className="rm-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 className="rm-title">Quản lý tài nguyên hệ thống</h1>
              {loading && <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang tải từ CSDL...</span>}
            </div>
            <p className="rm-subtitle">Dữ liệu từ CSDL SQL Server (Audio Thuyết minh & Hình ảnh Nghệ nhân) · {resources.length} tài nguyên</p>
          </div>
          <button className="um-btn-add" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Thêm tài nguyên
          </button>
        </header>

        {/* STATS */}
        <div className="rm-stats-grid">
          <div className="rm-stat-card"><h3>{resources.length}</h3><p>Tổng</p></div>
          <div className="rm-stat-card"><h3 className="text-yellow">{resources.filter(r => r.status === 'pending').length}</h3><p>Chờ duyệt</p></div>
          <div className="rm-stat-card"><h3 className="text-green">{resources.filter(r => r.status === 'approved').length}</h3><p>Đã duyệt</p></div>
          <div className="rm-stat-card"><h3 className="text-red">{resources.filter(r => r.status === 'rejected').length}</h3><p>Từ chối</p></div>
          <div className="rm-stat-card"><h3 className="text-blue">{resources.filter(r => r.type === 'image').length}</h3><p>Hình ảnh</p></div>
          <div className="rm-stat-card"><h3 className="text-purple">{resources.filter(r => r.type === 'audio' || r.type === 'video').length}</h3><p>Video/Audio</p></div>
        </div>

        {/* FILTERS */}
        <div className="rm-filter-section">
          <div className="rm-filter-row">
            <div className="rm-search-box">
              <input type="text" placeholder="Tìm tiêu đề, làng nghề..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="rm-tags-row">
            <div className="rm-tag-group">
              <button className={`rm-tag ${typeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setTypeFilter('ALL')}>Tất cả loại</button>
              <button className={`rm-tag ${typeFilter === 'image' ? 'active' : ''}`} onClick={() => setTypeFilter('image')}><ImageIcon size={14}/> Hình ảnh ({resources.filter(r => r.type === 'image').length})</button>
              <button className={`rm-tag ${typeFilter === 'audio' ? 'active' : ''}`} onClick={() => setTypeFilter('audio')}><Music size={14}/> Audio ({resources.filter(r => r.type === 'audio').length})</button>
            </div>
            <div className="rm-tag-group">
              <button className={`rm-tag ${statusFilter === 'ALL' ? 'active' : ''}`} onClick={() => setStatusFilter('ALL')}>Tất cả</button>
              <button className={`rm-tag ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}><Clock size={14} className="text-yellow"/> Chờ duyệt</button>
              <button className={`rm-tag ${statusFilter === 'approved' ? 'active' : ''}`} onClick={() => setStatusFilter('approved')}><CheckCircle2 size={14} className="text-green"/> Đã duyệt</button>
            </div>
          </div>
        </div>

        {/* GRID CÁC TÀI NGUYÊN */}
        <div className="rm-grid">
          {filteredResources.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem', background: '#fff', borderRadius: '16px', color: '#9ca3af' }}>
              <strong>Chưa có dữ liệu tài nguyên nào trong CSDL SQL Server!</strong>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem' }}>Bấm nút "+ Thêm tài nguyên" để thêm Audio hoặc Hình ảnh Nghệ nhân vào CSDL.</p>
            </div>
          ) : (
            filteredResources.map((res) => (
              <div key={res.id} className="rm-card">
                {/* Thumbnail Area */}
                <div className="rm-thumb-area">
                  {renderStatusBadge(res.status)}
                  {renderTypeBadge(res.type)}
                  
                  {res.img ? (
                    <img src={res.img} alt={res.title} className="rm-thumb-img" />
                  ) : (
                    <div className="rm-thumb-placeholder">
                      {res.type === 'video' ? <Video size={40} color="#a855f7"/> : <Music size={40} color="#ea580c"/>}
                    </div>
                  )}
                  
                  {res.duration && <span className="rm-duration">{res.duration}</span>}
                </div>

                {/* Info Area */}
                <div className="rm-info-area">
                  <h4 className="rm-item-title">{res.title}</h4>
                  <p className="rm-item-village">{res.village}</p>
                  <div className="rm-item-meta">
                    <span>{res.uploader}</span>
                    <span>{res.date} • {res.size}</span>
                  </div>

                  {/* Actions */}
                  <div className="rm-actions">
                    <button className="rm-btn-preview" title="Đã duyệt"><ZoomIn size={16}/></button>
                    <div className="rm-status-text text-green" style={{ flex: 1, textAlign: 'center' }}><CheckCircle2 size={16}/> Đã duyệt</div>
                    <button className="rm-btn-delete" title="Xóa tài nguyên khỏi CSDL" onClick={() => handleDeleteResource(res)}><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* MODAL THÊM TÀI NGUYÊN */}
        {showModal && (
          <div className="um-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="um-modal" onClick={e => e.stopPropagation()}>
              <div className="um-modal-header">
                <h2>+ Thêm Tài nguyên vào CSDL SQL Server</h2>
                <button className="um-btn-close" onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmitResource}>
                <div className="um-form-group">
                  <label>Tiêu đề tài nguyên (*)</label>
                  <input type="text" name="title" placeholder="VD: Thuyết minh lịch sử gốm Bát Tràng" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Làng nghề</label>
                    <select name="village" value={formData.village} onChange={handleInputChange}>
                      <option value="Làng gốm Bát Tràng">Làng gốm Bát Tràng</option>
                      <option value="Làng lụa Vạn Phúc">Làng lụa Vạn Phúc</option>
                      <option value="Làng mộc Kim Bồng">Làng mộc Kim Bồng</option>
                      <option value="Làng đúc đồng Đại Bái">Làng đúc đồng Đại Bái</option>
                    </select>
                  </div>
                  <div className="um-form-group">
                    <label>Loại tài nguyên</label>
                    <select name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="audio">Audio Thuyết minh (Bảng ThuyetMinhAudio)</option>
                      <option value="image">Hình ảnh Nghệ nhân (Bảng NgheNhan)</option>
                    </select>
                  </div>
                </div>
                <div className="um-form-group">
                  <label>URL (Audio MP3 hoặc URL Hình ảnh)</label>
                  <input type="text" name="url" value={formData.url} onChange={handleInputChange} />
                </div>
                {formData.type === 'audio' && (
                  <div className="um-form-group">
                    <label>Thời lượng (giây)</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} />
                  </div>
                )}
                <div className="um-modal-actions">
                  <button type="button" className="um-btn-cancel" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                  <button type="submit" className="um-btn-submit">Lưu vào SQL Server</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Clock(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}