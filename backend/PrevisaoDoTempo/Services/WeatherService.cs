using PrevisaoDoTempo.Services.Interfaces;
using PrevisaoDoTempo.Models;


namespace PrevisaoDoTempo
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public WeatherService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["OpenWeather:ApiKey"];
        }

        public async Task<WeatherResponse> GetCurrentWeatherAsync(string cityName)
        {
            var cityEncoded = Uri.EscapeDataString(cityName);
            var response = await _httpClient.GetFromJsonAsync<WeatherResponse>(
                $"https://api.openweathermap.org/data/2.5/weather?q={cityEncoded}&units=metric&appid={_apiKey}&lang=pt_br");

            return response!;
        }

        public async Task<ForecastResponse> GetForecastAsync(string cityName)
        {
            var cityEncoded = Uri.EscapeDataString(cityName);
            var response = await _httpClient.GetFromJsonAsync<ForecastResponse>(
                $"https://api.openweathermap.org/data/2.5/forecast?q={cityEncoded}&units=metric&appid={_apiKey}&lang=pt_br");

            return response!;
        }
    }
}
