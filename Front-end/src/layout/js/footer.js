import React from 'react';
import '../css/footer.css';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="shared-footer">
      <div className="footer-content">
        <p>&copy; 2026 Hệ thống Quản lý Làng nghề.</p>
        <div className="footer-links">
          <span onClick={() => setActiveTab('home')}>Trang chủ</span>
          <span onClick={() => setActiveTab('map')}>Bản đồ làng nghề</span>
          <span onClick={() => setActiveTab('products')}>Sản phẩm</span>
        </div>
      </div>
    </footer>
  );
}
