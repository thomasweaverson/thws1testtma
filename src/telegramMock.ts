const TelegramWebApp: TelegramWebApp = {
  initData: "",
  initDataUnsafe: {
    user: {
      id: 123456789,
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      language_code: "en",
    },
  },
  version: "6.7",
  platform: "tdesktop",
  themeParams: {
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    link_color: "#0000ee",
    button_color: "#0000ff",
    button_text_color: "#ffffff",
  },
  isExpanded: true,
  expand: () => {
    console.log("WebApp expanded");
  },
  close: () => {
    console.log("WebApp closed");
  },
  onEvent: (event: string, handler: EventHandler) => {
    console.log(`Event ${event} subscribed`);
    // Сохраняем обработчик для последующего вызова
    if (!TelegramWebApp._events) TelegramWebApp._events = {};
    TelegramWebApp._events[event] = handler;
  },
  offEvent: (event: string, handler: EventHandler) => {
    console.log(`Event ${event} unsubscribed`);
    // Удаляем обработчик
    if (TelegramWebApp._events && TelegramWebApp._events[event]) {
      if (TelegramWebApp._events[event] === handler) {
        delete TelegramWebApp._events[event];
      }
    }
  },
  sendData: (data: string) => {
    console.log("Data sent:", data);
  },
  ready: () => {
    console.log("WebApp is ready");
    // Вызываем событие, чтобы эмулировать готовность
    if (TelegramWebApp._events && TelegramWebApp._events["viewportChanged"]) {
      TelegramWebApp._events["viewportChanged"]();
    }
  },
};

// Присваиваем объект window.Telegram
// @ts-expect-error jjnjinij
(window).Telegram = { WebApp: TelegramWebApp };

TelegramWebApp.ready();