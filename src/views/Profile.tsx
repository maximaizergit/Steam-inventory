// Profile.tsx
import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ProfileSettings from "../components/Profile/ProfileSettings";
import GeneralSettings from "../components/Profile/GeneralSettings";
import OtherSettings from "../components/Profile/OtherSettings";
import axios from "axios";
//import "../style/Profile.css";

const endpointUrl = process.env.REACT_APP_ENDPOINT_URL;

interface ApiResponse {
  Error: string;
  access_token: string; // Здесь указываем ожидаемые свойства ответа сервера
}

const getUserInfo = () => {
  const apiUrl = endpointUrl + "/getUserInfo";
  const accessToken = localStorage.getItem("accessToken");

  // Если токен есть, добавляем заголовок Authorization
  const config = accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : {};

  axios
    .get<ApiResponse>(apiUrl, config)
    .then((response) => {
      console.log("User Info:");
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
};

const Profile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");

  useEffect(() => {
    if (activeMenuItem === "profile") {
      getUserInfo();
      console.log("sending req");
    }
  }, [activeMenuItem]);

  const renderContent = () => {
    switch (activeMenuItem) {
      case "profile":
        return <ProfileSettings />;
      case "general":
        return <GeneralSettings />;
      case "other":
        return <OtherSettings />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <ProfileMenu
          setActiveMenuItem={setActiveMenuItem}
          activeMenuItem={activeMenuItem}
        />
        <div className="profile-content-container">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default Profile;
