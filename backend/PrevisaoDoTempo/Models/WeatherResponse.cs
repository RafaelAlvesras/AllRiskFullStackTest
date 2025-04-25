
namespace PrevisaoDoTempo.Models
{
    public class WeatherResponse
    {
        public List<Weather> Weather { get; set; }
        public Main Main { get; set; }
        public string Name { get; set; } 
    }

    public class Weather
    {
        public string Main { get; set; } 
        public string Description { get; set; }
        public string Icon { get; set; } 
    }

    public class Main
    {
        public float Temp { get; set; }
        public float Feels_Like { get; set; }
        public float Temp_Min { get; set; }
        public float Temp_Max { get; set; }
        public int Humidity { get; set; }
    }
}

