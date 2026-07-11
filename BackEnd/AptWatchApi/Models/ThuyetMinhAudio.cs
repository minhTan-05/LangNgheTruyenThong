using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("ThuyetMinhAudio")]
    public class ThuyetMinhAudio
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaThuyetMinh { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        [Required]
        [StringLength(255)]
        public string TieuDe { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string MaNgonNgu { get; set; } = "vi";

        [Required]
        [StringLength(500)]
        public string DuongDanAudio { get; set; } = string.Empty;

        public int ThoiLuongGiay { get; set; }

        public string? NoiDungVaniBan { get; set; }
    }
}
