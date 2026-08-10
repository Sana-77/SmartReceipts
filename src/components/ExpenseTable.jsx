import { useState } from "react";
import { FaEdit, FaTrash, FaReceipt, FaTimes } from "react-icons/fa";

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          No expenses tracked yet
        </h3>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Add your first expense to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="px-5 py-4 text-left">Item</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-right">Price</th>
              <th className="px-5 py-4 text-center">Date</th>
              <th className="px-5 py-4 text-center">Receipt</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {expense.itemName}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {expense.aiCategory || "Uncategorized"}
                  </span>
                </td>

                <td className="px-5 py-4 text-right font-bold text-emerald-600">
                  ${Number(expense.price || 0).toFixed(2)}
                </td>

                <td className="px-5 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {expense.createdAt
                    ? new Date(expense.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-5 py-4 text-center">
                  {expense.receiptImage ? (
                    <button
                      onClick={() =>
                        setSelectedReceipt({
                          image: expense.receiptImage,
                          itemName: expense.itemName,
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                      title="View receipt"
                    >
                      <FaReceipt />
                      View
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      No receipt
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEditExpense(expense)}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-500 transition hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                      aria-label="Edit expense"
                      title="Edit expense"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                      aria-label="Delete expense"
                      title="Delete expense"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Receipt
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedReceipt.itemName}
                </p>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-100 hover:text-red-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/40"
                aria-label="Close receipt"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex max-h-[75vh] justify-center overflow-auto rounded-xl bg-gray-100 p-3 dark:bg-gray-900">
              <img
                src={selectedReceipt.image}
                alt={`Receipt for ${selectedReceipt.itemName}`}
                className="max-h-[70vh] max-w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpenseTable;
