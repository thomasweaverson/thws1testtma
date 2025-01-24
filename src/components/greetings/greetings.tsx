import { TgUser } from "../../types/telegram.types";

type GreetingsProps = {
  user: TgUser
}

function Greetings({user}: GreetingsProps): JSX.Element {

  // const user = window.Telegram.WebApp.initDataUnsafe?.user;

  return (
    <section className="w-full bg-white shadow-md p-4 flex items-center space-x-4">
      {/* Изображение котика */}
      <img
        src="/img/hicat.png" // Укажите путь к изображению
        alt="Greeting Cat"
        className="w-32 h-32 rounded-full object-cover"
      />

      {/* Облачко с текстом */}
      <div className="relative bg-blue-100 p-4 rounded-lg shadow-md max-w-md">
        {/* Хвостик облачка */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-blue-100 border-b-8 border-b-transparent"></div>

        {/* Текст приветствия */}
        <p className="text-gray-800 text-sm">
          Hi, <span className="font-semibold">{user?.first_name}</span>{' '}
          {user?.last_name && <span className="font-semibold">{user.last_name}</span>}!<br />
          This app is made just for fun. Paw-paw! 🐾
        </p>
      </div>
    </section>
  );
};

export default Greetings;