import { useState, useEffect } from "react";
import { LocationData } from "../../types/Telegram";
import { WeatherData } from "../../types/weather-data";
import axios from "axios";

type Location = {
  latitude: number;
  longitude: number;
};

function LocationWidget(): JSX.Element {
  const [coordinates, setCoordinates] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [locationManagerInited, setLocationManagerInited] = useState(false);
  const [tgWebAppLocationManagerObj, setTgWebAppLocationManagerObj] = useState<
    string | null
  >(null);

  useEffect(() => {
    const initInfo = initializeTelegramWebApp();
    setDebugInfo(initInfo);
    setTgWebAppLocationManagerObj(
      JSON.stringify(window.Telegram?.WebApp.LocationManager)
    );

    if (window.Telegram?.WebApp.LocationManager && !locationManagerInited) {
      window.Telegram.WebApp.LocationManager.init(() => {
        setLocationManagerInited(true);
      });
    }
  }, [locationManagerInited]);

  useEffect(() => {
    if (coordinates) {
      fetchWeather(coordinates).catch((err) =>
        setError("Не удалось получить данные о погоде: " + err.message)
      );
    }
  }, [coordinates]);

  const handleGetLocation = () => {
    setError(null);
    setCoordinates(null);
    updateDebugInfo("\n\nНачало запроса геолокации...");

    if (locationManagerInited) {
      window.Telegram?.WebApp.LocationManager.getLocation(
        (arg: null | LocationData) => {
          if (arg) {
            updateDebugInfo(`\nПолучены координаты: ${JSON.stringify(arg)}`);
            setCoordinates({ latitude: arg.latitude, longitude: arg.longitude });
          } else {
            updateDebugInfo("\ngetLocation вернул null");
          }
        }
      );
    }
  };

  const initializeTelegramWebApp = (): string => {
    let initInfo = "Telegram WebApp: ";
    if (window.Telegram?.WebApp) {
      initInfo += `версия ${window.Telegram.WebApp.version}, `;
      initInfo += `платформа ${window.Telegram.WebApp.platform}, `;
      initInfo += `инициализирован: ${!!window.Telegram.WebApp.initData}`;
    } else {
      initInfo += "не обнаружен";
    }
    return initInfo;
  };

  const fetchWeather = async (coords: Location): Promise<void> => {
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  const updateDebugInfo = (newInfo: string): void => {
    setDebugInfo((prev) => prev + newInfo);
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={handleGetLocation}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        📍 Узнать погоду за окном
      </button>
      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Погода в {weatherData.name}</h2>
          <p>{weatherData.weather[0].main}. {weatherData.weather[0].description}</p>
          <p>Температура: {weatherData.main.temp}°C</p>
          <p>Влажность: {weatherData.main.humidity}%</p>
          <p>Ветер: {weatherData.wind.speed} м/с</p>
        </div>
      )}
      {/* Блок отладки */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
        <pre className="whitespace-pre-wrap break-words">{debugInfo}</pre>
      </div>
      {coordinates && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-gray-700">
            Широта:{" "}
            <span className="font-mono">{coordinates.latitude.toFixed(6)}</span>
          </p>
          <p className="text-gray-700 mt-1">
            Долгота:{" "}
            <span className="font-mono">{coordinates.longitude.toFixed(6)}</span>
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-gray-700">
          Telegram WebApp API, tgWebAppLocationManagerObj:{" "}
          <span className="font-mono">{tgWebAppLocationManagerObj}</span>
        </p>
      </div>
    </div>
  );
}

export default LocationWidget;