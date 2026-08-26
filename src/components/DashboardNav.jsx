import { useState } from "react";
import {
  FaHome,
  FaReceipt,
  FaChartBar,
  FaFileExport,
  FaRobot,
  FaWallet,
  FaCog,
  FaQuestionCircle,
  FaTimes,
  FaBars,
} from "react-icons/fa";

function DashboardNav({ onOpenAI, onAddExpense, onOpenBudget }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationGroups = [
    {
      title: "Main",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: <FaHome />,
        },
        {
          id: "expenses",
          label: "Expenses",
          icon: <FaReceipt />,
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <FaChartBar />,
        },
      ],
    },

    {
      title: "Quick Actions",
      items: [
        {
          id: "add-expense",
          label: "Add Receipt",
          icon: <FaReceipt />,
          action: "addExpense",
          highlight: true,
        },
        {
          id: "budget",
          label: "Set Budget",
          icon: <FaWallet />,
          action: "openBudget",
          highlight: true,
        },
      ],
    },

    {
      title: "Intelligence",
      items: [
        {
          id: "insights",
          label: "AI Insights",
          icon: <FaRobot />,
        },
        {
          id: "ai-chat",
          label: "AI Assistant",
          icon: <FaRobot />,
          action: "openAI",
        },
      ],
    },

    {
      title: "Management",
      items: [
        {
          id: "export",
          label: "Export",
          icon: <FaFileExport />,
        },
      ],
    },
  ];

  const handleNavigation = (item) => {
    // ============================================
    // AI ASSISTANT
    // ============================================

    if (item.action === "openAI") {
      onOpenAI?.();
      setSidebarOpen(false);
      return;
    }

    // ============================================
    // ADD RECEIPT MODAL
    // ============================================

    if (item.action === "addExpense") {
      onAddExpense?.();
      setSidebarOpen(false);
      return;
    }

    // ============================================
    // BUDGET MODAL
    // ============================================

    if (item.action === "openBudget") {
      onOpenBudget?.();
      setSidebarOpen(false);
      return;
    }

    // ============================================
    // NORMAL NAVIGATION
    // ============================================

    const element = document.getElementById(item.id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setSidebarOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
        className="
          fixed
          left-4
          top-4
          z-[90]

          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-700
          shadow-sm

          transition

          hover:border-emerald-300
          hover:text-emerald-600

          lg:hidden

          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-200
        "
      >
        <FaBars />
      </button>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-[70]
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[80]

          flex
          h-screen
          w-[250px]
          flex-col

          border-r
          border-emerald-950

          bg-[#031815]
          text-white
          shadow-2xl

          transition-transform
          duration-300

          lg:translate-x-0

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            px-5
            pb-6
            pt-6
          "
        >
          <button
            type="button"
            onClick={() =>
              handleNavigation({
                id: "overview",
              })
            }
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-emerald-500

                text-lg
                font-black
                text-white

                shadow-lg
                shadow-emerald-500/20
              "
            >
              S
            </div>

            <div className="text-left">
              <p className="text-lg font-bold tracking-tight">
                Smart<span className="text-emerald-400">Receipts</span>
              </p>

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Smarter expenses. Better decisions.
              </p>
            </div>
          </button>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-gray-400

              transition

              hover:bg-emerald-950
              hover:text-white

              lg:hidden
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto

            px-4
            pb-4

            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-emerald-950
          "
        >
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {/* GROUP TITLE */}

              <p
                className="
                  mb-3
                  px-2

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-gray-500
                "
              >
                {group.title}
              </p>

              {/* ITEMS */}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigation(item)}
                    className={`
                      group

                      flex
                      w-full
                      items-center
                      gap-3

                      rounded-xl
                      px-3
                      py-3

                      text-sm
                      font-medium

                      transition-all

                      ${
                        item.highlight
                          ? `
                            bg-emerald-500/10
                            text-emerald-300

                            hover:bg-emerald-500/20
                            hover:text-emerald-200
                          `
                          : `
                            text-gray-300

                            hover:bg-emerald-950/80
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {/* ICON */}

                    <span
                      className={`
                        flex
                        w-5
                        items-center
                        justify-center

                        transition-colors

                        ${
                          item.highlight
                            ? "text-emerald-400"
                            : "text-gray-400 group-hover:text-emerald-400"
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    {/* LABEL */}

                    <span>{item.label}</span>

                    {/* QUICK ACTION INDICATOR */}

                    {item.highlight && (
                      <span
                        className="
                          ml-auto
                          rounded-full
                          bg-emerald-500/10
                          px-1.5
                          py-0.5

                          text-[8px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-emerald-400
                        "
                      >
                        +
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* =====================================================
              SETTINGS
          ===================================================== */}

          <div className="mb-7">
            <p
              className="
                mb-3
                px-2

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-gray-500
              "
            >
              Settings
            </p>

            <div className="space-y-1">
              {/* SETTINGS */}

              <button
                type="button"
                className="
                  group

                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl
                  px-3
                  py-3

                  text-sm
                  font-medium
                  text-gray-300

                  transition

                  hover:bg-emerald-950/80
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    w-5
                    justify-center

                    text-gray-400
                    transition-colors

                    group-hover:text-emerald-400
                  "
                >
                  <FaCog />
                </span>

                <span>Settings</span>
              </button>

              {/* HELP */}

              <button
                type="button"
                className="
                  group

                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl
                  px-3
                  py-3

                  text-sm
                  font-medium
                  text-gray-300

                  transition

                  hover:bg-emerald-950/80
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    w-5
                    justify-center

                    text-gray-400
                    transition-colors

                    group-hover:text-emerald-400
                  "
                >
                  <FaQuestionCircle />
                </span>

                <span>Help & Support</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardNav;
