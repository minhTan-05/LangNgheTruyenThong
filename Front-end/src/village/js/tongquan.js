import React from 'react';
import '../css/tongquan.css';
import { 
  Package, Image as ImageIcon, Video, Volume2, 
  Eye, Star, ShoppingBag, BarChart3 
} from 'lucide-react';

export default function TongQuan({ setActiveSubTab }) {
  return (
    <div className="vo-main">
      <div className="vo-header">
        <h1 className="vo-title">Tổng quan Quản trị Làng Nghề</h1>
        <p className="vo-subtitle">Theo dõi số liệu thống kê, lượng truy cập du khách và truy cập nhanh chức năng</p>
      </div>

      <div className="vo-stats-grid">
        <div className="vo-stat-box">
          <div className="vo-stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Eye size={24} />
          </div>
          <div className="vo-stat-info">
            <h3>14,520</h3>
            <p>Lượt thăm quan</p>
          </div>
        </div>

        <div className="vo-stat-box">
          <div className="vo-stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <Package size={24} />
          </div>
          <div className="vo-stat-info">
            <h3>42</h3>
            <p>Sản phẩm gốm</p>
          </div>
        </div>

        <div className="vo-stat-box">
          <div className="vo-stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <Video size={24} />
          </div>
          <div className="vo-stat-info">
            <h3>18</h3>
            <p>Video &amp; Phóng sự</p>
          </div>
        </div>

        <div className="vo-stat-box">
          <div className="vo-stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
            <Star size={24} />
          </div>
          <div className="vo-stat-info">
            <h3>4.9 / 5</h3>
            <p>Đánh giá du khách</p>
          </div>
        </div>
      </div>

      <div className="vo-quick-actions">
        <h3>Truy cập nhanh (Quick Shortcuts)</h3>
        <div className="vo-actions-grid">
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('donhang')}>
            <ShoppingBag size={28} color="#ea580c" />
            <span>Duyệt Đơn hàng mới</span>
          </button>
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('thongke')}>
            <BarChart3 size={28} color="#cda846" />
            <span>Thống kê Doanh thu</span>
          </button>
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('sanpham')}>
            <Package size={28} color="#b45309" />
            <span>Thêm / Quản lý Sản phẩm</span>
          </button>
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('hinhanh')}>
            <ImageIcon size={28} color="#059669" />
            <span>Thư viện Ảnh Làng nghề</span>
          </button>
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('video')}>
            <Video size={28} color="#2563eb" />
            <span>Quản lý Video</span>
          </button>
          <button className="vo-action-btn" onClick={() => setActiveSubTab && setActiveSubTab('amthanh')}>
            <Volume2 size={28} color="#9333ea" />
            <span>Cập nhật Thuyết minh</span>
          </button>
        </div>
      </div>

      <div className="vo-section">
        <h3>Hoạt động gần đây của Làng nghề</h3>
        <div className="vo-activity-list">
          <div className="vo-activity-item">
            <div>
              <strong style={{ color: '#1e293b' }}>Cập nhật video mới:</strong> Quy trình nung gốm men ngọc truyền thống
            </div>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>2 giờ trước</span>
          </div>
          <div className="vo-activity-item">
            <div>
              <strong style={{ color: '#1e293b' }}>Thêm 5 sản phẩm mới:</strong> Bộ ấm chén men rạn cổ Bát Tràng
            </div>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Hôm qua</span>
          </div>
          <div className="vo-activity-item">
            <div>
              <strong style={{ color: '#1e293b' }}>Cập nhật thuyết minh audio:</strong> Lịch sử hình thành 700 năm Làng Gốm
            </div>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>3 ngày trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}
