namespace FastWorkshopsApi.Models;

/// <summary>
/// Registro de presença (ata) que liga um colaborador a um workshop.
/// Entidade associativa da relação muitos-para-muitos entre Workshop e Colaborador.
/// </summary>
public class Presenca
{
    public int WorkshopId { get; set; }
    public Workshop Workshop { get; set; } = null!;

    public int ColaboradorId { get; set; }
    public Colaborador Colaborador { get; set; } = null!;

    /// <summary>
    /// Momento em que a presença foi registrada (check-in).
    /// </summary>
    public DateTime RegistradoEm { get; set; } = DateTime.UtcNow;
}
