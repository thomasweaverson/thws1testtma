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
      // Проверяем наличие catPoints в хранилище Telegram
      const storedCatPoints = Telegram.CloudStorage.getItem("catPoints");
      if (storedCatPoints) {
        setCatPoints(Number(storedCatPoints));
      } else {
        // Если catPoints нет, инициализируем его значением 1
        Telegram.CloudStorage.setItem("catPoints", "1");
        setCatPoints(1);
      }
    } else {
      console.error("Telegram WebApp is not initialized");
    }
  }, []);

  const incrementCatPoints = () => {
    setCatPoints((prevPoints) => {
      const newPoints = prevPoints + 1;
      // Обновляем значение в хранилище Telegram
      window.Telegram?.WebApp.CloudStorage.setItem(
        "catPoints",
        newPoints.toString()
      );
      return newPoints;
    });
  };

  return (
    <UserContext.Provider value={{ user, themeParams, catPoints, incrementCatPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
