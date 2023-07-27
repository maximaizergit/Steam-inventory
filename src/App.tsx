import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./views/AuthPage";
import HomePage from "./views/Home";
import MainPage from "./views/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
