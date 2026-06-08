import Image from 'next/image';
import { ProductsStyles } from '@/styles';
import { baklavaProducts } from '@/lib/constants';

const Products = () => {
  return (
    <section className={ProductsStyles.section}>
      <h2 className={ProductsStyles.sectionTitle}>Baklava</h2>
      <div className={ProductsStyles.grid}>
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
              <div className={ProductsStyles.productHeader}>
                <p className={ProductsStyles.productName}>{product.name}</p>
                <span className={ProductsStyles.productServes}>
                  {product.serves}
                </span>
              </div>
              <p className={ProductsStyles.productDescription}>
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
