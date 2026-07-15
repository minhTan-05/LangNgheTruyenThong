import React from 'react';
import '../css/chitietlangnghe.css';
import { 
  MapPin, Eye, Star, Headphones, Play, Volume2, 
  Video, ShoppingCart, User, ArrowLeft
} from 'lucide-react';

export default function ChiTietLangNghe({ village, setActiveTab, onSelectProduct }) {
  // Dữ liệu mẫu (Mock data)
  const gallery = Array(6).fill('https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=300&auto=format&fit=crop');
  const products = [
    {
      id: 1, 
      name: 'Bình hoa gốm men ngọc', 
      village: village ? village.name : 'Làng gốm Bát Tràng', 
      price: '450.000đ',
      category: 'Gốm sứ',
      img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 5, 
      name: 'Bộ ấm trà gốm Chu Đậu', 
      village: village ? village.name : 'Làng gốm Bát Tràng', 
      price: '1.200.000đ',
      category: 'Gốm sứ',
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 7, 
      name: 'Đĩa gốm sứ trang trí', 
      village: village ? village.name : 'Làng gốm Bát Tràng', 
      price: '650.000đ',
      category: 'Gốm sứ',
      img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300&auto=format&fit=crop'
    }
  ];

  const item = village || {
    name: 'Làng gốm Bát Tràng',
    location: 'Hà Nội',
    views: '15.420',
    rating: '4.8',
    tag: 'Gốm sứ',
    img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop'
  };

  return (
    <div className="v-detail-wrapper">
      <div style={{ padding: '1rem 2.5rem', background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span 
          onClick={() => setActiveTab && setActiveTab('map')} 
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 500 }}
        >
          <ArrowLeft size={16} /> Quay lại Bản đồ làng nghề
        </span>
      </div>

      {/* --- HERO BANNER --- */}
      <div className="v-hero-section">
        <div className="v-hero-bg" style={{ backgroundImage: `url('${item.img || "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop"}')` }}></div>
        <div className="v-hero-overlay"></div>
        <div className="v-hero-content">
          <span className="v-badge">{item.tag || 'Gốm sứ'}</span>
          <h1 className="v-title">{item.name}</h1>
          <div className="v-meta">
            <span><MapPin size={16}/> {item.location}</span>
            <span><Eye size={16}/> {item.views || '15.420'} lượt xem</span>
            <span className="v-star"><Star size={14} fill="currentColor"/> {item.rating || '4.8'}/5</span>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="v-main-layout">
        
        {/* CỘT TRÁI (NỘI DUNG CHÍNH) */}
        <div className="v-main-content">
          
          <div className="v-card">
            <h3>Giới thiệu</h3>
            <p>{item.desc || 'Làng nghề nổi tiếng với lịch sử lâu đời, lưu giữ những giá trị văn hóa nghệ thuật đặc sắc của dân tộc.'}</p>
          </div>

          <div className="v-card">
            <h3>Lịch sử hình thành làng nghề</h3>
            <p>Làng nghề truyền thống có lịch sử phát triển hàng trăm năm. Sản phẩm nơi đây nổi tiếng trong nước và quốc tế về đặc trưng chất lượng, mỹ thuật tinh xảo.</p>
          </div>

          <div className="v-card">
            <h3 className="v-text-gold"><Headphones size={20}/> Hướng dẫn viên ảo (Audio Guide)</h3>
            <p className="v-audio-subtitle">Giới thiệu về {item.name}</p>
            <div className="v-audio-player">
              <button className="v-btn-icon" onClick={() => alert('Đang phát аудio giới thiệu làng nghề...')}><Play size={16} fill="currentColor" /></button>
              <span className="v-time">1:24 / 4:52</span>
              <div className="v-progress"><div className="v-progress-bar" style={{width: '30%'}}></div></div>
              <button className="v-btn-icon"><Volume2 size={16} /></button>
            </div>
          </div>

          <div className="v-card">
            <h3 className="v-text-gold">Thư viện hình ảnh</h3>
            <div className="v-gallery-grid">
              {gallery.map((img, i) => (
                <div key={i} className="v-gallery-item">
                  <img src={img} alt={`Gallery ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="v-card">
            <h3 className="v-text-gold">Video giới thiệu</h3>
            <div className="v-video-box" onClick={() => alert('Đang phát video giới thiệu...')} style={{ cursor: 'pointer' }}>
              <Video size={48} color="#d1d5db" strokeWidth={1} />
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="v-product-grid">
            {products.map((p, i) => (
              <div 
                key={i} 
                className="v-prod-card"
                onClick={() => onSelectProduct ? onSelectProduct(p) : setActiveTab('product-detail')}
                style={{ cursor: 'pointer' }}
              >
                <img src={p.img} alt={p.name} />
                <div className="v-prod-info">
                  <h4>{p.name}</h4>
                  <p>{p.village}</p>
                  <div className="v-prod-bottom">
                    <span className="v-price">{p.price}</span>
                    <button className="v-btn-cart" onClick={(e) => { e.stopPropagation(); setActiveTab('cart'); }}><ShoppingCart size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Đánh giá */}
          <div className="v-reviews-section">
            <h3 className="v-section-heading">Đánh giá về làng nghề</h3>
            
            <div className="v-card v-review-summary">
              <div className="v-rating-big">
                <h2>4.9</h2>
                <div className="v-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" color="#eab308"/>)}
                </div>
                <p>Dựa trên 35 đánh giá</p>
              </div>
              <div className="v-rating-stats">
                {[5,4,3,2,1].map(num => (
                  <div key={num} className="v-stat-row">
                    <span className="v-num">{num} <Star size={12} fill="#eab308" color="#eab308"/></span>
                    <div className="v-bar-track">
                      <div className="v-bar-fill" style={{width: num === 5 ? '85%' : num === 4 ? '15%' : num === 3 ? '5%' : '0%'}}></div>
                    </div>
                    <span className="v-count">{num === 5 ? 45 : num === 4 ? 3 : num === 3 ? 1 : 0}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="v-review-list">
              <div className="v-review-item">
                <div className="v-avatar"><User size={16}/></div>
                <div className="v-review-content">
                  <div className="v-review-head">
                    <div>
                      <h4>Nguyễn Văn A</h4>
                      <span>15/04/2026</span>
                    </div>
                    <div className="v-stars">
                       {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#eab308" color="#eab308"/>)}
                    </div>
                  </div>
                  <p>Gốm rất đẹp, chất lượng tuyệt vời. Đúng như mô tả, giao hàng nhanh.</p>
                </div>
              </div>
              
              <div className="v-review-item">
                <div className="v-avatar"><User size={16}/></div>
                <div className="v-review-content">
                  <div className="v-review-head">
                    <div>
                      <h4>Trần Thị B</h4>
                      <span>10/04/2026</span>
                    </div>
                    <div className="v-stars">
                       {[...Array(4)].map((_, i) => <Star key={i} size={12} fill="#eab308" color="#eab308"/>)}
                       <Star size={12} color="#e5e7eb" />
                    </div>
                  </div>
                  <p>Sản phẩm tốt, đóng gói cẩn thận. Giao rất sang trọng.</p>
                </div>
              </div>
            </div>

            <div className="v-card v-review-input-box">
              <div className="v-input-header">
                <strong>Đánh giá</strong>
                <div className="v-stars">
                   {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="#eab308" color="#eab308"/>)}
                   <Star size={14} color="#e5e7eb" />
                </div>
              </div>
              <div className="v-input-wrapper">
                <input type="text" placeholder="Viết đánh giá..." />
                <button onClick={() => alert('Cảm ơn bạn đã gửi đánh giá!')}>Gửi</button>
              </div>
            </div>

          </div>

        </div>

        {/* CỘT PHẢI (SIDEBAR THÔNG TIN) */}
        <aside className="v-sidebar">
          
          <div className="v-card">
            <h3>Thông tin nhanh</h3>
            <ul className="v-info-list">
              <li><span>Tỉnh/Thành phố</span> <strong>{item.location || 'Hà Nội'}</strong></li>
              <li><span>Loại nghề</span> <strong>{item.tag || 'Gốm sứ'}</strong></li>
              <li><span>Đánh giá</span> <strong>{item.rating || '4.8'} <Star size={12} fill="#eab308" color="#eab308" className="v-inline-star"/></strong></li>
            </ul>
          </div>

          <div className="v-card">
            <h3>Vị trí</h3>
            <div className="v-map-placeholder">
              <MapPin size={24} color="#d97706" />
            </div>
            <p className="v-coord">Tọa độ: 20.9772, 105.9142</p>
          </div>

        </aside>

      </div>
    </div>
  );
}