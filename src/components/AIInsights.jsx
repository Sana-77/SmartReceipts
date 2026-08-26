import {
  FaChartPie,
  FaCheckCircle,
  FaLightbulb,
  FaRobot,
  FaStar,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function AIInsights({
  insights,
  onAnalyze,
  isLoading,
  hasExpenses,
  expenses = [],
  budget = 0,
  total = 0,
}) {
  const numericTotal = Number(total) || 0;
  const numericBudget = Number(budget) || 0;

  const remaining = numericBudget - numericTotal;

  const budgetPercentage =
    numericBudget > 0 ? Math.min((numericTotal / numericBudget) * 100, 100) : 0;

  const isOverBudget = numericBudget > 0 && numericTotal > numericBudget;

  const isNearBudget =
    numericBudget > 0 &&
    numericTotal >= numericBudget * 0.8 &&
    numericTotal <= numericBudget;

  // =====================================================
  // FIND HIGHEST EXPENSE
  // =====================================================

  const highestExpense =
    expenses.length > 0
      ? [...expenses].sort(
          (a, b) => Number(b.price || 0) - Number(a.price || 0),
        )[0]
      : null;

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="w-full">
      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!hasExpenses && (
        <div
          className="
            flex flex-col
            items-center
            justify-center
            rounded-2xl
            border border-dashed
            border-gray-300
            bg-gray-50
            px-6 py-12
            text-center
            dark:border-gray-700
            dark:bg-gray-900/50
          "
        >
          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-emerald-50
              text-emerald-600
              dark:bg-emerald-950/50
              dark:text-emerald-400
            "
          >
            <FaLightbulb className="text-2xl" />
          </div>

          <h3
            className="
              mt-5
              text-base
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            No spending data yet
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-gray-500
              dark:text-gray-400
            "
          >
            Add some expenses first. SmartReceipts AI will then analyze your
            spending and provide personalized financial recommendations.
          </p>
        </div>
      )}

      {/* =====================================================
          READY STATE
      ===================================================== */}

      {hasExpenses && !insights && !isLoading && (
        <div
          className="
            rounded-2xl
            border border-emerald-100
            bg-gradient-to-br
            from-emerald-50
            to-white
            p-5
            dark:border-emerald-900/40
            dark:from-emerald-950/30
            dark:to-gray-900
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="
                flex h-12 w-12
                shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-emerald-600
                shadow-sm
                dark:bg-gray-800
                dark:text-emerald-400
              "
            >
              <FaRobot className="text-lg" />
            </div>

            <div className="flex-1">
              <h3
                className="
                  text-sm
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Your spending report is ready
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Let SmartReceipts AI review your expenses and identify important
                spending patterns and opportunities to save.
              </p>
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={isLoading}
              className="
                shrink-0
                rounded-xl
                bg-emerald-500
                px-5
                py-2.5
                text-sm
                font-bold
                text-[#031815]
                transition
                hover:bg-emerald-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Analyze Spending
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {isLoading && (
        <div
          className="
            rounded-2xl
            border border-emerald-100
            bg-emerald-50/70
            p-5
            dark:border-emerald-900/40
            dark:bg-emerald-950/20
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-11 w-11
                shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-emerald-600
                shadow-sm
                dark:bg-gray-800
                dark:text-emerald-400
              "
            >
              <FaRobot className="animate-pulse text-xl" />
            </div>

            <div className="flex-1">
              <p
                className="
                  text-sm
                  font-semibold
                  text-emerald-700
                  dark:text-emerald-300
                "
              >
                AI is analyzing your spending...
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Reviewing your expenses, budget, and spending patterns.
              </p>

              <div
                className="
                  mt-3
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-emerald-100
                  dark:bg-emerald-950
                "
              >
                <div
                  className="
                    h-full
                    w-1/2
                    animate-pulse
                    rounded-full
                    bg-emerald-500
                  "
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AI REPORT
      ===================================================== */}

      {hasExpenses && insights && !isLoading && (
        <div className="space-y-5">
          {/* =================================================
              REPORT STATUS
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-emerald-100
              bg-emerald-50/60
              px-4
              py-3
              dark:border-emerald-900/40
              dark:bg-emerald-950/20
            "
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />

              <span
                className="
                  text-sm
                  font-semibold
                  text-emerald-700
                  dark:text-emerald-300
                "
              >
                Financial analysis complete
              </span>
            </div>

            <span
              className="
                hidden
                text-xs
                text-gray-400
                sm:block
                dark:text-gray-500
              "
            >
              SmartReceipts AI
            </span>
          </div>

          {/* =================================================
              FINANCIAL OVERVIEW
          ================================================= */}

          <div>
            <div className="mb-3">
              <h3
                className="
                  text-sm
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Your Financial Overview
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                A quick look at your current spending position.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* TOTAL SPENT */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Total Spent
                  </p>

                  <div
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-500
                      dark:bg-blue-950/40
                      dark:text-blue-400
                    "
                  >
                    <FaChartPie className="text-xs" />
                  </div>
                </div>

                <p
                  className="
                    mt-3
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {formatCurrency(numericTotal)}
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-gray-400
                  "
                >
                  Across {expenses.length} expense
                  {expenses.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* BUDGET */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Monthly Budget
                  </p>

                  <div
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-lg
                      bg-emerald-50
                      text-emerald-500
                      dark:bg-emerald-950/40
                      dark:text-emerald-400
                    "
                  >
                    <FaWallet className="text-xs" />
                  </div>
                </div>

                <p
                  className="
                    mt-3
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {numericBudget > 0
                    ? formatCurrency(numericBudget)
                    : "Not set"}
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-gray-400
                  "
                >
                  Monthly spending limit
                </p>
              </div>

              {/* REMAINING */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Remaining
                  </p>

                  <div
                    className={`
                      flex h-8 w-8
                      items-center justify-center
                      rounded-lg
                      ${
                        remaining >= 0
                          ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400"
                      }
                    `}
                  >
                    {remaining >= 0 ? (
                      <FaArrowDown className="text-xs" />
                    ) : (
                      <FaArrowUp className="text-xs" />
                    )}
                  </div>
                </div>

                <p
                  className={`
                    mt-3
                    text-xl
                    font-bold
                    ${
                      remaining >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  `}
                >
                  {numericBudget > 0
                    ? formatCurrency(Math.abs(remaining))
                    : "—"}
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-gray-400
                  "
                >
                  {numericBudget > 0
                    ? remaining >= 0
                      ? "Available to spend"
                      : "Over your budget"
                    : "Set a budget to track this"}
                </p>
              </div>

              {/* UTILIZATION */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Budget Used
                  </p>

                  <span
                    className={`
                      text-sm
                      font-bold
                      ${
                        isOverBudget
                          ? "text-red-500"
                          : isNearBudget
                            ? "text-yellow-500"
                            : "text-emerald-500"
                      }
                    `}
                  >
                    {numericBudget > 0
                      ? `${budgetPercentage.toFixed(0)}%`
                      : "—"}
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    h-2
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
                      ${
                        isOverBudget
                          ? "bg-red-500"
                          : isNearBudget
                            ? "bg-yellow-500"
                            : "bg-emerald-500"
                      }
                    `}
                    style={{
                      width: numericBudget > 0 ? `${budgetPercentage}%` : "0%",
                    }}
                  />
                </div>

                <p
                  className="
                    mt-2
                    text-[11px]
                    text-gray-400
                  "
                >
                  {numericBudget > 0
                    ? isOverBudget
                      ? "Budget exceeded"
                      : isNearBudget
                        ? "Approaching your limit"
                        : "Within your budget"
                    : "No monthly budget set"}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              AI SUMMARY
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-100
              bg-gradient-to-br
              from-emerald-50
              to-white
              p-5
              dark:border-emerald-900/40
              dark:from-emerald-950/30
              dark:to-gray-900
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-600
                  dark:bg-emerald-900/50
                  dark:text-emerald-400
                "
              >
                <FaLightbulb />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  What AI found
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {insights.summary}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              KEY FINDINGS
          ================================================= */}

          <div className="grid gap-4 md:grid-cols-2">
            {/* TOP CATEGORY */}

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Biggest Spending Area
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-950/50
                    dark:text-emerald-400
                  "
                >
                  <FaChartPie />
                </div>

                <div>
                  <p
                    className="
                      text-lg
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {insights.topCategory}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-400
                    "
                  >
                    Category with the highest spending
                  </p>
                </div>
              </div>
            </div>

            {/* LARGEST EXPENSE */}

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Largest Individual Expense
              </p>

              {highestExpense ? (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-base
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {highestExpense.itemName}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-400
                      "
                    >
                      Single highest recorded expense
                    </p>
                  </div>

                  <p
                    className="
                      shrink-0
                      text-lg
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {formatCurrency(highestExpense.price)}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">
                  No expense information available.
                </p>
              )}
            </div>
          </div>

          {/* =================================================
              AI OBSERVATION
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-950/40
                  dark:text-blue-400
                "
              >
                <FaRobot />
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
                  AI Observation
                </h3>

                <p
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  What your spending pattern tells us
                </p>
              </div>
            </div>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-gray-600
                dark:text-gray-300
              "
            >
              {insights.observation}
            </p>
          </div>

          {/* =================================================
              RECOMMENDATIONS
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-950/40
                    dark:text-emerald-400
                  "
                >
                  <FaCheckCircle />
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
                    Recommended Actions
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Practical steps you can take
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {insights.recommendations?.map((recommendation, index) => (
                <div
                  key={index}
                  className="
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      p-4
                      dark:border-gray-800
                      dark:bg-gray-800/70
                    "
                >
                  <span
                    className="
                        flex h-7 w-7
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-emerald-100
                        text-xs
                        font-bold
                        text-emerald-700
                        dark:bg-emerald-900/50
                        dark:text-emerald-400
                      "
                  >
                    {index + 1}
                  </span>

                  <p
                    className="
                        pt-0.5
                        text-sm
                        leading-6
                        text-gray-600
                        dark:text-gray-300
                      "
                  >
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              SMART SAVING TIP
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-yellow-200
              bg-yellow-50
              p-5
              dark:border-yellow-900/40
              dark:bg-yellow-950/20
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-yellow-100
                  text-yellow-600
                  dark:bg-yellow-900/40
                  dark:text-yellow-400
                "
              >
                <FaLightbulb />
              </div>

              <div>
                <h3
                  className="
                    text-sm
                    font-bold
                    text-yellow-800
                    dark:text-yellow-300
                  "
                >
                  Your Smart Saving Tip
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-yellow-700
                    dark:text-yellow-400
                  "
                >
                  {insights.savingTip}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
              border-t
              border-gray-100
              pt-4
              text-[11px]
              text-gray-400
              dark:border-gray-800
              dark:text-gray-500
            "
          >
            <FaStar className="text-emerald-500" />

            <span>
              This report was generated by SmartReceipts AI from your recorded
              expenses.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
