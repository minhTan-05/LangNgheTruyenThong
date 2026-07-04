import React from 'react';
import '../css/quanlyDonhang.css';
import { 
  ShoppingBag, DollarSign, Clock, TrendingUp, 
  MapPin, Eye, CheckCircle2, Truck, Package, XCircle, RotateCcw 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemOrderManagerPage({ setActiveMenu, onExitToMain }) {
  const orders = [
    {
      id: '#SYS-001', date: '27/06/2026',
      customer: 'Nguyễn Thị Lan', location: 'Hà Nội',
      village: 'Làng gốm Bát Tràng',
      value: '450.000đ', payment: 'COD',
      status: 'Đã giao', statusType: 'delivered'
    },
    {
      id: '#SYS-002', date: '26/06/2026',
      customer: 'Trần Văn Hùng', location: 'Hồ Chí Minh',
      village: 'Làng lụa Vạn Phúc',
      value: '1.700.000đ', payment: 'Chuyển khoản',
      status: 'Đang giao', statusType: 'shipping'
    },
    {
      id: '#SYS-003', date: '25/06/2026',
      customer: 'Lê Minh Châu', location: 'Đà Nẵng',
      village: 'Làng mộc Kim Bồng',
      value: '15.000.000đ', payment: 'Chuyển khoản',
      status: 'Đã xác nhận', statusType: 'confirmed'
    },
    {
      id: '#SYS-004', date: '27/06/2026',
      customer: 'Phạm Thị Dung', location: 'Hải Phòng',
      village: 'Làng đúc đồng Đại Bái',
      value: '2.500.000đ', payment: 'MoMo',
      status: 'Mới', statusType: 'new'
    },
    {
      id: '#SYS-005', date: '24/06/2026',
      customer: 'Hoàng Văn Em', location: 'Hà Nội',
      village: 'Làng gốm Bát Tràng',
      value: '1.360.000đ', payment: 'COD',
      status: 'Đã hủy', statusType: 'cancelled'
    },
    {
      id: '#SYS-006', date: '20/06/2026',
      customer: 'Vũ Thị Hoa', location: 'Cần Thơ',
      village: 'Làng lụa Vạn Phúc',
      value: '3.200.000đ', payment: 'Chuyển khoản',
      status: 'Hoàn trả', statusType: 'returned'
    },
    {
      id: '#SYS-007', date: '19/06/2026',
      customer: 'Đặng Minh Tuấn', location: 'Hà Nội',
      village: 'Làng gốm Bát Tràng',
      value: '1.350.000đ', payment: 'COD',
      status: 'Đã giao', statusType: 'delivered'
    }
  ];

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

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="orders" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-om-main">
        {/* HEADER */}
        <header className="sys-om-header">
          <h1 className="sys-om-title">Quản lý đơn hàng</h1>
          <p className="sys-om-subtitle">Toàn hệ thống · 8 đơn hàng</p>
        </header>

        {/* STATS CARDS */}
        <div className="sys-om-stats-grid">
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-yellow-light"><ShoppingBag size={20} className="text-yellow" /></div>
            <div className="sys-om-stat-info">
              <h3>8</h3>
              <p>Tổng đơn hàng</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-green-light"><DollarSign size={20} className="text-green" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-green">1.8tr đ</h3>
              <p>Doanh thu (đã giao)</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-blue-light"><Clock size={20} className="text-blue" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-blue">2</h3>
              <p>Đơn đang xử lý</p>
            </div>
          </div>
          <div className="sys-om-stat-card">
            <div className="sys-om-icon-box bg-orange-light"><TrendingUp size={20} className="text-orange" /></div>
            <div className="sys-om-stat-info">
              <h3 className="text-orange">5183k đ</h3>
              <p>Giá trị TB đơn</p>
            </div>
          </div>
        </div>

        {/* FILTER TAGS */}
        <div className="sys-om-tags-bar">
          <button className="sys-om-tag active">Tất cả (8)</button>
          <button className="sys-om-tag tag-new">Mới (1)</button>
          <button className="sys-om-tag tag-confirmed">Đã xác nhận (1)</button>
          <button className="sys-om-tag tag-shipping">Đang giao (2)</button>
          <button className="sys-om-tag tag-delivered">Đã giao (2)</button>
          <button className="sys-om-tag tag-cancelled">Đã hủy (1)</button>
          <button className="sys-om-tag tag-returned">Hoàn trả (1)</button>
        </div>

        {/* SEARCH BAR */}
        <div className="sys-om-search-section">
          <input type="text" className="sys-om-search-input" placeholder="Tìm mã đơn, khách hàng, SĐT..." />
          <div className="sys-om-placeholder-dropdown"></div>
          <div className="sys-om-placeholder-dropdown"></div>
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
                <th>XEM</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{order.id}</strong>
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
                    <button className="sys-om-btn-view" title="Xem chi tiết">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}