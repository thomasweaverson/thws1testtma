import { createContext, useState, useEffect } from "react";

import type { TelegramUser } from "../types/Telegram";

interface ThemeParams {
  bgColor: string;
  textColor: string;
}

export interface UserContextType {
  user: TelegramUser | null;
  themeParams: ThemeParams;
  catPoints: number;
  incrementCatPoints: () => void;
  debugErrors: string[];
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
  const [catPoints, setCatPoints] = useState<number>(1);
  const [debugErrors, setDebugErrors] = useState<string[]>([]);

  useEffect(() => {
    const Telegram = window.Telegram?.WebApp;
    if (Telegram) {
      Telegram.CloudStorage.setItem("catPoints", String(catPoints), (error, isSuccess) => {
        if (error) {
          setDebugErrors((prevErrors) => [
            ...prevErrors,
            `at incrementCatPoints=>dif catPoints => useEffect /setItem/error: ${error.message}`,
          ]);
        } else if (isSuccess) {
          setDebugErrors((prevErrors) => [
            ...prevErrors,
            `at incrementCatPoints=>dif catPoints => useEffect /setItem/success`,
          ])
        } else {
          setDebugErrors((prevErrors) => [
            ...prevErrors,
            `full mazafaka at incrementCatPoints=>dif catPoints => useEffect`,
          ]);
        }
      });
    }
  }, [catPoints]);

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

      // Асинхронная загрузка catPoints
      const loadCatPoints = () => {
        try {
          Telegram.CloudStorage.getItem("catPoints", (error, value) => {
            if (error) {
              setDebugErrors((prevErrors) => [
                ...prevErrors,
                `at loadCatPoints/try/error: ${error.message}`,
              ]);
              Telegram.CloudStorage.setItem(
                "catPoints",
                "1",
                (error, isSuccess) => {
                  if (error) {
                    setDebugErrors((prevErrors) => [
                      ...prevErrors,
                      `at loadCatPoints/setItem/error: ${error.message}`,
                    ]);
                  } else if (isSuccess) {
                    setCatPoints(1);
                  } else {
                    setDebugErrors((prevErrors) => [
                      ...prevErrors,
                      `full mazafaka`,
                    ]);
                  }
                }
              );
              setCatPoints(1);
            } else {
              if (value) {
                setCatPoints(Number(value));
              }
            }
          });
        } catch (error) {
          console.error("Error loading catPoints:", error);
          setCatPoints(1); // Устанавливаем значение по умолчанию в случае ошибки
        }
      };

      loadCatPoints();
    } else {
      console.error("Telegram WebApp is not initialized");
    }
  }, []);

  const incrementCatPoints = () => {
    setCatPoints((prevPoints) => prevPoints + 1);
  };

  return (
    <UserContext.Provider
      value={{ user, themeParams, catPoints, incrementCatPoints, debugErrors }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
