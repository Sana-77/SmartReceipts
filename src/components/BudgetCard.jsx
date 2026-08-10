import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaWallet } from "react-icons/fa";

function BudgetCard({ totalSpent, budget, onSaveBudget }) {
  // Keep the input as a string while the user is typing.
  // This prevents the unwanted leading zero.
  const [value, setValue] = useState(budget ? String(budget) : "");

  useEffect(() => {
    setValue(budget ? String(budget) : "");
  }, [budget]);

  const numericBudget = Number(value) || 0;

  const remaining = numericBudget - totalSpent;

  const percentage =
    numericBudget > 0 ? Math.min((totalSpent / numericBudget) * 100, 100) : 0;

  let progressColor = "bg-emerald-500";

  if (percentage >= 80 && percentage < 100) {
    progressColor = "bg-yellow-500";
  }

  if (percentage >= 100) {
    progressColor = "bg-red-500";
  }

  const handleSave = () => {
    if (!value || numericBudget <= 0) {
      return;
    }

    onSaveBudget(numericBudget);
  };

  return (
    <div
      className="
        rounded-3xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all duration-300
        dark:border-gray-800
        dark:bg-[#101917]
        sm:p-7
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-emerald-50
              text-emerald-600
              dark:bg-emerald-950/50
              dark:text-emerald-400
            "
          >
            <FaWallet />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly Budget
            </h2>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Set your spending limit
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BUDGET INPUT
      ====================================================== */}
      <div>
        <label
          htmlFor="monthly-budget"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Monthly budget
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span
              className="
                pointer-events-none
                absolute left-4 top-1/2
                -translate-y-1/2
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              $
            </span>

            <input
              id="monthly-budget"
              type="number"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="7,000.00"
              className="
                w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                py-3
                pl-8 pr-4
                text-gray-900
                outline-none
                transition-all duration-200
                placeholder:text-gray-400
                focus:border-emerald-500
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10

                dark:border-gray-700
                dark:bg-gray-900
                dark:text-white
                dark:placeholder:text-gray-600
                dark:focus:border-emerald-500
                dark:focus:bg-gray-950
              "
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!value || numericBudget <= 0}
            className="
              rounded-xl
              bg-emerald-600
              px-6 py-3
              font-semibold
              text-white
              shadow-sm
              transition-all duration-200
              hover:bg-emerald-700
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-emerald-500
              dark:text-gray-950
              dark:hover:bg-emerald-400
            "
          >
            Save Budget
          </button>
        </div>
      </div>

      {/* =====================================================
          STATS
      ====================================================== */}
      <div
        className="
          mt-7
          grid
          grid-cols-1
          divide-y
          divide-gray-200
          rounded-2xl
          border border-gray-200
          bg-gray-50
          sm:grid-cols-3
          sm:divide-x
          sm:divide-y-0
          dark:divide-gray-800
          dark:border-gray-800
          dark:bg-gray-900/60
        "
      >
        {/* Budget */}
        <div className="p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Budget
          </p>

          <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
            ${numericBudget.toFixed(2)}
          </h3>
        </div>

        {/* Spent */}
        <div className="p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Spent
          </p>

          <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
            ${totalSpent.toFixed(2)}
          </h3>
        </div>

        {/* Remaining */}
        <div className="p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Remaining
          </p>

          <h3
            className={`mt-1 text-xl font-bold ${
              remaining >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            ${remaining.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Budget Used
          </span>

          <span
            className={`text-sm font-bold ${
              percentage >= 100
                ? "text-red-600 dark:text-red-400"
                : percentage >= 80
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-gray-100
            dark:bg-gray-800
          "
        >
          <div
            className={`h-full rounded-full ${progressColor} transition-all duration-700`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* =====================================================
          STATUS MESSAGE
      ====================================================== */}

      {numericBudget > 0 && percentage < 80 && remaining >= 0 && (
        <div
          className="
              mt-5 flex items-center gap-3
              rounded-xl
              border border-emerald-200
              bg-emerald-50
              p-3
              text-sm
              text-emerald-700
              dark:border-emerald-900/60
              dark:bg-emerald-950/30
              dark:text-emerald-300
            "
        >
          <FaCheckCircle className="shrink-0" />

          <span>You're within your monthly budget. Keep it up!</span>
        </div>
      )}

      {numericBudget > 0 && percentage >= 80 && percentage < 100 && (
        <div
          className="
              mt-5 flex items-center gap-3
              rounded-xl
              border border-yellow-200
              bg-yellow-50
              p-3
              text-sm
              text-yellow-700
              dark:border-yellow-900/60
              dark:bg-yellow-950/30
              dark:text-yellow-300
            "
        >
          <FaExclamationTriangle className="shrink-0" />

          <span>You're approaching your monthly budget.</span>
        </div>
      )}

      {numericBudget > 0 && percentage >= 100 && (
        <div
          className="
            mt-5 flex items-center gap-3
            rounded-xl
            border border-red-200
            bg-red-50
            p-3
            text-sm
            text-red-700
            dark:border-red-900/60
            dark:bg-red-950/30
            dark:text-red-300
          "
        >
          <FaExclamationTriangle className="shrink-0" />

          <span>Budget exceeded by ${Math.abs(remaining).toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

export default BudgetCard;
