import { useState } from "react";
import {
  FaHome,
  FaWallet,
  FaRobot,
  FaChartBar,
  FaReceipt,
  FaFileExport,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";

function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

  const navItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: "budget",
      label: "Budget",
      icon: <FaWallet />,
    },
    {
      id: "insights",
      label: "AI Insights",
      icon: <FaRobot />,
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

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileOpen(false);
  };

  return (
    <nav
      className="
        sticky top-4 z-50
        rounded-2xl
        border border-gray-200
        bg-white/95
        shadow-sm
        backdrop-blur-xl
        transition-all duration-300

        dark:border-gray-800
        dark:bg-[#101917]/95
      "
    >
      {/* =================================================
          MAIN NAVIGATION BAR
      ================================================== */}

      <div className="flex h-16 items-center justify-between px-4 sm:px-5">
        {/* =================================================
            BRAND
        ================================================== */}

        <button
          type="button"
          onClick={() => handleNavigation("overview")}
          className="flex items-center gap-2.5"
        >
          {/* Logo */}
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-emerald-500
              text-sm font-bold
              text-white
              shadow-sm
            "
          >
            S
          </div>

          {/* Brand Text */}
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              Smart<span className="text-emerald-500">Receipts</span>
            </p>

            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
              Financial workspace
            </p>
          </div>
        </button>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigation(item.id)}
              className="
                group
                flex items-center gap-2
                rounded-xl
                px-3.5 py-2.5
                text-sm font-medium
                text-gray-500
                transition-all duration-200
                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-gray-400
                dark:hover:bg-emerald-950/40
                dark:hover:text-emerald-400
              "
            >
              <span
                className="
                  text-gray-400
                  transition-colors
                  group-hover:text-emerald-500

                  dark:text-gray-500
                  dark:group-hover:text-emerald-400
                "
              >
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Profile Menu */}
          <ProfileMenu />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-gray-200
              bg-gray-50
              text-gray-600
              transition
              hover:bg-gray-100

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
              dark:hover:bg-gray-700

              lg:hidden
            "
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-gray-200
            px-3
            pb-3
            pt-3

            dark:border-gray-800
            lg:hidden
          "
        >
          {/* Navigation Items */}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item.id)}
                className="
                  flex items-center gap-2
                  rounded-xl
                  px-3 py-3
                  text-left
                  text-sm font-medium
                  text-gray-600
                  transition

                  hover:bg-emerald-50
                  hover:text-emerald-600

                  dark:text-gray-300
                  dark:hover:bg-gray-800
                  dark:hover:text-emerald-400
                "
              >
                <span className="text-emerald-500">{item.icon}</span>

                {item.label}
              </button>
            ))}
          </div>

          {/* =================================================
              MOBILE THEME TOGGLE
          ================================================== */}

          <div
            className="
              mt-3
              border-t
              border-gray-200
              pt-3

              dark:border-gray-800
              sm:hidden
            "
          >
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

export default DashboardNav;
