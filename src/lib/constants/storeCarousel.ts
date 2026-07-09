export interface CarouselStore {
  name: string;
  logo: string;
}

// Stores that carry our baklava, shown in the home-page carousel.
// Add or remove entries here; logo files live in public/store-logos/.
export const carouselStores: CarouselStore[] = [
  { name: 'Berkeley Bowl', logo: '/store-logos/berkeley-bowl.png' },
  { name: "Andronico's", logo: '/store-logos/andronicos.png' },
  { name: 'Whole Foods Market', logo: '/store-logos/whole-foods.svg' },
];
