import React, { useState } from 'react';
import '../css/phanquyen.css';
import { 
  Save, Info, User, Users, ShieldAlert, 
  ChevronUp, ChevronDown, Check, X, Shield 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function RolePermissionPage({ setActiveMenu, onExitToMain }) {
  // Dữ liệu mô phỏng theo thiết kế
  const permissionGroups = [
    {
      id: 'content', title: 'Xem nội dung', count: 4, cust: '3/4', mgr: '3/4', adm: '4/4',
      items: [
        { name: 'Xem trang chủ & bản đồ', desc: 'Truy cập trang chủ, bản đồ tương tác, danh sách làng nghề', cust: true, mgr: true, adm: true },
        { name: 'Xem chi tiết làng nghề', desc: 'Xem thông tin, hình ảnh, video, audio guide của từng làng nghề', cust: true, mgr: true, adm: true },
        { name: 'Xem & mua sản phẩm', desc: 'Xem danh sách sản phẩm, thêm vào giỏ hàng, đặt mua', cust: true, mgr: false, adm: true },
        { name: 'Xem thống kê làng nghề của mình', desc: 'Dashboard thống kê lượt xem, doanh thu của làng nghề phụ trách', cust: false, mgr: true, adm: true },
      ]
    },
    {
      id: 'account', title: 'Quản lý tài khoản', count: 4, cust: '2/4', mgr: '1/4', adm: '4/4',
      items: [
        { name: 'Cập nhật thông tin cá nhân', desc: 'Sửa tên, email, mật khẩu, địa chỉ của chính mình', cust: true, mgr: true, adm: true },
        { name: 'Xem lịch sử đơn hàng cá nhân', desc: 'Xem các đơn hàng đã đặt, trạng thái giao hàng', cust: true, mgr: false, adm: true },
        { name: 'Quản lý tài khoản người dùng khác', desc: 'Tạo, sửa, khóa, xóa tài khoản người dùng trong hệ thống', cust: false, mgr: false, adm: true },
        { name: 'Phân quyền vai trò', desc: 'Gán và thay đổi vai trò (customer/village-manager/admin) cho người dùng', cust: false, mgr: false, adm: true },
      ]
    },
    {
      id: 'village', title: 'Quản lý làng nghề', count: 4, cust: '0/4', mgr: '2/4', adm: '4/4',
      items: [
        { name: 'Cập nhật thông tin làng nghề phụ trách', desc: 'Sửa mô tả, lịch sử, địa chỉ, tọa độ GIS của làng nghề mình quản lý', cust: false, mgr: true, adm: true },
        { name: 'Upload hình ảnh, video, audio', desc: 'Thêm tài nguyên media vào làng nghề phụ trách (cần admin duyệt)', cust: false, mgr: true, adm: true },
        { name: 'Thêm/xóa/sửa làng nghề trong hệ thống', desc: 'Quản lý toàn bộ danh sách làng nghề trên hệ thống', cust: false, mgr: false, adm: true },
        { name: 'Duyệt tài nguyên media', desc: 'Phê duyệt hoặc từ chối hình ảnh, video, audio do làng nghề đăng tải', cust: false, mgr: false, adm: true },
      ]
    },
    {
      id: 'product', title: 'Sản phẩm & Đơn hàng', count: 4, cust: '0/4', mgr: '2/4', adm: '4/4',
      items: [
        { name: 'Quản lý sản phẩm làng nghề của mình', desc: 'Thêm, sửa, xóa sản phẩm của làng nghề phụ trách', cust: false, mgr: true, adm: true },
        { name: 'Xử lý đơn hàng làng nghề của mình', desc: 'Xem, xác nhận, cập nhật trạng thái đơn hàng của làng nghề phụ trách', cust: false, mgr: true, adm: true },
        { name: 'Quản lý toàn bộ sản phẩm hệ thống', desc: 'Xem, duyệt, ẩn sản phẩm của tất cả các làng nghề', cust: false, mgr: false, adm: true },
        { name: 'Quản lý toàn bộ đơn hàng hệ thống', desc: 'Xem và theo dõi tất cả đơn hàng trên hệ thống', cust: false, mgr: false, adm: true },
      ]
    }
  ];

  const [expandedGroups, setExpandedGroups] = useState({
    content: true, account: true, village: true, product: true
  });

  const toggleGroup = (id) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCheck = (status, role) => {
    if (role === 'admin') {
      return <div className="rp-check-box bg-purple-light text-purple"><Check size={14} strokeWidth={3}/></div>;
    }
    if (status) {
      return <div className="rp-check-box bg-green-light text-green"><Check size={14} strokeWidth={3}/></div>;
    }
    return <div className="rp-check-box bg-gray-light text-gray"><X size={14} strokeWidth={3}/></div>;
  };

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="permissions" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="rp-main">
        {/* HEADER */}
        <header className="rp-header">
          <div>
            <h1 className="rp-title">Phân quyền vai trò</h1>
            <p className="rp-subtitle">Cấu hình quyền truy cập cho từng vai trò trong hệ thống</p>
          </div>
          <button className="rp-btn-save disabled">
            <Save size={16} /> Lưu thay đổi
          </button>
        </header>

        {/* ROLE CARDS */}
        <div className="rp-cards-grid">
          <div className="rp-role-card">
            <div className="rp-card-top">
              <div className="rp-role-icon"><User size={20} color="#6b7280" /></div>
              <div>
                <h4>Khách hàng</h4>
                <span className="rp-badge customer">customer</span>
              </div>
            </div>
            <div className="rp-card-stats">
              <h2>5</h2>
              <p>/ 20 quyền được cấp</p>
            </div>
            <div className="rp-progress-track"><div className="rp-progress-fill bg-gray-dark" style={{width: '25%'}}></div></div>
          </div>

          <div className="rp-role-card">
            <div className="rp-card-top">
              <div className="rp-role-icon"><Users size={20} color="#2563eb" /></div>
              <div>
                <h4 className="text-blue">Quản lý làng nghề</h4>
                <span className="rp-badge manager">village-manager</span>
              </div>
            </div>
            <div className="rp-card-stats">
              <h2>9</h2>
              <p>/ 20 quyền được cấp</p>
            </div>
            <div className="rp-progress-track"><div className="rp-progress-fill bg-blue" style={{width: '45%'}}></div></div>
          </div>

          <div className="rp-role-card">
            <div className="rp-card-top">
              <div className="rp-role-icon"><ShieldAlert size={20} color="#9333ea" /></div>
              <div>
                <h4 className="text-purple">Quản trị viên</h4>
                <span className="rp-badge admin">admin</span>
              </div>
            </div>
            <div className="rp-card-stats">
              <h2>20</h2>
              <p>/ 20 quyền được cấp</p>
            </div>
            <div className="rp-progress-track"><div className="rp-progress-fill bg-yellow" style={{width: '100%'}}></div></div>
          </div>
        </div>

        {/* ALERT BOX */}
        <div className="rp-alert-box">
          <Info size={18} />
          <p>
            Quyền của <strong>Quản trị viên</strong> không thể thay đổi — admin luôn có toàn quyền hệ thống. 
            Các thay đổi với vai trò khác cần nhấn <strong>Lưu thay đổi</strong> để áp dụng.
          </p>
        </div>

        {/* PERMISSIONS TABLE */}
        <div className="rp-table-container">
          {/* Table Header */}
          <div className="rp-table-header">
            <div className="rp-col-feature">Quyền truy cập</div>
            <div className="rp-col-roles">
              <div className="rp-role-col-header">
                <User size={16} /> Khách hàng
              </div>
              <div className="rp-role-col-header">
                <Users size={16} /> Quản lý làng nghề
              </div>
              <div className="rp-role-col-header">
                <ShieldAlert size={16} /> Quản trị viên
              </div>
            </div>
          </div>

          {/* Table Body (Accordions) */}
          <div className="rp-table-body">
            {permissionGroups.map(group => (
              <div key={group.id} className="rp-group">
                {/* Group Header */}
                <div className="rp-group-header" onClick={() => toggleGroup(group.id)}>
                  <div className="rp-col-feature rp-group-title">
                    <Shield size={16} className="text-yellow" /> {group.title} <span>({group.count})</span>
                    {expandedGroups[group.id] ? <ChevronUp size={16} className="rp-chevron" /> : <ChevronDown size={16} className="rp-chevron" />}
                  </div>
                  <div className="rp-col-roles rp-group-counts">
                    <div>{group.cust}</div>
                    <div>{group.mgr}</div>
                    <div>{group.adm}</div>
                  </div>
                </div>
                
                {/* Group Items */}
                {expandedGroups[group.id] && (
                  <div className="rp-group-content">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="rp-item-row">
                        <div className="rp-col-feature">
                          <h4>{item.name}</h4>
                          <p>{item.desc}</p>
                        </div>
                        <div className="rp-col-roles">
                          <div className="rp-check-cell">{renderCheck(item.cust, 'customer')}</div>
                          <div className="rp-check-cell">{renderCheck(item.mgr, 'manager')}</div>
                          <div className="rp-check-cell">{renderCheck(item.adm, 'admin')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}