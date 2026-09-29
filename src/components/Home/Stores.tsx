import Image from 'next/image';
import { carouselStores } from '@/lib/constants';
import { HomeStyles } from '@/styles';

// Each marquee half holds the store list twice so the track stays wider
// than the viewport; the animation shifts exactly one half for a seamless loop.
const COPIES_PER_HALF = 2;

const Stores = () => {
  const half = Array.from({ length: COPIES_PER_HALF }, () => carouselStores).flat();
  const track = [...half, ...half];
  return (
    <section className={HomeStyles.storesSection}>
      <h3 className={HomeStyles.storesHeading}>Find Us in Stores</h3>
      <div className={HomeStyles.storesCarousel}>
        <div className={HomeStyles.storesTrack}>
          {track.map((store, index) => (
            <div
              key={`${store.name}-${index}`}
              className={HomeStyles.storesLogoCard}
              aria-hidden={index >= half.length}
            >
              <Image
                className={HomeStyles.storesLogo}
                src={store.logo}
                alt={index < half.length ? store.name : ''}
                width={180}
                height={72}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stores;
