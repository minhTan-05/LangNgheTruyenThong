import React, { useState, useEffect } from 'react';
import '../css/chitietlangnghe.css';
import { 
  MapPin, Eye, Star, Headphones, Play, Volume2, 
  Video, ShoppingCart, User, ArrowLeft
} from 'lucide-react';
import { 
  getChiTietLangNghe, getDanhSachHinhAnhByVillage, getDanhSachVideoByVillage, getDanhSachHinhAnh, getDanhSachVideo 
} from '../../API/apiLangNghe';
import { 
  getDanhSachSanPham, getDanhSachAudio 
} from '../../API/apiAdmin';

export default function ChiTietLangNghe({ village, setActiveTab, onSelectProduct }) {
  const [villageInfo, setVillageInfo] = useState(village || null);
  const [gallery, setGallery] = useState([]);
  const [products, setProducts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const maLangNghe = village?.id || village?.maLangNghe || village?.MaLangNghe || 1;

    const fetchDetailData = async () => {
      try {
        // 1. Tải chi tiết Làng nghề từ SQL Server
        const vDetail = await getChiTietLangNghe(maLangNghe);
        if (vDetail && vDetail.maLangNghe) {
          setVillageInfo({
            id: vDetail.maLangNghe || vDetail.MaLangNghe,
            name: vDetail.tenLangNghe || vDetail.TenLangNghe,
            location: vDetail.tinhThanh || vDetail.TinhThanh || 'Hà Nội',
            views: vDetail.luotXem || vDetail.LuotXem || '15.420',
            rating: Number(vDetail.diemDanhGia || vDetail.DiemDanhGia || 4.8).toFixed(1),
            tag: vDetail.nhomNghe?.tenNhomNghe || vDetail.NhomNghe?.TenNhomNghe || 'Gốm sứ',
            img: vDetail.anhBia || vDetail.AnhBia || 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
            desc: vDetail.gioiThieu || vDetail.GioiThieu || vDetail.lSTruyenThong || vDetail.LSTruyenThong,
            lat: vDetail.viDo || vDetail.ViDo || '20.9772',
            lng: vDetail.kinhDo || vDetail.KinhDo || '105.9142'
          });
        }
      } catch (err) {
        console.warn('Lỗi tải chi tiết làng nghề từ SQL Server:', err);
      }

      try {
        // 2. Tải hình ảnh Làng nghề từ SQL Server
        let hinhAnhs = await getDanhSachHinhAnhByVillage(maLangNghe);
        if (!hinhAnhs || hinhAnhs.length === 0) {
          const allHinh = await getDanhSachHinhAnh();
          hinhAnhs = (allHinh || []).filter(h => (h.maLangNghe || h.MaLangNghe) === Number(maLangNghe));
        }
        if (hinhAnhs && hinhAnhs.length > 0) {
          setGallery(hinhAnhs.map(h => h.duongDanAnh || h.DuongDanAnh));
        } else {
          setGallery([
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop'
          ]);
        }
      } catch (err) {
        console.warn('Lỗi tải hình ảnh làng nghề:', err);
      }

      try {
        // 3. Tải sản phẩm của Làng nghề từ SQL Server
        const allProds = await getDanhSachSanPham();
        if (allProds && Array.isArray(allProds)) {
          const filtered = allProds.filter(p => (p.maLangNghe || p.MaLangNghe) === Number(maLangNghe));
          if (filtered.length > 0) {
            setProducts(filtered.map(p => ({
              id: p.maSanPham || p.MaSanPham,
              name: p.tenSanPham || p.TenSanPham,
              price: p.giaBan || p.GiaBan ? Number(p.giaBan || p.GiaBan).toLocaleString('vi-VN') + 'đ' : '450.000đ',
              category: p.langNghe?.nhomNghe?.tenNhomNghe || 'Gốm sứ',
              village: p.langNghe?.tenLangNghe || village?.name || 'Làng gốm Bát Tràng',
              img: p.anhDaiDien || p.AnhDaiDien || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop',
              desc: p.moTa || p.MoTa
            })));
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        console.warn('Lỗi tải sản phẩm làng nghề:', err);
      }

      try {
        // 4. Tải video Làng nghề từ SQL Server
        let vids = await getDanhSachVideoByVillage(maLangNghe);
        if (!vids || vids.length === 0) {
          const allVids = await getDanhSachVideo();
          vids = (allVids || []).filter(v => (v.maLangNghe || v.MaLangNghe) === Number(maLangNghe));
        }
        setVideos(vids || []);
      } catch (err) {
        console.warn('Lỗi tải video:', err);
      }

      try {
        // 5. Tải Thuyết minh Audio từ SQL Server
        const allAudio = await getDanhSachAudio();
        if (allAudio && Array.isArray(allAudio)) {
          const filteredAudio = allAudio.filter(a => (a.maLangNghe || a.MaLangNghe) === Number(maLangNghe));
          setAudios(filteredAudio);
        }
      } catch (err) {
        console.warn('Lỗi tải audio:', err);
      }
    };

    fetchDetailData();
  }, [village]);

  const item = villageInfo || village || {
    name: 'Làng gốm Bát Tràng',
    location: 'Hà Nội',
    views: '15.420',
    rating: '4.8',
    tag: 'Gốm sứ',
    img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
    desc: 'Làng nghề truyền thống nổi tiếng với lịch sử lâu đời, lưu giữ những giá trị văn hóa nghệ thuật đặc sắc của dân tộc.'
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
          <span className="v-badge">{item.tag || item.product || item.nhomNghe?.tenNhomNghe || 'Gốm sứ'}</span>
          <h1 className="v-title">{item.name || item.tenLangNghe}</h1>
          <div className="v-meta">
            <span><MapPin size={16}/> {item.location || item.tinhThanh || 'Hà Nội'}</span>
            <span><Eye size={16}/> {item.views || item.luotXem || '15.420'} lượt xem</span>
            <span className="v-star"><Star size={14} fill="currentColor"/> {item.rating || item.diemDanhGia || '4.8'}/5</span>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="v-main-layout">
        
        {/* CỘT TRÁI (NỘI DUNG CHÍNH) */}
        <div className="v-main-content">
          
          <div className="v-card">
            <h3>Giới thiệu</h3>
            <p>{item.desc || item.gioiThieu || item.lSTruyenThong || 'Làng nghề nổi tiếng với lịch sử lâu đời, lưu giữ những giá trị văn hóa nghệ thuật đặc sắc của dân tộc.'}</p>
          </div>

          <div className="v-card">
            <h3>Lịch sử hình thành làng nghề</h3>
            <p>{item.lSTruyenThong || item.desc || 'Làng nghề truyền thống có lịch sử phát triển hàng trăm năm. Sản phẩm nơi đây nổi tiếng trong nước và quốc tế về đặc trưng chất lượng, mỹ thuật tinh xảo.'}</p>
          </div>

          <div className="v-card">
            <h3 className="v-text-gold"><Headphones size={20}/> Hướng dẫn viên ảo (Audio Guide)</h3>
            <p className="v-audio-subtitle">
              {audios.length > 0 ? (audios[0].tieuDe || audios[0].TieuDe) : `Giới thiệu về ${item.name}`}
            </p>
            {audios.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <audio controls style={{ width: '100%' }} src={audios[0].duongDanAudio || audios[0].DuongDanAudio}>
                  Trình duyệt của bạn không hỗ trợ thẻ audio.
                </audio>
              </div>
            )}
            {audios.length === 0 && (
              <div className="v-audio-player">
                <button className="v-btn-icon" onClick={() => alert('Đang tải tệp audio thuyết minh cho làng nghề...')}>
                  <Play size={16} fill="currentColor" />
                </button>
                <span className="v-time">0:00 / 3:15</span>
                <div className="v-progress"><div className="v-progress-bar" style={{width: '0%'}}></div></div>
                <button className="v-btn-icon"><Volume2 size={16} /></button>
              </div>
            )}
          </div>

          <div className="v-card">
            <h3 className="v-text-gold">Thư viện hình ảnh ({gallery.length} hình)</h3>
            <div className="v-gallery-grid">
              {gallery.map((imgUrl, i) => (
                <div key={i} className="v-gallery-item">
                  <img src={imgUrl} alt={`Gallery ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="v-card">
            <h3 className="v-text-gold">Video giới thiệu</h3>
            {videos.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {videos.map((vid, idx) => (
                  <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#d97706', padding: '10px', borderRadius: '8px', color: 'white', display: 'flex' }}>
                      <Video size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: '#1e293b' }}>{vid.tieuDe || vid.TieuDe}</strong>
                      <a href={vid.duongDanVideo || vid.DuongDanVideo} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none' }}>
                        👉 Xem video chi tiết ({vid.duongDanVideo || vid.DuongDanVideo})
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="v-video-box" onClick={() => alert('Chưa có video giới thiệu nào được cập nhật trong csdl.')} style={{ cursor: 'pointer' }}>
                <Video size={48} color="#d1d5db" strokeWidth={1} />
              </div>
            )}
          </div>

          {/* Danh sách sản phẩm từ SQL Server */}
          <div style={{ marginTop: '2rem' }}>
            <h3 className="v-section-heading">Sản phẩm tiêu biểu của {item.name} ({products.length} sản phẩm từ SQL Server)</h3>
            {products.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: 'white', borderRadius: '12px', color: '#64748b' }}>
                <p>Hiện chưa có sản phẩm nào cho làng nghề này trong Cơ sở dữ liệu SQL Server.</p>
              </div>
            ) : (
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
            )}
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
              <li><span>Tỉnh/Thành phố</span> <strong>{item.location || item.tinhThanh || 'Hà Nội'}</strong></li>
              <li><span>Loại nghề</span> <strong>{item.tag || item.product || item.nhomNghe?.tenNhomNghe || 'Gốm sứ'}</strong></li>
              <li><span>Đánh giá</span> <strong>{item.rating || item.diemDanhGia || '4.8'} <Star size={12} fill="#eab308" color="#eab308" className="v-inline-star"/></strong></li>
            </ul>
          </div>

          <div className="v-card">
            <h3>Vị trí</h3>
            <div className="v-map-placeholder">
              <MapPin size={24} color="#d97706" />
            </div>
            <p className="v-coord">Tọa độ: {item.lat || item.viDo || '20.9772'}, {item.lng || item.kinhDo || '105.9142'}</p>
          </div>

        </aside>

      </div>
    </div>
  );
}