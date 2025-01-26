import { useState } from 'react';

type Location = {
  latitude: number;
  longitude: number;
};

const LocationWidget = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    // Очищаем предыдущие данные
    setError(null);
    setLocation(null);

    // Проверяем доступность Telegram WebApp API
    if (!window.Telegram?.WebApp) {
      setError('Функция доступна только в Telegram');
      return;
    }

    // Запрашиваем геолокацию
    window.Telegram.WebApp.requestLocation(
      (geo) => {
        setLocation({
          latitude: geo.latitude,
          longitude: geo.longitude,
        });
      },
      (err) => {
        setError(err.error_message || 'Доступ к геолокации запрещён');
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={handleGetLocation}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        📍 Получить мои координаты
      </button>

      {location && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-gray-700">
            Широта: <span className="font-mono">{location.latitude.toFixed(6)}</span>
          </p>
          <p className="text-gray-700 mt-1">
            Долгота: <span className="font-mono">{location.longitude.toFixed(6)}</span>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default LocationWidget;