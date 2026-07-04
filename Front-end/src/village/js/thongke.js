import React, { useState } from 'react';
import '../css/thongke.css';
import { 
  DollarSign, ShoppingBag, Eye, TrendingUp, 
  Download, ArrowUpRight 
} from 'lucide-react';

export default function ThongKe() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="stat-main">
      {/* HEADER */}
      <div className="stat-header">
        <div>
          <h1 className="stat-title">Báo cáo &amp; Thống kê Doanh thu Làng nghề</h1>
          <p className="stat-subtitle">Phân tích hiệu suất bán hàng, lượt khách tham quan và xu hướng tăng trưởng</p>
        </div>
        <div className="stat-actions">
          <div className="stat-time-filters">
            <button className={`stat-time-btn ${timeRange === 'week' ? 'active' : ''}`} onClick={() => setTimeRange('week')}>Tuần này</button>
            <button className={`stat-time-btn ${timeRange === 'month' ? 'active' : ''}`} onClick={() => setTimeRange('month')}>Tháng này</button>
            <button className={`stat-time-btn ${timeRange === 'year' ? 'active' : ''}`} onClick={() => setTimeRange('year')}>Năm nay</button>
          </div>
          <button className="stat-btn-export" onClick={() => alert('Đang xuất dữ liệu báo cáo sang file Excel...')}>
            <Download size={16} /> Xuất Báo cáo
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="stat-kpi-grid">
        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">DOANH THU THỰC TẾ</span>
            <div className="kpi-icon-box bg-yellow-light text-yellow">
              <DollarSign size={18} />
            </div>
          </div>
          <h2 className="kpi-value">128.500.000đ</h2>
          <p className="kpi-trend text-green">
            <ArrowUpRight size={14} /> +18.5% so với tháng trước
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TỔNG ĐƠN HÀNG</span>
            <div className="kpi-icon-box bg-orange-light text-orange">
              <ShoppingBag size={18} />
            </div>
          </div>
          <h2 className="kpi-value">342 Đơn</h2>
          <p className="kpi-trend text-green">
            <ArrowUpRight size={14} /> +12.3% so với tháng trước
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">LƯỢT KHÁCH GHÉ THĂM</span>
            <div className="kpi-icon-box bg-blue-light text-blue">
              <Eye size={18} />
            </div>
          </div>
          <h2 className="kpi-value">14,520</h2>
          <p className="kpi-trend text-green">
            <ArrowUpRight size={14} /> +24.1% lượng du khách mới
          </p>
        </div>

        <div className="stat-kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TỶ LỆ CHUYỂN ĐỔI</span>
            <div className="kpi-icon-box bg-green-light text-green">
              <TrendingUp size={18} />
            </div>
          </div>
          <h2 className="kpi-value">4.85%</h2>
          <p className="kpi-trend text-green">
            <ArrowUpRight size={14} /> +0.6% hiệu quả bán hàng
          </p>
        </div>
      </div>

      {/* MIDDLE CHARTS */}
      <div className="stat-middle-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <h3>Biểu đồ tăng trưởng Doanh thu &amp; Đơn hàng</h3>
          </div>
          <div className="mock-chart-container">
            <div className="chart-y-axis">
              <span>150M</span>
              <span>100M</span>
              <span>50M</span>
              <span>0</span>
            </div>
            <div className="chart-grid-lines">
              <div></div><div></div><div></div><div></div>
            </div>
            <div className="mock-line-chart" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '10px' }}>
              <div style={{ width: '12%', height: '45%', background: '#cda846', borderRadius: '4px 4px 0 0' }} title="Tuần 1: 58M"></div>
              <div style={{ width: '12%', height: '65%', background: '#cda846', borderRadius: '4px 4px 0 0' }} title="Tuần 2: 82M"></div>
              <div style={{ width: '12%', height: '55%', background: '#cda846', borderRadius: '4px 4px 0 0' }} title="Tuần 3: 71M"></div>
              <div style={{ width: '12%', height: '88%', background: '#b45309', borderRadius: '4px 4px 0 0' }} title="Tuần 4: 128M"></div>
            </div>
            <div className="chart-x-axis">
              <span>Tuần 1</span>
              <span>Tuần 2</span>
              <span>Tuần 3</span>
              <span>Tuần 4</span>
            </div>
            <div className="chart-legend">
              <span className="legend-dot bg-yellow"></span> Doanh thu (VNĐ)
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3>Tỷ trọng Danh mục</h3>
          </div>
          <div className="mock-donut-container">
            <div className="donut-chart"></div>
            <ul className="donut-legend">
              <li><span><span className="legend-dot bg-yellow"></span>Gốm gia dụng</span><strong>36%</strong></li>
              <li><span><span className="legend-dot bg-orange"></span>Gốm trang trí</span><strong>27%</strong></li>
              <li><span><span className="legend-dot bg-green-dark"></span>Gốm phong thủy</span><strong>21%</strong></li>
              <li><span><span className="legend-dot bg-gray"></span>Khác</span><strong>16%</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* TOP PRODUCTS TABLE */}
      <div className="stat-card stat-table-card">
        <div className="stat-card-header" style={{ padding: '1.5rem 1.5rem 0' }}>
          <h3>Top Sản phẩm bán chạy nhất</h3>
        </div>
        <table className="stat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Đã bán</th>
              <th>Doanh thu</th>
              <th>Tỷ lệ bán ra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className="rank-badge rank-1">1</div></td>
              <td><strong>Bình hoa gốm men ngọc Bát Tràng</strong></td>
              <td>120 chiếc</td>
              <td style={{ color: '#b45309', fontWeight: 'bold' }}>54.000.000đ</td>
              <td>
                <div className="ratio-cell">
                  <div className="ratio-bar-bg"><div className="ratio-bar-fill" style={{ width: '85%' }}></div></div>
                  <span className="ratio-text">85%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td><div className="rank-badge rank-2">2</div></td>
              <td><strong>Bộ ấm chén gốm men rạn cổ trạm bọc đồng</strong></td>
              <td>84 bộ</td>
              <td style={{ color: '#b45309', fontWeight: 'bold' }}>105.000.000đ</td>
              <td>
                <div className="ratio-cell">
                  <div className="ratio-bar-bg"><div className="ratio-bar-fill" style={{ width: '70%' }}></div></div>
                  <span className="ratio-text">70%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td><div className="rank-badge rank-3">3</div></td>
              <td><strong>Đĩa gốm phong thủy vẽ cá chép hoa sen</strong></td>
              <td>65 chiếc</td>
              <td style={{ color: '#b45309', fontWeight: 'bold' }}>55.250.000đ</td>
              <td>
                <div className="ratio-cell">
                  <div className="ratio-bar-bg"><div className="ratio-bar-fill" style={{ width: '55%' }}></div></div>
                  <span className="ratio-text">55%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
