import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import "../style/AuthPage.css";
import { handleSuccessfulAuth } from "../helpers/Auth";
import { handleError } from "../helpers/ToastEvents";
interface FormData {
  email: string;
  password: string;
  name?: string;
}

interface ApiResponse {
  Error: string;
  access_token: string; // Здесь указываем ожидаемые свойства ответа сервера
}

const endpointUrl = process.env.REACT_APP_ENDPOINT_URL;

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const authenticateUser = (isLoginForm: boolean, formData: FormData) => {
    const apiUrl = isLoginForm
      ? endpointUrl + "/signin"
      : endpointUrl + "/signup";

    const accessToken = localStorage.getItem("accessToken");

    // Если токен есть, добавляем заголовок Authorization
    const config = accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};

    axios
      .post<ApiResponse>(apiUrl, formData, config)
      .then((response) => {
        console.log("form data " + formData);
        console.log(response.data);
        if (isLoginForm && response.data.access_token) {
          handleSuccessfulAuth(response.data.access_token);
        } else if (!isLoginForm) {
          handleToggleForm();
          alert("Успешно зарегестрирован");
        }
      })
      .catch((error) => {
        console.log(apiUrl);
        console.log(formData);
        console.error(error);
        handleError(error.toString());
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (!isLoginForm && (!formData.name || formData.name.trim() === "")) ||
      !formData.email ||
      formData.email.trim() === "" ||
      !formData.password ||
      formData.password.trim() === ""
    ) {
      handleError("Проверьте введеные данные");
      return;
    }
    const formDataToSend = isLoginForm
      ? { email: formData.email, password: formData.password }
      : formData;

    authenticateUser(isLoginForm, formDataToSend);
  };

  const handleToggleForm = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
      setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
    }, 380);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Layout>
      <div className="container">
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
              <label htmlFor="password">{process.env.ENDPOINTURL}Пароль:</label>
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
