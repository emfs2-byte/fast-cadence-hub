using System.ComponentModel.DataAnnotations;

namespace FastWorkshopsApi.Models;

/// <summary>
/// Representa um workshop trimestral realizado pela FAST Soluções.
/// </summary>
public class Workshop
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    public DateTime DataRealizacao { get; set; }

    [MaxLength(2000)]
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// Ata de presença: colaboradores que compareceram a este workshop.
    /// </summary>
    public ICollection<Presenca> Presencas { get; set; } = new List<Presenca>();
}
