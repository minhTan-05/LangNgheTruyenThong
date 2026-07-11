using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptWatchApi.Models
{
    [Table("NhomNghe")]
    public class NhomNghe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaNhomNghe { get; set; }

        [Required]
        [StringLength(100)]
        public string TenNhomNghe { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string MaMauTag { get; set; } = string.Empty;

        [StringLength(100)]
        public string? IconMinhHoa { get; set; }

        public ICollection<LangNghe>? DanhSachLangNghe { get; set; }
    }
}
