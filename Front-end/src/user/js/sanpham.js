import React, { useState, useEffect } from 'react';
import '../css/sanpham.css';
import { SlidersHorizontal, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import { getDanhSachSanPham } from '../../API/apiAdmin';

const categoriesList = ['Tất cả', 'Gốm sứ', 'Dệt may', 'Mộc', 'Kim hoàn', 'Đúc đồng', 'Thêu', 'Làng hoa', 'Bánh kẹo', 'Rèn', 'Khảm trai'];
const priceRanges = ['Dưới 1 triệu', '1 - 5 triệu', '5 - 10 triệu', 'Trên 10 triệu'];

const fallbackProductsData = [
  { id: 1, name: 'Bình hoa gốm men ngọc', village: 'Làng gốm Bát Tràng', price: '450.000đ', priceNum: 450000, category: 'Gốm sứ', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Khăn lụa tơ tằm thêu tay', village: 'Làng lụa Vạn Phúc', price: '850.000đ', priceNum: 850000, category: 'Dệt may', img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Bàn thờ gỗ gụ chạm khắc', village: 'Làng mộc Kim Bồng', price: '15.000.000đ', priceNum: 15000000, category: 'Mộc', img: 'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Chuông đồng thủ công', village: 'Làng đúc đồng Đại Bái', price: '2.500.000đ', priceNum: 2500000, category: 'Đúc đồng', img: 'https://images.unsplash.com/photo-1587302484347-19ce7db75a40?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Bộ ấm trà gốm Chu Đậu', village: 'Làng gốm Bát Tràng', price: '1.200.000đ', priceNum: 1200000, category: 'Gốm sứ', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Áo dài lụa truyền thống', village: 'Làng lụa Vạn Phúc', price: '3.200.000đ', priceNum: 3200000, category: 'Dệt may', img: 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'Đĩa gốm sứ trang trí', village: 'Làng gốm Bát Tràng', price: '650.000đ', priceNum: 650000, category: 'Gốm sứ', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop' },
  { id: 8, name: 'Tranh thêu tay phong cảnh', village: 'Làng thêu Quất Động', price: '1.800.000đ', priceNum: 1800000, category: 'Thêu', img: 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=400&auto=format&fit=crop' },
  { id: 9, name: 'Tượng Phật đồng phong thủy', village: 'Làng đúc đồng Đại Bái', price: '4.500.000đ', priceNum: 4500000, category: 'Đúc đồng', img: 'https://images.unsplash.com/photo-1587302484347-19ce7db75a40?q=80&w=400&auto=format&fit=crop' }
];

export default function SanPham({ selectedCategory = 'Tất cả', setSelectedCategory, onAddToCart, onSelectProduct }) {
  const [activeCat, setActiveCat] = useState(selectedCategory || 'Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedId, setAddedId] = useState(null);
  const [productsData, setProductsData] = useState(fallbackProductsData);

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const list = await getDanhSachSanPham();
        if (list && list.length > 0) {
          setProductsData(list.map(p => ({
            id: p.maSanPham || p.MaSanPham,
            name: p.tenSanPham || p.TenSanPham,
            village: p.langNghe?.tenLangNghe || 'Làng nghề Việt Nam',
            price: p.giaBan || p.GiaBan ? Number(p.giaBan || p.GiaBan).toLocaleString('vi-VN') + 'đ' : '450.000đ',
            priceNum: Number(p.giaBan || p.GiaBan || 450000),
            category: p.langNghe?.nhomNghe?.tenNhomNghe || 'Gốm sứ',
            img: p.anhDaiDien || p.AnhDaiDien || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop',
            desc: p.moTa || p.MoTa
          })));
        }
      } catch (err) {
        console.warn('Sử dụng sản phẩm mẫu do lỗi API:', err);
      }
    };
    fetchProds();
  }, []);

  const currentCategory = setSelectedCategory ? selectedCategory : activeCat;
  const handleCategoryClick = (cat) => {
    if (setSelectedCategory) setSelectedCategory(cat);
    setActiveCat(cat);
  };

  const handleAddCart = (e, id) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart();
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredProducts = productsData.filter(p => {
    const matchCat = currentCategory === 'Tất cả' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.village.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="shop-wrapper">
      <main className="shop-container">
        <h1 className="shop-page-title">Sản phẩm làng nghề</h1>
        
        <div className="shop-layout">
          
          {/* SIDEBAR BỘ LỌC */}
          <aside className="shop-sidebar">
            <div className="shop-filter-header">
              <SlidersHorizontal size={20} />
              <h2>Bộ lọc</h2>
            </div>

            <div className="shop-filter-group">
              <label>Tìm kiếm</label>
              <input 
                type="text" 
                placeholder="Tìm sản phẩm..." 
                className="shop-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="shop-filter-group">
              <label>Danh mục</label>
              <div className="shop-filter-options">
                {categoriesList.map((cat) => (
                  <button 
                    key={cat} 
                    className={`shop-filter-btn ${currentCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="shop-filter-group">
              <label>Khoảng giá</label>
              <div className="shop-filter-options">
                {priceRanges.map((price) => (
                  <button key={price} className="shop-filter-btn" onClick={() => alert(`Đang lọc theo khoảng giá: ${price}`)}>{price}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* KHU VỰC DANH SÁCH SẢN PHẨM */}
          <section className="shop-content">
            <div className="shop-toolbar">
              <span className="shop-results-count">Hiển thị {filteredProducts.length} sản phẩm</span>
              <div className="shop-sort-dropdown" onClick={() => alert('Đổi thứ tự sắp xếp theo giá / bán chạy')}>
                <span>Mới nhất</span>
                <ChevronDown size={16} color="#6b7280" />
              </div>
            </div>

            <div className="shop-products-grid">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="shop-product-card"
                  onClick={() => onSelectProduct ? onSelectProduct(product) : null}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="shop-product-image">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="shop-product-info">
                    <h3 className="shop-product-name">{product.name}</h3>
                    <p className="shop-product-village">{product.village}</p>
                    <div className="shop-product-bottom">
                      <span className="shop-product-price">{product.price}</span>
                      <button 
                        className="shop-btn-add-cart"
                        onClick={(e) => handleAddCart(e, product.id)}
                        title="Thêm vào giỏ hàng"
                      >
                        {addedId === product.id ? <Check size={16} color="#4ade80" /> : <ShoppingCart size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}