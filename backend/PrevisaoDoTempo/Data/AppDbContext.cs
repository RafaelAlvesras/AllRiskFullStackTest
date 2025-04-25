using Microsoft.EntityFrameworkCore;
using PrevisaoDoTempo.Models;

namespace PrevisaoDoTempo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<CidadeFavorita> CidadesFavoritas { get; set; }
    }
}
