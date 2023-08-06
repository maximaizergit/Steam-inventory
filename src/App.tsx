import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./views/AuthPage";
import HomePage from "./views/Home";
import MainPage from "./views/MainPage";
import Profile from "./views/Profile";
import { useSelector } from "react-redux";
import { applyThemeStyles, getInitialTheme } from "./helpers/ThemeSwitcher";
import ThemeWrapper from "./helpers/ThemeWrapper";

function App() {
  const [theme, setTheme] = useState<string>(() => getInitialTheme());
  // Устанавливаем стили в зависимости от выбранной темы
  const root = document.documentElement;

  return (
    <ThemeWrapper theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeWrapper>
  );
}

export default App;
