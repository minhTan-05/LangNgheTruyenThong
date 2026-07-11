using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("NgheNhan")]
    public class NgheNhan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaNgheNhan { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        [Required]
        [StringLength(150)]
        public string HoTen { get; set; } = string.Empty;

        [StringLength(100)]
        public string DanhHieu { get; set; } = "Thợ giỏi";

        [StringLength(500)]
        public string? AnhDaiDien { get; set; }

        public int SoNamKinhNghiem { get; set; } = 1;

        [StringLength(255)]
        public string? SoTruong { get; set; }

        public string? TieuSu { get; set; }

        public ICollection<SanPham>? DanhSachSanPham { get; set; }
    }
}
