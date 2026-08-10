function CategorySummary({ expenses }) {
  const summary = expenses.reduce((acc, expense) => {
    const category = expense.aiCategory;

    acc[category] = (acc[category] || 0) + expense.price;

    return acc;
  }, {});

  const sortedSummary = Object.entries(summary).sort((a, b) => b[1] - a[1]);

  if (sortedSummary.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-800 dark:text-white">
        Expense by Category
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedSummary.map(([category, total]) => (
          <div
            key={category}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {category}
            </h3>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              ${total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySummary;
