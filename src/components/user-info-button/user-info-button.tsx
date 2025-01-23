function UserInfoButton(): JSX.Element {
  const handleShowUserInfo = () => {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      alert(`Данные пользователя:
Имя: ${user.first_name}
Фамилия: ${user.last_name || "Не указана"}
Username: ${user.username || "Не указан"}
ID: ${user.id}`);
    } else {
      alert("Пользователь не найден.");
    }
  };

  return (
    <>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleShowUserInfo}
      >
        Показать данные пользователя
      </button>
    </>
  );
}

export default UserInfoButton;
