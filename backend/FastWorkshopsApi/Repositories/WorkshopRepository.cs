using FastWorkshopsApi.Data;
using FastWorkshopsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsApi.Repositories;

public interface IWorkshopRepository
{
    Task<List<Workshop>> ListarAsync();
    Task<Workshop?> ObterPorIdAsync(int id);
    Task<Workshop> CriarAsync(Workshop workshop);
    Task<bool> AtualizarAsync(int id, Workshop dadosAtualizados);
    Task<bool> RemoverAsync(int id);

    Task<bool> RegistrarPresencaAsync(int workshopId, int colaboradorId);
    Task<bool> RemoverPresencaAsync(int workshopId, int colaboradorId);
}

public class WorkshopRepository : IWorkshopRepository
{
    private readonly AppDbContext _context;

    public WorkshopRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Workshop>> ListarAsync() =>
        await _context.Workshops
            .Include(w => w.Presencas)
            .OrderBy(w => w.DataRealizacao)
            .ToListAsync();

    public async Task<Workshop?> ObterPorIdAsync(int id) =>
        await _context.Workshops
            .Include(w => w.Presencas)
            .ThenInclude(p => p.Colaborador)
            .FirstOrDefaultAsync(w => w.Id == id);

    public async Task<Workshop> CriarAsync(Workshop workshop)
    {
        _context.Workshops.Add(workshop);
        await _context.SaveChangesAsync();
        return workshop;
    }

    public async Task<bool> AtualizarAsync(int id, Workshop dadosAtualizados)
    {
        var existente = await _context.Workshops.FindAsync(id);
        if (existente is null) return false;

        existente.Nome = dadosAtualizados.Nome;
        existente.DataRealizacao = dadosAtualizados.DataRealizacao;
        existente.Descricao = dadosAtualizados.Descricao;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var existente = await _context.Workshops.FindAsync(id);
        if (existente is null) return false;

        _context.Workshops.Remove(existente);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RegistrarPresencaAsync(int workshopId, int colaboradorId)
    {
        var workshopExiste = await _context.Workshops.AnyAsync(w => w.Id == workshopId);
        var colaboradorExiste = await _context.Colaboradores.AnyAsync(c => c.Id == colaboradorId);
        if (!workshopExiste || !colaboradorExiste) return false;

        var jaRegistrada = await _context.Presencas
            .AnyAsync(p => p.WorkshopId == workshopId && p.ColaboradorId == colaboradorId);
        if (jaRegistrada) return true; // idempotente

        _context.Presencas.Add(new Presenca
        {
            WorkshopId = workshopId,
            ColaboradorId = colaboradorId,
            RegistradoEm = DateTime.UtcNow
        });
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoverPresencaAsync(int workshopId, int colaboradorId)
    {
        var presenca = await _context.Presencas
            .FirstOrDefaultAsync(p => p.WorkshopId == workshopId && p.ColaboradorId == colaboradorId);
        if (presenca is null) return false;

        _context.Presencas.Remove(presenca);
        await _context.SaveChangesAsync();
        return true;
    }
}
