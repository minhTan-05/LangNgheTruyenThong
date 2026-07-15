import React, { useState } from 'react';
import '../css/dangky.css';
import { MapPin, Eye, EyeOff, User, Store, Check, ArrowRight } from 'lucide-react';

export default function RegisterPage({ setActiveTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('customer'); // 'customer' hoặc 'manager'

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
    if (setActiveTab) setActiveTab('login');
  };

  return (
    <div className="register-container">
      
      {/* CỘT TRÁI: HÌNH ẢNH & THÔNG TIN */}
      <div className="register-left">
        <div className="register-left-overlay"></div>
        <div className="register-left-content">
          <div className="register-logo-box">
            <MapPin size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="register-title">Tham gia cùng<br />chúng tôi</h1>
          <p className="register-desc">
            Đăng ký tài khoản để khám phá, mua sắm và kết nối với các làng nghề truyền thống Việt Nam.
          </p>
          
          <ul className="register-benefits">
            <li><div className="check-circle"><Check size={14} strokeWidth={3} /></div> Khám phá 156+ làng nghề trên bản đồ</li>
            <li><div className="check-circle"><Check size={14} strokeWidth={3} /></div> Mua sản phẩm thủ công chính hãng</li>
            <li><div className="check-circle"><Check size={14} strokeWidth={3} /></div> Nghe audio guide bằng 5 ngôn ngữ</li>
            <li><div className="check-circle"><Check size={14} strokeWidth={3} /></div> Lưu danh sách yêu thích</li>
          </ul>
        </div>
      </div>

      {/* CỘT PHẢI: FORM ĐĂNG KÝ */}
      <div className="register-right">
        <div className="register-form-wrapper">
          <div className="register-card">
            <h2 className="form-title">Tạo tài khoản mới</h2>
            <p className="form-subtitle">Điền thông tin bên dưới để đăng ký nhanh.</p>

            {/* Role Selection */}
            <div className="role-selection">
              <span className="role-label-text">Bạn là:</span>
              <button 
                type="button" 
                className={`role-pill-btn ${selectedRole === 'customer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('customer')}
              >
                <User size={16} /> Khách hàng
              </button>
              <button 
                type="button" 
                className={`role-pill-btn ${selectedRole === 'manager' ? 'active' : ''}`}
                onClick={() => setSelectedRole('manager')}
              >
                <Store size={16} /> Quản lý Làng nghề
              </button>
            </div>

            {/* Form Inputs */}
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <div className="input-row">
                <div className="input-group">
                  <label>Họ và tên <span className="required">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" required />
                </div>
                <div className="input-group">
                  <label>Số điện thoại</label>
                  <input type="tel" placeholder="0912 345 678" />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Email <span className="required">*</span></label>
                <input type="email" placeholder="example@email.com" required />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Mật khẩu <span className="required">*</span></label>
                  <div className="password-wrapper">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      required
                    />
                    <button type="button" className="btn-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="input-group">
                  <label>Xác nhận mật khẩu <span className="required">*</span></label>
                  <div className="password-wrapper">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      required
                    />
                    <button type="button" className="btn-toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="checkbox-group">
                <label className="custom-checkbox-label">
                  <input type="checkbox" required />
                  <span className="checkbox-text">
                    Tôi đồng ý với <a href="#terms" onClick={(e)=>e.preventDefault()}>Điều khoản</a> & <a href="#privacy" onClick={(e)=>e.preventDefault()}>Chính sách bảo mật</a> <span className="required">*</span>
                  </span>
                </label>
                
                <label className="custom-checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-text">
                    Nhận thông tin khuyến mãi & tin tức làng nghề qua email
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Tạo tài khoản <ArrowRight size={16} />
              </button>
            </form>

            <p className="login-text">
              Đã có tài khoản? <a href="#login" onClick={(e) => { e.preventDefault(); if(setActiveTab) setActiveTab('login'); }}>Đăng nhập ngay</a>
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