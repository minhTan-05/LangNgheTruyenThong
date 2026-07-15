using Microsoft.EntityFrameworkCore;
using AptWatchApi.Models;

namespace AptWatchApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<NhomNghe> NhomNghe { get; set; }
        public DbSet<LangNghe> LangNghe { get; set; }
        public DbSet<NgheNhan> NgheNhan { get; set; }
        public DbSet<SanPham> SanPham { get; set; }
        public DbSet<ThuyetMinhAudio> ThuyetMinhAudio { get; set; }
        public DbSet<TourTraiNghiem> TourTraiNghiem { get; set; }
        public DbSet<DanhGiaLangNghe> DanhGiaLangNghe { get; set; }
        public DbSet<NguoiDung> NguoiDung { get; set; }
        public DbSet<DonHang> DonHang { get; set; }
        public DbSet<ChiTietDonHang> ChiTietDonHang { get; set; }
        public DbSet<HinhAnhLangNghe> HinhAnhLangNghe { get; set; }
        public DbSet<VideoLangNghe> VideoLangNghe { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình các ràng buộc đặc biệt cho SQL Server
            modelBuilder.Entity<LangNghe>()
                .HasOne(l => l.NhomNghe)
                .WithMany(n => n.DanhSachLangNghe)
                .HasForeignKey(l => l.MaNhomNghe)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<NgheNhan>()
                .HasOne(n => n.LangNghe)
                .WithMany(l => l.DanhSachNgheNhan)
                .HasForeignKey(n => n.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SanPham>()
                .HasOne(s => s.LangNghe)
                .WithMany(l => l.DanhSachSanPham)
                .HasForeignKey(s => s.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ThuyetMinhAudio>()
                .HasOne(t => t.LangNghe)
                .WithMany(l => l.DanhSachAudio)
                .HasForeignKey(t => t.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TourTraiNghiem>()
                .HasOne(t => t.LangNghe)
                .WithMany(l => l.DanhSachTour)
                .HasForeignKey(t => t.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DanhGiaLangNghe>()
                .HasOne(d => d.LangNghe)
                .WithMany(l => l.DanhSachDanhGia)
                .HasForeignKey(d => d.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DonHang>()
                .HasOne(d => d.LangNghe)
                .WithMany()
                .HasForeignKey(d => d.MaLangNghe)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ChiTietDonHang>()
                .HasOne(c => c.DonHang)
                .WithMany(d => d.DanhSachChiTiet)
                .HasForeignKey(c => c.MaDonHang)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HinhAnhLangNghe>()
                .HasOne(h => h.LangNghe)
                .WithMany()
                .HasForeignKey(h => h.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VideoLangNghe>()
                .HasOne(v => v.LangNghe)
                .WithMany()
                .HasForeignKey(v => v.MaLangNghe)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}