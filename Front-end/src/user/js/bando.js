import React, { useState, useEffect } from 'react';
import '../css/bando.css';
import { 
  Filter, ChevronRight, MapPin, Star, Search
} from 'lucide-react';
import VietnamMap from '../../layout/js/VietNamMap';
import { getDanhSachLangNghe } from '../../API/apiLangNghe';

const fallbackVillagesList = [
  { id: 1, name: 'Làng gốm Bát Tràng', location: 'Hà Nội', tag: 'Gốm sứ', rating: '4.8', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop', isActive: false },
  { id: 2, name: 'Làng lụa Vạn Phúc', location: 'Hà Nội', tag: 'Dệt may', rating: '4.7', img: 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=100&auto=format&fit=crop', isActive: false },
  { id: 3, name: 'Làng mộc Kim Bồng', location: 'Quảng Nam', tag: 'Mộc', rating: '4.9', img: 'https://images.unsplash.com/photo-1605335198006-258dcb1f416c?q=80&w=100&auto=format&fit=crop', isActive: true },
  { id: 4, name: 'Làng đúc đồng Đại Bái', location: 'Bắc Ninh', tag: 'Đúc đồng', rating: '4.6', img: 'https://images.unsplash.com/photo-1599583196884-60be78ee4b45?q=80&w=100&auto=format&fit=crop', isActive: false },
];

export default function MapPage({ setActiveTab, onSelectVillage }) {
  const [villagesList, setVillagesList] = useState(fallbackVillagesList);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const data = await getDanhSachLangNghe();
        if (data && data.length > 0) {
          setVillagesList(data.map(v => ({
            id: v.maLangNghe || v.MaLangNghe,
            name: v.tenLangNghe || v.TenLangNghe,
            location: v.tinhThanh || v.TinhThanh || 'Việt Nam',
            tag: v.nhomNghe?.tenNhomNghe || v.NhomNghe?.TenNhomNghe || 'Gốm sứ',
            rating: Number(v.diemDanhGia || v.DiemDanhGia || 4.8).toFixed(1),
            img: v.anhBia || v.AnhBia || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop',
            desc: v.gioiThieu || v.GioiThieu || v.lSTruyenThong || v.LSTruyenThong,
            lat: v.viDo || v.ViDo,
            lng: v.kinhDo || v.KinhDo
          })));
        }
      } catch (err) {
        console.warn('Sử dụng danh sách làng nghề mẫu cho bản đồ do lỗi API:', err);
      }
    };
    fetchVillages();
  }, []);

  const filteredVillages = villagesList.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="map-page-wrapper" style={{ height: 'calc(100vh - 120px)' }}>
      
      {/* MAIN CONTENT CỦA MAP */}
      <main className="map-main-layout">
        
        {/* SIDEBAR BÊN TRÁI */}
        <aside className="map-sidebar">
          <div className="sidebar-header">
            <h2>Làng nghề</h2>
            <span className="result-badge">{filteredVillages.length} kết quả</span>
          </div>

          <div className="search-container" style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: '#9ca3af' }} />
            <input 
              type="text" 
              placeholder="Tìm kiếm làng nghề..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px' }} 
            />
          </div>

          <div className="filter-container">
            <div className="filter-title">
              <Filter size={16} /> <span>Ẩn bộ lọc</span>
            </div>
            <select className="filter-select"><option>Tất cả tỉnh/thành</option></select>
            <select className="filter-select"><option>Tất cả loại nghề</option></select>
          </div>

          <div className="village-list">
            {filteredVillages.map(village => (
              <div 
                key={village.id} 
                className={`list-item ${village.isActive ? 'active' : ''}`}
                onClick={() => onSelectVillage ? onSelectVillage(village) : setActiveTab('products', village.tag)}
              >
                <img src={village.img} alt={village.name} className="item-img" />
                <div className="item-info">
                  <h3>{village.name}</h3>
                  <p className="item-location"><MapPin size={12}/> {village.location}</p>
                  <div className="item-meta">
                    <span className={`tag tag-${(village.tag || 'gốm-sứ').toLowerCase().replace(/ /g, '-')}`}>{village.tag}</span>
                    <span className="rating"><Star size={12} className="star-icon"/> {village.rating}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="arrow-icon" />
              </div>
            ))}
          </div>

          {/* CHÚ THÍCH LOẠI NGHỀ */}
          <div className="legend-container">
            <h4>LOẠI NGHỀ</h4>
            <div className="legend-grid">
              <div className="legend-item"><span className="dot dot-gom"></span> Gốm sứ</div>
              <div className="legend-item"><span className="dot dot-det"></span> Dệt may</div>
              <div className="legend-item"><span className="dot dot-moc"></span> Mộc</div>
              <div className="legend-item"><span className="dot dot-kim"></span> Kim hoàn</div>
              <div className="legend-item"><span className="dot dot-duc"></span> Đúc đồng</div>
              <div className="legend-item"><span className="dot dot-theu"></span> Thêu</div>
            </div>
          </div>
        </aside>

        {/* KHU VỰC BẢN ĐỒ BÊN PHẢI */}
        <section className="map-view-area">
          <VietnamMap onSelectVillage={onSelectVillage} setActiveTab={setActiveTab} />
        </section>

      </main>
    </div>
  );
}