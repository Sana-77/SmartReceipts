const BUDGET_KEY = "smartreceipts-budget";

// Get Budget
export function getBudget() {
  const savedBudget = localStorage.getItem(BUDGET_KEY);

  if (!savedBudget) {
    return 0;
  }

  return Number(savedBudget);
}

// Save Budget
export function saveBudget(amount) {
  localStorage.setItem(BUDGET_KEY, amount);
}
