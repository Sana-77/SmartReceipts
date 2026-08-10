import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
  "#f97316",
];

function ExpenseCharts({ expenses }) {
  const categoryData = Object.values(
    expenses.reduce((acc, expense) => {
      if (!acc[expense.aiCategory]) {
        acc[expense.aiCategory] = {
          name: expense.aiCategory,
          value: 0,
        };
      }

      acc[expense.aiCategory].value += expense.price;

      return acc;
    }, {}),
  );

  if (categoryData.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      {/* Section Title */}
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Expense Analytics
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* =========================
            Pie Chart
        ========================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Spending Distribution
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  color: "#1f2937",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* =========================
            Bar Chart
        ========================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Category Totals
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#6b7280"
                opacity={0.25}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#6b7280",
                }}
                tickLine={{
                  stroke: "#6b7280",
                }}
              />

              <YAxis
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#6b7280",
                }}
                tickLine={{
                  stroke: "#6b7280",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  color: "#1f2937",
                }}
                labelStyle={{
                  color: "#111827",
                  fontWeight: "600",
                }}
                itemStyle={{
                  color: "#059669",
                }}
              />

              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default ExpenseCharts;
