import React from 'react';
import '../css/quenMK4.css';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function PasswordSuccessPage({ setActiveTab }) {
  return (
    <div className="ps-container">
      {/* CỘT TRÁI */}
      <div className="ps-left">
        <div className="ps-left-content">
          <div className="ps-logo-box"><MapPin size={32} color="white" /></div>
          <h1 className="ps-title">Làng Nghề<br />Việt Nam</h1>
          <p className="ps-desc">Khôi phục quyền truy cập tài khoản của bạn</p>
          
          <div className="ps-steps">
            <div className="ps-step completed"><div className="step-check">✓</div> <span>Nhập email</span></div>
            <div className="ps-step completed"><div className="step-check">✓</div> <span>Xác minh OTP</span></div>
            <div className="ps-step completed"><div className="step-check">✓</div> <span>Đặt mật khẩu mới</span></div>
            <div className="ps-step active"><div className="step-circle">4</div> <span>Hoàn thành</span></div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="ps-right">
        <div className="ps-form-wrapper">
          <div className="ps-card">
            <div className="ps-icon-success">
              <CheckCircle2 size={64} color="#10b981" />
            </div>
            <h2 className="ps-form-title">Đặt lại mật khẩu thành công!</h2>
            <p className="ps-form-subtitle">
              Mật khẩu của tài khoản email đã được cập nhật thành công. Bạn có thể đăng nhập bằng mật khẩu mới.
            </p>

            <div className="ps-actions">
              <button className="btn-login" onClick={() => setActiveTab && setActiveTab('login')}>Đăng nhập ngay</button>
              <button className="btn-home" onClick={() => setActiveTab && setActiveTab('home')}>Quay lại trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}