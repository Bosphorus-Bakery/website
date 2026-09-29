export interface Review {
  /** Reviewer's display name. */
  name: string;
  /** Star rating 1–5. The home page only renders 5-star reviews. */
  rating: number;
  /** ISO date string, e.g. '2026-05-14'. */
  date: string;
  /** The review body. */
  text: string;
  /** Optional profile photo in public/reviews/. Falls back to an initials avatar. */
  avatar?: string;
}

// Customer reviews shown on the home page. Add real reviews here as you
// collect them — the component filters to 5-star entries automatically.
// Avatar images (optional) live in public/reviews/.
export const reviews: Review[] = [
  {
    name: 'Elena M.',
    rating: 5,
    date: '2026-06-18',
    text: 'The best baklava I have had outside of Istanbul. Flaky, buttery, and not overly sweet — you can taste the real pistachio. I keep coming back every weekend.',
  },
  {
    name: 'David R.',
    rating: 5,
    date: '2026-05-02',
    text: 'Ordered two trays for a family gathering and everyone was blown away. Fresh, beautifully packaged, and the staff could not have been more welcoming.',
  },
  {
    name: 'Aisha K.',
    rating: 5,
    date: '2026-04-21',
    text: 'A hidden gem. The pistachio and walnut varieties are both incredible, and you can tell everything is made with care. Highly recommend the assorted box.',
  },
  {
    name: 'Marcus T.',
    rating: 5,
    date: '2026-03-30',
    text: 'Authentic and absolutely delicious. The layers are impossibly thin and the syrup is perfectly balanced. This is the real deal — worth the drive to Novato.',
  },
  {
    name: 'Sophia L.',
    rating: 5,
    date: '2026-03-11',
    text: 'I ordered a custom tray for my mother’s birthday and it was a showstopper. Gorgeous presentation and even better taste. Will definitely be a repeat customer.',
  },
  {
    name: 'Omar H.',
    rating: 5,
    date: '2026-02-08',
    text: 'Reminds me of the baklava from back home. Fresh, fragrant, and never greasy. The staff are lovely and clearly take pride in what they make. Five stars.',
  },
];
