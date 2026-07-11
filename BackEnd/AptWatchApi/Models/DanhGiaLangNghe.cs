using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("DanhGiaLangNghe")]
    public class DanhGiaLangNghe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaDanhGia { get; set; }

        public int MaLangNghe { get; set; }
        [ForeignKey("MaLangNghe")]
        public LangNghe? LangNghe { get; set; }

        public int MaNguoiDung { get; set; }

        public byte SoSao { get; set; }

        public string? NhanXet { get; set; }

        public string? AnhDinhKam { get; set; } // JSON format

        public DateTime NgayDanhGia { get; set; } = DateTime.Now;
    }
}
