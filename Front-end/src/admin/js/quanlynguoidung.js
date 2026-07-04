import React, { useState } from 'react';
import '../css/quanlynguoidung.css';
import { 
  Users, UserPlus, Shield, Lock, Unlock, Filter, 
  ChevronLeft, ChevronRight, Eye 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

const initialUsers = [
  {
    id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@battrang.vn', role: 'manager', roleLabel: 'Quản lý làng nghề',
    village: 'Làng gốm Bát Tràng', date: '15/05/2026', status: 'active', statusLabel: 'Hoạt động'
  },
  {
    id: 2, name: 'Lê Văn Cường', email: 'cuong.le@vanphuc.vn', role: 'manager', roleLabel: 'Quản lý làng nghề',
    village: 'Làng lụa Vạn Phúc', date: '20/05/2026', status: 'active', statusLabel: 'Hoạt động'
  },
  {
    id: 3, name: 'Trần Thị Mai', email: 'mai.tran@gmail.com', role: 'customer', roleLabel: 'Khách hàng',
    village: '—', date: '01/06/2026', status: 'active', statusLabel: 'Hoạt động'
  },
  {
    id: 4, name: 'Hoàng Quang Huy', email: 'admin@langnghevietnam.vn', role: 'admin', roleLabel: 'Quản trị viên',
    village: 'Toàn hệ thống', date: '01/01/2026', status: 'active', statusLabel: 'Hoạt động'
  },
  {
    id: 5, name: 'Phạm Văn Dũng', email: 'dung.pham@spam.com', role: 'customer', roleLabel: 'Khách hàng',
    village: '—', date: '10/06/2026', status: 'locked', statusLabel: 'Khóa tạm thời'
  }
];

export default function SystemUserManagerPage({ setActiveMenu, onExitToMain }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleLock = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'locked' : 'active';
        return {
          ...u,
          status: nextStatus,
          statusLabel: nextStatus === 'active' ? 'Hoạt động' : 'Khóa tạm thời'
        };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="users" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="um-main">
        {/* HEADER */}
        <header className="um-header">
          <div>
            <h1 className="um-title">Quản lý Người dùng</h1>
            <p className="um-subtitle">Quản lý tài khoản, vai trò và trạng thái người dùng toàn hệ thống</p>
          </div>
          <button className="um-btn-add" onClick={() => alert('Đang mở form tạo tài khoản mới...')}>
            + Thêm người dùng
          </button>
        </header>

        {/* STATS */}
        <div className="um-stats-grid">
          <div className="um-stat-card">
            <div className="um-icon-box bg-yellow text-white"><Users size={24} /></div>
            <div>
              <h3>1,240</h3>
              <p>Tổng người dùng</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-blue text-white"><UserPlus size={24} /></div>
            <div>
              <h3>1,228</h3>
              <p>Khách hàng</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-purple text-white"><Shield size={24} /></div>
            <div>
              <h3>6</h3>
              <p>Quản lý làng nghề</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-gray text-white"><Lock size={24} /></div>
            <div>
              <h3>6</h3>
              <p>Tài khoản bị khóa</p>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="um-filter-container">
          <div className="um-filter-row">
            <div className="um-search-box">
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên, email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="um-placeholder-dropdown"></div>
            <div className="um-placeholder-dropdown"></div>
          </div>
          <div className="um-filter-result">
            <Filter size={14} /> Hiển thị <strong>{filteredUsers.length}</strong> người dùng
          </div>
        </div>

        {/* TABLE */}
        <div className="um-table-container">
          <table className="um-table">
            <thead>
              <tr>
                <th>NGƯỜI DÙNG</th>
                <th>VAI TRÒ</th>
                <th>LÀNG NGHỀ PHỤ TRÁCH</th>
                <th>NGÀY TẠO</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="um-user-cell">
                      <div className="um-avatar">{u.name.charAt(0)}</div>
                      <div>
                        <strong style={{ color: '#1f2937' }}>{u.name}</strong>
                        <div className="um-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`um-role-badge role-${u.role}`}>{u.roleLabel}</span>
                  </td>
                  <td>
                    <span className="um-village-text">{u.village}</span>
                  </td>
                  <td>
                    <span className="um-date-text">{u.date}</span>
                  </td>
                  <td>
                    <span className={`um-status-pill ${u.status === 'active' ? 'active' : 'locked'}`}>
                      {u.statusLabel}
                    </span>
                  </td>
                  <td>
                    <div className="um-actions">
                      <button title="Xem chi tiết" onClick={() => alert(`Chi tiết người dùng: ${u.name} (${u.email})`)}>
                        <Eye size={18} />
                      </button>
                      {u.role !== 'admin' && (
                        <button 
                          title={u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                          onClick={() => handleToggleLock(u.id)}
                          style={{ color: u.status === 'active' ? '#ef4444' : '#16a34a' }}
                        >
                          {u.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="um-pagination">
            <span>Trang 1 / 1</span>
            <div className="um-page-controls">
              <button disabled><ChevronLeft size={16} /></button>
              <button disabled><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
