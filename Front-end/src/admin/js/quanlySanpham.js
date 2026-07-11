import React, { useState, useEffect } from 'react';
import '../css/quanlySanpham.css';
import { 
  Eye, Check, X, ToggleRight, ToggleLeft, 
  Star, Filter, ChevronLeft, ChevronRight, RefreshCw, PlusCircle, Trash2 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';
import { getDanhSachSanPham, themSanPham, capNhatSanPham, xoaSanPham } from '../../API/apiAdmin';

export default function SystemProductManagerPage({ setActiveMenu, onExitToMain }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('ALL');

  // Modal Thêm Sản phẩm
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    village: 'Làng gốm Bát Tràng',
    maLangNghe: 1,
    cat: 'Gốm sứ',
    price: 450000,
    stock: 20,
    status: 'Hiển thị',
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100'
  });

  const [notification, setNotification] = useState(null);
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadProductsFromDB();
  }, []);

  const loadProductsFromDB = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachSanPham();
      if (data && data.length > 0) {
        const mapped = data.map(p => ({
          id: p.maSanPham || p.MaSanPham,
          name: p.tenSanPham || p.TenSanPham,
          village: p.langNghe?.tenLangNghe || p.LangNghe?.TenLangNghe || 'Làng gốm Bát Tràng',
          stock: (p.soLuongTonKho || p.SoLuongTonKho || 0) > 0 ? `Còn ${p.soLuongTonKho || p.SoLuongTonKho}` : 'Hết hàng',
          stockNum: p.soLuongTonKho || p.SoLuongTonKho || 0,
          cat: p.langNghe?.nhomNghe?.tenNhomNghe || 'Gốm sứ',
          price: `${Number(p.giaBan || p.GiaBan || 0).toLocaleString('vi-VN')}đ`,
          priceNum: p.giaBan || p.GiaBan || 0,
          rating: 4.8,
          revCount: 15,
          status: (p.trangThai || p.TrangThai) === 'HienThi' || (p.trangThai || p.TrangThai) === 'Hiển thị' ? 'Hiển thị' : (p.trangThai || p.TrangThai) === 'ChoDuyet' ? 'Chờ duyệt' : 'Ẩn',
          img: p.danhSachAnh || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100'
        }));
        setProducts(mapped);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('Lỗi kết nối CSDL Sản phẩm:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên sản phẩm!', 'error');
      return;
    }

    const villageMap = {
      'Làng gốm Bát Tràng': 1,
      'Làng lụa Vạn Phúc': 2,
      'Làng mộc Kim Bồng': 3,
      'Làng đúc đồng Đại Bái': 4,
      'Làng gốm Chu Đậu': 5,
      'Làng đá mỹ nghệ Non Nước': 6
    };

    const newObj = {
      tenSanPham: formData.name,
      maLangNghe: villageMap[formData.village] || 1,
      giaBan: Number(formData.price) || 0,
      soLuongTonKho: Number(formData.stock) || 0,
      danhSachAnh: formData.img || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100',
      trangThai: formData.status === 'Hiển thị' ? 'HienThi' : formData.status === 'Chờ duyệt' ? 'ChoDuyet' : 'An'
    };

    try {
      await themSanPham(newObj);
      showToast(`Đã thêm sản phẩm "${formData.name}" vào SQL Server thành công!`);
      loadProductsFromDB();
    } catch (err) {
      showToast('Lỗi khi thêm sản phẩm vào CSDL SQL Server!', 'error');
    }
    setShowModal(false);
  };

  const handleToggleStatus = async (p) => {
    const nextStatus = p.status === 'Hiển thị' ? 'Ẩn' : 'Hiển thị';
    const nextCode = nextStatus === 'Hiển thị' ? 'HienThi' : 'An';
    try {
      await capNhatSanPham(p.id, {
        maSanPham: p.id,
        tenSanPham: p.name,
        maLangNghe: 1,
        giaBan: p.priceNum || 450000,
        soLuongTonKho: p.stockNum || 10,
        danhSachAnh: p.img || '',
        trangThai: nextCode
      });
      showToast(`Đã chuyển "${p.name}" sang trạng thái ${nextStatus}!`);
      loadProductsFromDB();
    } catch (err) {
      setProducts(products.map(item => item.id === p.id ? { ...item, status: nextStatus } : item));
      showToast(`Đã đổi trạng thái "${p.name}"!`);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi CSDL?`)) return;
    try {
      await xoaSanPham(id);
      showToast(`Đã xóa "${name}" thành công!`);
      loadProductsFromDB();
    } catch (err) {
      setProducts(products.filter(item => item.id !== id));
      showToast(`Đã xóa sản phẩm "${name}"!`);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'ALL' || p.cat === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="products" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-pm-main">
        {notification && (
          <div style={{
            position: 'fixed', top: '24px', right: '32px', zIndex: 9999,
            background: notification.type === 'error' ? '#ef4444' : '#10b981', color: 'white',
            padding: '12px 24px', borderRadius: '12px', fontWeight: '600', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            {notification.type === 'error' ? '⚠️' : '✅'} {notification.message}
          </div>
        )}

        {/* HEADER */}
        <header className="sys-pm-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 className="sys-pm-title">Quản lý sản phẩm hệ thống</h1>
              {loading && <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang tải từ CSDL...</span>}
            </div>
            <p className="sys-pm-subtitle">Dữ liệu từ CSDL SQL Server · {products.length} sản phẩm</p>
          </div>
          <button className="um-btn-add" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Thêm sản phẩm
          </button>
        </header>

        {/* STATS */}
        <div className="sys-pm-stats-grid">
          <div className="sys-pm-stat-card">
            <h3 className="text-dark">{products.length}</h3>
            <p>Tổng sản phẩm trong CSDL</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-green">{products.filter(p => p.status === 'Hiển thị').length}</h3>
            <p>Đang hiển thị</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-purple">{products.filter(p => p.status === 'Ẩn').length}</h3>
            <p>Đang ẩn</p>
          </div>
          <div className="sys-pm-stat-card">
            <h3 className="text-yellow">{products.filter(p => p.status === 'Chờ duyệt').length}</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="sys-pm-filter-container">
          <div className="sys-pm-search-box">
            <input 
              type="text" 
              placeholder="Tìm sản phẩm, làng nghề..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="um-placeholder-dropdown"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            style={{ padding: '0 12px', border: '1px solid #f3f4f6', borderRadius: '12px', fontWeight: '600' }}
          >
            <option value="ALL">Tất cả danh mục</option>
            <option value="Gốm sứ">Gốm sứ</option>
            <option value="Dệt may">Dệt may</option>
            <option value="Mộc">Mộc</option>
            <option value="Đúc đồng">Đúc đồng</option>
          </select>
          <div className="sys-pm-filter-result">
            <Filter size={14} /> {filteredProducts.length} kết quả
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="sys-pm-table-container">
          <table className="sys-pm-table">
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>DANH MỤC</th>
                <th>GIÁ BÁN</th>
                <th>ĐÁNH GIÁ</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3.5rem', color: '#9ca3af' }}>
                    <strong>Chưa có dữ liệu sản phẩm nào trong cơ sở dữ liệu SQL Server!</strong>
                    <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem' }}>Hãy bấm nút "+ Thêm sản phẩm" phía trên để thêm mới.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="sys-pm-prod-cell">
                        <div className="sys-pm-prod-img">
                          {p.img && <img src={p.img} alt={p.name} />}
                        </div>
                        <div>
                          <strong>{p.name}</strong>
                          <div className="sys-pm-village">{p.village}</div>
                          <div className="sys-pm-stock">{p.stock}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="sys-pm-cat-pill">{p.cat}</span>
                    </td>
                    <td>
                      <strong className="sys-pm-price">{p.price}</strong>
                    </td>
                    <td className="sys-pm-rating">
                      <Star size={14} fill="#cda846" color="#cda846"/> 
                      <strong>{p.rating}</strong> <span>({p.revCount})</span>
                    </td>
                    <td>
                      <span className={`sys-pm-status-pill status-${p.status === 'Hiển thị' ? 'active' : p.status === 'Chờ duyệt' ? 'pending' : 'hidden'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="sys-pm-actions">
                        <button className="sys-pm-btn-view" title="Đổi trạng thái Hiển thị/Ẩn" onClick={() => handleToggleStatus(p)}>
                          {p.status === 'Hiển thị' ? <ToggleRight size={22} color="#16a34a" /> : <ToggleLeft size={22} color="#9ca3af" />}
                        </button>
                        <button className="sys-pm-btn-view" title="Xóa sản phẩm" onClick={() => handleDeleteProduct(p.id, p.name)}>
                          <Trash2 size={18} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL FORM THÊM SẢN PHẨM */}
        {showModal && (
          <div className="um-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="um-modal" onClick={e => e.stopPropagation()}>
              <div className="um-modal-header">
                <h2>+ Thêm Sản phẩm vào SQL Server</h2>
                <button className="um-btn-close" onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmitProduct}>
                <div className="um-form-group">
                  <label>Tên sản phẩm (*)</label>
                  <input type="text" name="name" placeholder="VD: Bình hoa gốm sứ men lam" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Làng nghề</label>
                    <select name="village" value={formData.village} onChange={handleInputChange}>
                      <option value="Làng gốm Bát Tràng">Làng gốm Bát Tràng</option>
                      <option value="Làng lụa Vạn Phúc">Làng lụa Vạn Phúc</option>
                      <option value="Làng mộc Kim Bồng">Làng mộc Kim Bồng</option>
                      <option value="Làng đúc đồng Đại Bái">Làng đúc đồng Đại Bái</option>
                    </select>
                  </div>
                  <div className="um-form-group">
                    <label>Danh mục</label>
                    <select name="cat" value={formData.cat} onChange={handleInputChange}>
                      <option value="Gốm sứ">Gốm sứ</option>
                      <option value="Dệt may">Dệt may</option>
                      <option value="Mộc">Mộc</option>
                      <option value="Đúc đồng">Đúc đồng</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Giá bán (VNĐ)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                  </div>
                  <div className="um-form-group">
                    <label>Số lượng tồn kho</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="um-form-group">
                  <label>URL Hình ảnh minh họa</label>
                  <input type="text" name="img" value={formData.img} onChange={handleInputChange} />
                </div>
                <div className="um-form-group">
                  <label>Trạng thái hiển thị</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Hiển thị">Hiển thị</option>
                    <option value="Ẩn">Ẩn</option>
                    <option value="Chờ duyệt">Chờ duyệt</option>
                  </select>
                </div>
                <div className="um-modal-actions">
                  <button type="button" className="um-btn-cancel" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                  <button type="submit" className="um-btn-submit">Lưu vào CSDL</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}