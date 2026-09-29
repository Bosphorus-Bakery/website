'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib';

const StoreProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initializer runs once per component instance (per request during SSR)
  const [store] = useState(makeStore);
  // Initialize data here using an action
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
