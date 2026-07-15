import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // BẮT BUỘC: Phải import CSS để bản đồ không bị vỡ giao diện
import L from 'leaflet';
import { getDanhSachLangNghe } from '../../API/apiLangNghe';

// 1. Sửa lỗi hiển thị icon mặc định của Leaflet trong React
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function VietnamMap({ onSelectVillage, setActiveTab }) {
  // 2. Tọa độ trung tâm (Khu vực Miền Trung) và mức zoom bao quát Việt Nam
  const centerPosition = [16.047079, 108.206230];
  
  // Dữ liệu mẫu dự phòng khi Backend offline hoặc đang tải
  const fallbackVillages = [
    { 
      id: 1, 
      name: 'Làng gốm Bát Tràng', 
      lat: 20.9716, 
      lng: 105.9224, 
      product: 'Gốm sứ', 
      location: 'Hà Nội', 
      rating: '4.8',
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Làng lụa Vạn Phúc', 
      lat: 20.9754, 
      lng: 105.7709, 
      product: 'Dệt may', 
      location: 'Hà Nội', 
      rating: '4.7',
      img: 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=200&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Làng mộc Kim Bồng', 
      lat: 15.8672, 
      lng: 108.3375, 
      product: 'Mộc', 
      location: 'Quảng Nam', 
      rating: '4.9',
      img: 'https://images.unsplash.com/photo-1605335198006-258dcb1f416c?q=80&w=200&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Làng đúc đồng Đại Bái', 
      lat: 21.0833, 
      lng: 106.1667, 
      product: 'Đúc đồng', 
      location: 'Bắc Ninh', 
      rating: '4.6',
      img: 'https://images.unsplash.com/photo-1599583196884-60be78ee4b45?q=80&w=200&auto=format&fit=crop' 
    },
  ];

  const [villages, setVillages] = useState(fallbackVillages);

  useEffect(() => {
    // Gọi API từ Backend C# ASP.NET Core để đổ dữ liệu thật từ SQL Server
    const fetchVillagesFromDB = async () => {
      try {
        const data = await getDanhSachLangNghe();
        if (data && data.length > 0) {
          const mappedData = data.map((item) => ({
            id: item.maLangNghe || item.MaLangNghe,
            name: item.tenLangNghe || item.TenLangNghe,
            lat: Number(item.viDo || item.ViDo),
            lng: Number(item.kinhDo || item.KinhDo),
            product: item.nhomNghe?.tenNhomNghe || item.NhomNghe?.TenNhomNghe || 'Nghề truyền thống',
            tag: item.nhomNghe?.tenNhomNghe || item.NhomNghe?.TenNhomNghe || 'Nghề truyền thống',
            location: item.tinhThanh || item.TinhThanh || 'Việt Nam',
            rating: Number(item.diemDanhGia || item.DiemDanhGia || 5).toFixed(1),
            views: item.luotXem || item.LuotXem || '1,250',
            desc: item.gioiThieu || item.GioiThieu || item.lSTruyenThong || item.LSTruyenThong || 'Làng nghề truyền thống nổi tiếng với lịch sử lâu đời, lưu giữ những giá trị văn hóa nghệ thuật đặc sắc.',
            img: item.anhBia || item.AnhBia || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200&auto=format&fit=crop'
          }));
          setVillages(mappedData);
        }
      } catch (err) {
        console.warn('Backend hiện chưa khởi chạy, sử dụng dữ liệu mẫu dự phòng:', err);
      }
    };

    fetchVillagesFromDB();
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={centerPosition} 
        zoom={6} 
        style={{ height: '100%', width: '100%', minHeight: '500px' }}
        scrollWheelZoom={true}
      >
        {/* 3. Lớp nền bản đồ (TileLayer) lấy từ OpenStreetMap miễn phí */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 4. Hiển thị các điểm đánh dấu (Marker) */}
        {villages.map((village) => (
          <Marker 
            key={village.id} 
            position={[village.lat, village.lng]} 
            icon={defaultIcon}
          >
            <Popup className="custom-village-popup">
              <div style={{ textAlign: 'center', width: '180px' }}>
                <img 
                  src={village.img} 
                  alt={village.name} 
                  style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} 
                />
                <strong style={{ color: '#b45309', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  {village.name}
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  📍 {village.location} • ⭐ {village.rating}
                </span>
                <span style={{ display: 'inline-block', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px' }}>
                  {village.product}
                </span>
                <div>
                  <button 
                    onClick={() => {
                      if (onSelectVillage) onSelectVillage(village);
                      else if (setActiveTab) setActiveTab('products', village.product);
                    }}
                    style={{ background: '#c2410c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', width: '100%', fontWeight: 600 }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}