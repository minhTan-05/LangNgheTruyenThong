import React from 'react';
import '../css/tongquanAdmin.css';
import { 
  MapPin, Package, ShoppingBag, Users, 
  Shield, Settings 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemOverviewPage({ setActiveMenu, onExitToMain }) {
  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="overview" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="to-main">
        {/* HEADER */}
        <header className="to-header">
          <h1 className="to-title">Tổng quan Hệ thống Quản trị</h1>
          <p className="to-subtitle">Theo dõi trạng thái tổng thể các làng nghề, sản phẩm và người dùng toàn hệ thống</p>
        </header>

        {/* STATS GRID */}
        <div className="to-stats-grid">
          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#fefce8', color: '#ca8a04' }}>
              <MapPin size={24} />
            </div>
            <div className="to-stat-info">
              <h3>6</h3>
              <p>Làng nghề hệ thống</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Package size={24} />
            </div>
            <div className="to-stat-info">
              <h3>148</h3>
              <p>Sản phẩm gốm sứ &amp; mỹ nghệ</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <ShoppingBag size={24} />
            </div>
            <div className="to-stat-info">
              <h3>8</h3>
              <p>Đơn hàng toàn hệ thống</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <Users size={24} />
            </div>
            <div className="to-stat-info">
              <h3>1,240</h3>
              <p>Tài khoản người dùng</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="to-quick-actions">
          <h3>Điều hướng nhanh (Quick Actions)</h3>
          <div className="to-actions-grid">
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('villages')}>
              <MapPin size={28} color="#ca8a04" />
              <span>Duyệt Làng nghề mới</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('orders')}>
              <ShoppingBag size={28} color="#ea580c" />
              <span>Quản lý Đơn hàng</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('permissions')}>
              <Shield size={28} color="#9333ea" />
              <span>Phân quyền Hệ thống</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('settings')}>
              <Settings size={28} color="#4b5563" />
              <span>Cài đặt chung</span>
            </button>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="to-recent-section">
          <h3>Nhật ký hoạt động hệ thống gần đây</h3>
          <div className="to-activity-list">
            <div className="to-activity-item">
              <div><strong style={{ color: '#1f2937' }}>Làng gốm Bát Tràng:</strong> Thêm 5 sản phẩm mới vào danh mục</div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>10 phút trước</span>
            </div>
            <div className="to-activity-item">
              <div><strong style={{ color: '#1f2937' }}>Đơn hàng mới #SYS-004:</strong> Phạm Thị Dung đặt mua tượng gốm trị giá 2.500.000đ</div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>1 giờ trước</span>
            </div>
            <div className="to-activity-item">
              <div><strong style={{ color: '#1f2937' }}>Tài khoản mới:</strong> Nguyễn Văn An đăng ký vai trò Quản lý làng nghề</div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Hôm qua</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
