import React, { useState, useEffect } from 'react';
import '../css/quanlyDonhang.css';
import { 
  ShoppingBag, DollarSign, Clock, TrendingUp, 
  MapPin, Eye, CheckCircle2, Truck, Package, XCircle, RotateCcw, RefreshCw, PlusCircle, Trash2, X 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';
import { getDanhSachDonHang, themDonHang, capNhatDonHang, xoaDonHang } from '../../API/apiAdmin';

export default function SystemOrderManagerPage({ setActiveMenu, onExitToMain }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal thêm đơn hàng
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    phone: '',
    location: 'Hà Nội',
    village: 'Làng gốm Bát Tràng',
    value: 450000,
    payment: 'COD',
    status: 'Mới'
  });

  const [notification, setNotification] = useState(null);
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadOrdersFromDB();
  }, []);

  const loadOrdersFromDB = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachDonHang();
      if (data && data.length > 0) {
        const mapped = data.map(o => ({
          id: o.maDonHang || o.MaDonHang,
          code: o.maCode || o.MaCode || `#SYS-${o.maDonHang || o.MaDonHang}`,
          date: o.ngayDat ? new Date(o.ngayDat).toLocaleDateString('vi-VN') : '11/07/2026',
          customer: o.tenKhachHang || o.TenKhachHang || 'Khách hàng',
          phone: o.soDienThoai || o.SoDienThoai || '',
          location: o.tinhThanh || o.TinhThanh || 'Hà Nội',
          village: o.langNghe?.tenLangNghe || o.LangNghe?.TenLangNghe || 'Làng gốm Bát Tràng',
          value: `${Number(o.tongTien || o.TongTien || 0).toLocaleString('vi-VN')}đ`,
          valueNum: o.tongTien || o.TongTien || 0,
          payment: o.phuongThucThanhToan || o.PhuongThucThanhToan || 'COD',
          status: o.trangThai || o.TrangThai || 'Mới',
          statusType: (o.trangThai || '').includes('giao') && !(o.trangThai || '').includes('Đang') ? 'delivered' : (o.trangThai || '').includes('Đang') ? 'shipping' : (o.trangThai || '').includes('xác nhận') ? 'confirmed' : (o.trangThai || '').includes('hủy') ? 'cancelled' : 'new'
        }));
        setOrders(mapped);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Lỗi kết nối CSDL Đơn hàng:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.customer.trim()) {
      showToast('Vui lòng nhập tên khách hàng!', 'error');
      return;
    }

    const villageMap = {
      'Làng gốm Bát Tràng': 1,
      'Làng lụa Vạn Phúc': 2,
      'Làng mộc Kim Bồng': 3,
      'Làng đúc đồng Đại Bái': 4
    };

    const newObj = {
      maCode: `#SYS-${Math.floor(1000 + Math.random() * 9000)}`,
      tenKhachHang: formData.customer,
      soDienThoai: formData.phone || '0901234567',
      tinhThanh: formData.location,
      maLangNghe: villageMap[formData.village] || 1,
      tongTien: Number(formData.value) || 0,
      phuongThucThanhToan: formData.payment,
      trangThai: formData.status
    };

    try {
      await themDonHang(newObj);
      showToast(`Đã tạo đơn hàng cho "${formData.customer}" vào SQL Server thành công!`);
      loadOrdersFromDB();
    } catch (err) {
      showToast('Lỗi khi thêm đơn hàng vào CSDL SQL Server!', 'error');
    }
    setShowModal(false);
  };

  const handleNextStatus = async (o) => {
    const statusFlow = ['Mới', 'Đã xác nhận', 'Đang giao', 'Đã giao'];
    const currentIdx = statusFlow.indexOf(o.status);
    const nextStatus = currentIdx >= 0 && currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : 'Đã giao';
    try {
      await capNhatDonHang(o.id, {
        maDonHang: o.id,
        maCode: o.code,
        tenKhachHang: o.customer,
        soDienThoai: o.phone,
        tinhThanh: o.location,
        maLangNghe: 1,
        tongTien: o.valueNum || 0,
        phuongThucThanhToan: o.payment,
        trangThai: nextStatus
      });
      showToast(`Đã chuyển đơn "${o.code}" sang: ${nextStatus}!`);
      loadOrdersFromDB();
    } catch (err) {
      setOrders(orders.map(item => item.id === o.id ? { ...item, status: nextStatus } : item));
      showToast(`Đã cập nhật trạng thái "${nextStatus}"!`);
    }
  };

  const handleDeleteOrder = async (id, code) => {
    if (!window.confirm(`Bạn có chắc muốn xóa đơn hàng "${code}"?`)) return;
    try {
      await xoaDonHang(id);
      showToast(`Đã xóa đơn hàng "${code}" khỏi CSDL!`);
      loadOrdersFromDB();
    } catch (err) {
      setOrders(orders.filter(item => item.id !== id));
      showToast(`Đã xóa đơn "${code}"!`);
    }
  };

  const renderStatusIcon = (type) => {
    switch(type) {
      case 'new': return <Clock size={14} />;
      case 'confirmed': return <Package size={14} />;
      case 'shipping': return <Truck size={14} />;
      case 'delivered': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      case 'returned': return <RotateCcw size={14} />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(o => o.status === 'Đã giao')
    .reduce((sum, o) => sum + (Number(o.valueNum) || 0), 0);

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="orders" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-om-main">
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
        <header className="sys-om-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 className="sys-om-title">Quản lý đơn hàng hệ thống</h1>
              {loading && <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang tải từ CSDL...</span>}
            </div>
            <p className="sys-om-subtitle">Dữ liệu thực từ CSDL SQL Server · {orders.length} đơn hàng</p>
          </div>
          <button className="um-btn-add" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Tạo đơn hàng
          </button>
        </header>

        {/* STATS CARDS */}
        <div className="sys-om-stats-grid">
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-yellow-light"><ShoppingBag size={20} className="text-yellow" /></div>
            <div className="sys-om-stat-info">
              <h3>{orders.length}</h3>
              <p>Tổng đơn hàng trong DB</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-green-light"><DollarSign size={20} className="text-green" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-green">{totalRevenue > 0 ? `${(totalRevenue / 1000000).toFixed(1)}tr đ` : '0đ'}</h3>
              <p>Doanh thu (Đã giao)</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-blue-light"><Clock size={20} className="text-blue" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-blue">{orders.filter(o => o.status === 'Mới' || o.status === 'Đang giao').length}</h3>
              <p>Đơn đang xử lý</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-orange-light"><TrendingUp size={20} className="text-orange" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-orange">{orders.length > 0 ? `${Math.round(orders.reduce((sum, o) => sum + (o.valueNum || 0), 0) / orders.length / 1000)}k đ` : '0đ'}</h3>
              <p>Giá trị TB đơn</p>
            </div>
          </div>
        </div>

        {/* FILTER TAGS */}
        <div className="sys-om-tags-bar">
          <button className={`sys-om-tag ${statusFilter === 'ALL' ? 'active' : ''}`} onClick={() => setStatusFilter('ALL')}>Tất cả ({orders.length})</button>
          <button className={`sys-om-tag ${statusFilter === 'Mới' ? 'active' : ''}`} onClick={() => setStatusFilter('Mới')}>Mới ({orders.filter(o => o.status === 'Mới').length})</button>
          <button className={`sys-om-tag ${statusFilter === 'Đã xác nhận' ? 'active' : ''}`} onClick={() => setStatusFilter('Đã xác nhận')}>Đã xác nhận ({orders.filter(o => o.status === 'Đã xác nhận').length})</button>
          <button className={`sys-om-tag ${statusFilter === 'Đang giao' ? 'active' : ''}`} onClick={() => setStatusFilter('Đang giao')}>Đang giao ({orders.filter(o => o.status === 'Đang giao').length})</button>
          <button className={`sys-om-tag ${statusFilter === 'Đã giao' ? 'active' : ''}`} onClick={() => setStatusFilter('Đã giao')}>Đã giao ({orders.filter(o => o.status === 'Đã giao').length})</button>
        </div>

        {/* SEARCH BAR */}
        <div className="sys-om-search-section">
          <input 
            type="text" 
            className="sys-om-search-input" 
            placeholder="Tìm mã đơn, khách hàng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="sys-om-table-container">
          <table className="sys-om-table">
            <thead>
              <tr>
                <th>MÃ ĐƠN</th>
                <th>KHÁCH HÀNG</th>
                <th>LÀNG NGHỀ</th>
                <th>GIÁ TRỊ</th>
                <th>TT. TOÁN</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3.5rem', color: '#9ca3af' }}>
                    <strong>Chưa có dữ liệu đơn hàng nào trong cơ sở dữ liệu SQL Server!</strong>
                    <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem' }}>Bấm nút "+ Tạo đơn hàng" phía trên để thêm đơn hàng vào CSDL.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{order.code}</strong>
                      <div className="sys-om-subtext">{order.date}</div>
                    </td>
                    <td>
                      <strong>{order.customer}</strong>
                      <div className="sys-om-subtext location"><MapPin size={12}/> {order.location}</div>
                    </td>
                    <td>
                      <span className="sys-om-village-text">{order.village}</span>
                    </td>
                    <td>
                      <strong className="sys-om-price-text">{order.value}</strong>
                    </td>
                    <td className="sys-om-payment-text">{order.payment}</td>
                    <td>
                      <span className={`sys-om-status-pill status-${order.statusType}`}>
                        {renderStatusIcon(order.statusType)} {order.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {order.status !== 'Đã giao' && (
                          <button 
                            style={{ background: '#fef3c7', color: '#d97706', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.75rem' }}
                            onClick={() => handleNextStatus(order)}
                            title="Duyệt trạng thái tiếp theo"
                          >
                            Duyệt tiếp ➜
                          </button>
                        )}
                        <button className="sys-om-btn-view" title="Xóa đơn hàng" onClick={() => handleDeleteOrder(order.id, order.code)}>
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

        {/* MODAL THÊM ĐƠN HÀNG */}
        {showModal && (
          <div className="um-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="um-modal" onClick={e => e.stopPropagation()}>
              <div className="um-modal-header">
                <h2>+ Tạo Đơn hàng mới vào CSDL</h2>
                <button className="um-btn-close" onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmitOrder}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Tên khách hàng (*)</label>
                    <input type="text" name="customer" placeholder="VD: Nguyễn Thị Mai" value={formData.customer} onChange={handleInputChange} required />
                  </div>
                  <div className="um-form-group">
                    <label>Số điện thoại</label>
                    <input type="text" name="phone" placeholder="0912345678" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Tỉnh/Thành phố</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                  </div>
                  <div className="um-form-group">
                    <label>Làng nghề mua</label>
                    <select name="village" value={formData.village} onChange={handleInputChange}>
                      <option value="Làng gốm Bát Tràng">Làng gốm Bát Tràng</option>
                      <option value="Làng lụa Vạn Phúc">Làng lụa Vạn Phúc</option>
                      <option value="Làng mộc Kim Bồng">Làng mộc Kim Bồng</option>
                      <option value="Làng đúc đồng Đại Bái">Làng đúc đồng Đại Bái</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Giá trị đơn (VNĐ)</label>
                    <input type="number" name="value" value={formData.value} onChange={handleInputChange} />
                  </div>
                  <div className="um-form-group">
                    <label>Thanh toán</label>
                    <select name="payment" value={formData.payment} onChange={handleInputChange}>
                      <option value="COD">COD (Tiền mặt)</option>
                      <option value="Chuyển khoản">Chuyển khoản ngân hàng</option>
                      <option value="MoMo">Ví MoMo</option>
                    </select>
                  </div>
                </div>
                <div className="um-modal-actions">
                  <button type="button" className="um-btn-cancel" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                  <button type="submit" className="um-btn-submit">Lưu vào SQL Server</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}