import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import { isUserAuthenticated } from "../helpers/Auth";
import { applyThemeStyles, getInitialTheme } from "../helpers/ThemeSwitcher";

const Header: React.FC = () => {
  const [theme] = useState<string>(() => getInitialTheme());
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = isUserAuthenticated(); // Проверяем наличие токена при загрузке страницы

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const selectedTheme = localStorage.getItem("theme") || "default";

  // Устанавливаем стили в зависимости от выбранной темы

  applyThemeStyles(selectedTheme);
  const handleLogout = () => {
    // Здесь добавьте логику для выхода из учетной записи, например, удаление токена из localStorage
    // и перенаправление на страницу авторизации
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <header>
      <Link to="/">
        <div
          className={`header-logo ${theme === "dark" ? "dark" : "light"}`}
        ></div>
      </Link>
      {/* Скрытое название сайта */}
      <div className="header-site-name"></div>
      {/* Кнопка для открытия сайдбара */}
      <button
        className={`header-sidebar-toggle ${isSidebarOpen ? "open" : ""}`}
        onClick={handleSidebarToggle}
      >
        <span className="burger-icon"></span>
        <span className="burger-icon"></span>
        <span className="burger-icon"></span>
      </button>
      <div className={`header-buttons ${isSidebarOpen ? "hide-buttons" : ""}`}>
        {/* Кнопки для перехода на страницу инвентаря и quicksell */}
        {isAuthenticated && (
          <>
            <a className="header-button" href="/home">
              Инвентарь
            </a>
            <a className="header-button" href="/quicksell">
              Quicksell
            </a>
          </>
        )}
      </div>
      {/* Дропдаун с пунктами профиль, войти и выйти */}
      <div
        className={`header-auth-dropdown ${
          isSidebarOpen ? "hide-buttons" : ""
        }`}
      >
        <div
          className={`header-auth ${theme === "dark" ? "dark" : "light"}`}
        ></div>
        <div className="auth-dropdown-content">
          {isAuthenticated ? (
            <>
              <Link to="/profile">Профиль</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </div>
      </div>
      {/* Сайдбар */}
      {isSidebarOpen && (
        <div className="sidebar">
          {isAuthenticated && (
            <>
              <a
                href="/inventory"
                className="sidebar-link"
                onClick={handleSidebarToggle}
              >
                Инвентарь
              </a>
              <a
                href="/profile"
                className="sidebar-link"
                onClick={handleSidebarToggle}
              >
                Профиль
              </a>
              <a
                href="/quicksell"
                className="sidebar-link"
                onClick={handleSidebarToggle}
              >
                Quicksell
              </a>
              <span onClick={handleLogout} className="sidebar-link">
                Выйти
              </span>
            </>
          )}
          {!isAuthenticated && (
            <a
              href="/login"
              className="sidebar-link"
              onClick={handleSidebarToggle}
            >
              Войти
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
