import { useI18n } from "@/i18n";

/**
 * Categorical order validated for CVD and normal-vision separation, including the
 * wrap-around pair (the last ring slice touches the first). Assigned largest line first.
 */
export const BUDGET_PALETTE = ["#0E6EC5", "#A66A12", "#5FA6E6", "#7C8F2E", "#5B6FB8", "#E8A33D", "#1F8A70"];

export const REQUESTED = 18250;
export const IN_KIND = 7000;

export function useBudgetItems() {
  const { d } = useI18n();
  return [...d.home.numbers.budget.items]
    .sort((a, b) => b.value - a.value)
    .map((item, i) => ({ ...item, color: BUDGET_PALETTE[i], share: item.value / REQUESTED }));
}
