using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("ChiTietDonHang")]
    public class ChiTietDonHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaChiTiet { get; set; }

        public int MaDonHang { get; set; }
        [ForeignKey("MaDonHang")]
        public DonHang? DonHang { get; set; }

        public int MaSanPham { get; set; }
        [ForeignKey("MaSanPham")]
        public SanPham? SanPham { get; set; }

        public int SoLuong { get; set; } = 1;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal DonGia { get; set; } = 0;
    }
}
