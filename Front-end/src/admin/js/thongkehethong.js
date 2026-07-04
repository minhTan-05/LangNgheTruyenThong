import React from 'react';
import '../css/thongkehethong.css';
import { 
  Users, MapPin, DollarSign, ShoppingBag, 
  TrendingUp, Download, Package
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemStatisticsPage({ setActiveMenu, onExitToMain }) {
  const villagePerformance = [
    { id: 1, name: 'Bát Tràng', views: '15.420', orders: 280, revenue: '120tr đ', ratio: 28.6 },
    { id: 2, name: 'Vạn Phúc', views: '12.350', orders: 195, revenue: '98tr đ', ratio: 23.3 },
    { id: 3, name: 'Kim Bồng', views: '9.870', orders: 142, revenue: '85tr đ', ratio: 20.2 },
    { id: 4, name: 'Đại Bái', views: '8.540', orders: 118, revenue: '72tr đ', ratio: 17.1 },
    { id: 5, name: 'Chu Đậu', views: '5.200', orders: 72, revenue: '45tr đ', ratio: 10.7 },
  ];

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="analytics" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="sys-stat-main">
        {/* HEADER */}
        <header className="sys-stat-header">
          <div>
            <h1 className="sys-stat-title">Thống kê hệ thống</h1>
            <p className="sys-stat-subtitle">Tổng quan toàn nền tảng Làng Nghề Việt Nam</p>
          </div>
          <div className="sys-stat-actions">
            <div className="sys-stat-time-filters">
              <button className="sys-stat-time-btn">7 ngày</button>
              <button className="sys-stat-time-btn active">30 ngày</button>
              <button className="sys-stat-time-btn">6 tháng</button>
            </div>
            <button className="sys-stat-btn-export">
              <Download size={16} /> Xuất
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="sys-stat-kpi-grid">
          <div className="sys-stat-kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">Tổng người dùng</span>
              <div className="kpi-icon-box bg-blue-light"><Users size={16} className="text-blue" /></div>
            </div>
            <h3 className="kpi-value">15.680</h3>
            <p className="kpi-trend text-green"><TrendingUp size={14}/> +18.8% so với kỳ trước</p>
          </div>
          
          <div className="sys-stat-kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">Làng nghề hoạt động</span>
              <div className="kpi-icon-box bg-orange-light"><MapPin size={16} className="text-orange" /></div>
            </div>
            <h3 className="kpi-value">156</h3>
            <p className="kpi-trend text-green"><TrendingUp size={14}/> +2.1% so với kỳ trước</p>
          </div>

          <div className="sys-stat-kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">Doanh thu kỳ</span>
              <div className="kpi-icon-box bg-green-light"><DollarSign size={16} className="text-green" /></div>
            </div>
            <h3 className="kpi-value">1.5B đ</h3>
            <p className="kpi-trend text-green"><TrendingUp size={14}/> +22.6% so với kỳ trước</p>
          </div>

          <div className="sys-stat-kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">Tổng đơn hàng</span>
              <div className="kpi-icon-box bg-yellow-light"><ShoppingBag size={16} className="text-yellow" /></div>
            </div>
            <h3 className="kpi-value">3.220</h3>
            <p className="kpi-trend text-green"><TrendingUp size={14}/> +8.4% so với kỳ trước</p>
          </div>
        </div>

        {/* MIDDLE CHARTS */}
        <div className="sys-stat-middle-grid">
          {/* Biểu đồ Tăng trưởng hệ thống (Mock) */}
          <div className="sys-stat-card sys-stat-col-2">
            <div className="sys-stat-card-header">
              <TrendingUp size={18} className="text-yellow"/>
              <h3>Tăng trưởng hệ thống</h3>
            </div>
            <div className="sys-mock-chart-container">
              <svg viewBox="0 0 100 50" className="sys-mock-line-chart">
                {/* Đường Người dùng (Vàng) */}
                <path d="M0,15 L20,13 L40,12 L60,10 L80,9 L100,7" fill="none" stroke="#cda846" strokeWidth="1.5" />
                <circle cx="0" cy="15" r="1.5" fill="#cda846" />
                <circle cx="20" cy="13" r="1.5" fill="#cda846" />
                <circle cx="40" cy="12" r="1.5" fill="#cda846" />
                <circle cx="60" cy="10" r="1.5" fill="#cda846" />
                <circle cx="80" cy="9" r="1.5" fill="#cda846" />
                <circle cx="100" cy="7" r="1.5" fill="#cda846" />

                {/* Đường Doanh thu (Cam) */}
                <path d="M0,35 L20,28 L40,32 L60,22 L80,15 L100,7" fill="none" stroke="#b45309" strokeWidth="1.5" />
                <circle cx="0" cy="35" r="1.5" fill="#b45309" />
                <circle cx="20" cy="28" r="1.5" fill="#b45309" />
                <circle cx="40" cy="32" r="1.5" fill="#b45309" />
                <circle cx="60" cy="22" r="1.5" fill="#b45309" />
                <circle cx="80" cy="15" r="1.5" fill="#b45309" />
                <circle cx="100" cy="7" r="1.5" fill="#b45309" />
              </svg>
              {/* Hai trục Y */}
              <div className="sys-chart-y-axis-left"><span>16000</span><span>12000</span><span>8000</span><span>4000</span><span>0</span></div>
              <div className="sys-chart-y-axis-right"><span>380tr</span><span>285tr</span><span>190tr</span><span>95tr</span><span>0</span></div>
              
              <div className="sys-chart-x-axis"><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span></div>
              <div className="sys-chart-grid-lines"><div></div><div></div><div></div><div></div></div>
              
              <div className="sys-chart-legend">
                <span className="legend-dot bg-yellow"></span> Người dùng
                <span style={{margin:'0 10px'}}></span>
                <span className="legend-dot bg-orange"></span> Doanh thu (đ)
              </div>
            </div>
          </div>

          {/* Biểu đồ Tròn: Phân bố người dùng */}
          <div className="sys-stat-card sys-stat-col-1">
            <div className="sys-stat-card-header">
              <Users size={18} className="text-orange"/>
              <h3>Phân bố người dùng</h3>
            </div>
            <div className="sys-mock-donut-container">
              <div className="sys-donut-chart"></div>
              <ul className="sys-donut-legend">
                <li>
                  <div className="legend-label"><span className="legend-dot bg-yellow"></span> Khách hàng</div>
                  <strong>14.200</strong>
                </li>
                <li>
                  <div className="legend-label"><span className="legend-dot bg-orange"></span> Quản lý LN</div>
                  <strong>156</strong>
                </li>
                <li>
                  <div className="legend-label"><span className="legend-dot bg-dark"></span> Quản trị viên</div>
                  <strong>24</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM FULL CHART: Xu hướng đơn hàng */}
        <div className="sys-stat-card sys-stat-full-width">
          <div className="sys-stat-card-header">
            <Package size={18} className="text-blue"/>
            <h3>Xu hướng đơn hàng</h3>
          </div>
          <div className="sys-mock-chart-container" style={{height: '240px'}}>
             <svg viewBox="0 0 100 35" className="sys-mock-line-chart">
                {/* Đường Đơn hàng */}
                <path d="M0,25 L20,22 L40,24 L60,18 L80,14 L100,8" fill="none" stroke="#cda846" strokeWidth="1" />
                <circle cx="0" cy="25" r="1.5" fill="#cda846" />
                <circle cx="20" cy="22" r="1.5" fill="#cda846" />
                <circle cx="40" cy="24" r="1.5" fill="#cda846" />
                <circle cx="60" cy="18" r="1.5" fill="#cda846" />
                <circle cx="80" cy="14" r="1.5" fill="#cda846" />
                <circle cx="100" cy="8" r="1.5" fill="#cda846" />

                {/* Đường Làng nghề (Dashed) */}
                <path d="M0,30 L20,30 L40,30 L60,30 L80,30 L100,30" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="1,1" />
                <circle cx="0" cy="30" r="1" fill="#b45309" />
                <circle cx="20" cy="30" r="1" fill="#b45309" />
                <circle cx="40" cy="30" r="1" fill="#b45309" />
                <circle cx="60" cy="30" r="1" fill="#b45309" />
                <circle cx="80" cy="30" r="1" fill="#b45309" />
                <circle cx="100" cy="30" r="1" fill="#b45309" />
              </svg>
              <div className="sys-chart-y-axis-left"><span>800</span><span>600</span><span>400</span><span>200</span><span>0</span></div>
              <div className="sys-chart-x-axis"><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span></div>
              <div className="sys-chart-grid-lines"><div></div><div></div><div></div><div></div></div>
              <div className="sys-chart-legend">
                <span className="legend-dot bg-yellow"></span> Đơn hàng 
                <span style={{margin:'0 10px'}}></span> 
                <span className="legend-dot bg-orange"></span> Làng nghề
              </div>
          </div>
        </div>

        {/* VILLAGE PERFORMANCE TABLE */}
        <div className="sys-stat-card sys-stat-table-card">
          <div className="sys-stat-card-header">
            <MapPin size={18} className="text-yellow"/>
            <h3>Hiệu suất từng làng nghề</h3>
          </div>
          <table className="sys-stat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>LÀNG NGHỀ</th>
                <th>LƯỢT XEM</th>
                <th>ĐƠN HÀNG</th>
                <th>DOANH THU</th>
                <th>TỶ TRỌNG</th>
              </tr>
            </thead>
            <tbody>
              {villagePerformance.map((v) => (
                <tr key={v.id}>
                  <td><div className={`rank-badge rank-${v.id}`}>{v.id}</div></td>
                  <td><strong>{v.name}</strong></td>
                  <td>{v.views}</td>
                  <td>{v.orders}</td>
                  <td><strong className="text-orange">{v.revenue}</strong></td>
                  <td>
                    <div className="ratio-cell">
                      <div className="ratio-bar-bg"><div className="ratio-bar-fill" style={{width: `${v.ratio}%`}}></div></div>
                      <span className="ratio-text">{v.ratio}%</span>
                    </div>
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