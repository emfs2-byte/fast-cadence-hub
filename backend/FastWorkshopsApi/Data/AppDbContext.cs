using FastWorkshopsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Colaborador> Colaboradores => Set<Colaborador>();
    public DbSet<Workshop> Workshops => Set<Workshop>();
    public DbSet<Presenca> Presencas => Set<Presenca>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Chave composta da entidade associativa Presenca (ata de presença).
        modelBuilder.Entity<Presenca>()
            .HasKey(p => new { p.WorkshopId, p.ColaboradorId });

        modelBuilder.Entity<Presenca>()
            .HasOne(p => p.Workshop)
            .WithMany(w => w.Presencas)
            .HasForeignKey(p => p.WorkshopId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Presenca>()
            .HasOne(p => p.Colaborador)
            .WithMany(c => c.Presencas)
            .HasForeignKey(p => p.ColaboradorId)
            .OnDelete(DeleteBehavior.Cascade);

        // --- Dados de exemplo (seed), úteis para rodar e demonstrar a API localmente ---

        modelBuilder.Entity<Colaborador>().HasData(
            new Colaborador { Id = 1, Nome = "Ana Beatriz Costa" },
            new Colaborador { Id = 2, Nome = "Bruno Fernandes Lima" },
            new Colaborador { Id = 3, Nome = "Carla Menezes" },
            new Colaborador { Id = 4, Nome = "Diego Alves Souza" },
            new Colaborador { Id = 5, Nome = "Fernanda Ribeiro" }
        );

        modelBuilder.Entity<Workshop>().HasData(
            new Workshop
            {
                Id = 1,
                Nome = "Introdução a Microsserviços",
                DataRealizacao = new DateTime(2025, 3, 13, 16, 0, 0, DateTimeKind.Utc),
                Descricao = "Panorama prático sobre decomposição de sistemas monolíticos e comunicação entre serviços."
            },
            new Workshop
            {
                Id = 2,
                Nome = "Clean Architecture na Prática",
                DataRealizacao = new DateTime(2025, 6, 19, 16, 0, 0, DateTimeKind.Utc),
                Descricao = "Como organizar camadas e reduzir acoplamento em projetos reais da FAST."
            }
        );

        modelBuilder.Entity<Presenca>().HasData(
            new Presenca { WorkshopId = 1, ColaboradorId = 1 },
            new Presenca { WorkshopId = 1, ColaboradorId = 2 },
            new Presenca { WorkshopId = 1, ColaboradorId = 3 },
            new Presenca { WorkshopId = 2, ColaboradorId = 1 },
            new Presenca { WorkshopId = 2, ColaboradorId = 4 },
            new Presenca { WorkshopId = 2, ColaboradorId = 5 }
        );
    }
}
