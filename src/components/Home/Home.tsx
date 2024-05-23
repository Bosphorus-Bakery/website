'use client';

import { useAppSelector, useAppDispatch, setIsDark } from '@/lib';

const Home = () => {
  const isDark = useAppSelector((state) => state.app.isDark);
  const dispatch = useAppDispatch();
  return (
    <div>
      Hello Home
      <button
        style={{ backgroundColor: isDark ? 'blue' : 'red' }}
        onClick={() => dispatch(setIsDark())}
      >
        Button
      </button>
    </div>
  );
};

export default Home;
