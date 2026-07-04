import React, { useState } from 'react';
import '../css/thongtinlangnghe1.css';
import { Save, Check } from 'lucide-react';

export default function ThongTinLangNghe1() {
  const [name, setName] = useState('Làng Gốm Bát Tràng');
  const [history, setHistory] = useState('Làng gốm Bát Tràng hình thành từ thời nhà Lý (khoảng thế kỷ XIV), nằm bên bờ sông Hồng thuộc huyện Gia Lâm, Hà Nội. Trải qua hơn 700 năm phát triển, Bát Tràng đã trở thành biểu tượng tinh hoa của nghệ thuật gốm sứ truyền thống Việt Nam.');
  const [highlights, setHighlights] = useState('Gốm men rạn cổ, Gốm men ngọc, Lò bầu truyền thống, Khu chợ gốm sầm uất.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="vl1-main">
      <div className="vl1-header">
        <h1 className="vl1-title">Giới thiệu &amp; Lịch sử Làng nghề (Phần 1)</h1>
        <p className="vl1-subtitle">Quản lý nội dung giới thiệu tổng quát, nguồn gốc và lịch sử phát triển của làng nghề</p>
      </div>

      <div className="vl1-card">
        <form onSubmit={handleSave}>
          <div className="vl1-form-group">
            <label>Tên Làng nghề truyền thống</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="vl1-form-group">
            <label>Lịch sử hình thành &amp; phát triển</label>
            <textarea rows="6" value={history} onChange={(e) => setHistory(e.target.value)} required />
          </div>

          <div className="vl1-form-group">
            <label>Đặc trưng tinh hoa sản phẩm (Cách nhau bởi dấu phẩy)</label>
            <input type="text" value={highlights} onChange={(e) => setHighlights(e.target.value)} />
          </div>

          <button type="submit" className="vl1-btn-save">
            {saved ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Check size={18} /> Đã lưu thông tin thành công!
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Save size={18} /> Lưu thay đổi
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
