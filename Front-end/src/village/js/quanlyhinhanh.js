import React, { useState } from 'react';
import '../css/quanlyhinhanh.css';
import { Plus, Trash2 } from 'lucide-react';

const initialImages = [
  {
    id: 1,
    title: 'Nghệ nhân vuốt gốm tại bàn xoay',
    date: '10/06/2026',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Những dãy gốm phơi nắng trước sân',
    date: '08/06/2026',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Hoa văn rồng phượng men lam cổ điển',
    date: '01/06/2026',
    url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Khu chợ gốm Bát Tràng tấp nập du khách',
    date: '25/05/2026',
    url: 'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?q=80&w=400&auto=format&fit=crop'
  }
];

export default function QuanLyHinhAnh() {
  const [images, setImages] = useState(initialImages);

  const handleDelete = (id) => {
    if (window.confirm('Xóa hình ảnh này khỏi thư viện?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <div className="vi-main">
      <div className="vi-header">
        <div>
          <h1 className="vi-title">Thư viện Hình ảnh &amp; Triển lãm Làng nghề</h1>
          <p className="vi-subtitle">Quản lý kho ảnh độ phân giải cao giới thiệu cảnh quan và tác phẩm nghệ thuật</p>
        </div>
        <button className="vi-btn-add" onClick={() => alert('Đang mở bộ chọn ảnh để tải lên...')}>
          <Plus size={18} /> Tải ảnh mới lên
        </button>
      </div>

      <div className="vi-grid">
        {images.map((img) => (
          <div key={img.id} className="vi-card">
            <div className="vi-img-wrapper">
              <img src={img.url} alt={img.title} />
              <button className="vi-delete-btn" onClick={() => handleDelete(img.id)}>
                <Trash2 size={14} />
              </button>
            </div>
            <div className="vi-info">
              <h4>{img.title}</h4>
              <p>Ngày tải: {img.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
