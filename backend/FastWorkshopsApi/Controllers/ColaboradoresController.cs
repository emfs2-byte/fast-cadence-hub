using FastWorkshopsApi.Dtos;
using FastWorkshopsApi.Models;
using FastWorkshopsApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastWorkshopsApi.Controllers;

/// <summary>CRUD de colaboradores da FAST Soluções.</summary>
[ApiController]
[Route("api/colaboradores")]
public class ColaboradoresController : ControllerBase
{
    private readonly IColaboradorRepository _repository;

    public ColaboradoresController(IColaboradorRepository repository)
    {
        _repository = repository;
    }

    /// <summary>Lista todos os colaboradores cadastrados.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<ColaboradorDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ColaboradorDto>>> Listar()
    {
        var colaboradores = await _repository.ListarAsync();
        var dtos = colaboradores.Select(c => new ColaboradorDto(c.Id, c.Nome, c.Presencas.Count)).ToList();
        return Ok(dtos);
    }

    /// <summary>Obtém um colaborador pelo Id.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ColaboradorDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ColaboradorDto>> ObterPorId(int id)
    {
        var colaborador = await _repository.ObterPorIdAsync(id);
        if (colaborador is null)
            return NotFound(new { mensagem = $"Colaborador {id} não encontrado." });

        return Ok(new ColaboradorDto(colaborador.Id, colaborador.Nome, colaborador.Presencas.Count));
    }

    /// <summary>Cria um novo colaborador.</summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(ColaboradorDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ColaboradorDto>> Criar(ColaboradorCreateDto dto)
    {
        var novo = await _repository.CriarAsync(new Colaborador { Nome = dto.Nome });
        var resultado = new ColaboradorDto(novo.Id, novo.Nome, 0);
        return CreatedAtAction(nameof(ObterPorId), new { id = novo.Id }, resultado);
    }

    /// <summary>Atualiza um colaborador existente.</summary>
    [HttpPut("{id:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Atualizar(int id, ColaboradorUpdateDto dto)
    {
        var atualizado = await _repository.AtualizarAsync(id, new Colaborador { Nome = dto.Nome });
        if (!atualizado)
            return NotFound(new { mensagem = $"Colaborador {id} não encontrado." });

        return NoContent();
    }

    /// <summary>Remove um colaborador.</summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Remover(int id)
    {
        var removido = await _repository.RemoverAsync(id);
        if (!removido)
            return NotFound(new { mensagem = $"Colaborador {id} não encontrado." });

        return NoContent();
    }
}
