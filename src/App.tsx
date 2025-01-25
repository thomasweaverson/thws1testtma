import { useEffect, useState } from "react";
import Header from "./components/header/header";
import Greetings from "./components/greetings/greetings";
import RandomCatLoaderFeature from "./components/cat-image-fetcher/cat-image-fetcher";

function App(): JSX.Element {
  const [user, setUser] = useState<{
    firstName: string;
    lastName?: string;
    username?: string;
    userPhoto?: string;
  } | null>(null);

  const [themeParams, setThemeParams] = useState({
    bgColor: "#ffffff",
    textColor: "#000000",
  });

  useEffect(() => {
    const Telegram = window.Telegram?.WebApp;

    if (Telegram) {
      const theme = Telegram.themeParams;
      setThemeParams({
        bgColor: theme.bg_color || "#ffffff",
        textColor: theme.text_color || "#000000",
      });

      const userData = Telegram.initDataUnsafe?.user;
      if (userData) {
        setUser({
          firstName: userData.first_name,
          lastName: userData.last_name,
          username: userData.username,
        });
      } else {
        console.warn("User data is not available");
      }
    } else {
      console.error("Telegram WebApp is not initialized");
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Header
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            themeParams={themeParams}
          />
          <main className="p-1">
            <Greetings
              firstName={user?.firstName || "user"}
              lastName={user?.lastName}
            />
            <RandomCatLoaderFeature />
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
