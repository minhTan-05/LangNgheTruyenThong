import React, { useState } from 'react';
import '../css/trangchu.css';
import { Map, Package, Eye, MapPin, Star, ShoppingCart, Check } from 'lucide-react';

const stats = [
  { id: 1, icon: <Map className="icon-yellow" />, title: 'Tổng số làng nghề', value: '156' },
  { id: 2, icon: <Package className="icon-orange" />, title: 'Tổng sản phẩm', value: '2847' },
  { id: 3, icon: <Eye className="icon-gray" />, title: 'Lượt truy cập', value: '1.250.000' },
];

const villages = [
  { id: 1, name: 'Làng gốm Bát Tràng', location: 'Hà Nội', desc: 'Làng nghề gốm sứ nổi tiếng với lịch sử hơn 700 năm', views: '15.420', rating: '4.8', tag: 'Gốm sứ', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Làng lụa Vạn Phúc', location: 'Hà Nội', desc: 'Làng dệt lụa tơ tằm truyền thống', views: '12.350', rating: '4.7', tag: 'Dệt may', img: 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Làng mộc Kim Bồng', location: 'Quảng Nam', desc: 'Làng nghề mộc truyền thống của xứ Quảng', views: '9.870', rating: '4.9', tag: 'Mộc', img: 'https://images.unsplash.com/photo-1605335198006-258dcb1f416c?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Làng đúc đồng Đại Bái', location: 'Bắc Ninh', desc: 'Làng nghề đúc đồng lâu đời', views: '8.540', rating: '4.6', tag: 'Đúc đồng', img: 'https://images.unsplash.com/photo-1599583196884-60be78ee4b45?q=80&w=400&auto=format&fit=crop' },
];

const products = [
  { id: 1, name: 'Bình hoa gốm men ngọc', village: 'Làng gốm Bát Tràng', price: '450.000đ', category: 'Gốm sứ', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop', rating: '4.9 (128 đánh giá)' },
  { id: 2, name: 'Khăn lụa tơ tằm thêu tay', village: 'Làng lụa Vạn Phúc', price: '850.000đ', category: 'Dệt may', img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?q=80&w=400&auto=format&fit=crop', rating: '4.8 (95 đánh giá)' },
  { id: 3, name: 'Bàn thờ gỗ gụ chạm', village: 'Làng mộc Kim Bồng', price: '15.000.000đ', category: 'Mộc', img: 'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?q=80&w=400&auto=format&fit=crop', rating: '5.0 (42 đánh giá)' },
  { id: 4, name: 'Chuông đồng thủ công', village: 'Làng đúc đồng Đại Bái', price: '2.500.000đ', category: 'Đúc đồng', img: 'https://images.unsplash.com/photo-1587302484347-19ce7db75a40?q=80&w=400&auto=format&fit=crop', rating: '4.7 (68 đánh giá)' },
];

export default function TrangChu({ setActiveTab, onAddToCart, onSelectProduct, onSelectVillage }) {
  const [addedId, setAddedId] = useState(null);
  const [keyword, setKeyword] = useState('');

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart();
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleSearch = () => {
    if (keyword.toLowerCase().includes('gốm') || keyword.toLowerCase().includes('lụa') || keyword.toLowerCase().includes('bàn')) {
      setActiveTab('products');
    } else {
      setActiveTab('map');
    }
  };

  return (
    <div className="app-container">
      
      {/* HERO SECTION */}
      <div className="hero-section">
        <div 
          className="hero-background" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop')" }}
        >
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1>Khám phá làng nghề truyền thống <br/> Việt Nam</h1>
          <p className="hero-subtitle">Hành trình tìm hiểu văn hóa, lịch sử và sản phẩm đặc trưng của các làng nghề nổi tiếng</p>
          
          <div className="search-bar">
            <MapPin className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Nhập tên làng nghề, sản phẩm..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn-search" onClick={handleSearch}>Tìm kiếm</button>
          </div>
        </div>
      </div>

      <main className="main-container">
        
        {/* STATS SECTION */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card" onClick={() => setActiveTab('map')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LÀNG NGHỀ NỔI BẬT */}
        <section className="section-block">
          <div className="section-header">
            <h2>Làng nghề nổi bật</h2>
            <span className="link-view-all" onClick={() => setActiveTab && setActiveTab('map')} style={{ cursor: 'pointer' }}>Xem tất cả &rarr;</span>
          </div>
          <div className="grid-cards">
            {villages.map((village) => (
              <div 
                key={village.id} 
                className="card-village" 
                onClick={() => onSelectVillage ? onSelectVillage(village) : setActiveTab('map')} 
                style={{ cursor: 'pointer' }}
              >
                <div className="village-img-wrapper">
                  <img src={village.img} alt={village.name} />
                  <span className="village-tag">{village.tag}</span>
                </div>
                <div className="village-content">
                  <h3>{village.name}</h3>
                  <div className="village-location">
                    <MapPin size={14} /> {village.location}
                  </div>
                  <p className="village-desc">{village.desc}</p>
                  <div className="village-meta">
                    <span className="meta-views"><Eye size={14} /> {village.views}</span>
                    <span className="meta-rating"><Star size={14} /> {village.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SẢN PHẨM NỔI BẬT */}
        <section className="section-block">
          <div className="section-header">
            <h2>Sản phẩm nổi bật</h2>
            <span className="link-view-all" onClick={() => setActiveTab && setActiveTab('products')} style={{ cursor: 'pointer' }}>Xem tất cả &rarr;</span>
          </div>
          <div className="grid-cards">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="card-product" 
                onClick={() => onSelectProduct ? onSelectProduct(product) : setActiveTab('products', product.category)} 
                style={{ cursor: 'pointer' }}
              >
                <div className="product-img-wrapper">
                  <img src={product.img} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="product-village">{product.village}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button 
                    className="btn-add-cart"
                    onClick={(e) => handleCartClick(e, product)}
                  >
                    {addedId === product.id ? <Check size={18} color="#16a34a" /> : <ShoppingCart size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      
    </div>
  );
}
