'use client';

import Image from 'next/image';
import { useEffect, useState, type RefObject } from 'react';
import { useInView } from '@/lib';
import { aboutStyles } from '@/styles';
import Link from 'next/link';

const About = () => {
  const section1 = useInView({ threshold: 0.2 });
  const section2 = useInView({ threshold: 0.2 });
  const section3 = useInView({ threshold: 0.2 });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasTriggeredScroll, setHasTriggeredScroll] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  const smoothScrollTo = (
    targetPosition: number,
    duration: number = 2000,
    onComplete?: () => void,
  ) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetPosition);
      onComplete?.();
      return;
    }

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
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(scroll);
  };

  // Land a section just below the sticky navbar, matching how section 1
  // sits below it at the top of the page
  const getSectionTarget = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return 0;
    const navbarHeight =
      document.querySelector<HTMLElement>('.nav-bar')?.offsetHeight ?? 0;
    return (
      ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight
    );
  };

  // Unlock exactly when the animation lands so the next gesture
  // responds immediately (a timer tail would eat quick follow-up scrolls)
  const snapTo = (target: number) => {
    setHasTriggeredScroll(true);
    smoothScrollTo(target, 2000, () => setHasTriggeredScroll(false));
  };

  // Section 3 anchors its content to the bottom of the viewport
  // (communitySection), so its resting point is the fully scrolled page,
  // not its own top edge
  const getSection3Target = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  const handleScrollCue1Click = () => {
    if (!section2.ref.current) return;
    setHasUserScrolled(true);
    snapTo(getSectionTarget(section2.ref));
  };

  const handleScrollCue2Click = () => {
    if (!section3.ref.current) return;
    snapTo(getSection3Target());
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setHasUserScrolled(true);
      }

      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      // Snapping is desktop-only: on phones the sections collapse to
      // min-height auto, so nearly every touch flick reads as "between
      // sections" and the 2s hijack fights momentum scrolling. Reduced-
      // motion users shouldn't get animated hijacks either.
      const snapDisabled =
        window.matchMedia('(max-width: 768px)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (
        !snapDisabled &&
        !hasTriggeredScroll &&
        section1.ref.current &&
        section2.ref.current &&
        section3.ref.current
      ) {
        // useInView latches on first view (for the reveal animations), so
        // measure live geometry instead: snapping only applies while the
        // viewport is between two sections' resting points.
        const navbarHeight =
          document.querySelector<HTMLElement>('.nav-bar')?.offsetHeight ?? 0;
        const section2Top = section2.ref.current.getBoundingClientRect().top;
        const section3Top = section3.ref.current.getBoundingClientRect().top;
        const betweenSections1And2 = section2Top > navbarHeight + 1;
        const betweenSections2And3 =
          !betweenSections1And2 && section3Top > navbarHeight + 1;
        // Strictly below section 2's resting point — NOT merely "not above"
        // it. At the resting point itself (section2Top ≈ navbarHeight) both
        // comparisons are false, so a sub-pixel first wheel event can't
        // trigger a snap back to where the user already is.
        const belowSection2Rest = section2Top < navbarHeight - 1;

        // User is between sections and scrolls DOWN → snap to the next section
        if (isScrollingDown && betweenSections1And2) {
          snapTo(getSectionTarget(section2.ref));
        }

        if (isScrollingDown && betweenSections2And3) {
          snapTo(getSection3Target());
        }

        // User is between sections and scrolls UP → snap to the previous one
        if (isScrollingUp && betweenSections1And2 && currentScrollY > 0) {
          // Snap to true page top so the sticky navbar doesn't overlap the logo
          snapTo(0);
        }

        // Anywhere below section 2's resting point (including section 3 at
        // the page bottom), a single upward scroll returns to section 2
        if (isScrollingUp && belowSection2Rest) {
          snapTo(getSectionTarget(section2.ref));
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasTriggeredScroll]);

  return (
    <div className={aboutStyles.pageContainer}>
      {/* Section 1: The Origin */}
      <section
        ref={section1.ref}
        className={`${aboutStyles.section} ${aboutStyles.stackedSection} ${section1.isInView ? aboutStyles.visible : ''}`}
      >
        <div className={aboutStyles.sectionContent}>
          <div className={aboutStyles.imageBlock}>
            <div className={aboutStyles.logoWrapper}>
              <Image
                src="/bosphorus-bakery-logo.png"
                alt="Bosphorus Bakery Logo"
                width={520}
                height={520}
                priority
              />
            </div>
          </div>
          <div className={aboutStyles.textBlock}>
            <h1 className={aboutStyles.sectionTitle}>
              From the Bosphorus to the Golden Gate
            </h1>
            <p className={aboutStyles.sectionText}>
              Since 2004, our family has celebrated the flavors of Istanbul with
              Northern California, and in 2017, we opened our first bakery in
              Rohnert Park. We named it after the Bosphorus Bridge, which
              connects two continents in our home city. Our story has always
              been about connection: between cultures, and between our family
              and yours. Thank you for letting us be part of your special
              occasions.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleScrollCue1Click}
          className={`${aboutStyles.scrollCue} ${hasUserScrolled ? aboutStyles.scrollCueHidden : ''}`}
          aria-label="Scroll to next section"
        >
          <span className={aboutStyles.scrollCueChevron} />
        </button>
      </section>

      {/* Section 2: Our Journey & Craft */}
      <section
        ref={section2.ref}
        className={`${aboutStyles.section} ${aboutStyles.stackedSection} ${section2.isInView ? aboutStyles.visible : ''}`}
      >
        <div className={aboutStyles.sectionContent}>
          <div className={aboutStyles.imageBlock}>
            <div
              className={`${aboutStyles.logoWrapper} ${aboutStyles.baklavaImage}`}
            >
              <Image
                src="/baklava-sketch-clean.jpg"
                alt="Fresh Baklava"
                width={560}
                height={548}
              />
              {/* Hand-drawn annotations overlaid on the sketch. The viewBox
                  matches the image's pixel size (1024x1002) so coordinates
                  map 1:1 onto the sketch. pathLength=1 normalizes every
                  stroke so the draw-on animation is a plain 1 -> 0
                  dashoffset transition in CSS. */}
              <svg
                className={aboutStyles.annotations}
                viewBox="0 0 1024 1002"
                aria-hidden="true"
              >
                <path
                  className={aboutStyles.annoStroke}
                  d="M 250 134 Q 320 150 332 248"
                  pathLength="1"
                />
                <path
                  className={aboutStyles.annoStroke}
                  d="M 310 222 L 332 248 L 354 226"
                  pathLength="1"
                />
                <text
                  className={aboutStyles.annoLabel}
                  x="140"
                  y="100"
                  textAnchor="middle"
                >
                  chopped
                </text>
                <text
                  className={aboutStyles.annoLabel}
                  x="140"
                  y="153"
                  textAnchor="middle"
                >
                  pistachios
                </text>
                {/* brace spanning the phyllo layer stack */}
                <path
                  className={aboutStyles.annoStroke}
                  d="M 58 385
                     C 28 390, 42 505, 18 520
                     C 42 535, 28 650, 58 655"
                  pathLength="1"
                />
                {/* label hangs left of the brace, outside the viewBox
                    (the overlay has overflow: visible) */}
                <text
                  className={aboutStyles.annoLabel}
                  x="2"
                  y="505"
                  textAnchor="end"
                >
                  40 layers of
                </text>
                <text
                  className={aboutStyles.annoLabel}
                  x="2"
                  y="558"
                  textAnchor="end"
                >
                  phyllo dough
                </text>
                {/* leader line from the walnut label into the filling */}
                <path
                  className={aboutStyles.annoStroke}
                  d="M 320 890 Q 348 793 435 740"
                  pathLength="1"
                />
                <text
                  className={aboutStyles.annoLabel}
                  x="210"
                  y="930"
                  textAnchor="middle"
                >
                  sweet walnut filling
                </text>
                {/* standalone notes (no leader lines) hanging right of the
                    viewBox, mirroring the phyllo label on the left */}
                <text
                  className={aboutStyles.annoLabel}
                  x="1022"
                  y="470"
                  textAnchor="start"
                >
                  no honey
                </text>
                <text
                  className={aboutStyles.annoLabel}
                  x="1022"
                  y="545"
                  textAnchor="start"
                >
                  no excessive syrup
                </text>
                <text
                  className={aboutStyles.annoLabel}
                  x="1022"
                  y="620"
                  textAnchor="start"
                >
                  perfectly sweet
                </text>
              </svg>
              {/* On narrow viewports the right-hanging notes would run off
                  the screen edge, so they collapse into this block below
                  the sketch (the SVG notes hide at the same breakpoint) */}
              <p className={aboutStyles.sketchNotesMobile}>
                no honey · no excessive syrup
                <br />
                perfectly sweet
              </p>
            </div>
          </div>
          <div className={aboutStyles.textBlock}>
            <h2 className={aboutStyles.sectionTitle}>Lighter by Design</h2>
            <p className={aboutStyles.sectionText}>
              Ever say to yourself, "I love baklava, but it's too sweet"? So did
              we. That's why ours is made light, without honey or excessive
              syrup. Our best kept secret is simple: we let the natural flavors
              speak for themselves. Every batch starts with delicate layers of
              hand-rolled phyllo, real butter, and generous amounts of premium
              pistachios and walnuts, baked fresh daily in small batches. Each
              piece is finished with just enough light syrup to bring the
              flavors together, never to drown them out.
            </p>
          </div>
        </div>
        {/* section3.isInView latches on first view, so this cue retires
            permanently once the user has reached section 3 (same
            philosophy as section 1's cue after the first scroll) */}
        <button
          type="button"
          onClick={handleScrollCue2Click}
          className={`${aboutStyles.scrollCue} ${section3.isInView ? aboutStyles.scrollCueHidden : ''}`}
          aria-label="Scroll to next section"
        >
          <span className={aboutStyles.scrollCueChevron} />
        </button>
      </section>

      {/* Section 3: Our Growth & Invitation */}
      <section
        ref={section3.ref}
        className={`${aboutStyles.section} ${aboutStyles.communitySection} ${section3.isInView ? aboutStyles.visible : ''}`}
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
          <div
            className={`${aboutStyles.imageBlock} ${aboutStyles.scrapbookBlock}`}
          >
            <div className={aboutStyles.scrapbook}>
              <figure
                className={`${aboutStyles.polaroid} ${aboutStyles.polaroidGuyFieri}`}
              >
                <Image
                  src="/guy-fieri.png"
                  alt="Catering fresh baklava with Guy Fieri at Robert Cohn Winery"
                  width={220}
                  height={246}
                />
                <figcaption className={aboutStyles.polaroidCaption}>
                  Catering with Guy Fieri at Robert Cohn Winery
                </figcaption>
              </figure>
              <figure
                className={`${aboutStyles.polaroid} ${aboutStyles.polaroidFamily}`}
              >
                <Image
                  src="/family-photo.png"
                  alt="The Bosphorus Bakery family gathered around a holiday table"
                  width={256}
                  height={186}
                />
                <figcaption className={aboutStyles.polaroidCaption}>
                  Family photo, 2018
                </figcaption>
              </figure>
              <figure
                className={`${aboutStyles.polaroid} ${aboutStyles.polaroidStorefront}`}
              >
                <Image
                  src="/store-front.jpg"
                  alt="The Bosphorus Bakery storefront in Rohnert Park"
                  width={300}
                  height={299}
                />
                <figcaption className={aboutStyles.polaroidCaption}>
                  First storefront, Rohnert Park, 2017
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
