import React, { useState } from 'react';
import SystemOverviewPage from './tongquanAdmin';
import SystemVillageManagerPage from './quanlylangnghe';
import SystemProductManagerPage from './quanlySanpham';
import SystemOrderManagerPage from './quanlyDonhang';
import SystemUserManagerPage from './quanlynguoidung';
import SystemResourceManagerPage from './quanlytainguyen';
import SystemAnalyticsPage from './thongkehethong';
import RolePermissionPage from './phanquyen';
import SystemSettingsPage from './caidat';

export default function AdminPortal({ setActiveTab }) {
  const [activeMenu, setActiveMenu] = useState('overview');

  const handleExitToMain = () => {
    if (setActiveTab) {
      setActiveTab('home');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {activeMenu === 'overview' && <SystemOverviewPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'villages' && <SystemVillageManagerPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'products' && <SystemProductManagerPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'orders' && <SystemOrderManagerPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'users' && <SystemUserManagerPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'resources' && <SystemResourceManagerPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'analytics' && <SystemAnalyticsPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'permissions' && <RolePermissionPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
      {activeMenu === 'settings' && <SystemSettingsPage setActiveMenu={setActiveMenu} onExitToMain={handleExitToMain} />}
    </div>
  );
}
