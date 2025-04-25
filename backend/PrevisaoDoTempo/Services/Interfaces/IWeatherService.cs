namespace PrevisaoDoTempo.Services.Interfaces;
using PrevisaoDoTempo.Models;

public interface IWeatherService
{
    Task<WeatherResponse> GetCurrentWeatherAsync(string cityName);
    Task<ForecastResponse> GetForecastAsync(string cityName);
}