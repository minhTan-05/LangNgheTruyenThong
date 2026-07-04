import React, { useState } from 'react';
import '../css/thongtinuser.css';
import { 
  Camera, User, Package, Heart, Shield, LogOut, 
  ChevronRight, Edit3, Mail, Phone, MapPin, ArrowLeft
} from 'lucide-react';
import ThongTinDonHang from './thontindonhang';
import ThongTinYeuThich from './thongtinyeuthich';

export default function ThongTinUser({ setActiveTab }) {
  const [activeTab, setActiveTabLocal] = useState('info');

  return (
    <div className="prof-wrapper">
      <main className="prof-container">
        
        <div 
          onClick={() => setActiveTab && setActiveTab('home')} 
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', marginBottom: '1.5rem', fontWeight: 500 }}
        >
          <ArrowLeft size={16} /> Quay lại Trang chủ
        </div>

        {/* --- BANNER --- */}
        <div className="prof-banner">
          <div className="prof-banner-left">
            <div className="prof-avatar-box">
              <span className="prof-avatar-text">VA</span>
              <button className="prof-camera-btn" onClick={() => alert('Đang mở camera/file tải ảnh đại diện...')}>
                <Camera size={14} />
              </button>
            </div>
            <div className="prof-user-details">
              <h2>Nguyễn Văn A</h2>
              <p>dh@gmail.com</p>
            </div>
          </div>

          <div className="prof-banner-right">
            <div className="prof-stat-item" onClick={() => setActiveTabLocal('orders')} style={{ cursor: 'pointer' }}>
              <h3>3</h3>
              <p>Đơn hàng</p>
            </div>
            <div className="prof-stat-item">
              <h3>2.950.000đ</h3>
              <p>Đã chi tiêu</p>
            </div>
            <div className="prof-stat-item" onClick={() => setActiveTabLocal('wishlist')} style={{ cursor: 'pointer' }}>
              <h3>2</h3>
              <p>Yêu thích</p>
            </div>
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="prof-body">
          
          {/* SIDEBAR BÊN TRÁI */}
          <aside className="prof-sidebar">
            <nav className="prof-sidebar-menu">
              <button 
                className={`prof-menu-item ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTabLocal('info')}
              >
                <div className="prof-menu-left">
                  <User size={18} /> <span>Thông tin</span>
                </div>
                <ChevronRight size={16} className="prof-arrow-icon" />
              </button>
              
              <button 
                className={`prof-menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTabLocal('orders')}
              >
                <div className="prof-menu-left">
                  <Package size={18} /> <span>Đơn hàng</span>
                </div>
                <ChevronRight size={16} className="prof-arrow-icon" />
              </button>

              <button 
                className={`prof-menu-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTabLocal('wishlist')}
              >
                <div className="prof-menu-left">
                  <Heart size={18} /> <span>Yêu thích</span>
                </div>
                <ChevronRight size={16} className="prof-arrow-icon" />
              </button>

              <button 
                className={`prof-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTabLocal('settings')}
              >
                <div className="prof-menu-left">
                  <Shield size={18} /> <span>Cài đặt</span>
                </div>
                <ChevronRight size={16} className="prof-arrow-icon" />
              </button>
            </nav>

            <div className="prof-sidebar-footer">
              <button className="prof-menu-item prof-logout-btn" onClick={() => { alert('Đã đăng xuất tài khoản!'); if(setActiveTab) setActiveTab('login'); }}>
                <div className="prof-menu-left">
                  <LogOut size={18} /> <span>Đăng xuất</span>
                </div>
              </button>
            </div>
          </aside>

          {/* NỘI DUNG FORM BÊN PHẢI */}
          <div className="prof-content">
            {activeTab === 'info' && (
              <>
                <div className="prof-content-header">
                  <h2>Thông tin cá nhân</h2>
                  <button className="prof-btn-edit" onClick={() => alert('Chế độ chỉnh sửa thông tin đã bật!')}>
                    <Edit3 size={16} /> Chỉnh sửa
                  </button>
                </div>

                <form className="prof-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="prof-form-group prof-full-width">
                    <label>HỌ VÀ TÊN</label>
                    <div className="prof-input-wrapper">
                      <User size={16} className="prof-input-icon" />
                      <input type="text" defaultValue="Nguyễn Văn A" readOnly />
                    </div>
                  </div>

                  <div className="prof-form-row">
                    <div className="prof-form-group prof-half-width">
                      <label>EMAIL</label>
                      <div className="prof-input-wrapper">
                        <Mail size={16} className="prof-input-icon" />
                        <input type="email" defaultValue="dh@gmail.com" readOnly />
                      </div>
                    </div>
                    <div className="prof-form-group prof-half-width">
                      <label>SỐ ĐIỆN THOẠI</label>
                      <div className="prof-input-wrapper">
                        <Phone size={16} className="prof-input-icon" />
                        <input type="text" defaultValue="0912 345 678" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="prof-form-row">
                    <div className="prof-form-group prof-half-width">
                      <label>NGÀY SINH</label>
                      <div className="prof-input-wrapper">
                        <input type="text" defaultValue="15/08/2004" readOnly />
                      </div>
                    </div>
                    <div className="prof-form-group prof-half-width">
                      <label>GIỚI TÍNH</label>
                      <div className="prof-input-wrapper">
                        <input type="text" defaultValue="Nam" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="prof-form-group prof-full-width">
                    <label>ĐỊA CHỈ GIAO HÀNG</label>
                    <div className="prof-input-wrapper">
                      <MapPin size={16} className="prof-input-icon" />
                      <input type="text" defaultValue="123 Đường Láng, Đống Đa, Hà Nội" readOnly />
                    </div>
                  </div>

                  <div className="prof-form-group prof-half-width">
                    <label>TỈNH/THÀNH PHỐ</label>
                    <div className="prof-input-wrapper">
                      <input type="text" defaultValue="Hà Nội" readOnly />
                    </div>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Lịch sử đơn hàng</h2>
                <ThongTinDonHang setActiveTab={setActiveTab} />
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Sản phẩm yêu thích</h2>
                <ThongTinYeuThich setActiveTab={setActiveTab} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Cài đặt tài khoản</h2>
                <p style={{ color: '#6b7280' }}>Chức năng đổi mật khẩu và bảo mật hai lớp đang được cập nhật...</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}