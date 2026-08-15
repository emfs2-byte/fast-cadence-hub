using FastWorkshopsApi.Auth;
using FastWorkshopsApi.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FastWorkshopsApi.Controllers;

/// <summary>
/// Autenticação de demonstração: emite um token JWT para um usuário fixo.
/// Em produção, troque a validação abaixo por uma tabela de usuários real.
/// </summary>
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IJwtTokenService _tokenService;

    // Credenciais de demonstração — troque por uma verificação real (hash de senha, banco de usuários) em produção.
    private const string UsuarioDemo = "comite.workshops";
    private const string SenhaDemo = "fast@2025";

    public AuthController(IJwtTokenService tokenService)
    {
        _tokenService = tokenService;
    }

    /// <summary>Autentica o comitê organizador e retorna um token JWT.</summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult<LoginResponseDto> Login(LoginDto dto)
    {
        if (dto.Usuario != UsuarioDemo || dto.Senha != SenhaDemo)
        {
            return Unauthorized(new { mensagem = "Usuário ou senha inválidos." });
        }

        var (token, expiraEm) = _tokenService.GerarToken(dto.Usuario);
        return Ok(new LoginResponseDto(token, expiraEm));
    }
}
