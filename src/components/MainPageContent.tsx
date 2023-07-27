import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MainContent = () => {
  const [numCircles, setNumCircles] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      // Определяем количество кружочков в зависимости от ширины экрана
      const screenWidth = window.innerWidth;
      setNumCircles(Math.ceil(screenWidth / 80) + 1);
    };

    handleResize(); // Вызываем функцию при первоначальной загрузке
    window.addEventListener("resize", handleResize); // Добавляем слушатель события изменения размера окна

    return () => {
      window.removeEventListener("resize", handleResize); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    // Подключение шрифта Open Sans
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    <link href="" rel="stylesheet"></link>;
    // Добавьте функцию очистки для удаления ссылки при размонтировании компонента
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="main-content">
      <div className="block">
        <div className="block-content">
          <div>
            <h1>
              С помощью "SteamInventory Manager" вы сможете полностью управлять
              своим инвентарем и максимизировать доход от продажи предметов на
              площадке Steam.
            </h1>
            <p>
              Наше приложение не является магазином; оно предлагает удобный
              инструмент для анализа вашего инвентаря и оптимизации процесса
              продажи.
            </p>
            <Link to="/home">
              <Button
                variant="contained"
                color="success"
                className="custom-button"
              >
                Продолжить
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="block-content">
          <div className="image-container"></div>
        </div>
      </div>

      <div className="circle-container full">
        {Array.from({ length: numCircles }, (_, index) => (
          <div key={index} className="circle"></div>
        ))}
      </div>
      <div className="block full">
        <div className="block-content" style={{ marginBottom: "0" }}>
          <div>
            <h1>Основные возможности приложения:</h1>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="block-content">
          <div>
            <h1>Инвентарь на вашем пальце:</h1>
            <p>
              Вы сможете легко просматривать все предметы, которые у вас есть в
              инвентаре Steam. Больше не нужно тратить время на поиск нужных
              предметов - мы предоставим вам удобный интерфейс, чтобы вы могли
              быстро находить нужное.
            </p>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="block-content">
          <div>
            <h1>Анализ инвентаря:</h1>
            <p>
              Наше приложение проведет анализ вашего инвентаря, выявит наиболее
              ценные и востребованные предметы. Благодаря этому вы сможете
              принимать более информированные решения о продаже и
              максимизировать ваш доход.
            </p>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="block-content">
          <div>
            <h1>Оптимизация продажи:</h1>
            <p>
              Забудьте о сложностях выбора правильных предметов для продажи. Мы
              предоставим вам рекомендации о том, какие предметы лучше всего
              выставить на продажу на площадке Steam. Это поможет вам продавать
              предметы быстро и с наибольшей выгодой.
            </p>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="block-content">
          <div>
            <h1>Удобство использования:</h1>
            <p>
              Наш интерфейс разработан с акцентом на простоту и удобство. Вы
              сможете легко настраивать параметры анализа, просматривать
              результаты и управлять своими предметами всего в несколько кликов.
            </p>
          </div>
        </div>
      </div>

      <div className="block full">
        <div className="block-content">
          <div>
            <h1>Быстрые продажи:</h1>
            <p>
              Отправляйте предметы на быструю продажу на площадке Steam с
              помощью нашего приложения. Это позволит вам быстро освободить
              место в инвентаре и получить деньги за проданные предметы.
            </p>
          </div>
        </div>
      </div>

      <div className="block full">
        <div className="block-content">
          <div>
            <h1>
              SteamInventory Manager - ваш верный помощник в управлении
              инвентарем и оптимизации продажи на площадке Steam. Начните
              использовать приложение прямо сейчас и получите максимальную
              выгоду от вашего инвентаря!
            </h1>
          </div>
          <Link to="/home">
            <Button
              variant="contained"
              color="success"
              className="custom-button"
            >
              Продолжить
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
