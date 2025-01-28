import { createContext, useState, useEffect, useCallback } from "react";
import type { TelegramUser } from "../types/Telegram";

interface ThemeParams {
  bgColor: string;
  textColor: string;
}

export interface UserContextType {
  user: TelegramUser | null;
  themeParams: ThemeParams;
  catPoints: number | null;
  incrementCatPoints: () => void;
  debugErrors: string[];
  initStorage: () => Promise<void>; // Добавляем метод для инициализации хранилища
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [themeParams, setThemeParams] = useState<ThemeParams>({
    bgColor: "#ffffff",
    textColor: "#000000",
  });
  const [catPoints, setCatPoints] = useState<number | null>(null); // Теперь catPoints может быть null
  const [debugErrors, setDebugErrors] = useState<string[]>([]);

  const logError = useCallback((message: string) => {
    setDebugErrors((prevErrors) => [...prevErrors, message]);
  }, []);

  const saveCatPoints = useCallback(
    async (points: number) => {
      const Telegram = window.Telegram?.WebApp;
      if (!Telegram) {
        logError("Telegram WebApp is not initialized");
        return;
      }

      try {
        await new Promise<void>((resolve, reject) => {
          Telegram.CloudStorage.setItem("catPoints", String(points), (error, isSuccess) => {
            if (error) {
              reject(error);
            } else if (isSuccess) {
              resolve();
            } else {
              reject(new Error("Unknown error occurred while saving catPoints"));
            }
          });
        });
      } catch (error) {
        logError(`Failed to save catPoints: ${getErrorMessage(error)}`);
      }
    },
    [logError]
  );

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error occurred";
  };

  const initStorage = useCallback(async () => {
    const Telegram = window.Telegram?.WebApp;
    if (!Telegram) {
      logError("Telegram WebApp is not initialized");
      setCatPoints(null); // Устанавливаем catPoints в null, если Telegram не инициализирован
      return;
    }

    try {
      // Проверяем наличие ключа "catPoints"
      const keys = await new Promise<string[]>((resolve, reject) => {
        Telegram.CloudStorage.getKeys((error, keys) => {
          if (error) {
            reject(error);
          } else {
            resolve(keys || []);
          }
        });
      });

      if (!keys.includes("catPoints")) {
        // Если ключа нет, создаем его с значением по умолчанию
        await saveCatPoints(1);
        setCatPoints(1);
      } else {
        // Если ключ есть, загружаем его значение
        const value = await new Promise<string>((resolve, reject) => {
          Telegram.CloudStorage.getItem("catPoints", (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value || "1");
            }
          });
        });
        setCatPoints(Number(value));
      }
    } catch (error) {
      logError(`Failed to initialize storage: ${getErrorMessage(error)}`);
      setCatPoints(null); // Устанавливаем catPoints в null в случае ошибки
    }
  }, [logError, saveCatPoints]);

  useEffect(() => {
    const Telegram = window.Telegram?.WebApp;

    if (Telegram) {
      const theme = Telegram.themeParams;
      setThemeParams({
        bgColor: theme.bg_color || "#ffffff",
        textColor: theme.text_color || "#000000",
      });

      const userData = Telegram.initDataUnsafe?.user;
      if (userData) {
        setUser({
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          photo_url: userData.photo_url,
          language_code: userData.language_code,
        });
      } else {
        console.warn("User data is not available");
      }

      // Инициализируем хранилище при первом запуске
      initStorage();
    } else {
      console.error("Telegram WebApp is not initialized");
    }
  }, [initStorage]);

  useEffect(() => {
    if (catPoints !== null) {
      saveCatPoints(catPoints);
    }
  }, [catPoints, saveCatPoints]);

  const incrementCatPoints = useCallback(() => {
    if (catPoints !== null) {
      setCatPoints((prevPoints) => (prevPoints !== null ? prevPoints + 1 : 1));
    }
  }, [catPoints]);

  return (
    <UserContext.Provider
      value={{ user, themeParams, catPoints, incrementCatPoints, debugErrors, initStorage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;