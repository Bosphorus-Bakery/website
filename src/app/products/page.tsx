import { Products, Nutrition } from '@/components';
import { ProductsStyles } from '@/styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products',
};

export default function Page() {
  return (
    <div className={ProductsStyles.page}>
      <div className={ProductsStyles.inner}>
        <Products />
        <Nutrition />
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
