import Link from 'next/link';
import { HomeStyles } from '@/styles';

const Locations = () => {
  return (
    <section className={HomeStyles.visit}>
      <div className={HomeStyles.visitItem}>
        <p className={HomeStyles.visitLabel}>Our Storefront</p>
        <p className={HomeStyles.visitText}>
          Stop by the bakery for baklava fresh out of the oven.
        </p>
      </div>
      <div className={HomeStyles.visitDivider} aria-hidden="true" />
      <div className={HomeStyles.visitItem}>
        <p className={HomeStyles.visitLabel}>In Stores Near You</p>
        <p className={HomeStyles.visitText}>
          Find our baklava stocked at markets across the Bay Area.
        </p>
      </div>
      <Link href="/locations" className={HomeStyles.visitCta}>
        Find Us
      </Link>
    </section>
  );
};

export default Locations;
