using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("HinhAnhLangNghe")]
    public class HinhAnhLangNghe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaHinhAnh { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        [Required]
        [StringLength(255)]
        public string TieuDe { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string DuongDanAnh { get; set; } = string.Empty;

        public DateTime NgayTaiLen { get; set; } = DateTime.Now;
    }
}
