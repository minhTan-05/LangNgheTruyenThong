using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("TourTraiNghiem")]
    public class TourTraiNghiem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaTour { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        public int? MaNgheNhan { get; set; }
        [ForeignKey("MaNgheNhan")]
        public NgheNhan? NgheNhan { get; set; }

        [Required]
        [StringLength(255)]
        public string TenTour { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal GiaVe { get; set; }

        [Column(TypeName = "decimal(4, 1)")]
        public decimal ThoiGianGio { get; set; }

        public int SoKhachToiDa { get; set; } = 20;

        [Required]
        [StringLength(255)]
        public string LichTrinh { get; set; } = string.Empty;
    }
}
