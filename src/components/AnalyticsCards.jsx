import { FaDollarSign, FaReceipt, FaChartLine, FaTrophy } from "react-icons/fa";

function AnalyticsCards({ expenses }) {
  const totalSpent = expenses.reduce(
    (sum, expense) => sum + (Number(expense.price) || 0),
    0,
  );

  const averageExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;

  const largestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          (Number(expense.price) || 0) > (Number(max.price) || 0)
            ? expense
            : max,
        )
      : null;

  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.aiCategory || "Miscellaneous";
    const price = Number(expense.price) || 0;

    acc[category] = (acc[category] || 0) + price;

    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const cards = [
    {
      title: "Total Spending",
      value: `$${totalSpent.toFixed(2)}`,
      description: "Across all recorded receipts",
      icon: <FaDollarSign />,
      iconClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      title: "Average Expense",
      value: `$${averageExpense.toFixed(2)}`,
      description: "Average per transaction",
      icon: <FaChartLine />,
      iconClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      title: "Largest Expense",
      value: largestExpense
        ? `$${(Number(largestExpense.price) || 0).toFixed(2)}`
        : "N/A",
      description: largestExpense
        ? largestExpense.itemName
        : "No expenses recorded",
      icon: <FaReceipt />,
      iconClass:
        "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    },
    {
      title: "Top Category",
      value: highestCategory ? `$${highestCategory[1].toFixed(2)}` : "N/A",
      description: highestCategory
        ? highestCategory[0]
        : "No category available",
      icon: <FaTrophy />,
      iconClass:
        "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          Key metrics
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          Business Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          A quick view of your most important spending numbers.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              group
              relative overflow-hidden
              rounded-2xl
              border border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md
              dark:border-gray-800
              dark:bg-[#101917]
            "
          >
            {/* Decorative glow */}
            <div
              className="
                pointer-events-none
                absolute -right-10 -top-10
                h-24 w-24
                rounded-full
                bg-emerald-500/5
                blur-2xl
                transition-opacity
                group-hover:opacity-100
              "
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`
                    flex h-11 w-11
                    shrink-0 items-center justify-center
                    rounded-xl
                    text-lg
                    ${card.iconClass}
                  `}
                >
                  {card.icon}
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
                  Smart metric
                </span>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                {card.title}
              </p>

              <h3 className="mt-2 break-words text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.value}
              </h3>

              <p className="mt-2 truncate text-sm text-gray-500 dark:text-gray-500">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnalyticsCards;
