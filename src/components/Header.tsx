import React, { useState } from "react";

const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <header>
      <div className="header-logo"></div>
      {/* Скрытое название сайта */}
      <div className="header-site-name">SteamInventory</div>
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
        <a className="header-button" href="/inventory">
          Инвентарь
        </a>
        <a className="header-button" href="/quicksell">
          Quicksell
        </a>
      </div>
      <a className="header-auth-button" href="/login">
        <div className="header-auth"></div>
      </a>
      {/* Сайдбар */}
      {isSidebarOpen && (
        <div className="sidebar">
          <a
            href="/inventory"
            className="sidebar-link"
            onClick={handleSidebarToggle}
          >
            Инвентарь
          </a>
          <a
            href="/quicksell"
            className="sidebar-link"
            onClick={handleSidebarToggle}
          >
            Quicksell
          </a>
          <a
            href="/login"
            className="sidebar-link"
            onClick={handleSidebarToggle}
          >
            Войти
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
