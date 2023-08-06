// Profile.tsx
import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ProfileSettings from "../components/Profile/ProfileSettings";
import GeneralSettings from "../components/Profile/GeneralSettings";
import OtherSettings from "../components/Profile/OtherSettings";
import axios from "axios";
import styles from "../style/Profile/Profile.module.css";
import { handleError } from "../helpers/ToastEvents";
import { useDispatch } from "react-redux"; // Импортируем хук useDispatch
import { setUser } from "../redux/userSlice";

const endpointUrl = process.env.REACT_APP_ENDPOINT_URL;

var loading = true;
interface ApiResponse {
  timestamp: number;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: {
      id: number;
      user_id: number;
      url: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
    simId: string;
    status: string;
  }[];
}
const getUserInfo = (dispatch: any) => {
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
      // Вызываем действие setUser с тестовыми данными
      dispatch(setUser(response.data.user[0]));
      console.log("save to redux");
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      handleError(error.toString());
    });
};

const Profile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading && activeMenuItem === "profile") {
      getUserInfo(dispatch);
      console.log("sending req");
      loading = false;
    }
  }, [activeMenuItem, dispatch]);

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
      <div className={styles["profile-container"]}>
        {" "}
        {/* Применяем стиль из CSS модуля */}
        <ProfileMenu
          setActiveMenuItem={setActiveMenuItem}
          activeMenuItem={activeMenuItem}
        />
        <div className={styles["profile-content-container"]}>
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
