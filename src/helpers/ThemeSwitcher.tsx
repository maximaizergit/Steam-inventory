// themeUtils.ts

export const getInitialTheme = () => {
  // При монтировании компонента, проверяем наличие сохраненной темы в localStorage
  const savedTheme = localStorage.getItem("theme");
  return savedTheme || "default"; // Если тема сохранена, используем ее, иначе используем тему по умолчанию
};

export const applyThemeStyles = (theme: string) => {
  const root = document.documentElement;
  switch (theme) {
    case "dark":
      root.style.setProperty("--primary-color", "#141818");
      root.style.setProperty("--secondary-color", "#3e4444");
      root.style.setProperty("--background-color", "#ffffff");
      break;
    case "light":
      root.style.setProperty("--primary-color", "#ffffff");
      root.style.setProperty("--secondary-color", "#f1f1f1");
      root.style.setProperty("--background-color", "#141818");
      break;
    default:
      root.style.setProperty("--primary-color", "#5e16a7");
      root.style.setProperty("--secondary-color", "#8a4bc1");
      root.style.setProperty("--background-color", "#f8f9fa");
      break;
  }

  const headerAuthButton = document.querySelector(
    ".header-auth"
  ) as HTMLElement;

  if (headerAuthButton) {
    headerAuthButton.classList.toggle("dark", theme === "dark");
    headerAuthButton.classList.toggle("light", theme === "light");
  }

  const headerLogo = document.querySelector(".header-logo") as HTMLElement;

  if (headerAuthButton) {
    headerLogo.classList.toggle("dark", theme === "dark");
    headerLogo.classList.toggle("light", theme === "light");
  }

  const profileMenu = document.querySelector(
    ".ProfileMenu_profile-menu__sPBrG"
  ) as HTMLElement;
  if (profileMenu) {
    if (theme === "default") {
      profileMenu.style.backgroundColor = "#f8f9fa";
    }
  }

  const generalSettings = document.querySelector(
    ".general-settings"
  ) as HTMLElement;
  if (generalSettings) {
    if (theme === "light") {
      generalSettings.style.backgroundColor = "#ffffff";
    }
  }
};
