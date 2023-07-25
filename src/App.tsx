import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./views/AuthPage";
import HomePage from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
