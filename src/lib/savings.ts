/**
 * Illustrative savings model used on the home page.
 * bags = hens × 0.115 kg × 365 ÷ 25 kg;  saving = bags × bag price × 15%.
 */
export const FEED_KG_PER_HEN_PER_DAY = 0.115;
export const BAG_KG = 25;
export const DISCOUNT = 0.15;

export function bagsPerYear(hens: number) {
  return (hens * FEED_KG_PER_HEN_PER_DAY * 365) / BAG_KG;
}

export function savingPerYear(hens: number, bagPrice: number) {
  return bagsPerYear(hens) * bagPrice * DISCOUNT;
}

export const FLOCK_EXAMPLES = [200, 500, 1000, 2000] as const;
export const BAG_PRICES = [16000, 18000, 20000] as const;
