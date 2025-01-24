// setupTelegram.ts
import { mockTelegram } from "./mocks/mock-telegram";

export function setupTelegram(): void {
  if (process.env.NODE_ENV === "development") {
    console.log("Using mock Telegram API");
    window.Telegram = mockTelegram;
  } else if (typeof window.Telegram === "undefined") {
    console.error("Telegram WebApp API is not available");
  }
}
