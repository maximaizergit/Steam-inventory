import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import MenuBlock from "../components/HomePage/MenuBlock";
import { isUserAuthenticated } from "../helpers/Auth";

const HomePage = () => {
  useEffect(() => {
    // Проверяем наличие токена при загрузке страницы
    const isAuthenticated = isUserAuthenticated();

    // Если токен отсутствует, перенаправляем пользователя на страницу авторизации
    if (!isAuthenticated) {
      // Здесь укажите путь к странице авторизации, например: "/auth"
      window.location.href = "/login";
    }
  }, []);

  // Render the component only if the user is authenticated
  return isUserAuthenticated() ? (
    <Layout>
      <MenuBlock />
    </Layout>
  ) : null;
};

export default HomePage;
