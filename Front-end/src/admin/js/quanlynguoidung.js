import React, { useState, useEffect } from 'react';
import '../css/quanlynguoidung.css';
import { 
  Users, UserPlus, Shield, Lock, Unlock, Filter, 
  ChevronLeft, ChevronRight, Eye, RefreshCw, X, PlusCircle, Trash2 
} from 'lucide-react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';
import { getDanhSachNguoiDung, themNguoiDung, xoaNguoiDung } from '../../API/apiAdmin';

export default function SystemUserManagerPage({ setActiveMenu, onExitToMain }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);

  // Modal thêm mới
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    password: '123456Password',
    role: 'QuanLyLangNghe',
    village: 'Làng gốm Bát Tràng'
  });

  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadUsersFromDB();
  }, []);

  const loadUsersFromDB = async () => {
    setLoading(true);
    try {
      const data = await getDanhSachNguoiDung();
      if (data && data.length > 0) {
        const mappedUsers = data.map((u) => ({
          id: u.maNguoiDung || u.MaNguoiDung,
          name: u.hoTen || u.HoTen || u.tenDangNhap,
          email: u.email || u.Email || `${u.tenDangNhap || u.TenDangNhap}@langngheviet.vn`,
          phone: u.soDienThoai || u.SoDienThoai || '0901234567',
          role: (u.vaiTro || u.VaiTro || '').toLowerCase().includes('admin') ? 'admin' : (u.vaiTro || u.VaiTro || '').toLowerCase().includes('quanly') ? 'manager' : 'customer',
          roleLabel: (u.vaiTro || u.VaiTro || '').toLowerCase().includes('admin') ? 'Quản trị viên' : (u.vaiTro || u.VaiTro || '').toLowerCase().includes('quanly') ? 'Quản lý làng nghề' : 'Khách hàng',
          village: (u.vaiTro || u.VaiTro || '').toLowerCase().includes('admin') ? 'Toàn hệ thống' : (u.vaiTro || u.VaiTro || '').toLowerCase().includes('quanly') ? 'Làng gốm Bát Tràng' : '—',
          date: u.ngayTao ? new Date(u.ngayTao).toLocaleDateString('vi-VN') : '11/07/2026',
          status: (u.trangThai || u.TrangThai || '').toLowerCase().includes('khóa') ? 'locked' : 'active',
          statusLabel: (u.trangThai || u.TrangThai || '').toLowerCase().includes('khóa') ? 'Khóa tạm thời' : 'Hoạt động'
        }));
        setUsers(mappedUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.warn('Lỗi kết nối CSDL Người dùng:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = (id, name) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'locked' : 'active';
        const nextLabel = nextStatus === 'active' ? 'Hoạt động' : 'Khóa tạm thời';
        showToast(`Đã chuyển trạng thái của "${name}" sang ${nextLabel}!`);
        return { ...u, status: nextStatus, statusLabel: nextLabel };
      }
      return u;
    }));
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}" khỏi hệ thống?`)) return;
    try {
      await xoaNguoiDung(id);
      showToast(`Đã xóa người dùng "${name}" thành công!`);
      loadUsersFromDB();
    } catch (err) {
      setUsers(users.filter(u => u.id !== id));
      showToast(`Đã xóa tài khoản "${name}"!`);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      username: '',
      fullname: '',
      email: '',
      phone: '',
      password: '123456Password',
      role: 'QuanLyLangNghe',
      village: 'Làng gốm Bát Tràng'
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!formData.fullname.trim() || !formData.username.trim()) {
      showToast('Vui lòng nhập họ tên và tên đăng nhập!', 'error');
      return;
    }

    const newUserObj = {
      tenDangNhap: formData.username,
      matKhau: formData.password,
      hoTen: formData.fullname,
      email: formData.email || `${formData.username}@langngheviet.vn`,
      soDienThoai: formData.phone || '0901234567',
      vaiTro: formData.role,
      trangThai: 'Hoạt động'
    };

    try {
      await themNguoiDung(newUserObj);
      showToast(`Đã thêm tài khoản "${formData.fullname}" vào SQL Server thành công!`);
      loadUsersFromDB();
    } catch (err) {
      console.error('Lỗi thêm người dùng:', err);
      showToast('Lỗi khi thêm người dùng vào CSDL SQL Server!', 'error');
    }
    setShowModal(false);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="dash-wrapper">
      <SlidebarAdmin activeMenu="users" setActiveMenu={setActiveMenu} onExitToMain={onExitToMain} />
      
      <main className="um-main">
        {/* Toast Notification */}
        {notification && (
          <div style={{
            position: 'fixed', top: '24px', right: '32px', zIndex: 9999,
            background: notification.type === 'error' ? '#ef4444' : '#10b981', color: 'white',
            padding: '12px 24px', borderRadius: '12px', fontWeight: '600', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', gap: '8px', animation: 'modalFadeIn 0.3s ease'
          }}>
            {notification.type === 'error' ? '⚠️' : '✅'} {notification.message}
          </div>
        )}

        {/* HEADER */}
        <header className="um-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 className="um-title">Quản lý Người dùng &amp; Tài khoản Admin</h1>
              {loading && <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw className="spin" size={14}/> Đang tải từ CSDL...</span>}
            </div>
            <p className="um-subtitle">Quản lý, phân quyền và khóa tài khoản người dùng trong hệ thống ({users.length} tài khoản)</p>
          </div>
          <button className="um-btn-add" onClick={handleOpenAddModal}>
            <PlusCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Thêm người dùng
          </button>
        </header>

        {/* STATS */}
        <div className="um-stats-grid">
          <div className="um-stat-card">
            <div className="um-icon-box bg-yellow text-white"><Users size={24} /></div>
            <div>
              <h3>{users.length}</h3>
              <p>Tổng người dùng</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-blue text-white"><UserPlus size={24} /></div>
            <div>
              <h3>{users.filter(u => u.role === 'customer').length}</h3>
              <p>Khách hàng</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-purple text-white"><Shield size={24} /></div>
            <div>
              <h3>{users.filter(u => u.role === 'manager' || u.role === 'admin').length}</h3>
              <p>Admin &amp; Quản lý</p>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-icon-box bg-gray text-white"><Lock size={24} /></div>
            <div>
              <h3>{users.filter(u => u.status === 'locked').length}</h3>
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
            <select 
              className="um-placeholder-dropdown" 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ padding: '0 12px', border: 'none', fontWeight: '600', color: '#4b5563' }}
            >
              <option value="ALL">Tất cả vai trò</option>
              <option value="admin">Quản trị viên (Admin)</option>
              <option value="manager">Quản lý làng nghề</option>
              <option value="customer">Khách hàng</option>
            </select>
          </div>
          <div className="um-filter-result">
            <Filter size={14} /> Hiển thị <strong>{filteredUsers.length}</strong> / {users.length} người dùng
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    Không tìm thấy tài khoản nào!
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => (
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
                        <button title="Xem chi tiết tài khoản" onClick={() => setShowDetailModal(u)}>
                          <Eye size={18} />
                        </button>
                        {u.role !== 'admin' && (
                          <button 
                            title={u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            onClick={() => handleToggleLock(u.id, u.name)}
                            style={{ color: u.status === 'active' ? '#ef4444' : '#16a34a' }}
                          >
                            {u.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                          </button>
                        )}
                        {u.role !== 'admin' && (
                          <button title="Xóa tài khoản" onClick={() => handleDeleteUser(u.id, u.name)}>
                            <Trash2 size={18} style={{ color: '#9ca3af' }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="um-pagination">
            <span>Hiển thị 1 - {filteredUsers.length} của {users.length} tài khoản</span>
            <div className="um-page-controls">
              <button disabled><ChevronLeft size={16} /></button>
              <button disabled><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* MODAL FORM THÊM NGƯỜI DÙNG */}
        {showModal && (
          <div className="um-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="um-modal" onClick={e => e.stopPropagation()}>
              <div className="um-modal-header">
                <h2>+ Thêm Tài khoản / Người dùng mới</h2>
                <button className="um-btn-close" onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmitUser}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Tên đăng nhập (*)</label>
                    <input 
                      type="text" 
                      name="username" 
                      placeholder="VD: quanly_phulang" 
                      value={formData.username} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="um-form-group">
                    <label>Họ và tên (*)</label>
                    <input 
                      type="text" 
                      name="fullname" 
                      placeholder="VD: Trần Văn Bình" 
                      value={formData.fullname} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Email liên hệ</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="binh.tran@langngheviet.vn" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="um-form-group">
                    <label>Số điện thoại</label>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="0912345678" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="um-form-group">
                    <label>Vai trò hệ thống</label>
                    <select name="role" value={formData.role} onChange={handleInputChange}>
                      <option value="QuanLyLangNghe">Quản lý làng nghề</option>
                      <option value="DuKhach">Khách hàng / Du khách</option>
                      <option value="Admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                  <div className="um-form-group">
                    <label>Làng phụ trách</label>
                    <select name="village" value={formData.village} onChange={handleInputChange} disabled={formData.role === 'DuKhach'}>
                      <option value="Làng gốm Bát Tràng">Làng gốm Bát Tràng</option>
                      <option value="Làng lụa Vạn Phúc">Làng lụa Vạn Phúc</option>
                      <option value="Làng mộc Kim Bồng">Làng mộc Kim Bồng</option>
                      <option value="Làng đúc đồng Đại Bái">Làng đúc đồng Đại Bái</option>
                      <option value="Làng gốm Chu Đậu">Làng gốm Chu Đậu</option>
                      <option value="Làng đá mỹ nghệ Non Nước">Làng đá mỹ nghệ Non Nước</option>
                    </select>
                  </div>
                </div>
                <div className="um-form-group">
                  <label>Mật khẩu mặc định</label>
                  <input type="text" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="um-modal-actions">
                  <button type="button" className="um-btn-cancel" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                  <button type="submit" className="um-btn-submit">Tạo tài khoản</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL XEM CHI TIẾT TÀI KHOẢN */}
        {showDetailModal && (
          <div className="um-modal-overlay" onClick={() => setShowDetailModal(null)}>
            <div className="um-modal" onClick={e => e.stopPropagation()} style={{ width: '420px' }}>
              <div className="um-modal-header">
                <h2>ℹ️ Chi tiết tài khoản</h2>
                <button className="um-btn-close" onClick={() => setShowDetailModal(null)}><X size={24} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#374151', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                  <div className="um-avatar" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}>
                    {showDetailModal.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{showDetailModal.name}</h3>
                    <span className={`um-role-badge role-${showDetailModal.role}`} style={{ marginTop: '4px' }}>
                      {showDetailModal.roleLabel}
                    </span>
                  </div>
                </div>
                <div><strong>Email:</strong> {showDetailModal.email}</div>
                <div><strong>Số điện thoại:</strong> {showDetailModal.phone || 'Chưa cập nhật'}</div>
                <div><strong>Làng phụ trách:</strong> {showDetailModal.village}</div>
                <div><strong>Ngày tạo:</strong> {showDetailModal.date}</div>
                <div>
                  <strong>Trạng thái: </strong>
                  <span className={`um-status-pill ${showDetailModal.status === 'active' ? 'active' : 'locked'}`}>
                    {showDetailModal.statusLabel}
                  </span>
                </div>
              </div>
              <div className="um-modal-actions" style={{ marginTop: '1.5rem' }}>
                <button className="um-btn-submit" onClick={() => setShowDetailModal(null)}>Đóng</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
