import { useState } from "react";
import { useUserContext } from "../../context/use-user-context";

function Greetings(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useUserContext();

  const handleClose = () => {
    setIsVisible(false); // Устанавливаем видимость в false для плавного исчезновения
  };

  if (!isVisible) {
    return null; // Если компонент невидим, не рендерим его
  }

  return (
    <article
      className={`fixed bottom-0 left-0 right-0 bg-slate-50 shadow-md p-3  flex items-center justify-between gap-2 transition-opacity duration-500 z-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Кнопка закрытия */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Останавливаем всплытие события
          handleClose();
        }}
        className="absolute top-1 right-1 text-gray-600 bg-red-300 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center z-10 transition-all duration-300"
        aria-label="Close"
      >
        ✕
      </button>
      {/* Изображение котика */}
      <img
        src="/img/hicat.png"
        alt="Greeting Cat"
        className="rounded-full object-cover w-16 h-16 transition-all duration-300"
      />
      {/* Облачко с текстом */}
      <div className="relative bg-blue-100 p-3 rounded-lg shadow-md max-w-md transition-all duration-300 mr-5">
        {/* Хвостик облачка */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-blue-100 border-b-8 border-b-transparent"></div>
        {/* Текст приветствия */}
        <p className="text-gray-800 text-sm">
          Hi, <span className="font-semibold">{user?.first_name}</span>{" "}
          {user?.last_name && <span className="font-semibold">{user?.last_name}</span>}!
          <br />
          This app is made just for fun. Paw-paw! 🐾
        </p>
      </div>
    </article>
  );
}

export default Greetings;