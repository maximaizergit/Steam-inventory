import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../style/Profile/ProfileSettings.module.css";
import { RootState } from "../../redux/rootReducer"; // Подставьте путь к корневому состоянию вашего Redux store
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done"; // Иконка галочки
import ClearIcon from "@mui/icons-material/Clear"; // Иконка крестика
import axios from "axios";
import { setUser } from "../../redux/userSlice";
import { handleError } from "../../helpers/ToastEvents";
interface ApiDataUpdateResponse {
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

const endpointUrl = process.env.REACT_APP_ENDPOINT_URL;

const ProfileSettings = () => {
  const user = useSelector((state: RootState) => state.user);
  const [editingField, setEditingField] = useState(""); // Добавляем состояние для поля в режиме редактирования
  const dispatch = useDispatch();
  const currentFieldValue =
    editingField === "name"
      ? user.name
      : editingField === "email"
      ? user.email
      : "";
  const [newFieldValue, setNewFieldValue] = useState("");
  const [oldPassValue, setOldPassValue] = useState("");

  const handleEditClick = (field: string) => {
    setEditingField(field); // Устанавливаем поле в режим редактирования
    setNewFieldValue(currentFieldValue);
  };

  const isValidEmail = (email: string): boolean => {
    // Регулярное выражение для проверки формата email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAcceptClick = (field: string) => {
    const hasOnlySpaces = /^\s+$/;
    if (field === "name" || field === "email") {
      if (!newFieldValue || hasOnlySpaces.test(newFieldValue)) {
        handleError("Error: Введите данные в поле " + field);
        return;
      }
      if (field === "email" && !isValidEmail(newFieldValue)) {
        handleError("Error: Введите корректный email");
        return;
      }
      setEditingField(""); // Reset the field from edit mode
      updateUserData({ [field]: newFieldValue });
    } else if (field === "password") {
      if (
        !newFieldValue ||
        !oldPassValue ||
        hasOnlySpaces.test(newFieldValue) ||
        hasOnlySpaces.test(oldPassValue)
      ) {
        handleError("Error: Введите данные в оба поля");
        return;
      }
      if (newFieldValue === oldPassValue) {
        handleError("Error: Вы ввели 2 одинаковых пароля");
        return;
      }
      setEditingField(""); // Reset the field from edit mode
      updatePassword();
    }
  };

  const updateUserData = (dataToUpdate: { [key: string]: string }) => {
    // Send the updated user data to the server
    const apiUrl = endpointUrl + "/updateUserInfo";
    const accessToken = localStorage.getItem("accessToken");
    const config = accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};

    const updatedUser = { ...user, ...dataToUpdate }; // Create a copy of the user object with updated fields
    console.log(updatedUser);
    axios
      .put<ApiDataUpdateResponse>(apiUrl, updatedUser, config)
      .then((response) => {
        console.log("User Info updated successfully:", response.data);
        // Dispatch an action to update the user data in Redux store
        dispatch(setUser(response.data.user[0]));
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
        handleError(error.toString());
      });
  };

  const updatePassword = () => {
    // Send the updated password to the server
    const apiUrl = endpointUrl + "/updateUserPassword";
    const accessToken = localStorage.getItem("accessToken");
    const config = accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};

    const passwordData = {
      oldPassword: oldPassValue,
      newPassword: newFieldValue,
    }; // Data for updating password
    console.log(passwordData);
    axios
      .put<ApiDataUpdateResponse>(apiUrl, passwordData, config)
      .then((response) => {
        console.log("Password updated successfully:", response.data);
        // Handle success logic here if needed
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        handleError(error.toString());
      });
  };

  const handleCancelClick = () => {
    setEditingField(""); // Сбрасываем поле из режима редактирования
  };

  // Функция для форматирования даты в более читаемый формат
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Форматируем дату в локальный формат
  };

  return (
    <div className={styles["profile-settings"]}>
      {" "}
      {/* Применяем стиль из CSS модуля */}
      <h2>Профиль</h2>
      {/* Display user data */}
      <div>
        <label>Имя:</label>
        <div className={styles["data"]}>
          {/* Проверяем, если поле в режиме редактирования */}
          {editingField === "name" ? (
            <>
              <input
                type="text"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className={styles.input}
              />
              {/* Поле для ввода */}
              <button
                onClick={() => handleAcceptClick("name")}
                className={styles.button}
              >
                {" "}
                <DoneIcon fontSize="small" />
                Принять
              </button>{" "}
              {/* Кнопка "Принять" */}
              <button
                onClick={() => handleCancelClick()}
                className={styles.button}
              >
                {" "}
                <ClearIcon fontSize="small" />
                Отменить
              </button>{" "}
              {/* Кнопка "Отменить" */}
            </>
          ) : (
            <>
              {user.name}{" "}
              <button
                onClick={() => handleEditClick("name")}
                className={styles.button}
              >
                {" "}
                <EditIcon fontSize="small" />
                Редактировать
              </button>{" "}
            </>
          )}
        </div>
      </div>
      <div>
        <label>Email:</label>
        <div className={styles["data"]}>
          {/* Аналогично для поля "Email" */}
          {editingField === "email" ? (
            <>
              <input
                type="text"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className={styles.input}
              />{" "}
              <button
                onClick={() => handleAcceptClick("email")}
                className={styles.button}
              >
                {" "}
                <DoneIcon fontSize="small" />
                Принять
              </button>{" "}
              <button
                onClick={() => handleCancelClick()}
                className={styles.button}
              >
                {" "}
                <ClearIcon fontSize="small" />
                Отменить
              </button>{" "}
            </>
          ) : (
            <>
              {user.email}{" "}
              <button
                onClick={() => handleEditClick("email")}
                className={styles.button}
              >
                {" "}
                <EditIcon fontSize="small" />
                Редактировать
              </button>{" "}
            </>
          )}
        </div>
      </div>
      <div>
        <label>Пароль:</label>
        <div className={styles["data"]}>
          {/* Проверяем, если поле в режиме редактирования */}
          {editingField === "password" ? (
            // Код для редактирования поля "Пароль"
            <>
              <label>Старый пароль:</label>
              <input
                type="password"
                onChange={(e) => setOldPassValue(e.target.value)}
                className={styles.input}
              />{" "}
              {/* Применяем стиль для input */}
              <label>Новый пароль:</label>
              <input
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                type="password"
                className={styles.input}
              />{" "}
              {/* Применяем стиль для input */}
              <button
                onClick={() => handleAcceptClick("password")}
                className={styles.button}
              >
                {" "}
                <DoneIcon fontSize="small" />
                Принять
              </button>{" "}
              <button
                onClick={() => handleCancelClick()}
                className={styles.button}
              >
                {" "}
                <ClearIcon fontSize="small" />
                Отменить
              </button>{" "}
            </>
          ) : (
            // Код для отображения поля "Пароль"
            <>
              **********{" "}
              <button
                onClick={() => handleEditClick("password")}
                className={styles.button}
              >
                {" "}
                <EditIcon fontSize="small" />
                Редактировать
              </button>{" "}
            </>
          )}
        </div>
      </div>
      <div>
        <label>SimId:</label> {user.simId}
      </div>
      <div>
        <label>Дата регистрации:</label> {formatDate(user.created_at)}
      </div>
    </div>
  );
};

export default ProfileSettings;
