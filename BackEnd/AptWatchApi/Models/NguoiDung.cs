using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("NguoiDung")]
    public class NguoiDung
    {
        [Key]
        public int MaNguoiDung { get; set; }

        [Required]
        [MaxLength(50)]
        public string TenDangNhap { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string MatKhau { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string HoTen { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string SoDienThoai { get; set; } = string.Empty;

        // Vai trò: "Admin", "QuanLyLangNghe", "DuKhach"
        [MaxLength(50)]
        public string VaiTro { get; set; } = "DuKhach";

        // Trạng thái: "Hoạt động", "Khóa"
        [MaxLength(50)]
        public string TrangThai { get; set; } = "Hoạt động";

        public DateTime NgayTao { get; set; } = DateTime.Now;
    }
}
