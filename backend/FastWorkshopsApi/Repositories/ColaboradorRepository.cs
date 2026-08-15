using FastWorkshopsApi.Data;
using FastWorkshopsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsApi.Repositories;

public interface IColaboradorRepository
{
    Task<List<Colaborador>> ListarAsync();
    Task<Colaborador?> ObterPorIdAsync(int id);
    Task<Colaborador> CriarAsync(Colaborador colaborador);
    Task<bool> AtualizarAsync(int id, Colaborador dadosAtualizados);
    Task<bool> RemoverAsync(int id);
    Task<bool> ExisteAsync(int id);
}

public class ColaboradorRepository : IColaboradorRepository
{
    private readonly AppDbContext _context;

    public ColaboradorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Colaborador>> ListarAsync() =>
        await _context.Colaboradores
            .Include(c => c.Presencas)
            .OrderBy(c => c.Nome)
            .ToListAsync();

    public async Task<Colaborador?> ObterPorIdAsync(int id) =>
        await _context.Colaboradores
            .Include(c => c.Presencas)
            .FirstOrDefaultAsync(c => c.Id == id);

    public async Task<Colaborador> CriarAsync(Colaborador colaborador)
    {
        _context.Colaboradores.Add(colaborador);
        await _context.SaveChangesAsync();
        return colaborador;
    }

    public async Task<bool> AtualizarAsync(int id, Colaborador dadosAtualizados)
    {
        var existente = await _context.Colaboradores.FindAsync(id);
        if (existente is null) return false;

        existente.Nome = dadosAtualizados.Nome;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var existente = await _context.Colaboradores.FindAsync(id);
        if (existente is null) return false;

        _context.Colaboradores.Remove(existente);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExisteAsync(int id) =>
        await _context.Colaboradores.AnyAsync(c => c.Id == id);
}
