// rootReducer.js
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Определите тип RootState для корневого состояния
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
