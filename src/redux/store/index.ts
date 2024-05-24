import { configureStore } from "@reduxjs/toolkit";

import { appReducer } from "@/redux/reducers";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
