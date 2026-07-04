import React, { useState } from 'react';
import '../css/thongtinlangnghe2.css';
import { MapPin, Phone, Globe, Clock, Save, Check } from 'lucide-react';

export default function ThongTinLangNghe2() {
  const [address, setAddress] = useState('Xã Bát Tràng, Huyện Gia Lâm, Thành phố Hà Nội');
  const [coords, setCoords] = useState('20.9788° N, 105.9149° E');
  const [phone, setPhone] = useState('024 3874 0123');
  const [website, setWebsite] = useState('https://battrang.vn');
  const [hours, setHours] = useState('08:00 - 18:00 (Tất cả các ngày trong tuần)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="vl2-main">
      <div className="vl2-header">
        <h1 className="vl2-title">Tọa độ Bản đồ &amp; Thông tin liên hệ (Phần 2)</h1>
        <p className="vl2-subtitle">Thiết lập vị trí định vị trên bản đồ du lịch số và thông tin liên lạc phục vụ khách thăm quan</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="vl2-grid">
          <div className="vl2-card">
            <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '1.25rem' }}>Thông tin địa chỉ &amp; Liên hệ</h3>
            <div className="vl2-form-group">
              <label><MapPin size={14} style={{ display: 'inline', marginRight: 4 }}/> Địa chỉ chính thức</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className="vl2-form-group">
              <label><Phone size={14} style={{ display: 'inline', marginRight: 4 }}/> Số điện thoại liên hệ ban quản lý</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="vl2-form-group">
              <label><Globe size={14} style={{ display: 'inline', marginRight: 4 }}/> Trang web / Cổng thông tin</label>
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div className="vl2-form-group">
              <label><Clock size={14} style={{ display: 'inline', marginRight: 4 }}/> Giờ mở cửa đón du khách</label>
              <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} />
            </div>
          </div>

          <div className="vl2-card">
            <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '1.25rem' }}>Tọa độ GPS &amp; Bản đồ số</h3>
            <div className="vl2-form-group">
              <label>Tọa độ GPS (Kinh độ, Vĩ độ)</label>
              <input type="text" value={coords} onChange={(e) => setCoords(e.target.value)} required />
            </div>

            <div className="vl2-map-box">
              <span>Bản đồ số định vị Làng gốm Bát Tràng ({coords})</span>
            </div>

            <button type="submit" className="vl2-btn-save">
              {saved ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={18} /> Đã lưu tọa độ &amp; liên hệ!
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={18} /> Cập nhật vị trí &amp; Liên lạc
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
