using System.ComponentModel.DataAnnotations;

namespace FastWorkshopsApi.Models;

/// <summary>
/// Representa um colaborador da FAST Soluções que pode participar de workshops.
/// </summary>
public class Colaborador
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;

    /// <summary>
    /// Presenças (atas) associadas a este colaborador.
    /// </summary>
    public ICollection<Presenca> Presencas { get; set; } = new List<Presenca>();
}
