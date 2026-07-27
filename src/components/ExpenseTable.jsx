import { FaTrash } from "react-icons/fa";

function ExpenseTable({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          No expenses tracked yet
        </h3>

        <p className="text-gray-500 mt-2">
          Add your first expense to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-gray-600">
            <th className="px-5 py-4 text-left">Item</th>
            <th className="px-5 py-4 text-left">Category</th>
            <th className="px-5 py-4 text-right">Price</th>
            <th className="px-5 py-4 text-center">Date</th>
            <th className="px-5 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              {/* Item */}
              <td className="px-5 py-4">
                <p className="font-semibold text-gray-800">
                  {expense.itemName}
                </p>
              </td>

              {/* Category */}
              <td className="px-5 py-4">
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {expense.aiCategory || "Uncategorized"}
                </span>
              </td>

              {/* Price */}
              <td className="px-5 py-4 text-right font-bold text-emerald-600">
                ${expense.price.toFixed(2)}
              </td>

              {/* Date */}
              <td className="px-5 py-4 text-center text-sm text-gray-500">
                {expense.createdAt
                  ? new Date(expense.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              {/* Delete */}
              <td className="px-5 py-4 text-center">
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                  aria-label="Delete expense"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
