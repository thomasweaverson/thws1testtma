export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface LocationError {
  error_message: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser; // Данные пользователя
    [key: string]: unknown; // Дополнительные данные
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  themeParams: Record<string, string>;
  version: string;
  platform: string;
  colorScheme: string;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    setParams: (params: Partial<MainButtonParams>) => void;
    setText: (text: string) => void;
    setColor: (color: string) => void;
  };
  sendData: (data: string) => void;
  close: () => void;
  onEvent<K extends keyof TelegramEventMap>(
    eventType: K,
    callback: (args: TelegramEventMap[K]) => void
  ): void;
  offEvent<K extends keyof TelegramEventMap>(
    eventType: K,
    callback: (args: TelegramEventMap[K]) => void
  ): void;
  showPopup: (
    params: PopupParams,
    callback?: (buttonId: string) => void
  ) => void;

  LocationManager: {
    init: (callback?: () => void) => void;
    isInited: boolean;
    isLocationAvailable: boolean;
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    getLocation: (callback: (location: LocationData | null) => void) => void;
  };

  CloudStorage: {
    getKeys: (cb: (error: Error | null, keys?: string[]) => void) => void;
    getItem: (key: string, cb: (error: Error, value: string | null) => void) => string | null;
    setItem: (key: string, value: string, cb?: (error: Error, isSuccess: boolean) => void) => void;
    removeItem?: (key: string) => void; // Опциональный метод
    clear?: () => void; // Опциональный метод
    _storage: Record<string, string>; // Теперь _storage обязателен
  };
}

export interface TelegramEventMap {
  viewportChanged: { height: number };
  themeChanged: { colorScheme: string };
  mainButtonClicked: undefined; // Если событие не передаёт аргументы
}

export interface MainButtonParams {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
}

export interface PopupParams {
  title: string;
  message: string;
  buttons: Array<{
    id: string;
    text: string;
    type: "default" | "destructive";
  }>;
}