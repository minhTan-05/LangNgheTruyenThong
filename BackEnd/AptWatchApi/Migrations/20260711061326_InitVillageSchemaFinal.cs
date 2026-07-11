using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptWatchApi.Migrations
{
    /// <inheritdoc />
    public partial class InitVillageSchemaFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HinhAnhUrl",
                table: "SanPham",
                newName: "DanhSachAnh");

            migrationBuilder.AlterColumn<string>(
                name: "TenSanPham",
                table: "SanPham",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "DuongDanSlug",
                table: "SanPham",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "GiaKhuyenMai",
                table: "SanPham",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaNgheNhan",
                table: "SanPham",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SanPhamtieuBieu",
                table: "SanPham",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SoLuongTonKho",
                table: "SanPham",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ThongSoKyThuat",
                table: "SanPham",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                table: "SanPham",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<decimal>(
                name: "ViDo",
                table: "LangNghe",
                type: "decimal(10,8)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "TenLangNghe",
                table: "LangNghe",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<decimal>(
                name: "KinhDo",
                table: "LangNghe",
                type: "decimal(11,8)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "AnhBia",
                table: "LangNghe",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DanhSachAnh",
                table: "LangNghe",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChiCuThe",
                table: "LangNghe",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "DiemDanhGia",
                table: "LangNghe",
                type: "decimal(3,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DuongDanSlug",
                table: "LangNghe",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GioiThieuNgan",
                table: "LangNghe",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LichSuHinhThanh",
                table: "LangNghe",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaNhomNghe",
                table: "LangNghe",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaQuanLy",
                table: "LangNghe",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTao",
                table: "LangNghe",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "SoLuotDanhGia",
                table: "LangNghe",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TinhThanh",
                table: "LangNghe",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                table: "LangNghe",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "DanhGiaLangNghe",
                columns: table => new
                {
                    MaDanhGia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLangNghe = table.Column<int>(type: "int", nullable: false),
                    MaNguoiDung = table.Column<int>(type: "int", nullable: false),
                    SoSao = table.Column<byte>(type: "tinyint", nullable: false),
                    NhanXet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AnhDinhKam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayDanhGia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhGiaLangNghe", x => x.MaDanhGia);
                    table.ForeignKey(
                        name: "FK_DanhGiaLangNghe_LangNghe_MaLangNghe",
                        column: x => x.MaLangNghe,
                        principalTable: "LangNghe",
                        principalColumn: "MaLangNghe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NgheNhan",
                columns: table => new
                {
                    MaNgheNhan = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLangNghe = table.Column<int>(type: "int", nullable: false),
                    HoTen = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    DanhHieu = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AnhDaiDien = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoNamKinhNghiem = table.Column<int>(type: "int", nullable: false),
                    SoTruong = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TieuSu = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NgheNhan", x => x.MaNgheNhan);
                    table.ForeignKey(
                        name: "FK_NgheNhan_LangNghe_MaLangNghe",
                        column: x => x.MaLangNghe,
                        principalTable: "LangNghe",
                        principalColumn: "MaLangNghe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NhomNghe",
                columns: table => new
                {
                    MaNhomNghe = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNhomNghe = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MaMauTag = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IconMinhHoa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhomNghe", x => x.MaNhomNghe);
                });

            migrationBuilder.CreateTable(
                name: "ThuyetMinhAudio",
                columns: table => new
                {
                    MaThuyetMinh = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLangNghe = table.Column<int>(type: "int", nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MaNgonNgu = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DuongDanAudio = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ThoiLuongGiay = table.Column<int>(type: "int", nullable: false),
                    NoiDungVaniBan = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuyetMinhAudio", x => x.MaThuyetMinh);
                    table.ForeignKey(
                        name: "FK_ThuyetMinhAudio_LangNghe_MaLangNghe",
                        column: x => x.MaLangNghe,
                        principalTable: "LangNghe",
                        principalColumn: "MaLangNghe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourTraiNghiem",
                columns: table => new
                {
                    MaTour = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLangNghe = table.Column<int>(type: "int", nullable: false),
                    MaNgheNhan = table.Column<int>(type: "int", nullable: true),
                    TenTour = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    GiaVe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThoiGianGio = table.Column<decimal>(type: "decimal(4,1)", nullable: false),
                    SoKhachToiDa = table.Column<int>(type: "int", nullable: false),
                    LichTrinh = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourTraiNghiem", x => x.MaTour);
                    table.ForeignKey(
                        name: "FK_TourTraiNghiem_LangNghe_MaLangNghe",
                        column: x => x.MaLangNghe,
                        principalTable: "LangNghe",
                        principalColumn: "MaLangNghe",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TourTraiNghiem_NgheNhan_MaNgheNhan",
                        column: x => x.MaNgheNhan,
                        principalTable: "NgheNhan",
                        principalColumn: "MaNgheNhan");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_MaNgheNhan",
                table: "SanPham",
                column: "MaNgheNhan");

            migrationBuilder.CreateIndex(
                name: "IX_LangNghe_MaNhomNghe",
                table: "LangNghe",
                column: "MaNhomNghe");

            migrationBuilder.CreateIndex(
                name: "IX_DanhGiaLangNghe_MaLangNghe",
                table: "DanhGiaLangNghe",
                column: "MaLangNghe");

            migrationBuilder.CreateIndex(
                name: "IX_NgheNhan_MaLangNghe",
                table: "NgheNhan",
                column: "MaLangNghe");

            migrationBuilder.CreateIndex(
                name: "IX_ThuyetMinhAudio_MaLangNghe",
                table: "ThuyetMinhAudio",
                column: "MaLangNghe");

            migrationBuilder.CreateIndex(
                name: "IX_TourTraiNghiem_MaLangNghe",
                table: "TourTraiNghiem",
                column: "MaLangNghe");

            migrationBuilder.CreateIndex(
                name: "IX_TourTraiNghiem_MaNgheNhan",
                table: "TourTraiNghiem",
                column: "MaNgheNhan");

            migrationBuilder.AddForeignKey(
                name: "FK_LangNghe_NhomNghe_MaNhomNghe",
                table: "LangNghe",
                column: "MaNhomNghe",
                principalTable: "NhomNghe",
                principalColumn: "MaNhomNghe",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_SanPham_NgheNhan_MaNgheNhan",
                table: "SanPham",
                column: "MaNgheNhan",
                principalTable: "NgheNhan",
                principalColumn: "MaNgheNhan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LangNghe_NhomNghe_MaNhomNghe",
                table: "LangNghe");

            migrationBuilder.DropForeignKey(
                name: "FK_SanPham_NgheNhan_MaNgheNhan",
                table: "SanPham");

            migrationBuilder.DropTable(
                name: "DanhGiaLangNghe");

            migrationBuilder.DropTable(
                name: "NhomNghe");

            migrationBuilder.DropTable(
                name: "ThuyetMinhAudio");

            migrationBuilder.DropTable(
                name: "TourTraiNghiem");

            migrationBuilder.DropTable(
                name: "NgheNhan");

            migrationBuilder.DropIndex(
                name: "IX_SanPham_MaNgheNhan",
                table: "SanPham");

            migrationBuilder.DropIndex(
                name: "IX_LangNghe_MaNhomNghe",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "DuongDanSlug",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "GiaKhuyenMai",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "MaNgheNhan",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "SanPhamtieuBieu",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "SoLuongTonKho",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "ThongSoKyThuat",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "SanPham");

            migrationBuilder.DropColumn(
                name: "AnhBia",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "DanhSachAnh",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "DiaChiCuThe",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "DiemDanhGia",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "DuongDanSlug",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "GioiThieuNgan",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "LichSuHinhThanh",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "MaNhomNghe",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "MaQuanLy",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "NgayTao",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "SoLuotDanhGia",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "TinhThanh",
                table: "LangNghe");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "LangNghe");

            migrationBuilder.RenameColumn(
                name: "DanhSachAnh",
                table: "SanPham",
                newName: "HinhAnhUrl");

            migrationBuilder.AlterColumn<string>(
                name: "TenSanPham",
                table: "SanPham",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<double>(
                name: "ViDo",
                table: "LangNghe",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,8)");

            migrationBuilder.AlterColumn<string>(
                name: "TenLangNghe",
                table: "LangNghe",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<double>(
                name: "KinhDo",
                table: "LangNghe",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(11,8)");
        }
    }
}
