using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrevisaoDoTempo.Migrations
{
    /// <inheritdoc />
    public partial class CorrigirModelCidadeFavorita : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "CidadesFavoritas",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UsuarioId",
                table: "CidadesFavoritas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
