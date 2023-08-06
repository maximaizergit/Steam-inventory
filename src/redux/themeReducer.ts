// themeReducer.ts
const initialState = "default"; // Значение по умолчанию для темы

const themeReducer = (state = initialState, action: any) => {
  // В данном случае action не требуется, так как у нас нет действий для обновления темы
  return state;
};

export default themeReducer;
