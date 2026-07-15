import React, { useState, useEffect } from 'react';
import '../css/quanlyamthanh.css';
import { Plus, Volume2, Play, Trash2, RefreshCw, X } from 'lucide-react';
import { getDanhSachAudio, themAudio, xoaAudio } from '../../API/apiAdmin';

export default function QuanLyAmThanh() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tieuDe, setTieuDe] = useState('');
  const [thoiLuongGiay, setThoiLuongGiay] = useState('300');
  const [maNgonNgu, setMaNgonNgu] = useState('Tiếng Việt');
  const [duongDanAudio, setDuongDanAudio] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

  const fetchAudios = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachAudio();
      if (data && Array.isArray(data)) {
        setAudios(data);
      } else {
        setAudios([]);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp danh sách âm thanh từ SQL Server:', err);
      setAudios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  const handleAddAudio = async (e) => {
    e.preventDefault();
    try {
      const newAudio = {
        MaLangNghe: 1, // Mặc định Làng gốm Bát Tràng
        TieuDe: tieuDe,
        DuongDanAudio: duongDanAudio,
        ThoiLuongGiay: parseInt(thoiLuongGiay, 10) || 300,
        MaNgonNgu: maNgonNgu,
        NoiDungVaniBan: `Thuyết minh âm thanh: ${tieuDe}`
      };

      await themAudio(newAudio);
      setShowModal(false);
      setTieuDe('');
      fetchAudios();
      alert('Đã thêm tệp âm thanh mới vào SQL Server!');
    } catch (err) {
      console.error('Lỗi khi thêm audio:', err);
      alert('Lỗi khi lưu tệp âm thanh vào SQL Server.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa tệp âm thanh thuyết minh này khỏi CSDL SQL Server?')) {
      try {
        await xoaAudio(id);
        fetchAudios();
      } catch (err) {
        console.error('Lỗi khi xóa audio:', err);
        alert('Lỗi khi xóa khỏi SQL Server.');
      }
    }
  };

  return (
    <div className="va-main">
      <div className="va-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="va-title">Quản lý Âm thanh Thuyết minh (Audio Guides)</h1>
            {loading && <span style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ SQL...</span>}
          </div>
          <p className="va-subtitle">Hệ thống tệp ghi âm hướng dẫn du khách trải nghiệm tự động lưu trong SQL Server (`ThuyetMinhAudio`)</p>
        </div>
        <button className="va-btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Thêm Audio mới
        </button>
      </div>

      <div className="va-list">
        {audios.length === 0 && !loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
            Chưa có tệp âm thanh nào trong CSDL SQL Server (`ThuyetMinhAudio`). Hãy nhấn "Thêm Audio mới" để tải lên!
          </div>
        ) : (
          audios.map((item) => {
            const id = item.maThuyetMinh || item.MaThuyetMinh || item.maAudio || item.MaAudio;
            const title = item.tieuDe || item.TieuDe || 'Audio thuyết minh không tên';
            const lang = item.maNgonNgu || item.MaNgonNgu || 'Tiếng Việt';
            const seconds = item.thoiLuongGiay ?? item.ThoiLuongGiay ?? 300;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            const durationStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

            return (
              <div key={id} className="va-item">
                <div className="va-item-left">
                  <div className="va-icon-box">
                    <Volume2 size={24} />
                  </div>
                  <div className="va-text">
                    <h3>{title}</h3>
                    <p>Ngôn ngữ: {lang} &bull; Thời lượng: {durationStr} &bull; ID CSDL: #{id}</p>
                  </div>
                </div>

                <div className="va-player">
                  <button className="va-btn-play" onClick={() => alert(`Đang phát Audio thuyết minh: ${title}`)}>
                    <Play size={14} /> Nghe thử
                  </button>
                  <button className="va-btn-delete" title="Xóa khỏi CSDL" onClick={() => handleDelete(id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL THÊM AUDIO */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '12px', width: '480px', maxWidth: '90%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Thêm Tệp Âm Thanh Thuyết Minh</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddAudio}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tiêu đề audio *</label>
                <input type="text" value={tieuDe} onChange={(e) => setTieuDe(e.target.value)} placeholder="Ví dụ: Lịch sử 700 năm Làng Gốm..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Thời lượng (giây)</label>
                  <input type="number" value={thoiLuongGiay} onChange={(e) => setThoiLuongGiay(e.target.value)} placeholder="360" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Ngôn ngữ</label>
                  <select value={maNgonNgu} onChange={(e) => setMaNgonNgu(e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                    <option value="Tiếng Việt">Tiếng Việt</option>
                    <option value="English">English</option>
                    <option value="Tiếng Pháp">Tiếng Pháp</option>
                    <option value="Tiếng Nhật">Tiếng Nhật</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Đường dẫn tệp (Link MP3/WAV) *</label>
                <input type="text" value={duongDanAudio} onChange={(e) => setDuongDanAudio(e.target.value)} placeholder="https://..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
                <button type="submit" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#9333ea', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Lưu vào CSDL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
