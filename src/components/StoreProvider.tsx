'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib';

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Initialize data here using an action
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
