import React, { useState } from 'react';
import '../css/quanlydonhang.css';
import { 
  ShoppingBag, Clock, CheckCircle, Truck, CheckCircle2, 
  XCircle, Search, Eye, ChevronLeft, ChevronRight 
} from 'lucide-react';

const initialOrders = [
  {
    id: 'ORD-2026-089',
    customer: 'Nguyễn Văn A',
    phone: '0912 345 678',
    date: '02/07/2026 14:30',
    items: 'Bình hoa gốm men ngọc (x1)',
    total: '450.000đ',
    payment: 'COD (Chưa thanh toán)',
    status: 'new',
    statusLabel: 'Mới đặt hàng'
  },
  {
    id: 'ORD-2026-088',
    customer: 'Trần Thị B',
    phone: '0988 777 666',
    date: '01/07/2026 10:15',
    items: 'Bộ ấm chén men rạn cổ (x2)',
    total: '2.500.000đ',
    payment: 'Chuyển khoản Ngân hàng',
    status: 'shipping',
    statusLabel: 'Đang vận chuyển'
  },
  {
    id: 'ORD-2026-085',
    customer: 'Lê Hoàng C',
    phone: '0903 111 222',
    date: '28/06/2026 16:45',
    items: 'Đĩa gốm phong thủy cá chép (x1)',
    total: '850.000đ',
    payment: 'Đã thanh toán Online',
    status: 'delivered',
    statusLabel: 'Đã giao thành công'
  }
];

export default function QuanLyDonHang() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = (id, newStatus, newLabel) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus, statusLabel: newLabel } : o));
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  return (
    <div className="om-main">
      {/* HEADER */}
      <div className="om-header">
        <h1 className="om-title">Quản lý Đơn hàng Làng nghề</h1>
        <p className="om-subtitle">Theo dõi, duyệt và điều phối vận chuyển đơn hàng thủ công mỹ nghệ từ khách hàng</p>
      </div>

      {/* STATS GRID */}
      <div className="om-stats-grid">
        <div className="om-stat-card">
          <div className="om-icon-box bg-blue-light text-blue"><ShoppingBag size={18} /></div>
          <h3>342</h3>
          <p>Tổng đơn hàng</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-yellow-light text-yellow"><Clock size={18} /></div>
          <h3>12</h3>
          <p>Chờ xác nhận</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-orange-light text-orange"><CheckCircle size={18} /></div>
          <h3>8</h3>
          <p>Đã đóng gói</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-purple-light text-purple"><Truck size={18} /></div>
          <h3>15</h3>
          <p>Đang giao hàng</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-green-light text-green"><CheckCircle2 size={18} /></div>
          <h3>302</h3>
          <p>Đã hoàn thành</p>
        </div>

        <div className="om-stat-card">
          <div className="om-icon-box bg-red-light text-red"><XCircle size={18} /></div>
          <h3>5</h3>
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
        <span className="om-total-text">Hiển thị {filteredOrders.length} đơn hàng</span>
      </div>

      {/* TABLE */}
      <div className="om-table-container">
        <table className="om-table">
          <thead>
            <tr>
              <th>MÃ ĐƠN &amp; THỜI GIAN</th>
              <th>KHÁCH HÀNG</th>
              <th>SẢN PHẨM</th>
              <th>TỔNG TIỀN</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>
                  <strong>{o.id}</strong>
                  <div className="om-subtext">{o.date}</div>
                </td>
                <td>
                  <strong>{o.customer}</strong>
                  <div className="om-subtext">{o.phone}</div>
                </td>
                <td>{o.items}</td>
                <td>
                  <div className="om-price-text"><strong>{o.total}</strong></div>
                  <div className="om-payment-text">{o.payment}</div>
                </td>
                <td>
                  <span className={`om-status-pill status-${o.status}`}>
                    {o.status === 'delivered' ? <CheckCircle2 size={14} /> : <Truck size={14} />}
                    {o.statusLabel}
                  </span>
                </td>
                <td>
                  <div className="om-actions">
                    <button className="om-btn-icon" title="Xem chi tiết" onClick={() => alert(`Chi tiết đơn hàng: ${o.id}\nKhách hàng: ${o.customer}\nSản phẩm: ${o.items}\nTổng: ${o.total}`)}>
                      <Eye size={18} />
                    </button>
                    <div className="om-action-buttons">
                      {o.status === 'new' && (
                        <>
                          <button className="om-btn-primary" onClick={() => handleUpdateStatus(o.id, 'shipping', 'Đang vận chuyển')}>
                            Duyệt giao
                          </button>
                          <button className="om-btn-cancel" onClick={() => handleUpdateStatus(o.id, 'cancelled', 'Đã hủy')}>
                            Hủy
                          </button>
                        </>
                      )}
                      {o.status === 'shipping' && (
                        <button className="om-btn-primary" style={{ background: '#16a34a' }} onClick={() => handleUpdateStatus(o.id, 'delivered', 'Đã giao thành công')}>
                          Hoàn tất
                        </button>
                      )}
                      {o.status === 'delivered' && (
                        <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Xong</span>
                      )}
                      {o.status === 'cancelled' && (
                        <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 600 }}>Đã hủy</span>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="om-pagination">
          <span>Trang 1 / 1</span>
          <div className="om-page-controls">
            <button disabled><ChevronLeft size={16} /> Trước</button>
            <button disabled>Sau <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
