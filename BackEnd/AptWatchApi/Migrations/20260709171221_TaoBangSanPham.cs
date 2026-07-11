using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptWatchApi.Migrations
{
    /// <inheritdoc />
    public partial class TaoBangSanPham : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    MaSanPham = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenSanPham = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiaBan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HinhAnhUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaLangNghe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPham", x => x.MaSanPham);
                    table.ForeignKey(
                        name: "FK_SanPham_LangNghe_MaLangNghe",
                        column: x => x.MaLangNghe,
                        principalTable: "LangNghe",
                        principalColumn: "MaLangNghe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_MaLangNghe",
                table: "SanPham",
                column: "MaLangNghe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SanPham");
        }
    }
}
