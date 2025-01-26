interface HeaderProps {
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  themeParams: {
    bgColor: string;
    textColor: string;
  };
}

function Header({
  firstName,
  lastName,
  username,
  photoUrl,
  themeParams,
}: HeaderProps) {
  const appName = "PURR🐾";

  return (
    <header
      className="flex items-center justify-between p-2 m-1 shadow-md"
      style={{
        backgroundColor: themeParams.bgColor || "#ffffff",
        color: themeParams.textColor || "#000000",
      }}
    >
      {/* Логотип */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10">
          <img
            src="./img/norwegian_forest_cat.svg"
            alt="Greeting Cat"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold">{appName}</h1>
      </div>

      {/* Данные пользователя */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="font-medium text-sm">
            {firstName} {lastName}
          </p>
          {username && <p className="text-xs text-gray-500">@{username}</p>}
        </div>

        <div
  className="h-12 w-12 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full border border-gray-300 overflow-hidden"
  style={{ backgroundColor: themeParams.bgColor || "#f0f0f0" }}
>
  {photoUrl ? (
    <img
      src={photoUrl}
      alt={`${firstName} avatar`}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-lg font-semibold">
      {firstName[0].toUpperCase()}
    </span>
  )}
</div>
      </div>
    </header>
  );
}

export default Header;
