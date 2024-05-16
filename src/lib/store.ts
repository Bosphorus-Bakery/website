import { configureStore } from "@reduxjs/toolkit";
import { app } from "@/lib";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
