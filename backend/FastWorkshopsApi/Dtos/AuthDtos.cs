using System.ComponentModel.DataAnnotations;

namespace FastWorkshopsApi.Dtos;

public class LoginDto
{
    [Required]
    public string Usuario { get; set; } = string.Empty;

    [Required]
    public string Senha { get; set; } = string.Empty;
}

public record LoginResponseDto(string Token, DateTime ExpiraEm);
