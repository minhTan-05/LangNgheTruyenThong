import React, { useState } from 'react';
import SlidebarVillage from '../../layout/js/slidebarVillage';
import TongQuan from './tongquan';
import ThongTinLangNghe1 from './thongtinlangnghe1';
import ThongTinLangNghe2 from './thongtinlangnghe2';
import QuanLySanPham from './quanlysanpham';
import QuanLyHinhAnh from './quanlyhinhanh';
import QuanLyVideo from './quanlyvideo';
import QuanLyAmThanh from './quanlyamthanh';
import QuanLyDonHang from './quanlydonhang';
import ThongKe from './thongke';

export default function VillagePortal({ setActiveTab }) {
  const [activeSubTab, setActiveSubTab] = useState('tongquan');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', width: '100%' }}>
      <SlidebarVillage 
        activeSubTab={activeSubTab} 
        setActiveSubTab={setActiveSubTab} 
        onExitToMain={() => setActiveTab('home')}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeSubTab === 'tongquan' && <TongQuan setActiveSubTab={setActiveSubTab} />}
        {activeSubTab === 'donhang' && <QuanLyDonHang />}
        {activeSubTab === 'sanpham' && <QuanLySanPham />}
        {activeSubTab === 'thongke' && <ThongKe />}
        {activeSubTab === 'thongtin1' && <ThongTinLangNghe1 />}
        {activeSubTab === 'thongtin2' && <ThongTinLangNghe2 />}
        {activeSubTab === 'hinhanh' && <QuanLyHinhAnh />}
        {activeSubTab === 'video' && <QuanLyVideo />}
        {activeSubTab === 'amthanh' && <QuanLyAmThanh />}
      </div>
    </div>
  );
}
