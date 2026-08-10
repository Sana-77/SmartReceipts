import { FaArrowUp, FaReceipt, FaWallet } from "react-icons/fa";

function DashboardCard({ total, expenseCount }) {
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
      {/* Decorative background glow */}
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-48 w-48
          rounded-full
          bg-emerald-500/10
          blur-3xl
          dark:bg-emerald-400/10
        "
      />

      <div className="relative">
        {/* =====================================================
            TOP ROW
        ====================================================== */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left side */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-2">
              <span
                className="
                  text-xs font-semibold
                  uppercase tracking-[0.18em]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Total Spending
              </span>

              <span
                className="
                  rounded-full
                  border border-emerald-200
                  bg-emerald-50
                  px-2 py-0.5
                  text-[10px] font-semibold
                  uppercase tracking-wide
                  text-emerald-700
                  dark:border-emerald-900/60
                  dark:bg-emerald-950/40
                  dark:text-emerald-400
                "
              >
                This Month
              </span>
            </div>

            {/* Amount */}
            <div className="mt-3 flex items-baseline gap-2">
              <h2
                className="
                  text-4xl font-bold
                  tracking-tight
                  text-gray-950
                  dark:text-white
                  sm:text-5xl
                "
              >
                ${total.toFixed(2)}
              </h2>
            </div>

            {/* Supporting information */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaReceipt className="text-emerald-500" />

                <span>
                  {expenseCount} {expenseCount === 1 ? "receipt" : "receipts"}{" "}
                  processed
                </span>
              </div>

              <span className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 sm:block" />

              <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <FaArrowUp className="text-xs" />
                <span>Spending overview</span>
              </div>
            </div>
          </div>

          {/* =================================================
              WALLET ICON
          ================================================== */}
          <div
            className="
              flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-2xl
              border border-emerald-200
              bg-emerald-50
              shadow-sm
              dark:border-emerald-900/60
              dark:bg-emerald-950/40
              sm:h-16 sm:w-16
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
            SPENDING STATUS
        ====================================================== */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Spending activity
            </span>

            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {expenseCount > 0 ? "Active" : "No activity"}
            </span>
          </div>

          {/* Progress line */}
          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-gray-100
              dark:bg-gray-800
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-emerald-500
                transition-all duration-700
              "
              style={{
                width:
                  expenseCount === 0
                    ? "0%"
                    : `${Math.min(expenseCount * 10, 100)}%`,
              }}
            />
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            Your spending activity is calculated from your recorded receipts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
