import React, { useState, useEffect } from 'react';
import '../css/quanlydonhang.css';
import { 
  ShoppingBag, Clock, CheckCircle, Truck, CheckCircle2, 
  XCircle, Search, Eye, RefreshCw, Plus, X 
} from 'lucide-react';
import { getDanhSachDonHang, themDonHang, capNhatDonHang, xoaDonHang } from '../../API/apiAdmin';

export default function QuanLyDonHang() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tenKhachHang, setTenKhachHang] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [diaChiGiaoHang, setDiaChiGiaoHang] = useState('');
  const [tongTien, setTongTien] = useState('');
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('COD');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachDonHang();
      if (data && Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp danh sách đơn hàng từ SQL Server:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        MaCode: `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        TenKhachHang: tenKhachHang,
        SoDienThoai: soDienThoai,
        DiaChiGiaoHang: diaChiGiaoHang,
        TongTien: parseFloat(tongTien) || 0,
        PhuongThucThanhToan: phuongThucThanhToan,
        TrangThai: 'new', // new -> shipping -> delivered -> cancelled
        MaLangNghe: 1
      };

      await themDonHang(newOrder);
      setShowModal(false);
      setTenKhachHang('');
      setSoDienThoai('');
      setDiaChiGiaoHang('');
      setTongTien('');
      fetchOrders();
      alert('Tạo đơn hàng mới vào SQL Server thành công!');
    } catch (err) {
      console.error('Lỗi khi tạo đơn hàng:', err);
      alert('Lỗi khi lưu vào CSDL SQL Server.');
    }
  };

  const handleUpdateStatus = async (order, newStatus) => {
    const id = order.maDonHang || order.MaDonHang;
    try {
      await capNhatDonHang(id, {
        ...order,
        TrangThai: newStatus
      });
      fetchOrders();
    } catch (err) {
      console.error('Lỗi khi cập nhật đơn hàng:', err);
      alert('Không thể cập nhật trạng thái đơn hàng trên SQL Server.');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này khỏi SQL Server?')) {
      try {
        await xoaDonHang(id);
        fetchOrders();
      } catch (err) {
        console.error('Lỗi khi xóa đơn hàng:', err);
        alert('Lỗi khi xóa đơn hàng khỏi SQL Server.');
      }
    }
  };

  const filteredOrders = orders.filter(o => {
    const code = o.maCode || o.MaCode || '';
    const cust = o.tenKhachHang || o.TenKhachHang || '';
    const phone = o.soDienThoai || o.SoDienThoai || '';
    return code.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cust.toLowerCase().includes(searchTerm.toLowerCase()) ||
           phone.includes(searchTerm);
  });

  // Tính thống kê từ danh sách thực tế
  const totalOrders = orders.length;
  const newCount = orders.filter(o => (o.trangThai || o.TrangThai) === 'new' || (o.trangThai || o.TrangThai) === 'Mới').length;
  const shippingCount = orders.filter(o => (o.trangThai || o.TrangThai) === 'shipping' || (o.trangThai || o.TrangThai) === 'Đang giao').length;
  const deliveredCount = orders.filter(o => (o.trangThai || o.TrangThai) === 'delivered' || (o.trangThai || o.TrangThai) === 'Đã giao').length;
  const cancelledCount = orders.filter(o => (o.trangThai || o.TrangThai) === 'cancelled' || (o.trangThai || o.TrangThai) === 'Đã hủy').length;

  return (
    <div className="om-main">
      {/* HEADER */}
      <div className="om-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="om-title">Quản lý Đơn hàng Làng nghề</h1>
            {loading && <span style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang nạp từ SQL...</span>}
          </div>
          <p className="om-subtitle">Theo dõi, duyệt và điều phối vận chuyển đơn hàng thủ công mỹ nghệ từ CSDL SQL Server</p>
        </div>
        <button className="om-btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ea580c', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <Plus size={18} /> Tạo đơn hàng mới
        </button>
      </div>

      {/* STATS GRID */}
      <div className="om-stats-grid">
        <div className="om-stat-card">
          <div className="om-icon-box bg-blue-light text-blue"><ShoppingBag size={18} /></div>
          <h3>{totalOrders}</h3>
          <p>Tổng đơn hàng</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-yellow-light text-yellow"><Clock size={18} /></div>
          <h3>{newCount}</h3>
          <p>Chờ xác nhận</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-purple-light text-purple"><Truck size={18} /></div>
          <h3>{shippingCount}</h3>
          <p>Đang giao hàng</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-green-light text-green"><CheckCircle2 size={18} /></div>
          <h3>{deliveredCount}</h3>
          <p>Đã hoàn thành</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-red-light text-red"><XCircle size={18} /></div>
          <h3>{cancelledCount}</h3>
          <p>Đơn hủy</p>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="om-filter-section">
        <Search size={18} color="#9ca3af" />
        <input 
          type="text" 
          placeholder="Tìm kiếm theo mã đơn, tên khách hàng hoặc số điện thoại..." 
          className="om-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="om-total-text">Hiển thị {filteredOrders.length} / {totalOrders} đơn hàng</span>
      </div>

      {/* TABLE */}
      <div className="om-table-container">
        <table className="om-table">
          <thead>
            <tr>
              <th>MÃ ĐƠN &amp; THỜI GIAN</th>
              <th>KHÁCH HÀNG</th>
              <th>ĐỊA CHỈ</th>
              <th>TỔNG TIỀN &amp; TT</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Chưa có đơn hàng nào trong SQL Server cho Làng nghề. Bạn có thể nhấn "Tạo đơn hàng mới" để thêm!
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => {
                const id = o.maDonHang || o.MaDonHang;
                const code = o.maCode || o.MaCode || `#ORD-${id}`;
                const customer = o.tenKhachHang || o.TenKhachHang || 'Khách vãng lai';
                const phone = o.soDienThoai || o.SoDienThoai || 'N/A';
                const address = o.diaChiGiaoHang || o.DiaChiGiaoHang || 'Tại xưởng làng nghề';
                const total = o.tongTien ?? o.TongTien ?? 0;
                const payment = o.phuongThucThanhToan || o.PhuongThucThanhToan || 'COD';
                const status = o.trangThai || o.TrangThai || 'new';
                const dateStr = o.ngayDatHang ? new Date(o.ngayDatHang).toLocaleString('vi-VN') : 'Hôm nay';

                let statusText = 'Mới đặt hàng';
                let statusClass = 'status-new';
                if (status === 'shipping' || status === 'Đang giao') { statusText = 'Đang vận chuyển'; statusClass = 'status-shipping'; }
                else if (status === 'delivered' || status === 'Đã giao') { statusText = 'Đã giao thành công'; statusClass = 'status-delivered'; }
                else if (status === 'cancelled' || status === 'Đã hủy') { statusText = 'Đã hủy'; statusClass = 'status-cancelled'; }

                return (
                  <tr key={id}>
                    <td>
                      <strong>{code}</strong>
                      <div className="om-subtext">{dateStr}</div>
                    </td>
                    <td>
                      <strong>{customer}</strong>
                      <div className="om-subtext">{phone}</div>
                    </td>
                    <td>{address}</td>
                    <td>
                      <div className="om-price-text">
                        <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</strong>
                      </div>
                      <div className="om-payment-text">{payment}</div>
                    </td>
                    <td>
                      <span className={`om-status-pill ${statusClass}`}>
                        {status === 'delivered' ? <CheckCircle2 size={14} /> : <Truck size={14} />}
                        {statusText}
                      </span>
                    </td>
                    <td>
                      <div className="om-actions">
                        <div className="om-action-buttons">
                          {(status === 'new' || status === 'Mới') && (
                            <>
                              <button className="om-btn-primary" onClick={() => handleUpdateStatus(o, 'shipping')}>
                                Duyệt giao
                              </button>
                              <button className="om-btn-cancel" onClick={() => handleUpdateStatus(o, 'cancelled')}>
                                Hủy
                              </button>
                            </>
                          )}
                          {(status === 'shipping' || status === 'Đang giao') && (
                            <button className="om-btn-primary" style={{ background: '#16a34a' }} onClick={() => handleUpdateStatus(o, 'delivered')}>
                              Hoàn tất
                            </button>
                          )}
                          {(status === 'delivered' || status === 'Đã giao') && (
                            <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Xong</span>
                          )}
                          {(status === 'cancelled' || status === 'Đã hủy') && (
                            <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 600 }}>Đã hủy</span>
                          )}
                          <button onClick={() => handleDeleteOrder(id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', marginLeft: '6px', fontSize: '0.8rem', textDecoration: 'underline' }}>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TẠO ĐƠN HÀNG MỚI */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '12px', width: '500px', maxWidth: '90%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Tạo Đơn Hàng Mới Cho Làng Nghề</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateOrder}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tên khách hàng *</label>
                <input type="text" value={tenKhachHang} onChange={(e) => setTenKhachHang(e.target.value)} placeholder="Ví dụ: Nguyễn Văn Hải..." required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Số điện thoại *</label>
                  <input type="text" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)} placeholder="0912345678" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Tổng tiền (VNĐ) *</label>
                  <input type="number" value={tongTien} onChange={(e) => setTongTien(e.target.value)} placeholder="850000" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Địa chỉ giao hàng</label>
                <input type="text" value={diaChiGiaoHang} onChange={(e) => setDiaChiGiaoHang(e.target.value)} placeholder="Số nhà, đường, quận/huyện..." style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Phương thức thanh toán</label>
                <select value={phuongThucThanhToan} onChange={(e) => setPhuongThucThanhToan(e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                  <option value="Chuyển khoản">Chuyển khoản ngân hàng</option>
                  <option value="MoMo">Ví điện tử MoMo</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
                <button type="submit" style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#ea580c', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Lưu vào CSDL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
