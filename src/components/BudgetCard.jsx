import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";

function BudgetCard({ budget, onSaveBudget, onClose }) {
  const [value, setValue] = useState(budget ? String(budget) : "");

  useEffect(() => {
    setValue(budget ? String(budget) : "");
  }, [budget]);

  const numericBudget = Number(value) || 0;
  const hasBudget = Number(budget) > 0;

  const handleSave = () => {
    if (!value || numericBudget <= 0) return;

    onSaveBudget(numericBudget);
  };

  return (
    <div className="relative">
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-emerald-500/10
          blur-3xl
        "
      />

      <div className="relative">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* ICON */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                text-emerald-500
                dark:text-emerald-400
              "
            >
              <FaWallet className="text-base" />
            </div>

            {/* TITLE */}

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Financial planning
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-gray-950
                  dark:text-white
                "
              >
                {hasBudget ? "Update Your Budget" : "Set Your Budget"}
              </h2>
            </div>
          </div>

          {/* CLOSE BUTTON */}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close budget"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-700
                dark:hover:bg-gray-800
                dark:hover:text-white
              "
            >
              ×
            </button>
          )}
        </div>

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <div className="mt-7">
          <p
            className="
              text-sm
              leading-6
              text-gray-500
              dark:text-gray-400
            "
          >
            {hasBudget
              ? "Update your monthly spending limit to keep your finances on track."
              : "Set a monthly spending limit to keep your business spending under control."}
          </p>
        </div>

        {/* =====================================================
            CURRENT BUDGET
        ===================================================== */}

        {hasBudget && (
          <div
            className="
              mt-6
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/60
              px-4
              py-3
              dark:border-emerald-900/40
              dark:bg-emerald-950/20
            "
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Current monthly budget
                </p>

                <p
                  className="
                    mt-1
                    text-lg
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  $
                  {Number(budget).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div
                className="
                  rounded-lg
                  bg-emerald-500/10
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Active
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            BUDGET INPUT
        ===================================================== */}

        <div className="mt-6">
          <label
            htmlFor="monthly-budget"
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-gray-700
              dark:text-gray-300
            "
          >
            Monthly spending limit
          </label>

          <div className="relative">
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-sm
                font-semibold
                text-gray-400
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
              placeholder="1,000.00"
              autoFocus
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                py-3.5
                pl-8
                pr-4
                text-sm
                font-medium
                text-gray-900
                outline-none
                placeholder:text-gray-400
                transition-all
                focus:border-emerald-400
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-white
                dark:placeholder:text-gray-600
                dark:focus:border-emerald-500/50
                dark:focus:bg-gray-800
              "
            />
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-gray-400
              dark:text-gray-500
            "
          >
            Enter the maximum amount you want to spend each month.
          </p>
        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div
          className="
            mt-7
            flex
            flex-col-reverse
            gap-2
            border-t
            border-gray-100
            pt-5
            sm:flex-row
            sm:justify-end
            dark:border-gray-800
          "
        >
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-600
                transition-all
                hover:border-gray-300
                hover:bg-gray-50
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-300
                dark:hover:bg-gray-800
              "
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={!value || numericBudget <= 0}
            className="
              rounded-xl
              bg-emerald-500
              px-6
              py-3
              text-sm
              font-bold
              text-[#031815]
              shadow-sm
              transition-all
              hover:bg-emerald-400
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {hasBudget ? "Update Budget" : "Save Budget"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
