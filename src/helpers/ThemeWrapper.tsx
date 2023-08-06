import React, { useEffect, ReactNode } from "react";
import { applyThemeStyles } from "./ThemeSwitcher";

interface ThemeWrapperProps {
  theme: string;
  children: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ theme, children }) => {
  // Вызываем функцию applyThemeStyles при монтировании компонента
  useEffect(() => {
    applyThemeStyles(theme);
    console.log("wrapper");
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
