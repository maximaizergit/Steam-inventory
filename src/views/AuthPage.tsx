import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  name?: string; // Поле "name" может быть опциональным
}

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Определяем, отправлять данные для авторизации или регистрации
    const apiUrl = isLoginForm
      ? "http://example.com/api/signin"
      : "http://example.com/api/signup";

    // Отправляем POST-запрос на бэкенд
    axios
      .post(apiUrl, formData)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Layout>
      <div className="container">
        {" "}
        {/* Обертка для центрирования */}
        <div className={`form-container ${isFlipped ? "flipped" : ""}`}>
          <h1>{isLoginForm ? "Авторизация" : "Регистрация"}</h1>
          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <div className="form-group">
                <label htmlFor="name">Имя:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
