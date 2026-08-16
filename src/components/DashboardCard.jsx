import {
  FaArrowDown,
  FaArrowUp,
  FaReceipt,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

function DashboardCard({ total, expenseCount, budget }) {
  const numericTotal = Number(total) || 0;
  const numericBudget = Number(budget) || 0;

  const remaining = numericBudget - numericTotal;

  const budgetPercentage =
    numericBudget > 0 ? Math.min((numericTotal / numericBudget) * 100, 100) : 0;

  const averageExpense = expenseCount > 0 ? numericTotal / expenseCount : 0;

  const budgetExceeded = numericBudget > 0 && numericTotal > numericBudget;

  const progressColor =
    budgetPercentage >= 100
      ? "bg-red-500"
      : budgetPercentage >= 80
        ? "bg-yellow-500"
        : "bg-emerald-500";

  const percentageTextColor =
    budgetPercentage >= 100
      ? "text-red-500"
      : budgetPercentage >= 80
        ? "text-yellow-500"
        : "text-emerald-500";

  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        dark:border-gray-800
        dark:bg-[#101917]
        sm:p-8
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-72 w-72
          rounded-full
          bg-emerald-500/10
          blur-3xl
          dark:bg-emerald-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-32 -left-24
          h-64 w-64
          rounded-full
          bg-emerald-500/5
          blur-3xl
        "
      />

      <div className="relative">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex items-start justify-between gap-6">
          <div>
            {/* Label */}

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Total Spending
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-emerald-700
                  dark:border-emerald-900/60
                  dark:bg-emerald-950/40
                  dark:text-emerald-400
                "
              >
                This Month
              </span>
            </div>

            {/* =================================================
                MAIN AMOUNT
            ================================================== */}

            <div className="mt-3 flex flex-wrap items-end gap-3">
              <h2
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  text-gray-950
                  dark:text-white
                  sm:text-5xl
                "
              >
                ${numericTotal.toFixed(2)}
              </h2>

              {expenseCount > 0 && (
                <div
                  className="
                    mb-1
                    flex
                    items-center
                    gap-1.5
                    text-sm
                    font-semibold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  <FaArrowUp className="text-xs" />
                  Active
                </div>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your recorded business spending this month.
            </p>
          </div>

          {/* =================================================
              WALLET ICON
          ================================================== */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              shadow-sm
              dark:border-emerald-900/60
              dark:bg-emerald-950/40
              sm:h-16
              sm:w-16
            "
          >
            <FaWallet
              className="
                text-2xl
                text-emerald-600
                dark:text-emerald-400
                sm:text-3xl
              "
            />
          </div>
        </div>

        {/* =====================================================
            QUICK STATS
        ====================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            sm:grid-cols-3
            dark:border-gray-800
            dark:bg-[#0c1513]
          "
        >
          {/* Receipts */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-gray-200
              p-4
              dark:border-gray-800
              sm:border-b-0
              sm:border-r
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <FaReceipt />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Receipts
              </p>

              <p className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                {expenseCount}
              </p>
            </div>
          </div>

          {/* Average Expense */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-gray-200
              p-4
              dark:border-gray-800
              sm:border-b-0
              sm:border-r
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-500
              "
            >
              <FaChartLine />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Avg. Receipt
              </p>

              <p className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                ${averageExpense.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Budget */}

          <div className="flex items-center gap-3 p-4">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-purple-500/10
                text-purple-500
              "
            >
              <FaWallet />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Budget
              </p>

              <p className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                {numericBudget > 0 ? `$${numericBudget.toFixed(2)}` : "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            BUDGET PROGRESS
        ====================================================== */}

        {numericBudget > 0 ? (
          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Budget usage
                </span>

                <span
                  className={`
                    text-xs
                    font-bold
                    ${percentageTextColor}
                  `}
                >
                  {budgetPercentage.toFixed(0)}%
                </span>
              </div>

              <span className="text-xs text-gray-500 dark:text-gray-500">
                {budgetExceeded
                  ? "Budget exceeded"
                  : `$${remaining.toFixed(2)} remaining`}
              </span>
            </div>

            {/* Progress background */}

            <div
              className="
                h-2.5
                overflow-hidden
                rounded-full
                bg-gray-100
                dark:bg-gray-800
              "
            >
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                  ${progressColor}
                `}
                style={{
                  width: `${budgetPercentage}%`,
                }}
              />
            </div>

            {/* Bottom information */}

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {budgetExceeded ? (
                  <FaArrowUp className="text-xs text-red-500" />
                ) : (
                  <FaArrowDown className="text-xs text-emerald-500" />
                )}

                <span
                  className={`
                    text-xs
                    font-medium
                    ${
                      budgetExceeded
                        ? "text-red-500"
                        : "text-emerald-600 dark:text-emerald-400"
                    }
                  `}
                >
                  {budgetExceeded
                    ? `$${Math.abs(remaining).toFixed(2)} over budget`
                    : "Within your monthly budget"}
                </span>
              </div>

              <span className="text-xs text-gray-400 dark:text-gray-500">
                ${numericTotal.toFixed(2)} / ${numericBudget.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          /* ===================================================
             NO BUDGET
          ================================================== */

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-dashed
              border-gray-300
              bg-gray-50
              p-4
              dark:border-gray-700
              dark:bg-gray-900/40
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-500
              "
            >
              <FaWallet />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                No monthly budget set
              </p>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
                Set a budget to track your spending progress.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-2
            border-t
            border-gray-100
            pt-5
            dark:border-gray-800
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Spending insights are calculated from your recorded receipts.
          </p>

          {expenseCount > 0 && (
            <span
              className="
                w-fit
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-medium
                text-emerald-700
                dark:bg-emerald-950/40
                dark:text-emerald-400
              "
            >
              {expenseCount === 1
                ? "1 transaction"
                : `${expenseCount} transactions`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
