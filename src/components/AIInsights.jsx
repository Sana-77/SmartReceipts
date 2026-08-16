import {
  FaBrain,
  FaChartPie,
  FaCheckCircle,
  FaLightbulb,
  FaRobot,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

function AIInsights({ insights, onAnalyze, isLoading, hasExpenses }) {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-gray-200
        bg-white
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        dark:border-gray-800
        dark:bg-[#101917]
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-72 w-72
          rounded-full
          bg-emerald-400/10
          blur-3xl
          dark:bg-emerald-500/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-28 -left-24
          h-64 w-64
          rounded-full
          bg-blue-400/5
          blur-3xl
        "
      />

      <div className="relative p-5 sm:p-7 lg:p-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex flex-col gap-5
            border-b border-gray-100
            pb-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-gray-800
          "
        >
          {/* AI Title */}

          <div className="flex items-center gap-4">
            <div
              className="
                relative
                flex h-14 w-14
                shrink-0
                items-center justify-center
                rounded-2xl
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-950/50
                dark:text-emerald-400
              "
            >
              <FaBrain className="text-2xl" />

              <span
                className="
                  absolute -right-1 -top-1
                  flex h-4 w-4
                  items-center justify-center
                  rounded-full
                  bg-emerald-500
                  text-white
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    dark:text-white
                  "
                >
                  AI Financial Insights
                </h2>

                <span
                  className="
                    inline-flex
                    items-center gap-1.5
                    rounded-full
                    border border-emerald-200
                    bg-emerald-50
                    px-2.5 py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-700
                    dark:border-emerald-900/60
                    dark:bg-emerald-950/40
                    dark:text-emerald-400
                  "
                >
                  <FaStar className="text-[9px]" />
                  AI Powered
                </span>
              </div>

              <p
                className="
                  mt-1.5
                  max-w-xl
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Understand your spending patterns and discover smarter ways to
                manage your money.
              </p>
            </div>
          </div>

          {/* Analyze Button */}

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isLoading || !hasExpenses}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-5 py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-emerald-700
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:translate-y-0
              disabled:bg-gray-200
              disabled:text-gray-400
              dark:bg-emerald-500
              dark:text-gray-950
              dark:hover:bg-emerald-400
              dark:disabled:bg-gray-800
              dark:disabled:text-gray-500
            "
          >
            {isLoading ? (
              <>
                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                    dark:border-gray-900/40
                    dark:border-t-gray-900
                  "
                />
                Analyzing...
              </>
            ) : (
              <>
                <FaRobot />
                Analyze Spending
              </>
            )}
          </button>
        </div>

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!hasExpenses && (
          <div
            className="
              mt-6
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
              Add some expenses first. Once you have spending data,
              SmartReceipts AI will analyze your financial activity.
            </p>
          </div>
        )}

        {/* =====================================================
            READY STATE
        ====================================================== */}

        {hasExpenses && !insights && !isLoading && (
          <div
            className="
              mt-6
              flex items-start gap-4
              rounded-2xl
              border border-emerald-100
              bg-gradient-to-r
              from-emerald-50
              to-white
              p-5
              dark:border-emerald-900/40
              dark:from-emerald-950/30
              dark:to-gray-900
            "
          >
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
              <FaLightbulb />
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Ready to analyze your spending
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
                Click{" "}
                <span
                  className="
                    font-semibold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  Analyze Spending
                </span>{" "}
                to receive personalized observations and saving recommendations.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            LOADING STATE
        ====================================================== */}

        {isLoading && (
          <div
            className="
              mt-6
              overflow-hidden
              rounded-2xl
              border border-emerald-100
              bg-emerald-50/70
              dark:border-emerald-900/40
              dark:bg-emerald-950/20
            "
          >
            <div className="flex items-center gap-4 p-5">
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
                    font-semibold
                    text-emerald-700
                    dark:text-emerald-300
                  "
                >
                  AI is analyzing your expenses...
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  Looking for spending patterns and opportunities to save.
                </p>
              </div>

              <div
                className="
                  hidden
                  h-2
                  w-24
                  overflow-hidden
                  rounded-full
                  bg-emerald-200
                  sm:block
                  dark:bg-emerald-900
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
        )}

        {/* =====================================================
            AI RESULT
        ====================================================== */}

        {hasExpenses && insights && !isLoading && (
          <div className="mt-6">
            {/* Analysis Complete */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                rounded-xl
                bg-gray-50
                px-4 py-3
                dark:bg-gray-900
              "
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  AI Analysis Complete
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
                SUMMARY
            ================================================== */}

            <div
              className="
                rounded-2xl
                border border-emerald-100
                bg-emerald-50/60
                p-5
                dark:border-emerald-900/40
                dark:bg-emerald-950/20
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
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    Spending Summary
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
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
                KEY INSIGHTS
            ================================================== */}

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {/* Highest Category */}

              <div
                className="
                  rounded-2xl
                  border border-gray-200
                  bg-white
                  p-5
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-sm
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >
                  Highest Spending Category
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11
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
                        mt-0.5
                        text-xs
                        text-gray-400
                      "
                    >
                      Highest expense category
                    </p>
                  </div>
                </div>
              </div>

              {/* Observation */}

              <div
                className="
                  rounded-2xl
                  border border-gray-200
                  bg-white
                  p-5
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-sm
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >
                  AI Observation
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  {insights.observation}
                </p>
              </div>
            </div>

            {/* =================================================
                RECOMMENDATIONS
            ================================================== */}

            <div
              className="
                mt-5
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <div className="flex items-center justify-between">
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
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      AI Recommendations
                    </h3>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Practical ways to improve your spending
                    </p>
                  </div>
                </div>

                <FaArrowRight
                  className="
                    hidden
                    text-gray-300
                    sm:block
                    dark:text-gray-700
                  "
                />
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
                        border border-gray-100
                        bg-gray-50
                        p-4
                        transition-colors
                        hover:border-emerald-100
                        hover:bg-emerald-50/40
                        dark:border-gray-800
                        dark:bg-gray-800/70
                        dark:hover:border-emerald-900
                        dark:hover:bg-emerald-950/20
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
                SAVING TIP
            ================================================== */}

            <div
              className="
                mt-5
                rounded-2xl
                border border-yellow-200
                bg-yellow-50
                p-5
                dark:border-yellow-900/40
                dark:bg-yellow-950/20
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex h-9 w-9
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
                      font-semibold
                      text-yellow-800
                      dark:text-yellow-300
                    "
                  >
                    Smart Saving Tip
                  </h3>

                  <p
                    className="
                      mt-1
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
            ================================================== */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                border-t
                border-gray-100
                pt-4
                text-xs
                text-gray-400
                dark:border-gray-800
                dark:text-gray-500
              "
            >
              <FaStar className="text-emerald-500" />

              <span>
                Generated by SmartReceipts AI based on your recorded expenses.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AIInsights;
