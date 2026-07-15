import React, { useState, useEffect } from 'react';
import '../css/chitietsanpham.css';
import { 
  MapPin, Star, Minus, Plus, ShoppingCart, Heart, Share2, 
  Truck, ShieldCheck, ArrowLeft, Check 
} from 'lucide-react';
import { getDanhSachSanPham } from '../../API/apiAdmin';

export default function ChiTietSanPham({ product, setActiveTab, onAddToCart, onSelectProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([
    { id: 2, name: 'Khăn lụa tơ tằm thêu tay', village: 'Làng lụa Vạn Phúc', price: '850.000đ', img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?q=80&w=400&auto=format&fit=crop' },
    { id: 5, name: 'Bộ ấm trà gốm Chu Đậu', village: 'Làng gốm Bát Tràng', price: '1.200.000đ', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop' },
    { id: 7, name: 'Đĩa gốm sứ trang trí', village: 'Làng gốm Bát Tràng', price: '650.000đ', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop' }
  ]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const all = await getDanhSachSanPham();
        if (all && all.length > 0) {
          const mapped = all.map(p => ({
            id: p.maSanPham || p.MaSanPham,
            name: p.tenSanPham || p.TenSanPham,
            village: p.langNghe?.tenLangNghe || 'Làng nghề Việt Nam',
            price: p.giaBan || p.GiaBan ? Number(p.giaBan || p.GiaBan).toLocaleString('vi-VN') + 'đ' : '450.000đ',
            img: p.anhDaiDien || p.AnhDaiDien || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop',
            category: p.langNghe?.nhomNghe?.tenNhomNghe || 'Gốm sứ',
            desc: p.moTa || p.MoTa
          })).filter(p => p.id !== (product?.id || 1));
          if (mapped.length > 0) {
            setRelatedProducts(mapped.slice(0, 4));
          }
        }
      } catch (err) {
        console.warn('Sử dụng sản phẩm mẫu cho sản phẩm tương tự do lỗi API:', err);
      }
    };
    fetchRelated();
  }, [product]);

  const item = product || {
    id: 1,
    name: 'Bình hoa gốm men ngọc Bát Tràng',
    village: 'Làng gốm Bát Tràng',
    price: '450.000đ',
    category: 'Gốm sứ',
    rating: '4.9',
    desc: 'Bình hoa được chế tác hoàn toàn thủ công bởi các nghệ nhân kỳ cựu tại Làng gốm Bát Tràng. Lớp men ngọc sâu thẳm, bóng mịn kết hợp với họa tiết khắc chìm tinh tế mang lại vẻ đẹp sang trọng cho không gian phòng khách hoặc phòng làm việc.',
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop'
  };

  const [activeImage, setActiveImage] = useState(item.img);

  const thumbnails = [
    item.img,
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?q=80&w=600&auto=format&fit=crop'
  ];

  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity(prev => (prev < 24 ? prev + 1 : 24));

  const handleAddCartClick = () => {
    if (onAddToCart) onAddToCart(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pdp-wrapper">
      <main className="pdp-container">
        
        {/* BREADCRUMB */}
        <nav className="pdp-breadcrumb" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setActiveTab && setActiveTab('products')}>
          <ArrowLeft size={16} /> Quay lại danh sách sản phẩm
        </nav>

        {/* MAIN INFO GRID */}
        <div className="pdp-main-info">
          
          {/* LEFT: IMAGES */}
          <div className="pdp-gallery">
            <div className="pdp-main-image-box">
              <img src={activeImage || item.img} alt={item.name} />
              <button className="pdp-wishlist-btn"><Heart size={20} /></button>
            </div>
            <div className="pdp-thumbnails">
              {thumbnails.map((thumb, idx) => (
                <div 
                  key={idx} 
                  className={`pdp-thumb-item ${activeImage === thumb ? 'active' : ''}`}
                  onClick={() => setActiveImage(thumb)}
                >
                  <img src={thumb} alt={`Thumb ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="pdp-details">
            <span className="pdp-category-badge">{item.category || 'Gốm sứ'}</span>
            <h1 className="pdp-title">{item.name}</h1>

            <div className="pdp-rating-row">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fde047" color="#fde047" />)}
              </div>
              <span className="pdp-rating-score">{item.rating || '4.9'}</span>
              <span className="pdp-rating-count">(128 đánh giá)</span>
            </div>

            <div className="pdp-price-row">
              <span className="pdp-price">{item.price}</span>
              <span className="pdp-stock-status">Còn hàng</span>
            </div>

            <div className="pdp-description">
              {item.desc || 'Sản phẩm được chế tác tỉ mỉ từ bàn tay các nghệ nhân lành nghề, giữ nguyên nét tinh hoa văn hóa truyền thống.'}
            </div>

            <div className="pdp-tags">
              <span>#ThủCôngMỹNghệ</span>
              <span>#{item.category || 'TruyềnThống'}</span>
              <span>#ChấtLượngCao</span>
            </div>

            <div className="pdp-actions-group">
              <div className="pdp-quantity-selector">
                <span className="pdp-qty-label">Số lượng:</span>
                <div className="pdp-qty-controls">
                  <button onClick={handleDecrease}><Minus size={16} /></button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={handleIncrease}><Plus size={16} /></button>
                </div>
                <span className="pdp-qty-limit">(Tối đa 24 sản phẩm)</span>
              </div>

              <div className="pdp-action-buttons">
                <button className="pdp-btn-add-cart" onClick={handleAddCartClick}>
                  {added ? <Check size={20} color="#16a34a" /> : <ShoppingCart size={20} />}
                  {added ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
                </button>
                <button className="pdp-btn-buy-now" onClick={() => { if(onAddToCart) onAddToCart(quantity); setActiveTab('cart'); }}>
                  Mua ngay
                </button>
                <button className="pdp-btn-icon" onClick={() => alert('Đã thêm sản phẩm vào danh sách yêu thích!')} title="Yêu thích">
                  <Heart size={20} />
                </button>
                <button className="pdp-btn-icon" onClick={() => alert('Đã sao chép liên kết chia sẻ sản phẩm!')} title="Chia sẻ">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="pdp-policies">
              <div className="pdp-policy-item">
                <Truck size={24} className="pdp-icon-gold" />
                <div>
                  <h4>Giao hàng toàn quốc</h4>
                  <p>Đóng gói cẩn thận chống vỡ</p>
                </div>
              </div>
              <div className="pdp-policy-item">
                <ShieldCheck size={24} className="pdp-icon-gold" />
                <div>
                  <h4>Chính hãng 100%</h4>
                  <p>Sản xuất từ làng nghề gốc</p>
                </div>
              </div>
            </div>

            <div className="pdp-specs">
              <div className="pdp-specs-header">Thông số kỹ thuật</div>
              <ul>
                <li><span>Xuất xứ:</span> <strong>{item.village}</strong></li>
                <li><span>Chất liệu:</span> <strong>{item.category || 'Gốm sứ tự nhiên'}</strong></li>
                <li><span>Kích thước:</span> <strong>Chung tiêu chuẩn (Cao 30cm)</strong></li>
                <li><span>Bảo hành:</span> <strong>Đổi trả trong 7 ngày nếu lỗi vận chuyển</strong></li>
              </ul>
            </div>

          </div>

        </div>

        {/* REVIEWS SECTION */}
        <section className="pdp-related-section" style={{ marginTop: '3rem' }}>
          <h3 className="pdp-section-title">Đánh giá khách hàng</h3>
          <div className="pdp-reviews-layout">
            <div className="pdp-review-summary-card">
              <h2>4.9</h2>
              <div className="pdp-stars" style={{ justifyContent: 'center' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#c5a859" color="#c5a859" />)}
              </div>
              <p>Dựa trên 128 đánh giá</p>
              <div className="pdp-rating-bars">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="pdp-bar-row">
                    <span>{star} <Star size={12} fill="#c5a859" color="#c5a859"/></span>
                    <div className="pdp-bar-bg">
                      <div className="pdp-bar-fill" style={{ width: star === 5 ? '90%' : star === 4 ? '10%' : '0%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pdp-review-list">
              <div className="pdp-review-item">
                <div className="pdp-rev-avatar pdp-bg-brown">H</div>
                <div className="pdp-rev-content">
                  <div className="pdp-rev-header">
                    <h4>Hoàng Tuấn Anh</h4>
                    <span className="pdp-rev-date">26/06/2026</span>
                  </div>
                  <div className="pdp-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c5a859" color="#c5a859" />)}
                  </div>
                  <p>Sản phẩm ngoài đời đẹp hơn trong ảnh rất nhiều, men ngọc sáng bóng, hoa văn khắc sắc nét. Rất hài lòng!</p>
                </div>
              </div>

              <div className="pdp-review-item">
                <div className="pdp-rev-avatar pdp-bg-gold">M</div>
                <div className="pdp-rev-content">
                  <div className="pdp-rev-header">
                    <h4>Mai Phương Thảo</h4>
                    <span className="pdp-rev-date">20/06/2026</span>
                  </div>
                  <div className="pdp-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c5a859" color="#c5a859" />)}
                  </div>
                  <p>Shop đóng gói cực kỳ cẩn thận với bọc sốp nhiều lớp. Mua làm quà tặng sếp rất sang trọng.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="pdp-related-section">
          <h3 className="pdp-section-title">Sản phẩm tương tự</h3>
          <div className="pdp-related-grid">
            {relatedProducts.map((relItem) => (
              <div 
                key={relItem.id} 
                className="pdp-related-card"
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(relItem);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="pdp-rc-img">
                  <img src={relItem.img} alt={relItem.name} />
                </div>
                <div className="pdp-related-info">
                  <h4>{relItem.name}</h4>
                  <p>{relItem.village}</p>
                  <span className="pdp-price">{relItem.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}