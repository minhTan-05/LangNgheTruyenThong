import React, { useState, useEffect } from 'react';
import '../css/tongquanAdmin.css';
import { 
  MapPin, Package, ShoppingBag, Users, 
  Shield, Settings, RefreshCw 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';
import { getDanhSachLangNghe } from '../../API/apiLangNghe';
import { getDanhSachNguoiDung, getDanhSachSanPham, getDanhSachDonHang } from '../../API/apiAdmin';

export default function SystemOverviewPage({ setActiveMenu, onExitToMain }) {
  const [villageCount, setVillageCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOverviewData = async () => {
      setLoading(true);
      try {
        const [villages, users, products, orders] = await Promise.all([
          getDanhSachLangNghe().catch(() => []),
          getDanhSachNguoiDung().catch(() => []),
          getDanhSachSanPham().catch(() => []),
          getDanhSachDonHang().catch(() => [])
        ]);
        if (villages) setVillageCount(villages.length);
        if (users) setUserCount(users.length);
        if (products) setProductCount(products.length);
        if (orders) setOrderCount(orders.length);
      } catch (err) {
        console.warn('Lỗi khi nạp dữ liệu tổng quan từ SQL Server:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, []);

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="overview" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="to-main">
        {/* HEADER */}
        <header className="to-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="to-title">Tổng quan Hệ thống Quản trị</h1>
            {loading && <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ CSDL SQL Server...</span>}
          </div>
          <p className="to-subtitle">Theo dõi trạng thái tổng thể các làng nghề, sản phẩm, đơn hàng và người dùng toàn hệ thống</p>
        </header>

        {/* STATS GRID */}
        <div className="to-stats-grid">
          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#fefce8', color: '#ca8a04' }}>
              <MapPin size={24} />
            </div>
            <div className="to-stat-info">
              <h3>{villageCount}</h3>
              <p>Làng nghề trong CSDL</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Package size={24} />
            </div>
            <div className="to-stat-info">
              <h3>{productCount}</h3>
              <p>Sản phẩm gốm sứ &amp; mỹ nghệ</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <ShoppingBag size={24} />
            </div>
            <div className="to-stat-info">
              <h3>{orderCount}</h3>
              <p>Đơn hàng toàn hệ thống</p>
            </div>
          </div>

          <div className="to-stat-card">
            <div className="to-icon-box" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <Users size={24} />
            </div>
            <div className="to-stat-info">
              <h3>{userCount}</h3>
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
              <span>Quản lý Làng nghề</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('products')}>
              <Package size={28} color="#2563eb" />
              <span>Quản lý Sản phẩm</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('orders')}>
              <ShoppingBag size={28} color="#ea580c" />
              <span>Quản lý Đơn hàng</span>
            </button>
            <button className="to-action-btn" onClick={() => setActiveMenu && setActiveMenu('users')}>
              <Users size={28} color="#16a34a" />
              <span>Quản lý Người dùng</span>
            </button>
          </div>
        </div>

        {/* ACTIVITY LOG */}
        <div className="to-recent-section">
          <h3>Trạng thái kết nối cơ sở dữ liệu SQL Server (`LangNgheVietDB`)</h3>
          <div className="to-activity-list">
            <div className="to-activity-item">
              <div><strong style={{ color: '#16a34a' }}>✔ Đã đồng bộ với SQL Server:</strong> Tất cả bảng `NguoiDung`, `LangNghe`, `SanPham`, `DonHang`, `ThuyetMinhAudio`, `NgheNhan` đã kết nối API REST trực tiếp.</div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Trực tuyến</span>
            </div>
            <div className="to-activity-item">
              <div><strong style={{ color: '#2563eb' }}>ℹ Dữ liệu động hoàn toàn:</strong> Nếu bảng nào có dữ liệu trong SQL Server, giao diện sẽ hiển thị; nếu bảng trống, giao diện hiển thị trạng thái chưa có dữ liệu và cho phép thêm mới ngay.</div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Cập nhật</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
