import React from 'react';
import '../css/header.css';
import { Map as MapIcon, ShoppingCart, LogIn, UserPlus, Shield } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount = 2 }) {
  return (
    <header className="shared-header">
      <div className="logo-container" onClick={() => setActiveTab('home')}>
        <div className="logo-icon-wrapper">
          <MapIcon size={22} className="icon-gold" />
        </div>
        <span className="logo-text">Làng Nghề Việt Nam</span>
      </div>
      
      <nav className="header-nav">
        <span 
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          Trang chủ
        </span>
        <span 
          className={activeTab === 'map' ? 'active' : ''}
          onClick={() => setActiveTab('map')}
        >
          Bản đồ làng nghề
        </span>
        <span 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Sản phẩm
        </span>
      </nav>
      
      <div className="header-actions">
        <div className="cart-wrapper" onClick={() => setActiveTab('cart')} title="Xem giỏ hàng">
          <ShoppingCart size={22} />
          <span className="cart-badge">{cartCount}</span>
        </div>
        <button 
          onClick={() => setActiveTab('admin-portal')} 
          style={{ background: '#374151', color: '#f3f4f6', border: '1px solid #4b5563', padding: '6px 12px', borderRadius: '18px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
          title="Truy cập hệ thống quản trị"
        >
          <Shield size={14} color="#cda846" /> Admin
        </button>
        <button className="btn-login" onClick={() => setActiveTab('login')}>
          <LogIn size={16} /> Đăng nhập
        </button>
        <button className="btn-register" onClick={() => setActiveTab('register')}>
          <UserPlus size={16} /> Đăng ký
        </button>
      </div>
    </header>
  );
}