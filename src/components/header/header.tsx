import { useUserContext } from "../../context/use-user-context";
import { useEffect, useState } from "react";

function Header(): JSX.Element {
  const { user, themeParams, catPoints, initStorage } = useUserContext();
  const appName = "PURR🐾";

  const [isStorageInitialized, setIsStorageInitialized] = useState(catPoints !== null);

  useEffect(() => {
    if (!isStorageInitialized) {
      initStorage().then(() => setIsStorageInitialized(true));
    }
  }, [isStorageInitialized, initStorage]);

  const handlePointsClick = async () => {
    if (!isStorageInitialized) {
      await initStorage();
      setIsStorageInitialized(true);
    }
  };

  return (
    <header className=" w-full flex items-center justify-between px-2 py-2 shadow-md bg-opacity-90" 
            style={{
              backgroundColor: themeParams.bgColor || "#ffffff",
              color: themeParams.textColor || "#000000",
            }}>
      {/* Название приложения */}
      <h1 className="text-lg font-bold tracking-tight">
        <span className="text-purple-600">{appName.split('🐾')[0]}</span>
        <span className="ml-1">🐾</span>
      </h1>

      {/* Блок с информацией пользователя */}
      <div className="flex items-center gap-4">
        {/* Баллы с иконкой */}
        <div 
          className="flex items-center bg-white/20 px-3 py-1 rounded-full border shadow-sm cursor-pointer"
          style={{ borderColor: themeParams.textColor?.concat('30') || '#00000030' }}
          onClick={handlePointsClick}
        >
          <img
            src="/img/paw-coin.svg"
            alt="Cat Points"
            className="w-6 h-6 mr-2"
          />
          <span className="font-medium" style={{ color: themeParams.textColor }}>
            {catPoints ? catPoints : "88"}
          </span>
        </div>

        {/* Информация о пользователе */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-xs leading-tight">
              {user?.first_name} {user?.last_name}
            </p>
            {user?.username && (
              <p 
                className="text-xs opacity-75"
                style={{ color: themeParams.textColor }}
              >
                @{user.username}
              </p>
            )}
          </div>
          
          {/* Аватар */}
          <div 
            className="relative w-10 h-10 rounded-full border-2 shadow-sm overflow-hidden"
            style={{ 
              backgroundColor: themeParams.bgColor,
              borderColor: themeParams.textColor?.concat('30') || '#00000030'
            }}
          >
            {user?.photo_url ? (
              <img
                src={user.photo_url}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: themeParams.textColor?.concat('10') || '#00000010' }}
              >
                <span 
                  className="text-lg font-semibold"
                  style={{ color: themeParams.textColor }}
                >
                  {user?.first_name?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;