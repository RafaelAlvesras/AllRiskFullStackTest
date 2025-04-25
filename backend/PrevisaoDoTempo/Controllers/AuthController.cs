using Microsoft.AspNetCore.Mvc;
using PrevisaoDoTempo.Services;
using PrevisaoDoTempo.DTOs;
using Microsoft.AspNetCore.Identity;
using PrevisaoDoTempo.Models;
using PrevisaoDoTempo.Data;
using Microsoft.EntityFrameworkCore;

namespace PrevisaoDoTempo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto, [FromServices] AppDbContext context)
        {
            var usuario = await context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (usuario == null)
            {
                return Unauthorized(new { mensagem = "Usuário não encontrado." });
            }

            var passwordHasher = new PasswordHasher<Usuario>();
            var result = passwordHasher.VerifyHashedPassword(usuario, usuario.SenhaHash, dto.Senha);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { mensagem = "Senha incorreta." });
            }

            var token = _jwtService.GenerateToken(usuario.Id.ToString());
            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto, [FromServices] AppDbContext context)
        {
            var usuarioExistente = await context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (usuarioExistente != null)
            {
                return BadRequest(new { mensagem = "E-mail já cadastrado." });
            }

            var passwordHasher = new PasswordHasher<Usuario>();
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
            };
            usuario.SenhaHash = passwordHasher.HashPassword(usuario, dto.Senha);

            context.Usuarios.Add(usuario);
            await context.SaveChangesAsync();

            return Ok(new { mensagem = "Usuário cadastrado com sucesso!" });
        }

    }
}