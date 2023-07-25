import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuBlock from "../components/MenuBlock";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <MenuBlock />
      <Footer />
    </div>
  );
};

export default Layout;
