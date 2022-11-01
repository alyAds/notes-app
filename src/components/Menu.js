import React from "react";
import PropTypes from "prop-types";
import {
  FaAngleDown,
  FaLanguage,
  FaMoon,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import SettingContext from "../contexts/SettingContext";
import { translate } from "../utils/network-data";

function Menu({ logout }) {
  const { locale, toggleLocale, theme, toggleTheme, authedUser } = React.useContext(SettingContext);

  return (
    <div className="menu">
      <button>
        <img
          src={`https://ui-avatars.com/api/?name=${authedUser.name}&background=random`}
          alt="inisial"
        />
        <FaAngleDown />
      </button>
      <div className="context-menu">
        <ul className="dropdown-menu">
          <li>
            <button onClick={toggleTheme}>
              {theme === "light" ? <FaSun /> : <FaMoon />}
              &nbsp;
              <span>
                {translate(
                  locale,
                  `${theme} Theme`,
                  `Tema ${theme === "light" ? "Terang" : "Gelap"}`
                )}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={toggleLocale}
              title={translate(
                locale,
                "Translate to Indonesia",
                "Terjemahkan ke Inggris"
              )}
            >
              <FaLanguage />
              &nbsp;<span>{translate(locale, "Indonesia", "English")}</span>
            </button>
          </li>
          <li>
            <button onClick={logout}>
              <FaSignOutAlt />
              &nbsp;<span>{translate(locale, "Logout", "Keluar")}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

Menu.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Menu;
