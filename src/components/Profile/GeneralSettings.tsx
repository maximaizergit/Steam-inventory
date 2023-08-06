import React, { useState, useEffect } from "react";
import "../../style/Profile/GeneralSettings.css";
import { applyThemeStyles, getInitialTheme } from "../../helpers/ThemeSwitcher";

const GeneralSettings = () => {
  const [theme, setTheme] = useState<string>(() => getInitialTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    applyThemeStyles(selectedTheme); // Применяем выбранные стили к сайту при изменении темы
  };

  return (
    <div className={`general-settings ${theme}`}>
      <div>
        <label>Выберите тему:</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="default">По умолчанию</option>
          <option value="dark">Темная тема</option>
          <option value="light">Светлая тема</option>
        </select>
      </div>
    </div>
  );
};

export default GeneralSettings;
