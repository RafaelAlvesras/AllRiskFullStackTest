namespace PrevisaoDoTempo.Models
{
    public class ForecastResponse
    {
        public List<ForecastItem> List { get; set; }
        public CityInfo City { get; set; }
    }

    public class ForecastItem
    {
        public Main Main { get; set; }
        public List<Weather> Weather { get; set; }
        public string Dt_txt { get; set; } // Data e hora
    }

    public class CityInfo
    {
        public string Name { get; set; }
    }
}