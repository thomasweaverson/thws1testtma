import Header from "./components/header/header";
import Greetings from "./components/greetings/greetings";
import CatImageFetcher from "./components/cat-image-fetcher/cat-image-fetcher";
import { UserContextProvider } from "./context/user-context-provider";

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <Header />
      <main className="p-1">
        <Greetings />
        <CatImageFetcher />
      </main>
    </UserContextProvider>
  );
}

export default App;
