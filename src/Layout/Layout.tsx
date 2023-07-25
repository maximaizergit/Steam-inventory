import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuBlock from "../components/MenuBlock";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
