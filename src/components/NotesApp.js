import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import ButtonPopUpOverlay from "./ButtonPopUpOverlay.js";
import Menu from "./Menu.js";
import RoutesAuthedNull from "./RoutesAuthedNull.js";
import RoutesAuthed from "./RoutesAuthed.js";
import LoadingPage from "./LoadingPage.js";
import { SettingProvider } from "../contexts/SettingContext.js";
import { ToastContainer } from "react-toastify";
import {
  getUserLogged,
  putAccessToken,
  controlSearchParams,
} from "../utils/network-data.js";
import "react-toastify/dist/ReactToastify.css";

function NotesApp() {
  let footerContainerClass = "";
  let routesAuthedNull = "";
  let headerClass = "";
  let footerClass = "";
  let bodyClass = "";
  const { title, changeSearchParams } = controlSearchParams(useSearchParams());
  const [initializing, setInitializing] = React.useState(true);
  const [authedUser, setAuthedUser] = React.useState(null);
  const [exceptId, setExceptId] = React.useState("");

  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem("locale") || "en";
  });
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "en" ? "id" : "en";
      localStorage.setItem("locale", newLocale);

      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();

    !error && setAuthedUser(data);
  };

  const onLogout = async () => {
    setTheme("dark");
    toggleTheme();
    setAuthedUser(null);

    putAccessToken("");
  };

  React.useEffect(() => {
    const loadUser = async () => {
      const { error, data } = await getUserLogged();

      !error && setAuthedUser(data);
      setInitializing(false);
    };

    loadUser();

    return () => {
      setInitializing(true);
    };
  }, []);

  React.useEffect(() => {
    let unsubscribe = false;

    if (!unsubscribe) {
      document.body.setAttribute("data-theme", theme);
    }

    return () => {
      unsubscribe = true;
    };
  }, [theme]);

  const settingContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme,
      authedUser,
      setAuthedUser,
      exceptId,
      setExceptId,
    };
  }, [theme, locale, authedUser, exceptId]);

  if (authedUser === null) {
    headerClass = "justify-center header-login";
    bodyClass = "body body-login";
    footerClass = "footer-login";
    footerContainerClass = "footer-container justify-center footer-login";
    routesAuthedNull = <RoutesAuthedNull loginSuccess={onLoginSuccess} />;
  }

  return initializing ? (
    <LoadingPage />
  ) : (
    <SettingProvider value={settingContextValue}>
      <div className="notes-app">
        <header className={headerClass || ""}>
          <h1>Note</h1>
          {headerClass ? (
            ""
          ) : (
            <SearchBar
              defaultKeyword={title}
              filterNotes={changeSearchParams}
            />
          )}
          {headerClass ? "" : <Menu logout={onLogout} />}
        </header>
        <div className={bodyClass || "body"}>
          {routesAuthedNull || <RoutesAuthed keyword={title} />}
        </div>
        <footer className={footerClass || ""}>
          <div className={footerContainerClass || "footer-container"}>
            <div className="copyright">AlyAds &#169; 2022</div>
            {footerContainerClass === "" ? <ButtonPopUpOverlay /> : ""}
          </div>
        </footer>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </SettingProvider>
  );
}

export default NotesApp;
