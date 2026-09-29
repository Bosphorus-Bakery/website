'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { reviews } from '@/lib/constants';
import type { Review } from '@/lib/constants';
import { HomeStyles } from '@/styles';

// Only 5-star reviews are featured on the home page.
const fiveStarReviews = reviews.filter((review) => review.rating === 5);

// UTC keeps the server and client render identical (avoids hydration mismatch).
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const ReviewCard = ({ review }: { review: Review }) => (
  <article className={HomeStyles.reviewCard}>
    <div className={HomeStyles.reviewStars} aria-label={`${review.rating} out of 5 stars`}>
      {Array.from({ length: review.rating }, (_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
    <p className={HomeStyles.reviewText}>{review.text}</p>
    <div className={HomeStyles.reviewAuthor}>
      {review.avatar ? (
        <Image
          className={HomeStyles.reviewAvatar}
          src={review.avatar}
          alt={review.name}
          width={48}
          height={48}
        />
      ) : (
        <span className={HomeStyles.reviewAvatarFallback} aria-hidden="true">
          {initials(review.name)}
        </span>
      )}
      <div className={HomeStyles.reviewAuthorMeta}>
        <span className={HomeStyles.reviewName}>{review.name}</span>
        <span className={HomeStyles.reviewDate}>
          {dateFormatter.format(new Date(review.date))}
        </span>
      </div>
    </div>
  </article>
);

const Reviews = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Toggle arrow availability based on how far the track is scrolled.
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const scroll = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    // Advance exactly one card: its width plus the flex gap between cards.
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className={HomeStyles.reviewsSection}>
      <h3 className={HomeStyles.reviewsHeading}>What Our Customers Say</h3>
      <div className={HomeStyles.reviewsCarousel}>
        <button
          type="button"
          className={HomeStyles.reviewsArrow}
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous reviews"
        >
          ‹
        </button>
        <div className={HomeStyles.reviewsTrack} ref={trackRef} onScroll={updateArrows}>
          {fiveStarReviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
        <button
          type="button"
          className={HomeStyles.reviewsArrow}
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          aria-label="Next reviews"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Reviews;
