import React, { useState } from 'react';
import '../css/quanlyamthanh.css';
import { Plus, Volume2, Play, Trash2 } from 'lucide-react';

const initialAudios = [
  {
    id: 1,
    title: 'Audio Thuyết minh: Lịch sử 700 năm Làng gốm Bát Tràng',
    duration: '06:12',
    lang: 'Tiếng Việt',
    speaker: 'Giọng đọc chuẩn Hà Nội'
  },
  {
    id: 2,
    title: 'English Guide: The History and Craft of Bat Trang Ceramics',
    duration: '05:45',
    lang: 'English',
    speaker: 'Professional Voiceover'
  },
  {
    id: 3,
    title: 'Audio Thuyết minh: Nghệ thuật men rạn cổ và tâm linh',
    duration: '04:20',
    lang: 'Tiếng Việt',
    speaker: 'Nghệ nhân ưu tú chia sẻ'
  }
];

export default function QuanLyAmThanh() {
  const [audios, setAudios] = useState(initialAudios);

  const handleDelete = (id) => {
    if (window.confirm('Xóa tệp âm thanh thuyết minh này?')) {
      setAudios(audios.filter(a => a.id !== id));
    }
  };

  return (
    <div className="va-main">
      <div className="va-header">
        <div>
          <h1 className="va-title">Quản lý Âm thanh Thuyết minh (Audio Guides)</h1>
          <p className="va-subtitle">Hệ thống tệp ghi âm hướng dẫn du khách trải nghiệm tự động qua tai nghe hoặc QR Code</p>
        </div>
        <button className="va-btn-add" onClick={() => alert('Đang mở bộ tải lên tệp âm thanh MP3/WAV...')}>
          <Plus size={18} /> Thêm Audio mới
        </button>
      </div>

      <div className="va-list">
        {audios.map((item) => (
          <div key={item.id} className="va-item">
            <div className="va-item-left">
              <div className="va-icon-box">
                <Volume2 size={24} />
              </div>
              <div className="va-text">
                <h3>{item.title}</h3>
                <p>Ngôn ngữ: {item.lang} &bull; {item.speaker} &bull; Thời lượng: {item.duration}</p>
              </div>
            </div>

            <div className="va-player">
              <button className="va-btn-play" onClick={() => alert(`Đang phát Audio thuyết minh: ${item.title}`)}>
                <Play size={14} /> Nghe thử
              </button>
              <button className="va-btn-delete" onClick={() => handleDelete(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
