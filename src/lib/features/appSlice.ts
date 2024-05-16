import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "@/types";

const initialState: AppState = {
  isDark: false,
  theme: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    setThemeFalse: (state) => {
      state.theme = false;
    },
  },
});

export const { setIsDark, setThemeFalse } = appSlice.actions;

export const app = appSlice.reducer;
