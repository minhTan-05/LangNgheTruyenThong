import React from 'react';
import '../css/quenMK1.css';
import { MapPin, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage({ setActiveTab }) {
  const handleSendEmail = (e) => {
    e.preventDefault();
    alert('Mã xác minh OTP đã được gửi về email của bạn!');
    if (setActiveTab) setActiveTab('forgot-step2');
  };

  return (
    <div className="fp-container">
      
      {/* CỘT TRÁI: BƯỚC THỰC HIỆN */}
      <div className="fp-left">
        <div className="fp-left-content">
          <div className="fp-logo-box">
            <MapPin size={32} color="white" />
          </div>
          <h1 className="fp-title">Làng Nghề<br />Việt Nam</h1>
          <p className="fp-desc">Khôi phục quyền truy cập tài khoản của bạn</p>
          
          <div className="fp-steps">
            {[
              { id: 1, label: 'Nhập email' },
              { id: 2, label: 'Xác minh OTP' },
              { id: 3, label: 'Đặt mật khẩu mới' },
              { id: 4, label: 'Hoàn thành' }
            ].map((step) => (
              <div key={step.id} className={`fp-step ${step.id === 1 ? 'active' : ''}`}>
                <div className="step-circle">{step.id}</div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: FORM NHẬP EMAIL */}
      <div className="fp-right">
        <div className="fp-form-wrapper">
          <span onClick={() => setActiveTab && setActiveTab('login')} className="back-login-link" style={{ cursor: 'pointer' }}>
            <ArrowLeft size={16} /> Quay lại đăng nhập
          </span>
          
          <div className="fp-card">
            <div className="fp-icon-mail">
              <Mail size={32} color="#cda846" />
            </div>
            <h2 className="fp-form-title">Quên mật khẩu?</h2>
            <p className="fp-form-subtitle">Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi mã xác minh OTP về email của bạn.</p>

            <form className="fp-form" onSubmit={handleSendEmail}>
              <div className="input-group">
                <label>Địa chỉ email</label>
                <input type="email" placeholder="example@email.com" required />
              </div>

              <button type="submit" className="btn-send">Gửi mã xác minh</button>
            </form>

            <p className="login-text">
              Nhớ mật khẩu rồi? <a href="#login" onClick={(e) => { e.preventDefault(); if(setActiveTab) setActiveTab('login'); }}>Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}