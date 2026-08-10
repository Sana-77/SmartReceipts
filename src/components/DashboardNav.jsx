import {
  FaHome,
  FaWallet,
  FaRobot,
  FaChartBar,
  FaReceipt,
  FaFileExport,
} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

function DashboardNav({ onOpenChat }) {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FaHome />,
    },
    {
      id: "budget",
      label: "Budget",
      icon: <FaWallet />,
    },
    {
      id: "ai-chat",
      label: "AI Companion",
      icon: <FaRobot />,
      action: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FaChartBar />,
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: <FaReceipt />,
    },
    {
      id: "export",
      label: "Export",
      icon: <FaFileExport />,
    },
  ];

  const handleNavigation = (item) => {
    // AI Companion opens the chat
    if (item.action) {
      if (onOpenChat) {
        onOpenChat();
      }
      return;
    }

    const section = document.getElementById(item.id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav
      className="
        sticky top-4 z-40 mb-10
        overflow-x-auto
        rounded-2xl
        border border-gray-200
        bg-white/90
        p-2
        shadow-lg
        backdrop-blur-md
        transition-colors duration-300

        dark:border-gray-700
        dark:bg-gray-800/90
      "
    >
      <div className="flex min-w-max items-center justify-between gap-2">
        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigation(item)}
              className="
                group
                flex items-center gap-2
                rounded-xl
                px-4 py-2.5
                text-sm font-medium
                text-gray-600
                transition-all duration-200

                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-gray-300
                dark:hover:bg-gray-700
                dark:hover:text-emerald-400
              "
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div
          className="
            ml-2
            border-l border-gray-200
            pl-2
            dark:border-gray-700
          "
        >
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
