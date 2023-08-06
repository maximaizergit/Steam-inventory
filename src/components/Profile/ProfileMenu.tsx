// ProfileMenu.tsx
import React, { useState } from "react";
import styles from "../../style/Profile/ProfileMenu.module.css";
import { BsChevronDown } from "react-icons/bs";
import { getInitialTheme } from "../../helpers/ThemeSwitcher";

interface ProfileMenuProps {
  setActiveMenuItem: (item: string) => void;
  activeMenuItem: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  setActiveMenuItem,
  activeMenuItem,
}) => {
  const menuItems = [
    { id: "profile", label: "Профиль" },
    { id: "general", label: "Общие настройки" },
    { id: "other", label: "Прочее" },
    // Добавьте здесь другие пункты меню при необходимости
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme] = useState<string>(() => getInitialTheme());
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    setMenuOpen(false); // Закрываем меню после выбора пункта
  };
  // Функция для получения label по id пункта
  const getMenuItemLabel = (itemId: string) => {
    const menuItem = menuItems.find((item) => item.id === itemId);
    return menuItem ? menuItem.label : "";
  };

  return (
    <div
      className={`${styles["profile-menu"]} ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      {/* В PC версии отображаем просто кнопки */}
      <div className={styles["profile-menu-buttons"]}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles["menu-item"]} ${
              activeMenuItem === item.id ? styles["active"] : ""
            }`}
            onClick={() => handleMenuItemClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
      {/* В мобильной версии добавляем дропдаун */}
      <div className={styles["profile-menu-dropdown"]}>
        <div
          className={styles["profile-menu-toggle"]}
          onClick={handleToggleMenu}
        >
          {getMenuItemLabel(activeMenuItem)} <BsChevronDown />
        </div>
        {menuOpen && (
          <div className={styles["menu-dropdown"]}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`${styles["menu-item"]} ${
                  activeMenuItem === item.id ? styles["active"] : ""
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
