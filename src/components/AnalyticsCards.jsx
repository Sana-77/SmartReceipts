import { FaDollarSign, FaReceipt, FaChartLine, FaTrophy } from "react-icons/fa";

function AnalyticsCards({ expenses }) {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.price, 0);

  const averageExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;

  const largestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          expense.price > max.price ? expense : max,
        )
      : null;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.aiCategory] = (acc[expense.aiCategory] || 0) + expense.price;

    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const cards = [
    {
      title: "Total Spending",
      value: `$${totalSpent.toFixed(2)}`,
      icon: <FaDollarSign />,
    },
    {
      title: "Average Expense",
      value: `$${averageExpense.toFixed(2)}`,
      icon: <FaChartLine />,
    },
    {
      title: "Largest Expense",
      value: largestExpense
        ? `${largestExpense.itemName} ($${largestExpense.price.toFixed(2)})`
        : "N/A",
      icon: <FaReceipt />,
    },
    {
      title: "Top Category",
      value: highestCategory
        ? `${highestCategory[0]} ($${highestCategory[1].toFixed(2)})`
        : "N/A",
      icon: <FaTrophy />,
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Business Analytics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 text-3xl text-emerald-600">{card.icon}</div>

            <p className="text-gray-500 dark:text-gray-400">{card.title}</p>

            <h3 className="mt-2 break-words text-xl font-bold text-gray-800 dark:text-white">
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnalyticsCards;
