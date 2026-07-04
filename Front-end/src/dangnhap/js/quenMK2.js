import React, { useState, useRef } from 'react';
import '../css/quenMK2.css';
import { MapPin, Mail, ArrowLeft, Info } from 'lucide-react';

export default function OTPVerificationPage({ setActiveTab }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    alert('Xác minh mã OTP thành công!');
    if (setActiveTab) setActiveTab('forgot-step3');
  };

  return (
    <div className="otp-container">
      {/* CỘT TRÁI: BƯỚC THỰC HIỆN */}
      <div className="otp-left">
        <div className="otp-left-content">
          <div className="otp-logo-box"><MapPin size={32} color="white" /></div>
          <h1 className="otp-title">Làng Nghề<br />Việt Nam</h1>
          <p className="otp-desc">Khôi phục quyền truy cập tài khoản của bạn</p>
          
          <div className="otp-steps">
            <div className="otp-step completed"><div className="step-check">✓</div> <span>Nhập email</span></div>
            <div className="otp-step active"><div className="step-circle">2</div> <span>Xác minh OTP</span></div>
            <div className="otp-step"><span>Đặt mật khẩu mới</span></div>
            <div className="otp-step"><span>Hoàn thành</span></div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: FORM NHẬP OTP */}
      <div className="otp-right">
        <div className="otp-form-wrapper">
          <span onClick={() => setActiveTab && setActiveTab('forgot-step1')} className="back-link" style={{ cursor: 'pointer' }}>
            <ArrowLeft size={16} /> Thay đổi email
          </span>
          
          <div className="otp-card">
            <div className="otp-icon-box"><Mail size={32} color="#2563eb" /></div>
            <h2 className="otp-form-title">Xác minh email</h2>
            <p className="otp-form-subtitle">Chúng tôi đã gửi mã OTP gồm <strong>6 chữ số</strong> đến email của bạn. Mã có hiệu lực trong <strong>1:58</strong>.</p>

            <div className="otp-demo-box">
              <Info size={18} />
              <p><strong>Demo:</strong> Nhập bất kỳ 6 chữ số nào để tiếp tục. Ví dụ: <strong>123456</strong></p>
            </div>

            <p className="otp-label">Nhập mã OTP</p>
            <div className="otp-inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            <p className="resend-text">Gửi lại sau <strong>1:58</strong></p>
            <button className="btn-verify" onClick={handleVerify}>Xác nhận mã OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
}