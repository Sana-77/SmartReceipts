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
          id: "add-expense",
          label: "Add Receipt",
          icon: <FaReceipt />,
          action: "addExpense",
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <FaChartBar />,
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
          id: "budget",
          label: "Budget",
          icon: <FaWallet />,
          action: "openBudget",
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
    if (item.action === "openAI") {
      onOpenAI?.();
      setSidebarOpen(false);
      return;
    }

    if (item.action === "addExpense") {
      onAddExpense?.();
      setSidebarOpen(false);
      return;
    }

    if (item.action === "openBudget") {
      onOpenBudget?.();
      setSidebarOpen(false);
      return;
    }

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
      {/* MOBILE MENU BUTTON */}

      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
        className="
          fixed left-4 top-4 z-[90]
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          border border-gray-200
          bg-white
          text-gray-700
          shadow-sm
          lg:hidden
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-200
        "
      >
        <FaBars />
      </button>

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0 z-[70]
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed left-0 top-0 z-[80]
          flex h-screen w-[250px]
          flex-col
          border-r border-emerald-950
          bg-[#031815]
          text-white
          shadow-2xl
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* BRAND */}

        <div className="flex shrink-0 items-center justify-between px-5 pb-6 pt-6">
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
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-emerald-500
                text-lg font-black
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

              <p className="text-[9px] uppercase tracking-wider text-gray-400">
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
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-gray-400
              hover:bg-emerald-950
              hover:text-white
              lg:hidden
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}

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
            <div key={group.title} className="mb-7">
              <p
                className="
                  mb-3 px-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-gray-500
                "
              >
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigation(item)}
                    className="
                      flex w-full
                      items-center gap-3
                      rounded-xl
                      px-3 py-3
                      text-sm font-medium
                      text-gray-300
                      transition-all
                      hover:bg-emerald-950/80
                      hover:text-white
                    "
                  >
                    <span
                      className="
                        flex w-5
                        items-center justify-center
                        text-gray-400
                        transition-colors
                        group-hover:text-emerald-400
                      "
                    >
                      {item.icon}
                    </span>

                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* SETTINGS */}

          <div className="mb-7">
            <p
              className="
                mb-3 px-2
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
              <button
                type="button"
                className="
                  flex w-full
                  items-center gap-3
                  rounded-xl
                  px-3 py-3
                  text-sm font-medium
                  text-gray-300
                  transition
                  hover:bg-emerald-950/80
                  hover:text-white
                "
              >
                <span className="flex w-5 justify-center text-gray-400">
                  <FaCog />
                </span>
                Settings
              </button>

              <button
                type="button"
                className="
                  flex w-full
                  items-center gap-3
                  rounded-xl
                  px-3 py-3
                  text-sm font-medium
                  text-gray-300
                  transition
                  hover:bg-emerald-950/80
                  hover:text-white
                "
              >
                <span className="flex w-5 justify-center text-gray-400">
                  <FaQuestionCircle />
                </span>
                Help & Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardNav;
