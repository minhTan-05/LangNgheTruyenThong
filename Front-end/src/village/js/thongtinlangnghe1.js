import React, { useState, useEffect } from 'react';
import '../css/thongtinlangnghe1.css';
import { Save, Check, RefreshCw } from 'lucide-react';
import { getDanhSachLangNghe, capNhatLangNghe } from '../../API/apiLangNghe';

export default function ThongTinLangNghe1() {
  const [villageData, setVillageData] = useState(null);
  const [name, setName] = useState('');
  const [history, setHistory] = useState('');
  const [highlights, setHighlights] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [villageId, setVillageId] = useState(1);

  useEffect(() => {
    const loadVillageData = async () => {
      setLoading(true);
      try {
        const list = await getDanhSachLangNghe();
        if (list && list.length > 0) {
          const firstVillage = list[0];
          setVillageData(firstVillage);
          const id = firstVillage.maLangNghe || firstVillage.MaLangNghe || 1;
          setVillageId(id);
          setName(firstVillage.tenLangNghe || firstVillage.TenLangNghe || '');
          setHistory(firstVillage.lichSuHinhThanh || firstVillage.LichSuHinhThanh || '');
          setHighlights(firstVillage.gioiThieuNgan || firstVillage.GioiThieuNgan || '');
        } else {
          setName('');
          setHistory('');
          setHighlights('');
        }
      } catch (err) {
        console.warn('Lỗi kết nối khi nạp thông tin làng nghề từ SQL Server:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVillageData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...(villageData || {}),
        MaLangNghe: villageId,
        TenLangNghe: name,
        LichSuHinhThanh: history,
        GioiThieuNgan: highlights,
        DuongDanSlug: villageData?.duongDanSlug || villageData?.DuongDanSlug || 'lang-nghe-viet',
        TinhThanh: villageData?.tinhThanh || villageData?.TinhThanh || 'Hà Nội',
        DiaChiCuThe: villageData?.diaChiCuThe || villageData?.DiaChiCuThe || '',
        ViDo: villageData?.viDo ?? villageData?.ViDo ?? 20.0,
        KinhDo: villageData?.kinhDo ?? villageData?.KinhDo ?? 105.0
      };

      await capNhatLangNghe(villageId, updatedData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Lỗi khi cập nhật SQL Server:', err);
      alert('Không thể cập nhật thông tin lên SQL Server. Vui lòng kiểm tra kết nối API.');
    }
  };

  return (
    <div className="vl1-main">
      <div className="vl1-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <h1 className="vl1-title">Giới thiệu &amp; Lịch sử Làng nghề (Phần 1)</h1>
            <p className="vl1-subtitle">Quản lý nội dung giới thiệu tổng quát, nguồn gốc và lịch sử phát triển của làng nghề trong CSDL</p>
          </div>
          {loading && <span style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}><RefreshCw className="spin" size={16}/> Đang nạp từ SQL Server...</span>}
        </div>
      </div>

      <div className="vl1-card">
        <form onSubmit={handleSave}>
          <div className="vl1-form-group">
            <label>Tên Làng nghề truyền thống</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nhập tên làng nghề..." 
              required 
            />
          </div>

          <div className="vl1-form-group">
            <label>Lịch sử hình thành &amp; phát triển</label>
            <textarea 
              rows="6" 
              value={history} 
              onChange={(e) => setHistory(e.target.value)} 
              placeholder="Nhập lịch sử làng nghề..." 
              required 
            />
          </div>

          <div className="vl1-form-group">
            <label>Đặc trưng tinh hoa sản phẩm (Cách nhau bởi dấu phẩy)</label>
            <input 
              type="text" 
              value={highlights} 
              onChange={(e) => setHighlights(e.target.value)} 
              placeholder="Ví dụ: Gốm men rạn cổ, Gốm men ngọc..." 
            />
          </div>

          <button type="submit" className="vl1-btn-save">
            {saved ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Check size={18} /> Đã cập nhật thông tin vào SQL Server thành công!
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Save size={18} /> Lưu thay đổi lên SQL Server
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
