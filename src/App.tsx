import { useEffect, useState } from "react";
import UserInfoButton from "./components/user-info-button/user-info-button";
import Card from "./components/card/card";
import Greetings from "./components/greetings/greetings";

// @ts-expect-error asda da 
const tg = window.Telegram.WebApp;

const initialUser: typeof tg.initDataUnsafe.user = {
  id: 0,
  first_name: "default name",
  last_name: "default last name",
  username: "defaultusername",
};

function App(): JSX.Element {
  const [user, setUser] = useState(initialUser);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const addPoints = () => setPoints(points + 1);

  useEffect(() => {
    tg.ready();

    const handleEvent: EventHandler = () => {
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    };

    // Подписываемся на событие изменения данных
    tg.onEvent('viewportChanged', handleEvent);

    // Первоначальная проверка
    handleEvent();

    // Отписываемся от события при размонтировании
    return () => {
      tg.offEvent('viewportChanged', handleEvent);
    };
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <span>Баллы: {points} 💰</span>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
          onClick={addPoints}
        >
          Добавить баллы
        </button>
      </header>
      <Greetings user={user} />
      <p className="text-gray-600">Добро пожаловать в Mini App для Telegram.</p>
      <UserInfoButton />
      <Card />
    </div>
  );
}

export default App;