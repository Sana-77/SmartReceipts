import { FaWallet } from "react-icons/fa";

function DashboardCard({ total, expenseCount }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Total Spending
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            ${total.toFixed(2)}
          </h2>

          <p className="mt-3 text-gray-500">
            {expenseCount} Expense
            {expenseCount !== 1 ? "s" : ""} Recorded
          </p>
        </div>

        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <FaWallet className="text-emerald-600 text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
