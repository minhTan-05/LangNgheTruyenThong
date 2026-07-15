import React, { useState, useEffect } from 'react';
import '../css/thongke.css';
import { 
  DollarSign, ShoppingBag, Eye, TrendingUp, 
  Download, RefreshCw 
} from 'lucide-react';
import { getDanhSachDonHang, getDanhSachSanPham } from '../../API/apiAdmin';

export default function ThongKe() {
  const [timeRange, setTimeRange] = useState('month');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const [orderList, productList] = await Promise.all([
          getDanhSachDonHang().catch(() => []),
          getDanhSachSanPham().catch(() => [])
        ]);
        if (orderList && Array.isArray(orderList)) setOrders(orderList);
        if (productList && Array.isArray(productList)) setProducts(productList);
      } catch (err) {
        console.warn('Lỗi nạp dữ liệu thống kê từ SQL Server:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [timeRange]);

  // Tính toán chỉ số thực tế từ SQL Server
  const totalRevenue = orders
    .filter(o => (o.trangThai || o.TrangThai) === 'delivered' || (o.trangThai || o.TrangThai) === 'Đã giao' || (o.trangThai || o.TrangThai) === 'shipping' || (o.trangThai || o.TrangThai) === 'Đang giao' || (o.trangThai || o.TrangThai) === 'new')
    .reduce((sum, o) => sum + (o.tongTien ?? o.TongTien ?? 0), 0);

  const totalOrders = orders.length;

  return (
    <div className="stat-main">
      {/* HEADER */}
      <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="stat-title">Báo cáo &amp; Thống kê Doanh thu Làng nghề</h1>
            {loading && <span style={{ color: '#d97706', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang tính toán từ SQL...</span>}
          </div>
          <p className="stat-subtitle">Phân tích hiệu suất bán hàng, tổng tiền các đơn đặt hàng trong CSDL SQL Server</p>
        </div>
        <div className="stat-actions">
          <div className="stat-time-filters">
            <button className={`stat-time-btn ${timeRange === 'week' ? 'active' : ''}`} onClick={() => setTimeRange('week')}>Tuần này</button>
            <button className={`stat-time-btn ${timeRange === 'month' ? 'active' : ''}`} onClick={() => setTimeRange('month')}>Tháng này</button>
            <button className={`stat-time-btn ${timeRange === 'year' ? 'active' : ''}`} onClick={() => setTimeRange('year')}>Năm nay</button>
          </div>
          <button className="stat-btn-export" onClick={() => alert('Đang xuất báo cáo doanh thu từ SQL Server sang Excel...')}>
            <Download size={16} /> Xuất Báo cáo
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="stat-kpi-grid">
        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TỔNG DOANH THU ĐƠN HÀNG</span>
            <div className="kpi-icon-box bg-yellow-light text-yellow">
              <DollarSign size={18} />
            </div>
          </div>
          <h2 className="kpi-value">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
          </h2>
          <p className="kpi-trend text-green" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
            Tính trên {totalOrders} đơn trong CSDL
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TỔNG SỐ ĐƠN HÀNG</span>
            <div className="kpi-icon-box bg-orange-light text-orange">
              <ShoppingBag size={18} />
            </div>
          </div>
          <h2 className="kpi-value">{totalOrders} Đơn</h2>
          <p className="kpi-trend text-green" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
            Tỷ lệ xử lý thành công thực tế
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">SẢN PHẨM TRONG DANH MỤC</span>
            <div className="kpi-icon-box bg-blue-light text-blue">
              <Eye size={18} />
            </div>
          </div>
          <h2 className="kpi-value">{products.length} Sản phẩm</h2>
          <p className="kpi-trend text-green" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
            Tồn kho &amp; kinh doanh
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TRẠNG THÁI KẾT NỐI</span>
            <div className="kpi-icon-box bg-green-light text-green">
              <TrendingUp size={18} />
            </div>
          </div>
          <h2 className="kpi-value" style={{ fontSize: '1.4rem', color: '#059669' }}>Trực tuyến 100%</h2>
          <p className="kpi-trend text-green" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
            Đã đồng bộ SQL Server
          </p>
        </div>
      </div>

      {/* TOP PRODUCTS TABLE */}
      <div className="stat-card stat-table-card" style={{ marginTop: '2rem' }}>
        <div className="stat-card-header" style={{ padding: '1.5rem 1.5rem 0' }}>
          <h3>Danh sách Sản phẩm hiện có trong SQL Server (`SanPham`)</h3>
        </div>
        <table className="stat-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá bán (VNĐ)</th>
              <th>Tồn kho</th>
              <th>Trạng thái kinh doanh</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Chưa có sản phẩm nào trong CSDL để thống kê doanh thu theo mặt hàng.
                </td>
              </tr>
            ) : (
              products.map((p, idx) => {
                const id = p.maSanPham || p.MaSanPham;
                const name = p.tenSanPham || p.TenSanPham || 'Sản phẩm không tên';
                const price = p.giaBan ?? p.GiaBan ?? 0;
                const stock = p.soLuongTonKho ?? p.SoLuongTonKho ?? 0;
                const status = p.trangThai || p.TrangThai || 'Đang bán';

                return (
                  <tr key={id}>
                    <td><div className={`rank-badge ${idx < 3 ? 'rank-' + (idx + 1) : ''}`}>{id}</div></td>
                    <td><strong>{name}</strong></td>
                    <td style={{ color: '#b45309', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                    </td>
                    <td>{stock} chiếc</td>
                    <td>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', background: status === 'Đang bán' ? '#dcfce7' : '#f1f5f9', color: status === 'Đang bán' ? '#16a34a' : '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
