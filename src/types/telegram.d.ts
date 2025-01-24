// src/types/telegram.d.ts

// Тип для пользователя Telegram
interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

// Тип для параметров темы Telegram
interface TelegramWebAppThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
}

// Тип для обработчика событий
type EventHandler = (event?: string) => void;

// Основной интерфейс Telegram WebApp
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
  };
  version: string;
  platform: string;
  themeParams: TelegramWebAppThemeParams;
  isExpanded: boolean;
  expand: () => void;
  close: () => void;
  onEvent: (event: string, handler: EventHandler) => void;
  offEvent: (event: string, handler: EventHandler) => void;
  sendData: (data: string) => void;
  ready: () => void;
  _events?: Record<string, EventHandler>;
}

// Расширяем глобальный интерфейс Window
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}