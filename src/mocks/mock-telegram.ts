import { TelegramWebApp } from "../types/Telegram";

export const mockTelegram: { WebApp: TelegramWebApp } = {
  WebApp: {
    initData: "mockedInitData",
    initDataUnsafe: {
      query_id: "mockedQueryId",
      user: {
        id: 123456789,
        first_name: "Morris",
        last_name: "Mocker",
        username: "mockuser",
        photo_url: "/img/user_mock_avatar.png",
        language_code: "en",
      },
    },
    isExpanded: false,
    viewportHeight: 100,
    viewportStableHeight: 100,
    themeParams: {
      bg_color: "#ffffff",
      text_color: "#000000",
      hint_color: "#808080",
      link_color: "#1a73e8",
      button_color: "#1a73e8",
      button_text_color: "#ffffff",
    },
    version: "6.0",
    platform: "unknown",
    colorScheme: "light",
    BackButton: {
      isVisible: false,
      show: () => console.log("BackButton shown"),
      hide: () => console.log("BackButton hidden"),
      onClick: () => console.log("BackButton clicked"),
    },
    MainButton: {
      text: "Mock Button",
      color: "#0000ff",
      textColor: "#ffffff",
      isVisible: true,
      isActive: false,
      show: () => console.log("MainButton shown"),
      hide: () => console.log("MainButton hidden"),
      enable: () => console.log("MainButton enabled"),
      disable: () => console.log("MainButton disabled"),
      setParams: (params) => console.log("MainButton params set:", params),
      setText: (text) => console.log(`MainButton text set to: ${text}`),
      setColor: (color) => console.log(`MainButton color set to: ${color}`),
    },
    sendData: (data) => console.log("sendData called with:", data),
    close: () => console.log("WebApp closed"),
    onEvent: (eventType) =>
      console.log(`Event listener added for: ${eventType}`),
    offEvent: (eventType) =>
      console.log(`Event listener removed for: ${eventType}`),
    showPopup: (params) =>
      console.log("Popup shown with params:", params),
  },
};
