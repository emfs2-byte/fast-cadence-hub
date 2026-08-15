using System.ComponentModel.DataAnnotations;

namespace FastWorkshopsApi.Dtos;

/// <summary>DTO de leitura de um colaborador.</summary>
public record ColaboradorDto(int Id, string Nome, int TotalWorkshops);

/// <summary>DTO usado para criar um colaborador.</summary>
public class ColaboradorCreateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;
}

/// <summary>DTO usado para atualizar um colaborador existente.</summary>
public class ColaboradorUpdateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;
}
