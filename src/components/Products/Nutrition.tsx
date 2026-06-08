import { ProductsStyles } from '@/styles';
import {
  baklavaIngredients,
  baklavaAllergens,
  baklavaServingSize,
  baklavaCalories,
  baklavaNutritionFacts,
  baklavaVitamins,
  baklavaDailyValueNote,
} from '@/lib/constants';

const Nutrition = () => {
  return (
    <section className={ProductsStyles.section}>
      <h2 className={ProductsStyles.sectionTitle}>Nutrition & Ingredients</h2>
      <div className={ProductsStyles.infoPanel}>
        <div className={ProductsStyles.infoBlock}>
          <div className={ProductsStyles.infoSub}>
            <h3 className={ProductsStyles.infoHeading}>Ingredients</h3>
            <p className={ProductsStyles.infoText}>{baklavaIngredients}</p>
          </div>
          <div className={ProductsStyles.infoSub}>
            <h3 className={ProductsStyles.infoHeading}>Allergens</h3>
            <p className={ProductsStyles.infoText}>{baklavaAllergens}</p>
          </div>
        </div>
        <div className={ProductsStyles.infoBlock}>
          <div className={ProductsStyles.nutritionLabel}>
            <div className={ProductsStyles.servingRow}>
              <span>Serving size</span>
              <span className={ProductsStyles.servingSize}>
                {baklavaServingSize}
              </span>
            </div>
            <div className={ProductsStyles.caloriesRow}>
              <span className={ProductsStyles.caloriesLabel}>Calories</span>
              <span className={ProductsStyles.caloriesValue}>
                {baklavaCalories}
              </span>
            </div>
            <div className={ProductsStyles.nutritionGrid}>
              {[
                baklavaNutritionFacts.slice(0, 5),
                baklavaNutritionFacts.slice(5),
              ].map((group, i) => (
                <div key={i} className={ProductsStyles.nutritionCol}>
                  <div className={ProductsStyles.dvHeader}>
                    <span>Amount/serving</span>
                    <span>% DV*</span>
                  </div>
                  <ul className={ProductsStyles.nutritionList}>
                    {group.map((fact) => (
                      <li
                        key={fact.label}
                        className={`${ProductsStyles.nutritionRow} ${
                          fact.indent === 0 ? ProductsStyles.nutritionRowMain : ''
                        }`}
                      >
                        <span
                          className={ProductsStyles.nutritionName}
                          style={{ paddingLeft: `${fact.indent * 14}px` }}
                        >
                          {fact.label}
                          {fact.value && (
                            <span className={ProductsStyles.nutritionAmount}>
                              {' '}
                              {fact.value}
                            </span>
                          )}
                        </span>
                        {fact.dv && (
                          <span className={ProductsStyles.nutritionDv}>
                            {fact.dv}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={ProductsStyles.vitamins}>
              {baklavaVitamins.map((vit, i) => (
                <span key={vit.label}>
                  {i > 0 && (
                    <span className={ProductsStyles.vitaminSep}>·</span>
                  )}
                  {vit.label} {vit.value} {vit.dv}
                </span>
              ))}
            </p>
            <p className={ProductsStyles.dvFootnote}>{baklavaDailyValueNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nutrition;
