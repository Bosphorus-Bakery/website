'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/lib';
import { aboutStyles } from '@/styles';
import Link from 'next/link';

const About = () => {
  const section1 = useInView({ threshold: 0.2 });
  const section2 = useInView({ threshold: 0.2 });
  const section3 = useInView({ threshold: 0.2 });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasTriggeredScroll, setHasTriggeredScroll] = useState(false);

  const smoothScrollTo = (element: HTMLElement, duration: number = 2000) => {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const minScrollAmount = 0; // Minimum scroll distance to trigger snap

      if (!hasTriggeredScroll && section1.ref.current && section2.ref.current) {
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);

        // User is on/near Section 1 and scrolls DOWN
        if (
          isScrollingDown &&
          scrollDelta > minScrollAmount &&
          section1.isInView
        ) {
          console.log('Scrolling down from section 1, snapping to section 2');
          setHasTriggeredScroll(true);
          smoothScrollTo(section2.ref.current, 2000);
          setTimeout(() => setHasTriggeredScroll(false), 2500);
        }

        // User is on/near Section 2 and scrolls UP
        if (
          isScrollingUp &&
          scrollDelta > minScrollAmount &&
          section2.isInView
        ) {
          console.log('Scrolling up from section 2, snapping to section 1');
          setHasTriggeredScroll(true);
          smoothScrollTo(section1.ref.current, 2000);
          setTimeout(() => setHasTriggeredScroll(false), 2500);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasTriggeredScroll, section1.isInView, section2.isInView]);

  return (
    <div className={aboutStyles.pageContainer}>
      {/* Section 1: The Origin */}
      <section
        ref={section1.ref}
        className={`${aboutStyles.section} ${aboutStyles.section1} ${section1.isInView ? aboutStyles.visible : ''}`}
      >
        <div className={aboutStyles.sectionContent}>
          <div className={aboutStyles.imageBlock}>
            <div className={aboutStyles.logoWrapper}>
              <Image
                src="/bosphorus-bakery-logo.png"
                alt="Bosphorus Bakery Logo"
                width={300}
                height={300}
                priority
              />
            </div>
          </div>
          <div className={aboutStyles.textBlock}>
            <h1 className={aboutStyles.sectionTitle}>In Search of a Name</h1>
            <p className={aboutStyles.sectionText}>
              In search of a name for our bakery, we wanted something that would
              connect culture and cuisine, and reflect our dedication to
              diversity, acceptance, and love for one another.
            </p>
            <p className={aboutStyles.sectionText}>
              The Bosphorus Bridge, spanning across The Bosphorus Strait,
              connects Asia to Europe in the heart of the only city in the world
              that rests on two continents. Our journey from Istanbul to San
              Francisco - Bosphorus to Golden Gate, has always been a symbol of
              our multifaceted identity, of East meets West.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Our Journey & Craft */}
      <section
        ref={section2.ref}
        className={`${aboutStyles.section} ${section2.isInView ? aboutStyles.visible : ''}`}
      >
        <div className={aboutStyles.sectionContent}>
          <div className={aboutStyles.imageBlock}>
            <div className={aboutStyles.imageGrid}>
              <div className={aboutStyles.imageWrapper}>
                <Image
                  src="/family-photo.png"
                  alt="Bosphorus Bakery Family"
                  width={280}
                  height={280}
                />
              </div>
              <div className={aboutStyles.imageWrapper}>
                <Image
                  src="/baklava-closeup.png"
                  alt="Fresh Baklava"
                  width={280}
                  height={280}
                />
              </div>
            </div>
          </div>
          <div className={aboutStyles.textBlock}>
            <h2 className={aboutStyles.sectionTitle}>Our Story & Craft</h2>
            <p className={aboutStyles.sectionText}>
              Our story is an uplifting tale of an immigrant family, who has
              shared and celebrated an iconic piece of their culture and cuisine
              with Northern California residents since 2004.
            </p>
            <p className={aboutStyles.sectionText}>
              Ever say to yourself - I love baklava but it's too sweet? That's
              how we felt too and made our baklava very light without honey or
              excessive syrup. Our best kept secret is that we let all the
              natural flavors speak for themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Growth & Invitation */}
      <section
        ref={section3.ref}
        className={`${aboutStyles.section} ${section3.isInView ? aboutStyles.visible : ''}`}
      >
        <div className={aboutStyles.sectionContent}>
          <div className={aboutStyles.textBlock}>
            <h2 className={aboutStyles.sectionTitle}>Our Growth & Community</h2>
            <p className={aboutStyles.sectionText}>
              We would like to thank all of our loyal customers for allowing us
              to be a part of your families' special occasions. Your patronage
              has helped our business grow and flourish.
            </p>
            <p className={aboutStyles.sectionText}>
              We opened our first location in 2017 in Rohnert Park, CA, and will
              soon be offering in-bakery seating where you can enjoy our baklava
              straight from the oven with fresh tea and coffee.
            </p>
            <p className={aboutStyles.sectionText}>
              Remember to take a moment out of each day to enjoy something
              sweet!
            </p>
            <div className={aboutStyles.ctaGroup}>
              <Link href="/contact" className={aboutStyles.ctaPrimary}>
                Contact Us
              </Link>
              <Link href="/locations" className={aboutStyles.ctaSecondary}>
                Visit Our Store
              </Link>
            </div>
          </div>
          <div className={aboutStyles.imageBlock}>
            <div className={aboutStyles.imageWrapper}>
              <Image
                src="/guy-fieri.png"
                alt="Bosphorus Bakery at Event with Guy Fieri"
                width={320}
                height={320}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
