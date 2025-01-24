import { useState } from "react";

type GreetingsProps = {
  firstName: string;
  lastName?: string;
};

function Greetings({ firstName, lastName }: GreetingsProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <section
      className={`w-full bg-slate-50 shadow-md p-3 flex items-center space-x-2 ${
        isCollapsed ? "h-6" : "h-auto"
      } transition-all duration-1000`}
      onClick={toggleCollapse}
      style={{ overflow: "hidden", cursor: "pointer" }}
    >
      {/* Изображение котика */}
      <img
        src="/img/hicat.png"
        alt="Greeting Cat"
        className={`rounded-full object-cover ${
          isCollapsed ? "w-5 h-5" : "w-16 h-16"
        } transition-all duration-300`}
      />

      {/* Облачко с текстом или полоска */}
      <div
        className={`relative ${
          isCollapsed
            ? "bg-stone-300 h-1 w-full rounded-md"
            : "bg-blue-100 p-4 rounded-lg shadow-md max-w-md"
        } transition-all duration-300`}
      >
        {!isCollapsed && (
          <>
            {/* Хвостик облачка */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-blue-100 border-b-8 border-b-transparent"></div>

            {/* Текст приветствия */}
            <p className="text-gray-800 text-sm">
              Hi, <span className="font-semibold">{firstName}</span>{" "}
              {lastName && <span className="font-semibold">{lastName}</span>}!
              <br />
              This app is made just for fun. Paw-paw! 🐾
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Greetings;
