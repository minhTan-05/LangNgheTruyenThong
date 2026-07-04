import React, { useState } from 'react';
import '../css/quenMK3.css';
import { MapPin, Eye, EyeOff, Lock } from 'lucide-react';

export default function ResetPasswordPage({ setActiveTab }) {
  const [password, setPassword] = useState('12345aA');
  const [showPassword, setShowPassword] = useState(false);

  // Giả lập kiểm tra độ mạnh
  const isLengthValid = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const handleReset = (e) => {
    e.preventDefault();
    alert('Mật khẩu mới đã được cập nhật!');
    if (setActiveTab) setActiveTab('forgot-step4');
  };

  return (
    <div className="rp-container">
      {/* CỘT TRÁI */}
      <div className="rp-left">
        <div className="rp-left-content">
          <div className="rp-logo-box"><MapPin size={32} color="white" /></div>
          <h1 className="rp-title">Làng Nghề<br />Việt Nam</h1>
          <p className="rp-desc">Khôi phục quyền truy cập tài khoản của bạn</p>
          
          <div className="rp-steps">
            <div className="rp-step completed"><div className="step-check">✓</div> <span>Nhập email</span></div>
            <div className="rp-step completed"><div className="step-check">✓</div> <span>Xác minh OTP</span></div>
            <div className="rp-step active"><div className="step-circle">3</div> <span>Đặt mật khẩu mới</span></div>
            <div className="rp-step"><span>Hoàn thành</span></div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="rp-right">
        <div className="rp-form-wrapper">
          <div className="rp-card">
            <div className="rp-icon-box"><Lock size={32} color="#b45309" /></div>
            <h2 className="rp-form-title">Đặt mật khẩu mới</h2>
            <p className="rp-form-subtitle">Tạo mật khẩu mạnh để bảo vệ tài khoản của bạn.</p>

            <form className="rp-form" onSubmit={handleReset}>
              <div className="input-group">
                <label>Mật khẩu mới <span className="required">*</span></label>
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="btn-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password Strength Meter */}
              <div className="strength-meter">
                <div className="strength-bar"><div className="fill" style={{width: '60%'}}></div></div>
                <span className="strength-label">Khá</span>
              </div>

              <div className="criteria-grid">
                <div className={`criterion ${isLengthValid ? 'valid' : ''}`}>
                  <div className="circle">{isLengthValid ? '✓' : '○'}</div> Ít nhất 8 ký tự
                </div>
                <div className={`criterion ${hasUpper ? 'valid' : ''}`}>
                  <div className="circle">{hasUpper ? '✓' : '○'}</div> Có chữ hoa (A-Z)
                </div>
                <div className={`criterion ${hasNumber ? 'valid' : ''}`}>
                  <div className="circle">{hasNumber ? '✓' : '○'}</div> Có chữ số (0-9)
                </div>
                <div className={`criterion ${hasSpecial ? 'valid' : ''}`}>
                  <div className="circle">{hasSpecial ? '✓' : '○'}</div> Có ký tự đặc biệt
                </div>
              </div>

              <div className="input-group">
                <label>Xác nhận mật khẩu <span className="required">*</span></label>
                <div className="password-wrapper">
                  <input type="password" placeholder="••••••••" required />
                  <button type="button" className="btn-toggle"><EyeOff size={18}/></button>
                </div>
              </div>

              <button type="submit" className="btn-submit">Đặt mật khẩu mới</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}