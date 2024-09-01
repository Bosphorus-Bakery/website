'use client';

import { useAppSelector, useAppDispatch, setIsDark } from '@/lib';
import Hero from './Hero';
import Locations from './Locations';
import Reviews from './Reviews';
import About from './About';
import Baklava from './Baklava';

const Home = () => {
  const isDark = useAppSelector((state) => state.app.isDark);
  const dispatch = useAppDispatch();
  return (
    <div className="home-page-wrapper">
      <Hero></Hero>
      <Locations></Locations>
      <div className="home-page-about-baklava-container">
        <About></About>
        <Baklava></Baklava>
      </div>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
