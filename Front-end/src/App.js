import React, { useState } from 'react';
import Header from './layout/js/header';
import Footer from './layout/js/footer';
import TrangChu from './user/js/trangchu';
import MapPage from './user/js/bando';
import SanPham from './user/js/sanpham';
import ChiTietSanPham from './user/js/chitietsanpham';
import GioHang from './user/js/giohang';
import ChiTietLangNghe from './user/js/chitietlangnghe';
import ThongTinUser from './user/js/thongtinuser';
import VillagePortal from './village/js/VillagePortal';
import AdminPortal from './admin/js/AdminPortal';
import LoginPage from './dangnhap/js/dangNhap';
import RegisterPage from './dangnhap/js/dangky';
import ForgotPasswordPage from './dangnhap/js/quenMK1';
import OTPVerificationPage from './dangnhap/js/quenMK2';
import ResetPasswordPage from './dangnhap/js/quenMK3';
import PasswordSuccessPage from './dangnhap/js/quenMK4';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const handleTabChange = (tab, param = null) => {
    if (tab === 'products' && param) {
      setSelectedCategory(param);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVillage = (village) => {
    setSelectedVillage(village);
    setActiveTab('village-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (qty = 1) => {
    setCartCount(prev => prev + qty);
  };

  const isAuthOrPortal = ['village-portal', 'admin-portal', 'login', 'register', 'forgot-step1', 'forgot-step2', 'forgot-step3', 'forgot-step4'].includes(activeTab);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fcfaf7' }}>
      {/* HEADER CHUNG (Ẩn khi ở Portal Quản trị Làng nghề, Admin hoặc các trang xác thực) */}
      {!isAuthOrPortal && (
        <Header activeTab={activeTab} setActiveTab={handleTabChange} cartCount={cartCount} />
      )}
      
      {/* NỘI DUNG CÁC TRANG */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'home' && (
          <TrangChu 
            setActiveTab={handleTabChange} 
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onSelectVillage={handleSelectVillage}
          />
        )}
        {activeTab === 'map' && (
          <MapPage 
            setActiveTab={handleTabChange} 
            onSelectVillage={handleSelectVillage}
          />
        )}
        {activeTab === 'products' && (
          <SanPham 
            setActiveTab={handleTabChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {activeTab === 'product-detail' && (
          <ChiTietSanPham 
            product={selectedProduct}
            setActiveTab={handleTabChange}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {activeTab === 'village-detail' && (
          <ChiTietLangNghe 
            village={selectedVillage}
            setActiveTab={handleTabChange}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {activeTab === 'cart' && (
          <GioHang 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'profile' && (
          <ThongTinUser 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'village-portal' && (
          <VillagePortal 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'admin-portal' && (
          <AdminPortal 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'login' && (
          <LoginPage 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'register' && (
          <RegisterPage 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'forgot-step1' && (
          <ForgotPasswordPage 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'forgot-step2' && (
          <OTPVerificationPage 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'forgot-step3' && (
          <ResetPasswordPage 
            setActiveTab={handleTabChange}
          />
        )}
        {activeTab === 'forgot-step4' && (
          <PasswordSuccessPage 
            setActiveTab={handleTabChange}
          />
        )}
      </div>
      
      {/* FOOTER CHUNG (Ẩn khi ở Portal Quản trị Làng nghề, Admin hoặc các trang xác thực) */}
      {!isAuthOrPortal && (
        <Footer setActiveTab={handleTabChange} />
      )}
    </div>
  );
}