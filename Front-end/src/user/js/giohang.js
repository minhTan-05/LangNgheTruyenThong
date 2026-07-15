import React, { useState } from 'react';
import '../css/giohang.css';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function GioHang({ setActiveTab }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Bình hoa gốm men ngọc', village: 'Làng gốm Bát Tràng', price: 450000, qty: 1, img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Khăn lụa tơ tằm thêu tay', village: 'Làng lụa Vạn Phúc', price: 850000, qty: 1, img: 'https://images.unsplash.com/photo-1606231140504-b6dd565cc5fb?q=80&w=200&auto=format&fit=crop' }
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="cart-page-container">
      <div className="breadcrumb" onClick={() => setActiveTab('products')}>
        <ArrowLeft size={16} />
        <span>Tiếp tục mua sắm</span>
      </div>

      <h1>Giỏ Hàng Của Bạn ({cartItems.length} sản phẩm)</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
          <ShoppingBag size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
          <h3>Giỏ hàng đang trống</h3>
          <p style={{ color: '#64748b' }}>Hãy khám phá các sản phẩm độc đáo từ làng nghề Việt Nam nhé!</p>
          <button 
            onClick={() => setActiveTab('products')}
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#d97706', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Xem Gian Hàng
          </button>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.village}</p>
                  <p style={{ marginTop: '4px', fontSize: '0.85rem' }}>Số lượng: {item.qty}</p>
                </div>
                <div className="cart-item-price">
                  {(item.price * item.qty).toLocaleString('vi-VN')}đ
                </div>
                <button className="btn-remove" onClick={() => handleRemove(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Tóm Tắt Đơn Hàng</h2>
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div className="summary-total">
              <span>Tổng cộng:</span>
              <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            <button className="btn-checkout" onClick={() => alert('Đang đặt mua đơn hàng thành công! Cảm ơn bạn đã ủng hộ làng nghề truyền thống.')}>
              Tiến Hành Thanh Toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
