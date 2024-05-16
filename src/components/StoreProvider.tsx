"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib";
import { useRef } from "react";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Initialize data here using an action
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
