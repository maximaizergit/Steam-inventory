// ProfileMenu.tsx
import React from "react";

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
    { id: "other", label: "Другие настройки" },
    // Добавьте здесь другие пункты меню при необходимости
  ];

  return (
    <div className="profile-menu">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`menu-item ${activeMenuItem === item.id ? "active" : ""}`}
          onClick={() => setActiveMenuItem(item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;
