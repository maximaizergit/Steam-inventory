// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  name: string;
  email: string;
  simId: string;
  created_at: string;
  // Другие свойства пользователя
}

const initialState: UserState = {
  id: 0,
  name: "loading...",
  email: "loading...",
  simId: "loading...",
  created_at: "loading...",
  // Другие начальные значения
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    // Другие редюсеры для обновления данных пользователя
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
