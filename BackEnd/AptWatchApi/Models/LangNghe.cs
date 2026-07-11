using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("LangNghe")]
    public class LangNghe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaLangNghe { get; set; }

        public int? MaQuanLy { get; set; }

        public int? MaNhomNghe { get; set; }
        [ForeignKey("MaNhomNghe")]
        public NhomNghe? NhomNghe { get; set; }

        [Required]
        [StringLength(255)]
        public string TenLangNghe { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string DuongDanSlug { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string TinhThanh { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string DiaChiCuThe { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10, 8)")]
        public decimal ViDo { get; set; }

        [Column(TypeName = "decimal(11, 8)")]
        public decimal KinhDo { get; set; }

        public string? LichSuHinhThanh { get; set; }

        [StringLength(1000)]
        public string? GioiThieuNgan { get; set; }

        [Required]
        [StringLength(500)]
        public string AnhBia { get; set; } = string.Empty;

        public string? DanhSachAnh { get; set; } // JSON format

        [Column(TypeName = "decimal(3, 2)")]
        public decimal DiemDanhGia { get; set; } = 5.00m;

        public int SoLuotDanhGia { get; set; } = 0;

        [StringLength(50)]
        public string TrangThai { get; set; } = "HoatDong";

        public DateTime NgayTao { get; set; } = DateTime.Now;

        public ICollection<NgheNhan>? DanhSachNgheNhan { get; set; }
        public ICollection<SanPham>? DanhSachSanPham { get; set; }
        public ICollection<ThuyetMinhAudio>? DanhSachAudio { get; set; }
        public ICollection<TourTraiNghiem>? DanhSachTour { get; set; }
        public ICollection<DanhGiaLangNghe>? DanhSachDanhGia { get; set; }
    }
}