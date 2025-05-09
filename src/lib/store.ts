import { configureStore } from "@reduxjs/toolkit";
import { app } from "@/lib";
import { contactFormReducer } from "@/lib/features"

export const makeStore = () => {
  return configureStore({
    reducer: {
      contactForm: contactFormReducer,
      app,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
