import { NotificationProvider } from "./contexts/providers/NotificationProvider";
import { ViewStateProvider } from "./contexts/providers/ViewStateProvider";
import { LanguageProvider } from "./contexts/providers/LanguageProvider";
import { EntriesProvider } from "./contexts/providers/EntriesProvider";
import { Header } from "./components/Header/Header";
import { AppRouter } from "./router/AppRouter";
import cx from "./App.module.scss";
import "./styles/global.scss";

function App() {
  return (
    <>
      <ViewStateProvider>
        <EntriesProvider>
          <LanguageProvider>
            <Header />
            <NotificationProvider>
              <main className={cx.main}>
                <AppRouter />
              </main>
            </NotificationProvider>
          </LanguageProvider>
        </EntriesProvider>
      </ViewStateProvider>
    </>
  );
}

export default App;
