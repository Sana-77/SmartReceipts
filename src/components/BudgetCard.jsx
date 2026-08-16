import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaWallet } from "react-icons/fa";

function BudgetCard({ totalSpent, budget, onSaveBudget }) {
  const [value, setValue] = useState(budget ? String(budget) : "");

  useEffect(() => {
    setValue(budget ? String(budget) : "");
  }, [budget]);

  const numericBudget = Number(value) || 0;
  const spent = Number(totalSpent) || 0;

  const remaining = numericBudget - spent;

  const percentage =
    numericBudget > 0 ? Math.min((spent / numericBudget) * 100, 100) : 0;

  const availablePercentage =
    numericBudget > 0 ? Math.max((remaining / numericBudget) * 100, 0) : 0;

  const isExceeded = numericBudget > 0 && spent >= numericBudget;
  const isWarning = numericBudget > 0 && percentage >= 80 && percentage < 100;
  const isHealthy = numericBudget > 0 && percentage < 80 && remaining >= 0;

  let progressColor = "bg-emerald-500";
  let progressGlow = "shadow-[0_0_18px_rgba(16,185,129,0.45)]";

  if (isWarning) {
    progressColor = "bg-yellow-500";
    progressGlow = "shadow-[0_0_18px_rgba(234,179,8,0.35)]";
  }

  if (isExceeded) {
    progressColor = "bg-red-500";
    progressGlow = "shadow-[0_0_18px_rgba(239,68,68,0.35)]";
  }

  const handleSave = () => {
    if (!value || numericBudget <= 0) return;

    onSaveBudget(numericBudget);
  };

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-gray-800
        bg-[#0d1715]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        transition-all duration-300
        hover:border-gray-700
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
        sm:p-7
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-64 w-64
          rounded-full
          bg-emerald-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-32 -left-20
          h-52 w-52
          rounded-full
          bg-emerald-400/5
          blur-3xl
        "
      />

      <div className="relative">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-2xl
                border border-emerald-500/20
                bg-emerald-500/10
                text-emerald-400
              "
            >
              <FaWallet className="text-base" />
            </div>

            <div>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-gray-500
                "
              >
                Financial planning
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Monthly Budget
              </h2>
            </div>
          </div>

          {/* Status badge */}
          {numericBudget > 0 && (
            <span
              className={`
                rounded-full
                border
                px-3 py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                ${
                  isExceeded
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : isWarning
                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                }
              `}
            >
              {isExceeded ? "Exceeded" : isWarning ? "Near limit" : "On track"}
            </span>
          )}
        </div>

        {/* =====================================================
            BUDGET VALUE
        ====================================================== */}

        <div className="mt-8">
          <p className="text-xs font-medium text-gray-500">
            Monthly spending limit
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              ${numericBudget.toFixed(2)}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Set a monthly limit to keep your business spending under control.
          </p>
        </div>

        {/* =====================================================
            INPUT
        ====================================================== */}

        <div className="mt-7">
          <label
            htmlFor="monthly-budget"
            className="
              mb-2 block
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-gray-500
            "
          >
            Update budget
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-sm font-semibold
                  text-gray-500
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
                  border border-gray-800
                  bg-[#111d1a]
                  py-3.5
                  pl-8 pr-4
                  text-sm font-medium
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  transition-all duration-200
                  focus:border-emerald-500/50
                  focus:bg-[#13211e]
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={!value || numericBudget <= 0}
              className="
                rounded-xl
                border border-emerald-400/20
                bg-emerald-500
                px-6 py-3.5
                text-sm font-bold
                text-[#06110e]
                shadow-[0_8px_25px_rgba(16,185,129,0.15)]
                transition-all duration-200
                hover:bg-emerald-400
                hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Save Budget
            </button>
          </div>
        </div>

        {/* =====================================================
            FINANCIAL SUMMARY
        ====================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border border-gray-800
            bg-[#101b19]
            sm:grid-cols-3
          "
        >
          {/* Budget */}

          <div className="p-4 sm:border-r sm:border-gray-800">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-gray-500
              "
            >
              Budget
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              ${numericBudget.toFixed(2)}
            </p>
          </div>

          {/* Spent */}

          <div
            className="
              border-t border-gray-800
              p-4
              sm:border-t-0
              sm:border-r
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-gray-500
              "
            >
              Spent
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              ${spent.toFixed(2)}
            </p>
          </div>

          {/* Remaining */}

          <div className="border-t border-gray-800 p-4 sm:border-t-0">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-gray-500
              "
            >
              Available
            </p>

            <p
              className={`mt-2 text-lg font-bold ${
                remaining >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              ${Math.max(remaining, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* =====================================================
            PROGRESS
        ====================================================== */}

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Budget utilization
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                {spent.toFixed(2)} spent from your monthly limit
              </p>
            </div>

            <span
              className={`text-sm font-bold ${
                isExceeded
                  ? "text-red-400"
                  : isWarning
                    ? "text-yellow-400"
                    : "text-emerald-400"
              }`}
            >
              {percentage.toFixed(0)}%
            </span>
          </div>

          {/* Progress background */}

          <div
            className="
              relative
              h-3
              overflow-hidden
              rounded-full
              bg-[#182522]
            "
          >
            <div
              className={`
                h-full
                rounded-full
                ${progressColor}
                ${progressGlow}
                transition-all duration-700 ease-out
              `}
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[11px] text-gray-600">
            <span>$0</span>

            <span>
              {numericBudget > 0
                ? `$${numericBudget.toFixed(2)} limit`
                : "Set a budget"}
            </span>
          </div>
        </div>

        {/* =====================================================
            STATUS MESSAGE
        ====================================================== */}

        {isHealthy && (
          <div
            className="
              mt-6
              flex items-start gap-3
              rounded-2xl
              border border-emerald-500/15
              bg-emerald-500/[0.06]
              p-4
            "
          >
            <div
              className="
                mt-0.5
                flex h-8 w-8
                shrink-0
                items-center justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-400
              "
            >
              <FaCheckCircle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-300">
                You're on track
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                You still have ${remaining.toFixed(2)} available for this month.
              </p>
            </div>
          </div>
        )}

        {isWarning && (
          <div
            className="
              mt-6
              flex items-start gap-3
              rounded-2xl
              border border-yellow-500/15
              bg-yellow-500/[0.06]
              p-4
            "
          >
            <div
              className="
                mt-0.5
                flex h-8 w-8
                shrink-0
                items-center justify-center
                rounded-xl
                bg-yellow-500/10
                text-yellow-400
              "
            >
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold text-yellow-300">
                Approaching your limit
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                You have ${Math.max(remaining, 0).toFixed(2)} remaining in your
                monthly budget.
              </p>
            </div>
          </div>
        )}

        {isExceeded && (
          <div
            className="
              mt-6
              flex items-start gap-3
              rounded-2xl
              border border-red-500/15
              bg-red-500/[0.06]
              p-4
            "
          >
            <div
              className="
                mt-0.5
                flex h-8 w-8
                shrink-0
                items-center justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
              "
            >
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-300">
                Budget exceeded
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                You've exceeded your monthly budget by $
                {Math.abs(remaining).toFixed(2)}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetCard;
