import React from 'react';
import '../css/slidebarAdmin.css';
import { 
  LayoutDashboard, MapPin, Package, ShoppingBag, 
  Users, FolderKanban, BarChart3, Shield, Settings, LogOut 
} from 'lucide-react';

export default function SlidebarAdmin({ activeMenu, setActiveMenu, onExitToMain }) {
  const menuItems = [
    { id: 'overview', label: 'Tổng quan hệ thống', icon: LayoutDashboard },
    { id: 'villages', label: 'Quản lý làng nghề', icon: MapPin },
    { id: 'products', label: 'Quản lý sản phẩm', icon: Package },
    { id: 'orders', label: 'Quản lý đơn hàng', icon: ShoppingBag },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'resources', label: 'Quản lý tài nguyên', icon: FolderKanban },
    { id: 'analytics', label: 'Thống kê hệ thống', icon: BarChart3 },
    { id: 'permissions', label: 'Phân quyền vai trò', icon: Shield },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings },
  ];

  return (
    <aside className="sys-admin-sidebar">
      <div className="sys-sidebar-header">
        <h2 className="sys-title">Làng Nghề Việt Nam</h2>
        <p className="sys-user-name">System Admin</p>
        <span className="sys-role-badge">Quản trị viên</span>
      </div>

      <nav className="sys-sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`sys-nav-item ${(activeMenu === item.id || (item.id === 'analytics' && activeMenu === 'stats')) ? 'active' : ''}`}
              onClick={() => setActiveMenu && setActiveMenu(item.id)}
            >
              <span className="sys-nav-icon">
                <IconComponent size={18} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sys-sidebar-footer">
        <button className="sys-nav-item logout" onClick={onExitToMain}>
          <span className="sys-nav-icon">
            <LogOut size={18} />
          </span>
          <span>Về Trang Khách</span>
        </button>
      </div>
    </aside>
  );
}
