import Image from 'next/image';
import { ProductsStyles } from '@/styles';
import { baklavaProducts } from '@/lib/constants';

const Baklava = () => {
  return (
    <div className={ProductsStyles.baklava}>
      <div className={ProductsStyles.inner}>
        <div className={ProductsStyles.headerTop}>
        </div>
        <div className={ProductsStyles.sectionLabel}>Our Products</div>
        <div className={ProductsStyles.products}>
          {baklavaProducts.map((product) => (
            <div key={product.id} className={ProductsStyles.productCard}>
              <div className={ProductsStyles.productImageWrap}>
                <Image
                  className={ProductsStyles.productImage}
                  alt={product.name}
                  src={product.imageSrc}
                  width={product.imageWidth}
                  height={product.imageHeight}
                />
              </div>
              <div className={ProductsStyles.productCardBody}>
                <p className={ProductsStyles.productName}>{product.name}</p>
                <p className={ProductsStyles.productSub}>{product.serves}</p>
              </div>
            </div>
          ))}
        </div>
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
};

export default Baklava;
