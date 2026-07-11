using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("SanPham")]
    public class SanPham
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaSanPham { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        public int? MaNgheNhan { get; set; }
        [ForeignKey("MaNgheNhan")]
        public NgheNhan? NgheNhan { get; set; }

        [Required]
        [StringLength(255)]
        public string TenSanPham { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string DuongDanSlug { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal GiaBan { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? GiaKhuyenMai { get; set; }

        public int SoLuongTonKho { get; set; } = 0;

        [Required]
        public string DanhSachAnh { get; set; } = string.Empty; // JSON format

        public string? ThongSoKyThuat { get; set; } // JSON format

        public bool SanPhamtieuBieu { get; set; } = false;

        [StringLength(50)]
        public string TrangThai { get; set; } = "ConHang";
    }
}