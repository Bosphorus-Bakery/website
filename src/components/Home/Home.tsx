'use client';

import { useAppSelector, useAppDispatch, setIsDark } from '@/lib';
import Hero from './Hero';
import Locations from './Locations';
import Reviews from './Reviews';
import About from './About';
import Baklava from './Baklava';
import { HomeStyles } from '@/styles';

const Home = () => {
  const isDark = useAppSelector((state) => state.app.isDark);
  const dispatch = useAppDispatch();
  return (
    <div className="home-page-wrapper">
      <Hero></Hero>
      <Locations></Locations>
      <div className={HomeStyles.aboutBaklavaContainer}>
        <About></About>
        <Baklava></Baklava>
      </div>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
