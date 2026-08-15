using FastWorkshopsApi.Dtos;
using FastWorkshopsApi.Models;
using FastWorkshopsApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastWorkshopsApi.Controllers;

/// <summary>CRUD de workshops trimestrais e gestão da ata de presença.</summary>
[ApiController]
[Route("api/workshops")]
public class WorkshopsController : ControllerBase
{
    private readonly IWorkshopRepository _repository;

    public WorkshopsController(IWorkshopRepository repository)
    {
        _repository = repository;
    }

    /// <summary>Lista todos os workshops, ordenados por data de realização.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<WorkshopResumoDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<WorkshopResumoDto>>> Listar()
    {
        var workshops = await _repository.ListarAsync();
        var dtos = workshops
            .Select(w => new WorkshopResumoDto(w.Id, w.Nome, w.DataRealizacao, w.Presencas.Count))
            .ToList();
        return Ok(dtos);
    }

    /// <summary>Obtém os detalhes de um workshop, incluindo a lista de presença.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(WorkshopDetalheDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<WorkshopDetalheDto>> ObterPorId(int id)
    {
        var workshop = await _repository.ObterPorIdAsync(id);
        if (workshop is null)
            return NotFound(new { mensagem = $"Workshop {id} não encontrado." });

        var participantes = workshop.Presencas
            .Select(p => new ColaboradorDto(p.Colaborador.Id, p.Colaborador.Nome, p.Colaborador.Presencas.Count))
            .OrderBy(c => c.Nome)
            .ToList();

        var detalhe = new WorkshopDetalheDto(
            workshop.Id, workshop.Nome, workshop.DataRealizacao, workshop.Descricao, participantes);

        return Ok(detalhe);
    }

    /// <summary>Cria um novo workshop.</summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(WorkshopResumoDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<WorkshopResumoDto>> Criar(WorkshopCreateDto dto)
    {
        var novo = await _repository.CriarAsync(new Workshop
        {
            Nome = dto.Nome,
            DataRealizacao = dto.DataRealizacao,
            Descricao = dto.Descricao
        });

        var resultado = new WorkshopResumoDto(novo.Id, novo.Nome, novo.DataRealizacao, 0);
        return CreatedAtAction(nameof(ObterPorId), new { id = novo.Id }, resultado);
    }

    /// <summary>Atualiza um workshop existente.</summary>
    [HttpPut("{id:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Atualizar(int id, WorkshopUpdateDto dto)
    {
        var atualizado = await _repository.AtualizarAsync(id, new Workshop
        {
            Nome = dto.Nome,
            DataRealizacao = dto.DataRealizacao,
            Descricao = dto.Descricao
        });

        if (!atualizado)
            return NotFound(new { mensagem = $"Workshop {id} não encontrado." });

        return NoContent();
    }

    /// <summary>Remove um workshop.</summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Remover(int id)
    {
        var removido = await _repository.RemoverAsync(id);
        if (!removido)
            return NotFound(new { mensagem = $"Workshop {id} não encontrado." });

        return NoContent();
    }

    /// <summary>Registra a presença de um colaborador na ata do workshop (check-in).</summary>
    [HttpPost("{id:int}/presencas")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RegistrarPresenca(int id, PresencaDto dto)
    {
        var registrado = await _repository.RegistrarPresencaAsync(id, dto.ColaboradorId);
        if (!registrado)
            return NotFound(new { mensagem = "Workshop ou colaborador não encontrado." });

        return NoContent();
    }

    /// <summary>Remove a presença de um colaborador da ata do workshop.</summary>
    [HttpDelete("{id:int}/presencas/{colaboradorId:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoverPresenca(int id, int colaboradorId)
    {
        var removido = await _repository.RemoverPresencaAsync(id, colaboradorId);
        if (!removido)
            return NotFound(new { mensagem = "Presença não encontrada." });

        return NoContent();
    }
}
