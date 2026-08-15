namespace FastWorkshopsApi.Auth;

/// <summary>Configuração do JWT, lida da seção "Jwt" do appsettings.json.</summary>
public class JwtSettings
{
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpiresMinutes { get; set; } = 60;
}
