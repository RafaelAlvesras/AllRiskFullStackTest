using Microsoft.AspNetCore.Mvc;
using PrevisaoDoTempo.Data;
using PrevisaoDoTempo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PrevisaoDoTempoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CidadesFavoritasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CidadesFavoritasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { mensagem = "Usuário não autenticado." });

            var id = int.Parse(userId);
            var favoritas = await _context.CidadesFavoritas
                .Where(c => c.UsuarioId == id)
                .ToListAsync();

            if (!favoritas.Any())
            {
                return Ok(new { mensagem = "Você ainda não tem cidades favoritas cadastradas." });
            }

            return Ok(favoritas);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CidadeFavorita>> Post(CidadeFavorita favorita)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { mensagem = "Usuário não autenticado." });

            var usuarioId = int.Parse(userId);

            favorita.UsuarioId = usuarioId;

            _context.CidadesFavoritas.Add(favorita);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = favorita.Id }, favorita);
        }


        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { mensagem = "Usuário não autenticado." });

            var cidade = await _context.CidadesFavoritas
                .FirstOrDefaultAsync(c => c.Id == id && c.UsuarioId == int.Parse(userId));

            if (cidade == null)
                return NotFound(new { mensagem = "Cidade não encontrada ou não pertence a este usuário." });

            _context.CidadesFavoritas.Remove(cidade);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

