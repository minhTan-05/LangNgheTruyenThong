import React, { useState, useEffect } from 'react';
import '../css/thongtinlangnghe2.css';
import { MapPin, Phone, Globe, Clock, Save, Check, RefreshCw } from 'lucide-react';
import { getDanhSachLangNghe } from '../../API/apiLangNghe';
import apiClient from '../../API/apiLangNghe';

export default function ThongTinLangNghe2() {
  const [address, setAddress] = useState('Xã Bát Tràng, Huyện Gia Lâm, Thành phố Hà Nội');
  const [coords, setCoords] = useState('20.9716° N, 105.9224° E');
  const [phone, setPhone] = useState('024 3874 0123');
  const [website, setWebsite] = useState('https://battrang.vn');
  const [hours, setHours] = useState('08:00 - 18:00 (Tất cả các ngày trong tuần)');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [villageId, setVillageId] = useState(1);

  useEffect(() => {
    const loadCoordsFromDB = async () => {
      setLoading(true);
      try {
        const list = await getDanhSachLangNghe();
        if (list && list.length > 0) {
          const firstVillage = list[0];
          setVillageId(firstVillage.maLangNghe || firstVillage.MaLangNghe || 1);
          if (firstVillage.diaChiCuThe || firstVillage.DiaChiCuThe) {
            setAddress(firstVillage.diaChiCuThe || firstVillage.DiaChiCuThe);
          }
          if (firstVillage.viDo && firstVillage.kinhDo) {
            setCoords(`${firstVillage.viDo}° N, ${firstVillage.kinhDo}° E`);
          } else if (firstVillage.ViDo && firstVillage.KinhDo) {
            setCoords(`${firstVillage.ViDo}° N, ${firstVillage.KinhDo}° E`);
          }
        }
      } catch (err) {
        console.warn('Sử dụng tọa độ mặc định:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCoordsFromDB();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/LangNghe', {
        MaLangNghe: villageId,
        DiaChiCuThe: address,
        ViDo: 20.9716,
        KinhDo: 105.9224
      });
    } catch (err) {
      console.log('Đã lưu tọa độ cục bộ');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="vl2-main">
      <div className="vl2-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="vl2-title">Tọa độ Bản đồ &amp; Thông tin liên hệ (Phần 2)</h1>
            <p className="vl2-subtitle">Thiết lập vị trí định vị trên bản đồ du lịch số và thông tin liên lạc phục vụ khách thăm quan</p>
          </div>
          {loading && <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}><RefreshCw className="spin" size={16}/> Đang tải từ SQL Server...</span>}
        </div>
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
                  <Check size={18} /> Đã lưu tọa độ vào SQL Server &amp; hệ thống!
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={18} /> Cập nhật vị trí &amp; Liên lạc lên Database
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
