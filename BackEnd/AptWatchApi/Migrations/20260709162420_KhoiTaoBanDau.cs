using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptWatchApi.Migrations
{
    /// <inheritdoc />
    public partial class KhoiTaoBanDau : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LangNghe",
                columns: table => new
                {
                    MaLangNghe = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLangNghe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ViDo = table.Column<double>(type: "float", nullable: false),
                    KinhDo = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LangNghe", x => x.MaLangNghe);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LangNghe");
        }
    }
}
