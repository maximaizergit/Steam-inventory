import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Формируем данные для отправки на бэкенд
    const formData = {
      username: username,
      password: password,
    };

    // Отправляем POST-запрос на бэкенд
    axios
      .post("http://example.com/api/login", formData) // Замените URL на адрес вашего бэкенда
      .then((response) => {
        // Обработка успешного ответа от бэкенда
        console.log(response.data);
      })
      .catch((error) => {
        // Обработка ошибок
        console.error(error);
      });
  };

  const handleToggleForm = () => {
    setIsFlipped(true); // Устанавливаем состояние для анимации переключения формы
    setTimeout(() => {
      setIsFlipped(false); // Через 0.5 секунды снимаем состояние для анимации
      setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm); // Переключаем значение состояния при завершении анимации
    }, 380);
  };

  return (
    <Layout>
      <div className="container">
        {" "}
        {/* Обертка для центрирования */}
        <div className={`form-container ${isFlipped ? "flipped" : ""}`}>
          <h1>{isLoginForm ? "Авторизация" : "Регистрация"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Логин:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isLoginForm ? (
              <button type="submit">Войти</button>
            ) : (
              <button type="submit">Зарегистрироваться</button>
            )}
          </form>
          <button
            type="button"
            onClick={handleToggleForm}
            className="toggle-button"
          >
            {isLoginForm ? "Регистрация" : "Войти"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
