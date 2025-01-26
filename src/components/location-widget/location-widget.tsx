import { useState, useEffect } from "react";

type Location = {
  latitude: number;
  longitude: number;
};

const LocationWidget = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  //!
  const [tgObj, setTgObj] = useState<string | null>(null);

  // Добавляем проверку инициализации Telegram WebApp
  useEffect(() => {
    let initInfo = "Telegram WebApp: ";

    if (window.Telegram?.WebApp) {
      initInfo += `версия ${window.Telegram.WebApp.version}, `;
      initInfo += `платформа ${window.Telegram.WebApp.platform}, `;
      initInfo += `инициализирован: ${!!window.Telegram.WebApp.initData}`;
    } else {
      initInfo += "не обнаружен";
    }

    setDebugInfo(initInfo);
    setTgObj(JSON.stringify(window.Telegram));
  }, []);

  const handleGetLocation = () => {
    setError(null);
    setLocation(null);
    setDebugInfo((prev) => prev + "\n\nНачало запроса геолокации...");

    if (!window.Telegram?.WebApp) {
      setError("Функция доступна только в Telegram");
      setDebugInfo(
        (prev) => prev + "\nОшибка: Telegram WebApp API не обнаружен"
      );
      return;
    }

    try {
      window.Telegram.WebApp.requestLocation(
        (geo) => {
          setDebugInfo((prev) => prev + "\nГеолокация получена успешно");
          setLocation({
            latitude: geo.latitude,
            longitude: geo.longitude,
          });
        },
        (err) => {
          const errorMsg = err?.error_message || "Неизвестная ошибка";
          setDebugInfo((prev) => prev + `\nОшибка: ${errorMsg}`);
          setError(`Ошибка: ${errorMsg}`);
        }
      );
    } catch (e) {
      const error = e instanceof Error ? e.message : "Неизвестная ошибка";
      setDebugInfo((prev) => prev + `\nИсключение: ${error}`);
      setError(`Системная ошибка: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={handleGetLocation}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        📍 Получить мои координаты
      </button>

      {/* Блок отладки */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
        <pre className="whitespace-pre-wrap break-words">{debugInfo}</pre>
      </div>

      {location && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-gray-700">
            Широта:{" "}
            <span className="font-mono">{location.latitude.toFixed(6)}</span>
          </p>
          <p className="text-gray-700 mt-1">
            Долгота:{" "}
            <span className="font-mono">{location.longitude.toFixed(6)}</span>
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
          Telegram WebApp API: <span className="font-mono">{tgObj}</span>
        </p>
      </div>
    </div>
  );
};

export default LocationWidget;
