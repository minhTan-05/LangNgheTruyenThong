import React from 'react';
import '../css/thongtindonhang.css';
import { CheckCircle2, Truck, Star } from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-2026-001',
    date: '20/06/2026',
    status: 'Đã giao',
    statusCode: 'delivered',
    tracking: 'VN123456789',
    items: [{ name: 'Bình hoa gốm men ngọc', qty: 1, price: '450.000đ' }],
    total: '450.000đ',
    canReview: true
  },
  {
    id: 'ORD-2026-002',
    date: '15/05/2026',
    status: 'Đang giao',
    statusCode: 'shipping',
    tracking: 'VN987654321',
    items: [
      { name: 'Khăn lụa tơ tằm thêu tay', qty: 2, price: '1.700.000đ' },
      { name: 'Bộ ấm chén gốm men trắng', qty: 1, price: '680.000đ' }
    ],
    total: '2.380.000đ',
    canReview: false
  }
];

export default function ThongTinDonHang({ setActiveTab }) {
  return (
    <div className="prof-orders-list">
      {mockOrders.map((order) => (
        <div key={order.id} className="prof-order-card">
          
          <div className="prof-order-header">
            <div className="prof-order-id-date">
              <strong>{order.id}</strong>
              <span className="prof-order-date">{order.date}</span>
            </div>
            <div className={`prof-status-badge prof-status-${order.statusCode}`}>
              {order.statusCode === 'delivered' ? <CheckCircle2 size={14} /> : <Truck size={14} />}
              {order.status}
            </div>
          </div>

          <div className="prof-order-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="prof-order-item">
                <span className="prof-item-name">{item.name} &times; {item.qty}</span>
                <span className="prof-item-price">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="prof-order-footer">
            <div className="prof-tracking">
              Mã vận đơn: <span className="prof-text-orange">{order.tracking}</span>
            </div>
            <div className="prof-total-box">
              <span className="prof-total-label">Tổng cộng</span>
              <span className="prof-total-amount">{order.total}</span>
            </div>
          </div>

          {order.canReview && (
            <button className="prof-btn-review" onClick={() => alert('Cảm ơn bạn đã đánh giá 5 sao cho sản phẩm này!')}>
              <Star size={16} /> Đánh giá sản phẩm
            </button>
          )}

        </div>
      ))}
    </div>
  );
}