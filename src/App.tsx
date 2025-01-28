import Header from "./components/header/header";
import Greetings from "./components/greetings/greetings";
import CatImageFetcher from "./components/cat-image-fetcher/cat-image-fetcher";
import { UserContextProvider } from "./context/user-context-provider";

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <Header />
      <Greetings />
      <CatImageFetcher />

      <footer className="p-1 fixed bottom-0 right-0">@thws 2025</footer>
    </UserContextProvider>
  );
}

export default App;

// import DebugContainer from "./components/debug-container/debug-container";
{
  /* <footer className="p-1">
        <DebugContainer />
      </footer> */
}
