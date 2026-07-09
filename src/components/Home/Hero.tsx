import Image from 'next/image';
import Link from 'next/link';
import { HomeStyles } from '@/styles';

const Hero = () => {
  return (
    <section className={HomeStyles.hero}>
      <Image
        src="/HERO.jpeg"
        alt="Fresh dough resting in baskets at Bosphorus Bakery"
        className={HomeStyles.heroImage}
        fill
        priority
        sizes="100vw"
      />
      <div className={HomeStyles.heroOverlay} aria-hidden="true" />
      <div className={HomeStyles.heroContent}>
        <p className={HomeStyles.heroEyebrow}>Handcrafted in the Bay Area</p>
        <h1 className={HomeStyles.heroHeading}>
          Turkish baklava, baked fresh every morning
        </h1>
        <p className={HomeStyles.heroSubheading}>
          Crispy phyllo, fresh ingredients - layered by hand at
          Bosphorus Bakery, the traditional way.
        </p>
        <div className={HomeStyles.heroActions}>
          <Link href="/contact" className={HomeStyles.cta}>
            Order Now
          </Link>
          <Link href="/baklava" className={HomeStyles.heroSecondaryCta}>
            Explore Our Baklava
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
