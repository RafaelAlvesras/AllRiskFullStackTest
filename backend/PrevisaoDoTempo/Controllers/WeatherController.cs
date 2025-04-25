using Microsoft.AspNetCore.Mvc;
using PrevisaoDoTempo.Services.Interfaces;
using PrevisaoDoTempo.Models;

namespace PrevisaoDoTempo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("{city}")]
        public async Task<ActionResult<WeatherResponse>> GetWeather(string city)
        {
            try
            {
                var result = await _weatherService.GetCurrentWeatherAsync(city);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Cidade não encontrada.", detalhes = ex.Message });
            }
        }

        [HttpGet("forecast/{city}")]
        public async Task<IActionResult> GetForecast(string city)
        {
            try
            {
                var forecast = await _weatherService.GetForecastAsync(city);
                return Ok(forecast);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erro ao obter previsão estendida.", detalhes = ex.Message });
            }
        }
    }
}
