import Header from "./components/header/header";
import Greetings from "./components/greetings/greetings";
import CatImageFetcher from "./components/cat-image-fetcher/cat-image-fetcher";
import { UserContextProvider } from "./context/user-context-provider";
import AppContainer from "./components/app-container/app-container";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <AppContainer>
        <Header />
        <Main>
          <CatImageFetcher />
        </Main>
        <Greetings />
        <Footer />
      </AppContainer>
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
