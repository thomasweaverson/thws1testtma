interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
      user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
      };
  };
  ready: () => void;
  close: () => void;
  sendData: (data: string) => void;
}

interface Window {
  Telegram: {
      WebApp: TelegramWebApp;
  };
}
