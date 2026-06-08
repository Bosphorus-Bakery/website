// NOTE: Values transcribed from the supplied Nutrition Facts label. Verify
// against the latest lab-verified data before publishing.

export const baklavaIngredients =
  'Filo dough (wheat, water), walnuts, butter, canola oil, sugar, pistachios, lemon juice, spices.';

export const baklavaAllergens = 'Wheat, milk, nuts (walnuts, pistachios).';

export const baklavaServingSize = '1 Piece (20g)';

export const baklavaCalories = '90';

// indent: 0 = main nutrient (bold), 1 = sub-item, 2 = nested sub-item
export const baklavaNutritionFacts = [
  { label: 'Total Fat', value: '6g', dv: '8%', indent: 0 },
  { label: 'Saturated Fat', value: '1g', dv: '5%', indent: 1 },
  { label: 'Trans Fat', value: '0g', dv: '', indent: 1 },
  { label: 'Cholesterol', value: '<5mg', dv: '1%', indent: 0 },
  { label: 'Sodium', value: '55mg', dv: '2%', indent: 0 },
  { label: 'Total Carbohydrate', value: '9g', dv: '3%', indent: 0 },
  { label: 'Dietary Fiber', value: '<1g', dv: '3%', indent: 1 },
  { label: 'Total Sugars', value: '4g', dv: '', indent: 1 },
  { label: 'Includes 3g Added Sugars', value: '', dv: '6%', indent: 2 },
  { label: 'Protein', value: '2g', dv: '4%', indent: 0 },
];

export const baklavaVitamins = [
  { label: 'Vitamin D', value: '0mcg', dv: '0%' },
  { label: 'Calcium', value: '0mg', dv: '0%' },
  { label: 'Iron', value: '0.4mg', dv: '2%' },
  { label: 'Potassium', value: '0mg', dv: '0%' },
  { label: 'Vitamin A', value: '10mcg', dv: '2%' },
];

export const baklavaDailyValueNote =
  '* Percent Daily Values are based on a 2,000 calorie diet.';
