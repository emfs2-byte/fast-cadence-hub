using System.ComponentModel.DataAnnotations;

namespace FastWorkshopsApi.Dtos;

/// <summary>DTO de leitura resumido, usado em listagens.</summary>
public record WorkshopResumoDto(int Id, string Nome, DateTime DataRealizacao, int TotalPresentes);

/// <summary>DTO de leitura completo, usado na tela de detalhes.</summary>
public record WorkshopDetalheDto(
    int Id,
    string Nome,
    DateTime DataRealizacao,
    string Descricao,
    List<ColaboradorDto> Participantes
);

/// <summary>DTO usado para criar um workshop.</summary>
public class WorkshopCreateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de realização é obrigatória.")]
    public DateTime DataRealizacao { get; set; }

    [MaxLength(2000)]
    public string Descricao { get; set; } = string.Empty;
}

/// <summary>DTO usado para atualizar um workshop existente.</summary>
public class WorkshopUpdateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de realização é obrigatória.")]
    public DateTime DataRealizacao { get; set; }

    [MaxLength(2000)]
    public string Descricao { get; set; } = string.Empty;
}

/// <summary>DTO usado para registrar ou remover a presença de um colaborador em um workshop.</summary>
public class PresencaDto
{
    [Required(ErrorMessage = "O Id do colaborador é obrigatório.")]
    public int ColaboradorId { get; set; }
}
