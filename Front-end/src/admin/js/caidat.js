import React, { useState } from 'react';
import '../css/caidat.css';
import { 
  Globe, Mail, Shield, Server, Database, Bell, Save 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemSettingsPage({ setActiveMenu, onExitToMain }) {
  const [activeTab, setActiveTab] = useState('general');
  const [toggles, setToggles] = useState({
    allowRegister: true,
    requireEmailVerify: true,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="settings" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-set-main">
        {/* HEADER */}
        <header className="sys-set-header">
          <h1 className="sys-set-title">Cài đặt hệ thống</h1>
          <p className="sys-set-subtitle">Cấu hình và quản lý toàn bộ hệ thống</p>
        </header>

        {/* LAYOUT CÀI ĐẶT */}
        <div className="sys-set-layout">
          
          {/* CỘT TRÁI: TABS */}
          <aside className="sys-set-sidebar">
            <button 
              className={`sys-set-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Globe size={18} /> Cài đặt chung
            </button>
            <button 
              className={`sys-set-tab ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              <Mail size={18} /> Email & Thông báo
            </button>
            <button 
              className={`sys-set-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Bảo mật
            </button>
            <button 
              className={`sys-set-tab ${activeTab === 'system' ? 'active' : ''}`}
              onClick={() => setActiveTab('system')}
            >
              <Server size={18} /> Hệ thống
            </button>
            <button 
              className={`sys-set-tab ${activeTab === 'backup' ? 'active' : ''}`}
              onClick={() => setActiveTab('backup')}
            >
              <Database size={18} /> Backup & Phục hồi
            </button>
          </aside>

          {/* CỘT PHẢI: NỘI DUNG */}
          <div className="sys-set-content">
            
            {activeTab === 'general' && (
              <>
                {/* THÔNG TIN WEBSITE */}
                <div className="sys-set-card">
                  <div className="sys-set-card-header">
                    <Globe size={20} className="text-orange" />
                    <h3>Thông tin website</h3>
                  </div>
                  
                  <div className="sys-set-form">
                    <div className="sys-set-group full-width">
                      <label>TÊN WEBSITE</label>
                      <input type="text" defaultValue="Làng Nghề Việt Nam" />
                    </div>
                    
                    <div className="sys-set-group full-width">
                      <label>MÔ TẢ WEBSITE</label>
                      <textarea rows="3"></textarea>
                    </div>

                    <div className="sys-set-row">
                      <div className="sys-set-group">
                        <label>EMAIL LIÊN HỆ</label>
                        <input type="email" defaultValue="admin@langnghevietnam.vn" />
                      </div>
                      <div className="sys-set-group">
                        <label>SỐ ĐIỆN THOẠI</label>
                        <input type="text" defaultValue="024 1234 5678" />
                      </div>
                    </div>

                    <div className="sys-set-row">
                      <div className="sys-set-group">
                        <label>MÚI GIỜ</label>
                        <input type="text" defaultValue="" />
                      </div>
                      <div className="sys-set-group">
                        <label>KÍCH THƯỚC UPLOAD TỐI ĐA (MB)</label>
                        <input type="number" defaultValue="20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TÙY CHỌN NGƯỜI DÙNG */}
                <div className="sys-set-card">
                  <div className="sys-set-card-header">
                    <Bell size={20} className="text-orange" />
                    <h3>Tùy chọn người dùng</h3>
                  </div>

                  <div className="sys-set-toggles">
                    <div className="sys-set-toggle-item">
                      <div className="toggle-info">
                        <h4>Cho phép đăng ký tài khoản</h4>
                        <p>Người dùng có thể tự đăng ký tài khoản khách hàng</p>
                      </div>
                      <div 
                        className={`custom-toggle ${toggles.allowRegister ? 'on' : 'off'}`}
                        onClick={() => handleToggle('allowRegister')}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                    </div>

                    <div className="sys-set-toggle-item">
                      <div className="toggle-info">
                        <h4>Yêu cầu xác minh email</h4>
                        <p>Gửi email xác nhận khi đăng ký tài khoản mới</p>
                      </div>
                      <div 
                        className={`custom-toggle ${toggles.requireEmailVerify ? 'on' : 'off'}`}
                        onClick={() => handleToggle('requireEmailVerify')}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NÚT LƯU */}
                <button className="sys-set-btn-save">
                  <Save size={18} /> Lưu cài đặt
                </button>
              </>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}