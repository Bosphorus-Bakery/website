import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '@/types';
import { stringify } from 'querystring';

const initialState: AppState = {
  isDark: false,
  theme: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state) => {
      state.isDark = !state.isDark;
    }  },
});

export const { setIsDark } = appSlice.actions;

export const app = appSlice.reducer;