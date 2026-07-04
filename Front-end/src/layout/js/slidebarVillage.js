import React from 'react';
import '../css/slidebarVillage.css';
import { 
  LayoutDashboard, FileText, MapPin, Package, 
  Image as ImageIcon, Video, Volume2, ArrowLeft,
  ShoppingBag, BarChart3
} from 'lucide-react';

export default function SlidebarVillage({ activeSubTab, setActiveSubTab, onExitToMain }) {
  const menuItems = [
    { id: 'tongquan', label: 'Tổng quan Làng nghề', icon: LayoutDashboard },
    { id: 'donhang', label: 'Quản lý Đơn hàng', icon: ShoppingBag },
    { id: 'sanpham', label: 'Quản lý Sản phẩm', icon: Package },
    { id: 'thongke', label: 'Thống kê Doanh thu', icon: BarChart3 },
    { id: 'thongtin1', label: 'Giới thiệu & Lịch sử', icon: FileText },
    { id: 'thongtin2', label: 'Tọa độ & Bản đồ', icon: MapPin },
    { id: 'hinhanh', label: 'Thư viện Hình ảnh', icon: ImageIcon },
    { id: 'video', label: 'Quản lý Video', icon: Video },
    { id: 'amthanh', label: 'Thuyết minh Audio', icon: Volume2 },
  ];

  return (
    <aside className="village-sidebar">
      <div className="vs-header">
        <div className="vs-logo-icon">BT</div>
        <div className="vs-title">
          <h2>Làng Gốm Bát Tràng</h2>
          <p>Portal Quản Trị Làng Nghề</p>
        </div>
      </div>

      <nav className="vs-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`vs-menu-item ${activeSubTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(item.id)}
            >
              <IconComponent size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="vs-footer">
        <button className="vs-back-btn" onClick={onExitToMain}>
          <ArrowLeft size={18} />
          <span>Về Trang Khách (User)</span>
        </button>
      </div>
    </aside>
  );
}
