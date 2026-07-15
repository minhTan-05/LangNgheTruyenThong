import React, { useState, useEffect } from 'react';
import '../css/thongtinlangnghe2.css';
import { MapPin, Phone, Globe, Clock, Save, Check, RefreshCw } from 'lucide-react';
import { getDanhSachLangNghe, capNhatLangNghe } from '../../API/apiLangNghe';

export default function ThongTinLangNghe2() {
  const [villageData, setVillageData] = useState(null);
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState('');
  const [phone, setPhone] = useState('024 3874 0123');
  const [website, setWebsite] = useState('https://langngheviet.vn');
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
          setVillageData(firstVillage);
          const id = firstVillage.maLangNghe || firstVillage.MaLangNghe || 1;
          setVillageId(id);
          setAddress(firstVillage.diaChiCuThe || firstVillage.DiaChiCuThe || '');
          if (firstVillage.viDo && firstVillage.kinhDo) {
            setCoords(`${firstVillage.viDo}, ${firstVillage.kinhDo}`);
          } else if (firstVillage.ViDo && firstVillage.KinhDo) {
            setCoords(`${firstVillage.ViDo}, ${firstVillage.KinhDo}`);
          } else {
            setCoords('20.9716, 105.9224');
          }
        } else {
          setAddress('');
          setCoords('');
        }
      } catch (err) {
        console.warn('Lỗi kết nối khi nạp tọa độ từ SQL Server:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCoordsFromDB();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let lat = 20.9716;
      let lng = 105.9224;
      if (coords && coords.includes(',')) {
        const parts = coords.split(',').map(s => parseFloat(s.trim()));
        if (!isNaN(parts[0]) && !isNaN(parts[1])) {
          lat = parts[0];
          lng = parts[1];
        }
      }

      const updatedData = {
        ...(villageData || {}),
        MaLangNghe: villageId,
        TenLangNghe: villageData?.tenLangNghe || villageData?.TenLangNghe || 'Làng nghề truyền thống',
        LichSuHinhThanh: villageData?.lichSuHinhThanh || villageData?.LichSuHinhThanh || '',
        GioiThieuNgan: villageData?.gioiThieuNgan || villageData?.GioiThieuNgan || '',
        DuongDanSlug: villageData?.duongDanSlug || villageData?.DuongDanSlug || 'lang-nghe-viet',
        TinhThanh: villageData?.tinhThanh || villageData?.TinhThanh || 'Hà Nội',
        DiaChiCuThe: address,
        ViDo: lat,
        KinhDo: lng
      };

      await capNhatLangNghe(villageId, updatedData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Lỗi khi cập nhật tọa độ SQL Server:', err);
      alert('Không thể cập nhật địa chỉ lên SQL Server. Vui lòng kiểm tra kết nối API.');
    }
  };

  return (
    <div className="vl2-main">
      <div className="vl2-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ cụ thể..." required />
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
              <label>Tọa độ GPS (Vĩ độ, Kinh độ - VD: 20.9716, 105.9224)</label>
              <input type="text" value={coords} onChange={(e) => setCoords(e.target.value)} placeholder="Nhập vĩ độ, kinh độ..." required />
            </div>

            <div className="vl2-map-box">
              <span>Bản đồ số định vị Làng nghề theo tọa độ: {coords || 'Chưa định vị'}</span>
            </div>

            <button type="submit" className="vl2-btn-save">
              {saved ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={18} /> Đã cập nhật tọa độ vào SQL Server thành công!
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={18} /> Cập nhật vị trí &amp; Liên lạc lên SQL Server
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
