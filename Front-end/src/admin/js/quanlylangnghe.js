import React from 'react';
import '../css/quanlylangnghe.css';
import { 
  MapPin, Eye, Star, Pencil, Trash2, CheckCircle2, 
  Filter, ChevronLeft, ChevronRight 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemVillageManagerPage({ setActiveMenu, onExitToMain }) {
  const villages = [
    { 
      id: 1, name: 'Làng gốm Bát Tràng', location: 'Hà Nội', manager: 'Nguyễn Văn An', 
      category: 'Gốm sứ', views: '15.420', rating: '4.8', status: 'Hoạt động' 
    },
    { 
      id: 2, name: 'Làng lụa Vạn Phúc', location: 'Hà Nội', manager: 'Lê Văn Cường', 
      category: 'Dệt may', views: '12.350', rating: '4.7', status: 'Hoạt động' 
    },
    { 
      id: 3, name: 'Làng mộc Kim Bồng', location: 'Quảng Nam', manager: 'Vũ Quang Minh', 
      category: 'Mộc', views: '9.870', rating: '4.9', status: 'Hoạt động' 
    },
    { 
      id: 4, name: 'Làng đúc đồng Đại Bái', location: 'Bắc Ninh', manager: 'Trần Minh Tuấn', 
      category: 'Đúc đồng', views: '8.540', rating: '4.6', status: 'Hoạt động' 
    },
    { 
      id: 5, name: 'Làng gốm Chu Đậu', location: 'Hải Dương', manager: 'Phạm Thị Lan', 
      category: 'Gốm sứ', views: '5.200', rating: '4.4', status: 'Chờ duyệt' 
    },
  ];

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="villages" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="svm-main">
        {/* HEADER */}
        <header className="svm-header">
          <div>
            <h1 className="svm-title">Quản lý làng nghề</h1>
            <p className="svm-subtitle">Quản lý và duyệt các làng nghề trong hệ thống</p>
          </div>
          <button className="svm-btn-add">+ Thêm làng nghề</button>
        </header>

        {/* STATS */}
        <div className="svm-stats-grid">
          <div className="svm-stat-card">
            <h3 className="text-yellow">6</h3>
            <p>Tổng làng nghề</p>
          </div>
          <div className="svm-stat-card">
            <h3 className="text-green">4</h3>
            <p>Đang hoạt động</p>
          </div>
          <div className="svm-stat-card">
            <h3 className="text-orange">1</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>

        {/* FILTER */}
        <div className="svm-filter-container">
          <div className="svm-filter-row">
            <div className="svm-search-box">
              <input type="text" placeholder="Tìm tên, tỉnh, quản lý..." />
            </div>
            <div className="svm-placeholder-dropdown"></div>
            <div className="svm-placeholder-dropdown"></div>
          </div>
          <div className="svm-filter-result">
            <Filter size={14} /> Tìm thấy <strong>6</strong> làng nghề
          </div>
        </div>

        {/* TABLE */}
        <div className="svm-table-container">
          <table className="svm-table">
            <thead>
              <tr>
                <th>LÀNG NGHỀ</th>
                <th>LOẠI NGHỀ</th>
                <th>LƯỢT XEM</th>
                <th>ĐÁNH GIÁ</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {villages.map(v => (
                <tr key={v.id}>
                  <td>
                    <strong className="svm-village-name">{v.name}</strong>
                    <div className="svm-village-meta">
                      <span><MapPin size={12}/> {v.location}</span>
                      <span>QL: {v.manager}</span>
                    </div>
                  </td>
                  <td>
                    <span className="svm-cat-pill">{v.category}</span>
                  </td>
                  <td className="svm-view-cell">
                    <Eye size={16} className="text-gray-icon"/> {v.views}
                  </td>
                  <td className="svm-rating-cell">
                    <Star size={16} className="text-yellow" fill="currentColor"/> {v.rating}
                  </td>
                  <td>
                    <span className={`svm-status-pill ${v.status === 'Hoạt động' ? 'active' : 'pending'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <div className="svm-actions">
                      {v.status === 'Chờ duyệt' && (
                        <button className="svm-btn-approve" title="Duyệt"><CheckCircle2 size={16}/></button>
                      )}
                      <button title="Chỉnh sửa"><Pencil size={16}/></button>
                      <button title="Xóa"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="svm-pagination">
            <span>Trang 1 / 2</span>
            <div className="svm-page-controls">
              <button disabled><ChevronLeft size={16}/></button>
              <button><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}