import React from 'react';
import '../css/quanlySanpham.css';
import { 
  Eye, Check, X, ToggleRight, ToggleLeft, 
  Star, Filter, ChevronLeft, ChevronRight 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemProductManagerPage({ setActiveMenu, onExitToMain }) {
  const products = [
    { 
      id: 1, name: 'Bình hoa gốm men', village: 'Làng gốm Bát Tràng', stock: 'Còn 24', 
      cat: 'Gốm sứ', price: '450.000đ', rating: 4.8, revCount: 127, status: 'Hiển thị',
      img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100'
    },
    { 
      id: 2, name: 'Khăn lụa tơ tằm', village: 'Làng lụa Vạn Phúc', stock: 'Còn 15', 
      cat: 'Dệt may', price: '850.000đ', rating: 4.7, revCount: 89, status: 'Hiển thị',
      img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?w=100'
    },
    { 
      id: 3, name: 'Bàn thờ gỗ gụ', village: 'Làng mộc Kim Bồng', stock: 'Còn 3', 
      cat: 'Mộc', price: '15.000.000đ', rating: 4.9, revCount: 34, status: 'Chờ duyệt',
      img: null
    },
    { 
      id: 4, name: 'Chuông đồng thủ', village: 'Làng đúc đồng Đại Bái', stock: 'Còn 8', 
      cat: 'Đúc đồng', price: '2.500.000đ', rating: 4.6, revCount: 52, status: 'Hiển thị',
      img: null
    },
    { 
      id: 5, name: 'Bộ ấm chén gốm', village: 'Làng gốm Bát Tràng', stock: 'Còn 18', 
      cat: 'Gốm sứ', price: '680.000đ', rating: 4.7, revCount: 203, status: 'Hiển thị',
      img: 'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?w=100'
    },
    { 
      id: 6, name: 'Áo dài lụa Hà', village: 'Làng lụa Vạn Phúc', stock: 'Hết hàng', 
      cat: 'Dệt may', price: '3.200.000đ', rating: 5, revCount: 67, status: 'Chờ duyệt',
      img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?w=100'
    },
    { 
      id: 7, name: 'Khăn tơ tằm thêu', village: 'Làng lụa Vạn Phúc', stock: 'Còn 5', 
      cat: 'Dệt may', price: '1.200.000đ', rating: 4.9, revCount: 23, status: 'Hiển thị',
      img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?w=100'
    },
    { 
      id: 8, name: 'Tượng gỗ phong', village: 'Làng mộc Kim Bồng', stock: 'Hết hàng', 
      cat: 'Mộc', price: '3.500.000đ', rating: 4.7, revCount: 18, status: 'Ẩn',
      img: null
    },
  ];

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="products" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-pm-main">
        {/* HEADER */}
        <header className="sys-pm-header">
          <div>
            <h1 className="sys-pm-title">Quản lý sản phẩm</h1>
            <p className="sys-pm-subtitle">Toàn hệ thống · 9 sản phẩm</p>
          </div>
        </header>

        {/* STATS */}
        <div className="sys-pm-stats-grid">
          <div className="sys-pm-stat-card">
            <h3 className="text-dark">9</h3>
            <p>Tổng sản phẩm</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-green">5</h3>
            <p>Đang hiển thị</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-purple">1</h3>
            <p>Đang ẩn</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-yellow">3</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="sys-pm-filter-container">
          <div className="sys-pm-search-box">
            <input type="text" placeholder="Tìm sản phẩm, làng nghề..." />
          </div>
          <div className="sys-pm-placeholder-dropdown"></div>
          <div className="sys-pm-placeholder-dropdown"></div>
          <div className="sys-pm-filter-result">
            <Filter size={14} /> 9 kết quả
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="sys-pm-table-container">
          
          {/* TOP PAGINATION */}
          <div className="sys-pm-pagination">
            <span>Trang 1 / 2</span>
            <div className="sys-pm-page-controls">
              <button disabled><ChevronLeft size={16}/></button>
              <button><ChevronRight size={16}/></button>
            </div>
          </div>

          <table className="sys-pm-table">
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>DANH MỤC</th>
                <th>GIÁ</th>
                <th>ĐÁNH GIÁ</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="sys-pm-prod-cell">
                      <div className="sys-pm-prod-img">
                        {p.img && <img src={p.img} alt={p.name} />}
                      </div>
                      <div>
                        <strong>{p.name}</strong>
                        <div className="sys-pm-village">{p.village}</div>
                        <div className="sys-pm-stock">{p.stock}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="sys-pm-cat-pill">{p.cat}</span>
                  </td>
                  <td>
                    <strong className="sys-pm-price">{p.price}</strong>
                  </td>
                  <td className="sys-pm-rating">
                    <Star size={14} fill="#cda846" color="#cda846"/> 
                    <strong>{p.rating}</strong> <span>({p.revCount})</span>
                  </td>
                  <td>
                    <span className={`sys-pm-status-pill status-${p.status === 'Hiển thị' ? 'active' : p.status === 'Chờ duyệt' ? 'pending' : 'hidden'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="sys-pm-actions">
                      <button className="sys-pm-btn-view" title="Xem chi tiết">
                        <Eye size={16} />
                      </button>
                      
                      {p.status === 'Hiển thị' && (
                        <button className="sys-pm-btn-toggle on" title="Ẩn sản phẩm">
                          <ToggleRight size={20} />
                        </button>
                      )}
                      
                      {p.status === 'Ẩn' && (
                        <button className="sys-pm-btn-toggle off" title="Hiện sản phẩm">
                          <ToggleLeft size={20} />
                        </button>
                      )}

                      {p.status === 'Chờ duyệt' && (
                        <div className="sys-pm-approve-actions">
                          <button className="btn-approve" title="Duyệt"><Check size={16} /></button>
                          <button className="btn-reject" title="Từ chối"><X size={16} /></button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}