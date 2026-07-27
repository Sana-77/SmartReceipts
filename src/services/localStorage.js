const STORAGE_KEY = "smartreceipts-expenses";

export const getExpenses = () => {
  const savedExpenses = localStorage.getItem(STORAGE_KEY);

  return savedExpenses ? JSON.parse(savedExpenses) : [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};
