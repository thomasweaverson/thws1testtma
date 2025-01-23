import React, { useEffect, useState } from "react";
// import UserInfoButton from "./components/user-info-button/user-info-button";
// import Card from "./components/card/card";

type tgUser = typeof window.Telegram.WebApp.initDataUnsafe.user;
const initialUser: tgUser = {
  id: 0,
  first_name: "default name",
  last_name: "default last name",
  username: "defaultusername",
};

const App: React.FC = () => {
  const [user, setUser] = useState<typeof initialUser>(initialUser);
  // const [points, setPoints] = useState(0);
  const [log, setLog] = useState<string>("Initializing...");

  // const addPoints = () => setPoints(points + 1);

  useEffect(() => {
    try {
      if (!window.Telegram || !window.Telegram.WebApp) {
        alert(`Telegram WebApp is not available. \n Window Telegram: ${JSON.stringify(window.Telegram)}`);
        setLog(
          `Telegram WebApp is not available. \n Window Telegram: ${JSON.stringify(
            window.Telegram
          )}`
        );
        return;
      }
      const tg = window.Telegram.WebApp;
      tg.ready();
      setLog(
        `Telegram WebApp is initialized successfully.\n Window Telegram: ${JSON.stringify(
          window.Telegram
        )}`
      );
      // Получение данных пользователя
      const user = tg.initDataUnsafe?.user;
      setUser(user ? user : initialUser);
    } catch (error) {
      setLog(
        `Error initializing Telegram WebApp: Error: ${error} \n Window Telegram: ${JSON.stringify(
          window.Telegram
        )}`
      );
    }
  }, []);

  return (
    <div className="p-4">
      {log}
      user {JSON.stringify(user)}
    </div>
  );
};

export default App;


{/* <header className="p-4 bg-gray-800 text-white flex justify-between">
        <span>Баллы: {points} 💰</span>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
          onClick={addPoints}
        >
          Добавить баллы
        </button>
      </header>
      <h1 className="text-2xl font-bold">Привет, {user.first_name}!</h1>
      <p className="text-gray-600">Добро пожаловать в Mini App для Telegram.</p>
      <UserInfoButton />
      <Card /> */}