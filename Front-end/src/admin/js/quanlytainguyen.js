import React from 'react';
import '../css/quanlytainguyen.css';
import { 
  AlertTriangle, Image as ImageIcon, Video, Music, 
  CheckCircle2, XCircle, ZoomIn, Check, X, Trash2, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function ResourceManagerPage({ setActiveMenu, onExitToMain }) {
  const resources = [
    {
      id: 1, title: 'Nghệ nhân nặn gốm Bát Tràng', village: 'Làng gốm Bát Tràng', uploader: 'Nguyễn Văn An',
      date: '27/06/2026', size: '2.4 MB', type: 'image', status: 'pending', 
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'
    },
    {
      id: 2, title: 'Lò nung gốm truyền thống', village: 'Làng gốm Bát Tràng', uploader: 'Nguyễn Văn An',
      date: '26/06/2026', size: '1.8 MB', type: 'image', status: 'approved', 
      img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400'
    },
    {
      id: 3, title: 'Quy trình làm gốm thủ công', village: 'Làng gốm Bát Tràng', uploader: 'Nguyễn Văn An',
      date: '25/06/2026', size: '45 MB', type: 'video', status: 'pending', duration: '8:45',
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400'
    },
    {
      id: 4, title: 'Giới thiệu làng lụa Vạn Phúc', village: 'Làng lụa Vạn Phúc', uploader: 'Lê Văn Cường',
      date: '24/06/2026', size: '3.2 MB', type: 'audio', status: 'approved', duration: '3:24',
      img: null
    },
    {
      id: 5, title: 'Sản phẩm lụa cao cấp', village: 'Làng lụa Vạn Phúc', uploader: 'Lê Văn Cường',
      date: '23/06/2026', size: '3.1 MB', type: 'image', status: 'rejected', 
      img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?q=80&w=400',
      rejectReason: 'Hình ảnh không rõ nét, chất lượng thấp'
    },
    {
      id: 6, title: 'Nghệ nhân mộc Kim Bồng', village: 'Làng mộc Kim Bồng', uploader: 'Vũ Quang Minh',
      date: '22/06/2026', size: '62 MB', type: 'video', status: 'pending', duration: '12:30',
      img: null
    }
  ];

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

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="resources" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="rm-main">
        {/* HEADER */}
        <header className="rm-header">
          <div>
            <h1 className="rm-title">Quản lý tài nguyên</h1>
            <p className="rm-subtitle">Duyệt hình ảnh, video, audio từ tất cả làng nghề</p>
          </div>
          <div className="rm-alert-box">
            <AlertTriangle size={16} /> 4 tài nguyên chờ duyệt
          </div>
        </header>

        {/* STATS */}
        <div className="rm-stats-grid">
          <div className="rm-stat-card"><h3>8</h3><p>Tổng</p></div>
          <div className="rm-stat-card"><h3 className="text-yellow">4</h3><p>Chờ duyệt</p></div>
          <div className="rm-stat-card"><h3 className="text-green">3</h3><p>Đã duyệt</p></div>
          <div className="rm-stat-card"><h3 className="text-red">1</h3><p>Từ chối</p></div>
          <div className="rm-stat-card"><h3 className="text-blue">4</h3><p>Hình ảnh</p></div>
          <div className="rm-stat-card"><h3 className="text-purple">4</h3><p>Video/Audio</p></div>
        </div>

        {/* FILTERS */}
        <div className="rm-filter-section">
          <div className="rm-filter-row">
            <div className="rm-search-box">
              <input type="text" placeholder="Tìm tiêu đề, làng nghề, người đăng..." />
            </div>
            <div className="rm-placeholder-dropdown"></div>
            <div className="rm-placeholder-dropdown"></div>
          </div>
          <div className="rm-tags-row">
            <div className="rm-tag-group">
              <button className="rm-tag active">Tất cả loại</button>
              <button className="rm-tag"><ImageIcon size={14}/> Hình ảnh</button>
              <button className="rm-tag"><Video size={14}/> Video</button>
              <button className="rm-tag"><Music size={14}/> Audio</button>
            </div>
            <div className="rm-tag-group">
              <button className="rm-tag active">Tất cả</button>
              <button className="rm-tag"><Clock size={14} className="text-yellow"/> Chờ duyệt</button>
              <button className="rm-tag"><CheckCircle2 size={14} className="text-green"/> Đã duyệt</button>
              <button className="rm-tag"><XCircle size={14} className="text-red"/> Từ chối</button>
            </div>
          </div>
        </div>

        {/* GRID CÁC TÀI NGUYÊN */}
        <div className="rm-grid">
          {resources.map((res) => (
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
                {res.type === 'video' && res.img && (
                  <div className="rm-video-overlay"><Video size={32} color="#a855f7" /></div>
                )}
              </div>

              {/* Info Area */}
              <div className="rm-info-area">
                <h4 className="rm-item-title">{res.title}</h4>
                <p className="rm-item-village">{res.village}</p>
                <div className="rm-item-meta">
                  <span>{res.uploader}</span>
                  <span>{res.date} • {res.size}</span>
                </div>

                {res.status === 'rejected' && res.rejectReason && (
                  <div className="rm-reject-reason">
                    <AlertTriangle size={14} /> {res.rejectReason}
                  </div>
                )}

                {/* Actions */}
                <div className="rm-actions">
                  <button className="rm-btn-preview"><ZoomIn size={16}/></button>
                  
                  {res.status === 'pending' && (
                    <>
                      <button className="rm-btn-approve"><Check size={16}/> Duyệt</button>
                      <button className="rm-btn-reject"><X size={16}/> Từ chối</button>
                    </>
                  )}

                  {res.status === 'approved' && (
                    <div className="rm-status-text text-green"><CheckCircle2 size={16}/> Đã duyệt</div>
                  )}

                  {res.status === 'rejected' && (
                    <button className="rm-btn-re-approve">Duyệt lại</button>
                  )}

                  <button className="rm-btn-delete"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="rm-pagination">
          <span>Trang 1 / 2 · 8 tài nguyên</span>
          <div className="rm-page-controls">
            <button disabled><ChevronLeft size={16}/></button>
            <button><ChevronRight size={16}/></button>
          </div>
        </div>

      </main>
    </div>
  );
}

// Icon giả lập cho Clock vì thiếu import ở trên
function Clock(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}