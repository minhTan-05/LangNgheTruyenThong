import React, { useState } from 'react';
import '../css/quanlysanpham.css';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const initialProducts = [
  {
    id: 1,
    name: 'Bình hoa gốm men ngọc Bát Tràng',
    category: 'Gốm sứ trang trí',
    price: '450.000đ',
    stock: 25,
    status: 'Đang bán',
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Bộ ấm chén gốm men rạn cổ trạm bọc đồng',
    category: 'Gốm sứ gia dụng',
    price: '1.250.000đ',
    stock: 12,
    status: 'Đang bán',
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Đĩa gốm phong thủy vẽ cá chép hoa sen',
    category: 'Gốm sứ phong thủy',
    price: '850.000đ',
    stock: 8,
    status: 'Đang bán',
    img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200&auto=format&fit=crop'
  }
];

export default function QuanLySanPham() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi danh mục làng nghề?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="vp-main">
      <div className="vp-header">
        <div>
          <h1 className="vp-title">Quản lý Danh mục Sản phẩm Làng nghề</h1>
          <p className="vp-subtitle">Cập nhật, chỉnh sửa giá bán và theo dõi tồn kho các sản phẩm thủ công mỹ nghệ</p>
        </div>
        <button className="vp-btn-add" onClick={() => alert('Đang mở form Thêm mới sản phẩm...')}>
          <Plus size={18} /> Thêm sản phẩm mới
        </button>
      </div>

      <div className="vp-table-container">
        <table className="vp-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="vp-prod-info">
                    <img src={p.img} alt={p.name} className="vp-prod-img" />
                    <strong>{p.name}</strong>
                  </div>
                </td>
                <td>{p.category}</td>
                <td style={{ fontWeight: 'bold', color: '#b45309' }}>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <span className="vp-badge vp-badge-active">{p.status}</span>
                </td>
                <td>
                  <button className="vp-btn-icon" onClick={() => alert(`Đang sửa sản phẩm: ${p.name}`)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="vp-btn-icon delete" onClick={() => handleDelete(p.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
