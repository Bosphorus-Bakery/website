'use client';

import { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';
import { locationStyles } from '@/styles';

const images = [
  {
    src: '/whole-foods.jpg',
    alt: 'Whole Foods Market storefront',
    name: 'Whole Foods Market',
  },
  { src: '/safeway.jpg', alt: 'Safeway storefront', name: 'Safeway' },
  {
    src: '/olivers-market.jpg',
    alt: "Oliver's Market storefront",
    name: "Oliver's Market",
  },
  {
    src: '/pirooz-market.jpg',
    alt: 'Pirooz Market storefront',
    name: 'Pirooz Market',
  },
  {
    src: '/wild-roots.jpg',
    alt: 'Wild Roots Market storefront',
    name: 'Wild Roots Market',
  },
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
      className={locationStyles.carouselWrap}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={locationStyles.carousel}>
        <div
          className={locationStyles.carouselTrack}
          style={{ '--active-index': index } as CSSProperties}
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={`${locationStyles.carouselSlide} ${
                i === index ? locationStyles.carouselSlideActive : ''
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={locationStyles.carouselImage}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyed on index so the fade-in animation replays per slide. */}
      <p key={index} className={locationStyles.carouselCaption}>
        {images[index].name}
      </p>

      <div className={locationStyles.carouselDots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${locationStyles.carouselDot} ${
              i === index ? locationStyles.carouselDotActive : ''
            }`}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;