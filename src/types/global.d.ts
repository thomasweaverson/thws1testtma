import { TelegramWebApp } from "./Telegram";

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}
