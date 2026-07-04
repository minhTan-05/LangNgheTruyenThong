import React from 'react';
import '../css/thongtinyeuthich.css';

const mockFavorites = [
  {
    id: 1,
    name: 'Bình hoa gốm men ngọc',
    village: 'Làng gốm Bát Tràng',
    price: '450.000đ',
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Bàn thờ gỗ gụ chạm khắc',
    village: 'Làng mộc Kim Bồng',
    price: '15.000.000đ',
    img: 'https://images.unsplash.com/photo-1592078615290-07fdef5239a5?q=80&w=200&auto=format&fit=crop'
  }
];

export default function ThongTinYeuThich({ setActiveTab }) {
  return (
    <div className="prof-favorites-grid">
      {mockFavorites.map((item) => (
        <div key={item.id} className="prof-fav-card">
          <div className="prof-fav-img">
            {item.img && <img src={item.img} alt={item.name} />}
          </div>
          <div className="prof-fav-info">
            <div className="prof-fav-text">
              <h4>{item.name}</h4>
              <p>{item.village}</p>
            </div>
            <div className="prof-fav-bottom">
              <span className="prof-fav-price">{item.price}</span>
              <button 
                className="prof-btn-buy"
                onClick={() => {
                  if (setActiveTab) setActiveTab('cart');
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}