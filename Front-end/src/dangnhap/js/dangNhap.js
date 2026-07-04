import React, { useState } from 'react';
import '../css/dangNhap.css';
import { MapPin, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage({ setActiveTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Khách hàng');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hàm hỗ trợ điền nhanh tài khoản demo
  const handleDemoClick = (roleType) => {
    if (roleType === 'Khách hàng') {
      setRole('Khách hàng');
      setEmail('customer@email.com');
      setPassword('123456');
    } else if (roleType === 'Quản lý LN') {
      setRole('Quản lý Làng nghề');
      setEmail('manager@email.com');
      setPassword('123456');
    } else if (roleType === 'Admin') {
      setRole('Quản trị viên');
      setEmail('admin@email.com');
      setPassword('123456');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }
    alert(`Đăng nhập thành công với vai trò: ${role || 'Khách hàng'}!`);
    if (setActiveTab) {
      if (role === 'Quản lý Làng nghề' || role === 'Quản lý LN') {
        setActiveTab('village-portal');
      } else if (role === 'Quản trị viên' || role === 'Admin') {
        setActiveTab('admin-portal');
      } else {
        setActiveTab('profile');
      }
    }
  };

  return (
    <div className="login-container">
      
      {/* CỘT TRÁI: HÌNH ẢNH & THÔNG TIN */}
      <div className="login-left">
        <div className="login-left-overlay"></div>
        <div className="login-left-content">
          <div className="login-logo-box">
            <MapPin size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="login-title">Làng Nghề<br />Việt Nam</h1>
          <p className="login-desc">
            Khám phá và kết nối với hàng trăm làng nghề truyền thống trên khắp đất nước Việt Nam
          </p>
          
          <div className="login-stats">
            <div className="login-stat-box">
              <h3>156+</h3>
              <p>Làng nghề</p>
            </div>
            <div className="login-stat-box">
              <h3>54K+</h3>
              <p>Sản phẩm</p>
            </div>
            <div className="login-stat-box">
              <h3>1.2M+</h3>
              <p>Lượt xem</p>
            </div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: FORM ĐĂNG NHẬP */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="login-card">
            <h2 className="form-title">Đăng nhập</h2>
            <p className="form-subtitle">Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.</p>

            {/* Tài khoản Demo Box */}
            <div className="demo-accounts-box">
              <span className="demo-label">TÀI KHOẢN DEMO</span>
              <div className="demo-pills">
                <button type="button" className="demo-pill pill-white" onClick={() => handleDemoClick('Khách hàng')}>Khách hàng</button>
                <button type="button" className="demo-pill pill-blue" onClick={() => handleDemoClick('Quản lý LN')}>Quản lý LN</button>
                <button type="button" className="demo-pill pill-purple" onClick={() => handleDemoClick('Admin')}>Admin</button>
              </div>
            </div>

            {/* Form Inputs */}
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <label>Vai trò</label>
                <input 
                  type="text" 
                  placeholder="Chọn vai trò..." 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="example@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Mật khẩu</label>
                  <a href="#forgot" className="forgot-password" onClick={(e) => { e.preventDefault(); if(setActiveTab) setActiveTab('forgot-step1'); }}>Quên mật khẩu?</a>
                </div>
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="btn-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="remember-me">
                <input type="checkbox" /> Ghi nhớ đăng nhập
              </label>

              <button type="submit" className="btn-submit">
                <LogIn size={18} /> Đăng nhập
              </button>
            </form>

            {/* Divider & Register Link */}
            <div className="form-divider"><span>hoặc</span></div>
            <p className="register-text">
              Chưa có tài khoản? <a href="#register" onClick={(e) => { e.preventDefault(); if(setActiveTab) setActiveTab('register'); }}>Đăng ký ngay &gt;</a>
            </p>
          </div>

          <span onClick={() => setActiveTab && setActiveTab('home')} className="back-home-link" style={{ cursor: 'pointer' }}>
            &larr; Quay lại trang chủ
          </span>
        </div>
      </div>
    </div>
  );
}