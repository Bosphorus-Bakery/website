import Link from 'next/link';
import { Products } from '@/components';
import { ProductsStyles } from '@/styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products',
};

export default function Page() {
  return (
    <div className={ProductsStyles.page}>
      <header className={ProductsStyles.banner}>
        <p className={ProductsStyles.bannerEyebrow}>Bosphorus Bakery</p>
        <h1 className={ProductsStyles.bannerTitle}>Our Products</h1>
        <p className={ProductsStyles.bannerTagline}>
          Traditional Turkish baklava, handcrafted in small batches and always
          baked to order.
        </p>
      </header>
      <div className={ProductsStyles.inner}>
        <Products />

        <aside className={ProductsStyles.wholesale}>
          <div className={ProductsStyles.wholesaleText}>
            <h2 className={ProductsStyles.wholesaleHeading}>
              Wholesale &amp; Catering
            </h2>
            <p className={ProductsStyles.wholesaleCopy}>
              Stocking a shop or café, or planning an event? Alongside our
              retail boxes and trays, we offer wholesale and full catering with
              pricing to match. Tell us what you need and we&rsquo;ll put
              together a quote.
            </p>
          </div>
          <Link href="/contact" className={ProductsStyles.wholesaleCta}>
            Contact for pricing
          </Link>
        </aside>

        <div className={ProductsStyles.footerSection}>
          <div className={ProductsStyles.ornament}>
            <div className={ProductsStyles.ornamentLine}></div>
            <div className={ProductsStyles.ornamentDiamond}></div>
            <div
              className={`${ProductsStyles.ornamentLine} ${ProductsStyles.ornamentLineRight}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
