using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("DonHang")]
    public class DonHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaDonHang { get; set; }

        [Required]
        [StringLength(50)]
        public string MaCode { get; set; } = string.Empty; // VD: #SYS-001

        public int? MaNguoiDung { get; set; }
        [ForeignKey("MaNguoiDung")]
        public NguoiDung? NguoiDung { get; set; }

        public int? MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        [Required]
        [StringLength(100)]
        public string TenKhachHang { get; set; } = string.Empty;

        [StringLength(20)]
        public string SoDienThoai { get; set; } = string.Empty;

        [StringLength(255)]
        public string DiaChi { get; set; } = string.Empty;

        [StringLength(100)]
        public string TinhThanh { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal TongTien { get; set; } = 0;

        [StringLength(50)]
        public string PhuongThucThanhToan { get; set; } = "COD"; // COD, Chuyển khoản, MoMo

        [StringLength(50)]
        public string TrangThai { get; set; } = "Mới"; // Mới, Đã xác nhận, Đang giao, Đã giao, Đã hủy, Hoàn trả

        public DateTime NgayDat { get; set; } = DateTime.Now;

        public ICollection<ChiTietDonHang> DanhSachChiTiet { get; set; } = new List<ChiTietDonHang>();
    }
}
