import { useState, useEffect } from "react";
import { LocationData } from "../../types/Telegram";
import { WeatherData } from "../../types/weather-data.ts";
import axios from "axios";

type Location = {
  latitude: number;
  longitude: number;
};

function LocationWidget(): JSX.Element {
  const [coordinates, setCoordinates] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationManagerInited, setLocationManagerInited] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp.LocationManager && !locationManagerInited) {
      window.Telegram.WebApp.LocationManager.init(() => {
        setLocationManagerInited(true);
      });
    }
  }, [locationManagerInited]);

  useEffect(() => {
    if (coordinates) {
      fetchWeather(coordinates).catch(() =>
        setError("Failed to retrieve weather data")
      );
    }
  }, [coordinates]);

  const handleGetLocation = () => {
    if (locationManagerInited) {
      window.Telegram?.WebApp.LocationManager.getLocation(
        (locationData: null | LocationData) => {
          if (locationData) {
            setCoordinates({
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            });
          }
        }
      );
    }
  };

  const fetchWeather = async (coords: Location): Promise<void> => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={handleGetLocation}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        ⛅ Find out the weather outside 🌡️
      </button>
      {/* Блок отладки */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Weather in {weatherData.name}</h2>
          <p>
            {weatherData.weather[0].main}. {weatherData.weather[0].description}
          </p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} meters per second</p>
        </div>
      )}
      {/* Блок отладки */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

export default LocationWidget;
