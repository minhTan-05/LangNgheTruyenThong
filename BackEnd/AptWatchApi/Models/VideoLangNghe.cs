using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("VideoLangNghe")]
    public class VideoLangNghe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaVideo { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        [Required]
        [StringLength(255)]
        public string TieuDe { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string DuongDanVideo { get; set; } = string.Empty;

        [StringLength(50)]
        public string ThoiLuong { get; set; } = "05:00";

        public int LuotXem { get; set; } = 0;

        public bool NoiBat { get; set; } = false;

        public DateTime NgayTaiLen { get; set; } = DateTime.Now;
    }
}
