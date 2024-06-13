import { useContext } from "react";
import { LangContext } from "./LangProvider";

const Header = () => {
  const i18n = useContext(LangContext);

  const isEnglish = i18n.language === "en";
  return (
    <header className="header" style={{ position: "sticky", top: 0 }}>
      <div className="w-100 px-2">
        <nav className="primary-menu">
          <ul className="header-menu">
            <li className="menu-item" style={{ marginRight: "auto" }}>
              <a href="/" className="menu-link">
                <div>Home</div>
              </a>
            </li>
            <li className="menu-item d-flex">
              <div
                className="menu-link"
                style={{ color: isEnglish ? "white" : "green" }}
                onClick={() => i18n.updateLanguage("de")}
              >
                <div>DE |</div>
              </div>

              <div
                className="menu-link"
                style={{ color: isEnglish ? "green" : "white" }}
                onClick={() => i18n.updateLanguage("en")}
              >
                <div>| EN</div>
              </div>
            </li>

            <li className="menu-item">
              <a href="/docs" className="menu-link">
                <div>Docs</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                href="https://github.com/Florian-Schopp/flixcheck"
                className="menu-link"
              >
                <div>Github Repository</div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
