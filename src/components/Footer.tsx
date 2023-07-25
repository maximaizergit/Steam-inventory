import React from "react";

const Footer = () => {
  return (
    <footer>
      {/* Левая половина футера - блоки ссылок */}
      <div className="footer-links">
        <div className="footer-block">
          <a href="/link1">Ссылка 1</a>
          <a href="/link2">Ссылка 2</a>
          <a href="/link3">Ссылка 3</a>
        </div>
        <div className="footer-block">
          <a href="/link4">Ссылка 4</a>
          <a href="/link5">Ссылка 5</a>
          <a href="/link6">Ссылка 6</a>
        </div>
      </div>
      {/* Правая половина футера - круги с иконками */}
      <div className="footer-icons">
        <div className="circle-icon">{/* Картинка для первого круга */}</div>
        <div className="circle-icon">{/* Картинка для второго круга */}</div>
        <div className="circle-icon">{/* Картинка для третьего круга */}</div>
      </div>
    </footer>
  );
};

export default Footer;
