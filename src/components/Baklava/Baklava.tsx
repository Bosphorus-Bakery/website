import Image from 'next/image';
import { BaklavaStyles } from '@/styles';
import { baklavaProducts } from '@/lib/constants';

const Baklava = () => {
  return (
    <div className={BaklavaStyles.baklava}>
      <div className={BaklavaStyles.inner}>
        <div className={BaklavaStyles.headerTop}>
        </div>
        <div className={BaklavaStyles.sectionLabel}>Our Products</div>
        <div className={BaklavaStyles.products}>
          {baklavaProducts.map((product) => (
            <div key={product.id} className={BaklavaStyles.productCard}>
              <div className={BaklavaStyles.productCardBody}>
                <div>
                  <p className={BaklavaStyles.productName}>{product.name}</p>
                  <p className={BaklavaStyles.productSub}>{product.sub}</p>
                </div>
                <Image
                  className={BaklavaStyles.productImage}
                  alt={product.name}
                  src={product.imageSrc}
                  width={product.imageWidth}
                  height={product.imageHeight}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={BaklavaStyles.footerSection}>
          <div className={BaklavaStyles.ornament}>
            <div className={BaklavaStyles.ornamentLine}></div>
            <div className={BaklavaStyles.ornamentDiamond}></div>
            <div
              className={`${BaklavaStyles.ornamentLine} ${BaklavaStyles.ornamentLineRight}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baklava;
