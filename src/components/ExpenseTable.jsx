import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaReceipt,
  FaTimes,
  FaCalendarAlt,
  FaEye,
  FaFileInvoiceDollar,
} from "react-icons/fa";

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  if (expenses.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[320px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-300
          bg-gray-50
          px-6
          py-16
          text-center
          dark:border-gray-700
          dark:bg-gray-900/50
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
            text-emerald-600
            dark:bg-emerald-950/50
            dark:text-emerald-400
          "
        >
          <FaFileInvoiceDollar className="text-2xl" />
        </div>

        <h3
          className="
            mt-5
            text-lg
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          No expenses yet
        </h3>

        <p
          className="
            mt-2
            max-w-sm
            text-sm
            leading-6
            text-gray-500
            dark:text-gray-400
          "
        >
          Your recorded expenses will appear here. Add your first expense to
          start tracking your spending.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          TABLE CONTAINER
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-gray-800
          dark:bg-[#101917]
        "
      >
        {/* Table Header */}

        <div
          className="
            flex
            flex-col
            gap-2
            border-b
            border-gray-200
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-gray-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-950/50
                dark:text-emerald-400
              "
            >
              <FaReceipt />
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Expense History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Your recorded transactions
              </p>
            </div>
          </div>

          <span
            className="
              w-fit
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-3
              py-1
              text-xs
              font-semibold
              text-gray-500
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-gray-400
            "
          >
            {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
          </span>
        </div>

        {/* =====================================================
            RESPONSIVE TABLE
        ====================================================== */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            {/* Head */}

            <thead>
              <tr
                className="
                  border-b
                  border-gray-200
                  bg-gray-50/80
                  text-left
                  dark:border-gray-800
                  dark:bg-gray-900/60
                "
              >
                <th
                  className="
                    px-5
                    py-3.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Expense
                </th>

                <th
                  className="
                    px-5
                    py-3.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Category
                </th>

                <th
                  className="
                    px-5
                    py-3.5
                    text-right
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Amount
                </th>

                <th
                  className="
                    px-5
                    py-3.5
                    text-center
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Date
                </th>

                <th
                  className="
                    px-5
                    py-3.5
                    text-center
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Receipt
                </th>

                <th
                  className="
                    px-5
                    py-3.5
                    text-center
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}

            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="
                    border-b
                    border-gray-100
                    transition-colors
                    duration-200
                    last:border-b-0
                    hover:bg-gray-50/80
                    dark:border-gray-800
                    dark:hover:bg-gray-900/60
                  "
                >
                  {/* Expense */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-gray-100
                          text-gray-500
                          dark:bg-gray-800
                          dark:text-gray-400
                        "
                      >
                        <FaReceipt className="text-sm" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {expense.itemName}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-gray-400
                            dark:text-gray-500
                          "
                        >
                          Transaction #{String(expense.id).slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}

                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-emerald-200
                        bg-emerald-50
                        px-3
                        py-1.5
                        text-[11px]
                        font-semibold
                        text-emerald-700
                        dark:border-emerald-900/60
                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                      "
                    >
                      {expense.aiCategory || "Uncategorized"}
                    </span>
                  </td>

                  {/* Amount */}

                  <td className="px-5 py-4 text-right">
                    <p
                      className="
                        text-sm
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      ${Number(expense.price || 0).toFixed(2)}
                    </p>
                  </td>

                  {/* Date */}

                  <td className="px-5 py-4">
                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />

                      <span>
                        {expense.createdAt
                          ? new Date(expense.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "-"}
                      </span>
                    </div>
                  </td>

                  {/* Receipt */}

                  <td className="px-5 py-4 text-center">
                    {expense.receiptImage ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedReceipt({
                            image: expense.receiptImage,
                            itemName: expense.itemName,
                          })
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-emerald-200
                          bg-emerald-50
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-emerald-700
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-emerald-300
                          hover:bg-emerald-100
                          dark:border-emerald-900/60
                          dark:bg-emerald-950/30
                          dark:text-emerald-400
                          dark:hover:bg-emerald-950/50
                        "
                        title="View receipt"
                      >
                        <FaEye />
                        View
                      </button>
                    ) : (
                      <span
                        className="
                          text-xs
                          text-gray-400
                          dark:text-gray-600
                        "
                      >
                        No receipt
                      </span>
                    )}
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() => onEditExpense(expense)}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-blue-200
                          bg-blue-50
                          text-blue-600
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:bg-blue-100
                          hover:shadow-sm
                          dark:border-blue-900/50
                          dark:bg-blue-950/30
                          dark:text-blue-400
                          dark:hover:bg-blue-950/50
                        "
                        aria-label="Edit expense"
                        title="Edit expense"
                      >
                        <FaEdit className="text-sm" />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          text-red-500
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:bg-red-100
                          hover:shadow-sm
                          dark:border-red-900/50
                          dark:bg-red-950/30
                          dark:text-red-400
                          dark:hover:bg-red-950/50
                        "
                        aria-label="Delete expense"
                        title="Delete expense"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom summary */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-gray-200
            bg-gray-50/60
            px-5
            py-3
            dark:border-gray-800
            dark:bg-gray-900/40
          "
        >
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Showing all recorded expenses
          </span>

          <span
            className="
              text-xs
              font-semibold
              text-gray-600
              dark:text-gray-300
            "
          >
            {expenses.length} total
          </span>
        </div>
      </div>

      {/* =====================================================
          RECEIPT MODAL
      ====================================================== */}

      {selectedReceipt && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-gray-950/80
            p-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="
              relative
              flex
              max-h-[92vh]
              w-full
              max-w-4xl
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-2xl
              dark:border-gray-700
              dark:bg-[#101917]
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-5
                py-4
                dark:border-gray-800
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-950/50
                    dark:text-emerald-400
                  "
                >
                  <FaReceipt />
                </div>

                <div>
                  <h3
                    className="
                      text-sm
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Receipt Preview
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {selectedReceipt.itemName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  text-gray-500
                  transition-all
                  duration-200
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-500
                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-gray-400
                  dark:hover:border-red-900/50
                  dark:hover:bg-red-950/30
                  dark:hover:text-red-400
                "
                aria-label="Close receipt"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Image */}

            <div
              className="
                flex
                max-h-[calc(92vh-80px)]
                min-h-[300px]
                items-center
                justify-center
                overflow-auto
                bg-gray-100
                p-4
                dark:bg-gray-950
              "
            >
              <img
                src={selectedReceipt.image}
                alt={`Receipt for ${selectedReceipt.itemName}`}
                className="
                  max-h-[75vh]
                  max-w-full
                  rounded-xl
                  object-contain
                  shadow-lg
                "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpenseTable;
