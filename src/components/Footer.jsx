import {
  FaReceipt,
  FaHeart,
  FaArrowUp,
  FaChartBar,
  FaRobot,
  FaWallet,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer
      className="
        relative
        mt-12
        overflow-hidden
        border-t
        border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-[#0b1210]
      "
    >
      {/* =====================================================
          DECORATIVE GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-emerald-500/[0.06]
          blur-3xl
          dark:bg-emerald-500/[0.08]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-1/4
          h-64
          w-64
          rounded-full
          bg-emerald-400/[0.04]
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
          px-4
          py-10
          sm:px-6
          lg:px-8
          lg:py-12
        "
      >
        {/* =====================================================
            TOP SECTION
        ====================================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[1.5fr_1fr_1fr]
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="
                group
                flex
                items-center
                gap-3
                text-left
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-500
                  text-white
                  shadow-[0_8px_25px_rgba(16,185,129,0.18)]
                  transition
                  group-hover:scale-105
                  group-hover:bg-emerald-400
                "
              >
                <FaReceipt className="text-base" />
              </div>

              <div>
                <p
                  className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-gray-900
                    dark:text-white
                  "
                >
                  Smart<span className="text-emerald-500">Receipts</span>
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  AI Money Tracker
                </p>
              </div>
            </button>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-6
                text-gray-500
                dark:text-gray-400
              "
            >
              Track expenses, understand spending patterns, and make smarter
              financial decisions with AI-powered insights.
            </p>

            {/* MINI FEATURE INDICATORS */}

            <div className="mt-5 flex flex-wrap gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-emerald-700
                  dark:border-emerald-900/60
                  dark:bg-emerald-950/30
                  dark:text-emerald-400
                "
              >
                <FaRobot />
                AI Powered
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-gray-500
                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:text-gray-400
                "
              >
                <FaWallet />
                Smart Budgeting
              </span>
            </div>
          </div>

          {/* =================================================
              QUICK NAVIGATION
          ================================================== */}

          <div>
            <h3
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-gray-900
                dark:text-white
              "
            >
              Navigate
            </h3>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => scrollToSection("overview")}
                className="
                  block
                  text-sm
                  text-gray-500
                  transition
                  hover:translate-x-1
                  hover:text-emerald-600
                  dark:text-gray-400
                  dark:hover:text-emerald-400
                "
              >
                Overview
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("analytics")}
                className="
                  block
                  text-sm
                  text-gray-500
                  transition
                  hover:translate-x-1
                  hover:text-emerald-600
                  dark:text-gray-400
                  dark:hover:text-emerald-400
                "
              >
                Analytics
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("insights")}
                className="
                  block
                  text-sm
                  text-gray-500
                  transition
                  hover:translate-x-1
                  hover:text-emerald-600
                  dark:text-gray-400
                  dark:hover:text-emerald-400
                "
              >
                AI Insights
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("expenses")}
                className="
                  block
                  text-sm
                  text-gray-500
                  transition
                  hover:translate-x-1
                  hover:text-emerald-600
                  dark:text-gray-400
                  dark:hover:text-emerald-400
                "
              >
                Expenses
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("export")}
                className="
                  block
                  text-sm
                  text-gray-500
                  transition
                  hover:translate-x-1
                  hover:text-emerald-600
                  dark:text-gray-400
                  dark:hover:text-emerald-400
                "
              >
                Export
              </button>
            </div>
          </div>

          {/* =================================================
              FEATURES
          ================================================== */}

          <div>
            <h3
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-gray-900
                dark:text-white
              "
            >
              SmartReceipts
            </h3>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <FaReceipt className="text-xs text-emerald-500" />

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Expense Tracking
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaRobot className="text-xs text-emerald-500" />

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  AI Financial Insights
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaChartBar className="text-xs text-emerald-500" />

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Spending Analytics
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaWallet className="text-xs text-emerald-500" />

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Smart Budgeting
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div
          className="
            my-8
            border-t
            border-gray-100
            dark:border-gray-800
          "
        />

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* COPYRIGHT */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-1.5
              text-xs
              text-gray-400
              dark:text-gray-500
            "
          >
            <span>© {currentYear} SmartReceipts</span>

            <span className="text-gray-300 dark:text-gray-700">•</span>

            <span>Built with</span>

            <FaHeart className="text-[10px] text-emerald-500" />

            <span>for smarter spending.</span>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">
            <span
              className="
                hidden
                text-xs
                text-gray-400
                md:block
                dark:text-gray-500
              "
            >
              AI-powered financial insights
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-emerald-200
                hover:bg-emerald-50
                hover:text-emerald-600
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-400
                dark:hover:border-emerald-800
                dark:hover:bg-emerald-950/40
                dark:hover:text-emerald-400
              "
            >
              <FaArrowUp className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
