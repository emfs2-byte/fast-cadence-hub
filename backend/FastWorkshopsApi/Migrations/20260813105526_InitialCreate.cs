using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FastWorkshopsApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colaboradores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colaboradores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workshops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DataRealizacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workshops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Presencas",
                columns: table => new
                {
                    WorkshopId = table.Column<int>(type: "int", nullable: false),
                    ColaboradorId = table.Column<int>(type: "int", nullable: false),
                    RegistradoEm = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presencas", x => new { x.WorkshopId, x.ColaboradorId });
                    table.ForeignKey(
                        name: "FK_Presencas_Colaboradores_ColaboradorId",
                        column: x => x.ColaboradorId,
                        principalTable: "Colaboradores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Presencas_Workshops_WorkshopId",
                        column: x => x.WorkshopId,
                        principalTable: "Workshops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Colaboradores",
                columns: new[] { "Id", "Nome" },
                values: new object[,]
                {
                    { 1, "Ana Beatriz Costa" },
                    { 2, "Bruno Fernandes Lima" },
                    { 3, "Carla Menezes" },
                    { 4, "Diego Alves Souza" },
                    { 5, "Fernanda Ribeiro" }
                });

            migrationBuilder.InsertData(
                table: "Workshops",
                columns: new[] { "Id", "DataRealizacao", "Descricao", "Nome" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 13, 16, 0, 0, 0, DateTimeKind.Utc), "Panorama prático sobre decomposição de sistemas monolíticos e comunicação entre serviços.", "Introdução a Microsserviços" },
                    { 2, new DateTime(2025, 6, 19, 16, 0, 0, 0, DateTimeKind.Utc), "Como organizar camadas e reduzir acoplamento em projetos reais da FAST.", "Clean Architecture na Prática" }
                });

            migrationBuilder.InsertData(
                table: "Presencas",
                columns: new[] { "ColaboradorId", "WorkshopId", "RegistradoEm" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9462) },
                    { 2, 1, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9470) },
                    { 3, 1, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9470) },
                    { 1, 2, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9471) },
                    { 4, 2, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9472) },
                    { 5, 2, new DateTime(2026, 8, 13, 10, 55, 23, 818, DateTimeKind.Utc).AddTicks(9472) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Presencas_ColaboradorId",
                table: "Presencas",
                column: "ColaboradorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Presencas");

            migrationBuilder.DropTable(
                name: "Colaboradores");

            migrationBuilder.DropTable(
                name: "Workshops");
        }
    }
}
