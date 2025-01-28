import Header from "./components/header/header";
import Greetings from "./components/greetings/greetings";
import CatImageFetcher from "./components/cat-image-fetcher/cat-image-fetcher";
import { UserContextProvider } from "./context/user-context-provider";

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <Header />
      <main className="h-screen flex flex-col justify-center items-center p-1 relative">
        <div className="absolute top-0 left-0 w-full h-[60px]"></div>{" "}
        {/* Занимает место для Header */}
        <Greetings />
        <CatImageFetcher />
      </main>
      <footer className="p-1">@thws 2025</footer>
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
