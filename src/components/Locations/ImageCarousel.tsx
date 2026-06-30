'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { locationStyles } from '@/styles';

const images = [
  { src: '/whole-foods.jpg', alt: 'Whole Foods Market storefront' },
  { src: '/safeway.jpg', alt: 'Safeway storefront' },
  { src: '/olivers-market.jpg', alt: "Oliver's Market storefront" },
  { src: '/pirooz-market.jpg', alt: 'Pirooz Market storefront' },
  { src: '/wild-roots.jpg', alt: 'Wild Roots Market storefront' },
];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className={locationStyles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className={`${locationStyles.carouselImage} ${
            i === index ? locationStyles.carouselImageActive : ''
          }`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
