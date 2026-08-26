import { useEffect, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaChevronDown,
  FaWallet,
  FaChartBar,
  FaReceipt,
  FaArrowUp,
  FaArrowDown,
  FaLightbulb,
  FaPlus,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

import DashboardNav from "../components/DashboardNav";
import ProfileMenu from "../components/ProfileMenu";
import ThemeToggle from "../components/ThemeToggle";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import AIInsights from "../components/AIInsights";
import ExpenseFilters from "../components/ExpenseFilters";
import CategorySummary from "../components/CategorySummary";
import AnalyticsCards from "../components/AnalyticsCards";
import ExpenseCharts from "../components/ExpenseCharts";
import BudgetCard from "../components/BudgetCard";
import ExportButtons from "../components/ExportButtons";
import AIChat from "../components/AIChat";
import Footer from "../components/Footer";

import { supabase } from "../lib/supabase";

import { exportCSV, exportPDF } from "../utils/exportReport";

import {
  getExpensesFromSupabase,
  addExpenseToSupabase,
  updateExpenseInSupabase,
  deleteExpenseFromSupabase,
} from "../services/expenseService";

import { getBudget, saveBudget } from "../services/budgetStorage";

import { categorizeExpense, analyzeExpenses } from "../services/aiService";

function Dashboard() {
  // =====================================================
  // STATE
  // =====================================================

  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const [error, setError] = useState("");
  const [insights, setInsights] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [budget, setBudget] = useState(getBudget);

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        setUser(currentUser);
      } catch (err) {
        console.error("Failed to load user:", err);

        setError("Unable to load your account information.");
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // =====================================================
  // LOAD EXPENSES
  // =====================================================

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpensesFromSupabase();

        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load expenses:", err);

        setError("Unable to load your expenses.");
      }
    };

    loadExpenses();
  }, []);

  // =====================================================
  // CLEAR ERROR
  // =====================================================

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  // =====================================================
  // OPEN EXPENSE MODAL
  // =====================================================

  const openExpenseModal = () => {
    setEditingExpense(null);
    setError("");
    setIsExpenseModalOpen(true);
  };

  // =====================================================
  // CLOSE EXPENSE MODAL
  // =====================================================

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  // =====================================================
  // OPEN BUDGET MODAL
  // =====================================================

  const openBudgetModal = () => {
    setError("");
    setIsBudgetModalOpen(true);
  };

  // =====================================================
  // CLOSE BUDGET MODAL
  // =====================================================

  const closeBudgetModal = () => {
    setIsBudgetModalOpen(false);
  };

  // =====================================================
  // ADD EXPENSE
  // =====================================================

  const handleAddExpense = async ({ itemName, price, receiptImage = null }) => {
    setIsCategorizing(true);
    setError("");

    try {
      const aiCategory = await categorizeExpense(itemName);

      const newExpense = await addExpenseToSupabase({
        itemName,
        price,
        aiCategory,
        receiptImage,
      });

      setExpenses((prev) => [...prev, newExpense]);

      closeExpenseModal();
    } catch (err) {
      console.error("AI categorization failed:", err);

      /*
       * AI failure should not prevent the expense
       * from being saved.
       */

      try {
        const newExpense = await addExpenseToSupabase({
          itemName,
          price,
          aiCategory: "Miscellaneous",
          receiptImage,
        });

        setExpenses((prev) => [...prev, newExpense]);

        setError(
          "AI categorization was unavailable. The expense was saved as Miscellaneous.",
        );

        closeExpenseModal();
      } catch (supabaseError) {
        console.error("Failed to save expense:", supabaseError);

        setError("Unable to save the expense. Please try again.");
      }
    } finally {
      setIsCategorizing(false);
    }
  };

  // =====================================================
  // EDIT EXPENSE
  // =====================================================

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setError("");
    setIsExpenseModalOpen(true);
  };

  // =====================================================
  // UPDATE EXPENSE
  // =====================================================

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      setError("");

      const updatedExpense = await updateExpenseInSupabase(id, updatedData);

      setExpenses((prev) =>
        prev.map((expense) => (expense.id === id ? updatedExpense : expense)),
      );

      closeExpenseModal();
    } catch (err) {
      console.error("Failed to update expense:", err);

      setError("Unable to update the expense. Please try again.");
    }
  };

  // =====================================================
  // DELETE EXPENSE
  // =====================================================

  const handleDeleteExpense = async (id) => {
    try {
      setError("");

      await deleteExpenseFromSupabase(id);

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);

      setError("Unable to delete the expense. Please try again.");
    }
  };

  // =====================================================
  // BUDGET
  // =====================================================

  const handleSaveBudget = (amount) => {
    const numericAmount = Number(amount) || 0;

    setBudget(numericAmount);
    saveBudget(numericAmount);
  };

  // =====================================================
  // TOTAL SPENDING
  // =====================================================

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.price || 0),
    0,
  );

  // =====================================================
  // AI ANALYSIS
  // =====================================================

  const handleAnalyzeExpenses = async () => {
    if (!expenses.length || isAnalyzing) return;

    setIsAnalyzing(true);
    setError("");

    try {
      const result = await analyzeExpenses(expenses);

      setInsights(result);
    } catch (err) {
      console.error("Expense analysis failed:", err);

      setInsights({
        summary: "Unable to analyze your expenses at the moment.",
        topCategory: "Unavailable",
        observation:
          "The AI service could not process your spending data. Please try again.",
        recommendations: [
          "Check your internet connection.",
          "Make sure your OpenRouter API is available.",
          "Try analyzing your expenses again in a few moments.",
        ],
        savingTip:
          "Review your recent expenses manually while AI analysis is unavailable.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // =====================================================
  // EXPORT
  // =====================================================

  const handleExportCSV = () => {
    if (!expenses.length) return;

    exportCSV(expenses);
  };

  const handleExportPDF = () => {
    if (!expenses.length) return;

    exportPDF(expenses, total, budget, insights);
  };

  // =====================================================
  // FILTERED EXPENSES
  // =====================================================

  const filteredExpenses = [...expenses]
    .filter((expense) => {
      const itemName = String(expense.itemName || "");

      const matchesSearch = itemName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || expense.aiCategory === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priceA = Number(a.price || 0);
      const priceB = Number(b.price || 0);

      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      switch (sortBy) {
        case "highest":
          return priceB - priceA;

        case "lowest":
          return priceA - priceB;

        case "oldest":
          return dateA - dateB;

        case "az":
          return String(a.itemName || "").localeCompare(
            String(b.itemName || ""),
          );

        case "za":
          return String(b.itemName || "").localeCompare(
            String(a.itemName || ""),
          );

        default:
          return dateB - dateA;
      }
    });

  // =====================================================
  // DATE / GREETING
  // =====================================================

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "there";

  // =====================================================
  // SUMMARY VALUES
  // =====================================================

  const averageReceipt = expenses.length > 0 ? total / expenses.length : 0;

  const budgetProgress =
    budget > 0 ? Math.min(Math.max((total / budget) * 100, 0), 100) : 0;

  const remainingBudget = Math.max(budget - total, 0);

  const hasExpenses = expenses.length > 0;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#f6f8f7]
        text-gray-900
        transition-colors
        duration-300
        dark:bg-[#080f0d]
        dark:text-gray-100
      "
    >
      {/* =====================================================
          DASHBOARD NAVIGATION
      ===================================================== */}

      <DashboardNav
        onOpenAI={() => setIsChatOpen(true)}
        onAddExpense={openExpenseModal}
        onOpenBudget={openBudgetModal}
      />

      {/* =====================================================
          DASHBOARD AREA
      ===================================================== */}

      <div className="min-h-screen lg:pl-[250px]">
        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <header
          className="
            sticky top-0 z-50
            border-b border-gray-200/80
            bg-white/90
            backdrop-blur-xl
            dark:border-gray-800
            dark:bg-[#080f0d]/90
          "
        >
          <div
            className="
              flex h-[70px]
              items-center gap-3
              px-4
              sm:px-5
              lg:px-6
            "
          >
            {/* MOBILE MENU */}

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-dashboard-sidebar"))
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-gray-200
                bg-white
                text-gray-600
                lg:hidden
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-300
              "
            >
              ☰
            </button>

            {/* SEARCH */}

            <div className="relative max-w-2xl flex-1">
              <FaSearch
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-sm text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses, categories, receipts..."
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-white
                  pl-11 pr-16
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-gray-200
                "
              />

              <span
                className="
                  absolute right-3 top-1/2
                  hidden
                  -translate-y-1/2
                  rounded-md
                  border border-gray-200
                  bg-gray-50
                  px-2 py-1
                  text-[10px]
                  font-semibold
                  text-gray-400
                  sm:block
                  dark:border-gray-700
                  dark:bg-gray-800
                "
              >
                ⌘K
              </span>
            </div>

            {/* TOP ACTIONS */}

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* THEME */}

              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* NOTIFICATIONS */}

              <button
                type="button"
                aria-label="Notifications"
                className="
                  relative
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                "
              >
                <FaBell />

                {expenses.length > 0 && (
                  <span
                    className="
                      absolute right-1 top-1
                      flex h-4 w-4
                      items-center justify-center
                      rounded-full
                      bg-emerald-500
                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    {Math.min(expenses.length, 9)}
                  </span>
                )}
              </button>

              {/* DIVIDER */}

              <div
                className="
                  hidden h-7 w-px
                  bg-gray-200
                  dark:bg-gray-800
                  sm:block
                "
              />

              {/* PROFILE */}

              <ProfileMenu />
            </div>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            mx-auto
            max-w-[1400px]
            px-4 py-6
            sm:px-5
            lg:px-6 lg:py-7
          "
        >
          {/* =================================================
              GREETING
          ================================================= */}

          <section id="overview" className="scroll-mt-24">
            <div
              className="
                mb-7
                flex flex-col gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div>
                <p
                  className="
                    mb-2
                    text-xs font-semibold
                    uppercase tracking-[0.16em]
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  Financial workspace
                </p>

                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-gray-950
                    dark:text-white
                    sm:text-4xl
                  "
                >
                  {greeting}, {displayName}! 👋
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                    sm:text-base
                  "
                >
                  {hasExpenses
                    ? "Here's what's happening with your finances today."
                    : "Let's get your financial workspace started."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* ADD EXPENSE */}

                <button
                  type="button"
                  onClick={openExpenseModal}
                  className="
                    flex items-center gap-2
                    rounded-xl
                    bg-emerald-500
                    px-4 py-3
                    text-sm font-bold
                    text-[#031815]
                    shadow-sm
                    transition
                    hover:bg-emerald-400
                    focus:outline-none
                    focus:ring-4
                    focus:ring-emerald-500/20
                  "
                >
                  <FaPlus />
                  Add Expense
                </button>

                {/* BUDGET */}

                <button
                  type="button"
                  onClick={openBudgetModal}
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-3
                    text-sm font-semibold
                    text-gray-700
                    shadow-sm
                    transition
                    hover:border-emerald-200
                    hover:bg-emerald-50
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-200
                    dark:hover:border-emerald-800
                    dark:hover:bg-emerald-950/30
                  "
                >
                  <FaWallet className="text-emerald-500" />
                  {budget > 0 ? "Manage Budget" : "Set Budget"}
                </button>

                {/* DATE */}

                <button
                  type="button"
                  className="
                    hidden
                    items-center gap-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-3
                    text-sm font-semibold
                    text-gray-700
                    shadow-sm
                    transition
                    hover:border-emerald-200
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-200
                    lg:flex
                  "
                >
                  <FaCalendarAlt className="text-emerald-500" />

                  <span>{today}</span>

                  <FaChevronDown className="text-[10px] text-gray-400" />
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================
              FIRST-TIME USER
          ===================================================== */}

          {!hasExpenses ? (
            <>
              {/* =================================================
                  WELCOME CARD
              ================================================= */}

              <section className="mt-2">
                <div
                  className="
                    overflow-hidden
                    rounded-3xl
                    border border-gray-200
                    bg-white
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <div
                    className="
                      relative
                      overflow-hidden
                      px-6 py-10
                      sm:px-10
                      lg:px-14 lg:py-14
                    "
                  >
                    {/* Decorative background */}

                    <div
                      className="
                        pointer-events-none
                        absolute -right-20 -top-20
                        h-64 w-64
                        rounded-full
                        bg-emerald-500/10
                        blur-3xl
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute -bottom-24 right-1/4
                        h-48 w-48
                        rounded-full
                        bg-emerald-400/5
                        blur-3xl
                      "
                    />

                    <div className="relative max-w-3xl">
                      <div
                        className="
                          flex h-14 w-14
                          items-center justify-center
                          rounded-2xl
                          bg-emerald-500
                          text-2xl
                          text-white
                          shadow-lg
                          shadow-emerald-500/20
                        "
                      >
                        <FaReceipt />
                      </div>

                      <p
                        className="
                          mt-6
                          text-xs font-semibold
                          uppercase tracking-[0.16em]
                          text-emerald-600
                          dark:text-emerald-400
                        "
                      >
                        Welcome to SmartReceipts
                      </p>

                      <h2
                        className="
                          mt-3
                          text-3xl font-bold
                          tracking-tight
                          text-gray-950
                          dark:text-white
                          sm:text-4xl
                        "
                      >
                        Let&apos;s start tracking your spending.
                      </h2>

                      <p
                        className="
                          mt-4
                          max-w-xl
                          text-sm leading-7
                          text-gray-500
                          dark:text-gray-400
                          sm:text-base
                        "
                      >
                        Add your expenses and SmartReceipts will organize your
                        purchases, automatically categorize them with AI, and
                        help you understand where your money is going.
                      </p>

                      {/* ACTIONS */}

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={openExpenseModal}
                          className="
                            flex w-fit
                            items-center justify-center gap-2
                            rounded-xl
                            bg-emerald-500
                            px-5 py-3
                            text-sm font-bold
                            text-[#031815]
                            transition
                            hover:bg-emerald-400
                            focus:outline-none
                            focus:ring-4
                            focus:ring-emerald-500/20
                          "
                        >
                          <FaPlus />
                          Add Your First Expense
                        </button>

                        <button
                          type="button"
                          onClick={openBudgetModal}
                          className="
                            flex w-fit
                            items-center justify-center gap-2
                            rounded-xl
                            border border-gray-200
                            bg-white
                            px-5 py-3
                            text-sm font-semibold
                            text-gray-700
                            transition
                            hover:border-emerald-200
                            hover:bg-emerald-50
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:text-gray-200
                            dark:hover:border-emerald-800
                            dark:hover:bg-emerald-950/30
                          "
                        >
                          <FaWallet className="text-emerald-500" />
                          {budget > 0 ? "Manage Budget" : "Set Your Budget"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsChatOpen(true)}
                          className="
                            flex w-fit
                            items-center justify-center gap-2
                            rounded-xl
                            border border-gray-200
                            bg-white
                            px-5 py-3
                            text-sm font-semibold
                            text-gray-700
                            transition
                            hover:border-emerald-200
                            hover:bg-emerald-50
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:text-gray-200
                            dark:hover:border-emerald-800
                            dark:hover:bg-emerald-950/30
                          "
                        >
                          <FaRobot className="text-emerald-500" />
                          Ask AI Assistant
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* QUICK BENEFITS */}

                  <div
                    className="
                      grid
                      border-t border-gray-100
                      sm:grid-cols-3
                      dark:border-gray-800
                    "
                  >
                    <div className="p-5 sm:p-6">
                      <FaRobot className="text-lg text-emerald-500" />

                      <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                        AI Categorization
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Let AI automatically identify the right category for
                        each purchase.
                      </p>
                    </div>

                    <div
                      className="
                        border-t border-gray-100
                        p-5
                        sm:border-l sm:border-t-0 sm:p-6
                        dark:border-gray-800
                      "
                    >
                      <FaChartBar className="text-lg text-emerald-500" />

                      <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                        Understand Spending
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Discover spending patterns once you start recording
                        expenses.
                      </p>
                    </div>

                    <div
                      className="
                        border-t border-gray-100
                        p-5
                        sm:border-l sm:border-t-0 sm:p-6
                        dark:border-gray-800
                      "
                    >
                      <FaWallet className="text-lg text-emerald-500" />

                      <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                        Manage Your Budget
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Set a budget and monitor your progress as your data
                        grows.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* NO INLINE EXPENSE FORM HERE */}
            </>
          ) : (
            <>
              {/* =================================================
                  SUMMARY CARDS
              ================================================= */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* TOTAL SPENDING */}

                <div
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-emerald-50
                        text-xl text-emerald-600
                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                      "
                    >
                      <FaWallet />
                    </div>

                    <span className="text-xs font-semibold text-emerald-500">
                      Live
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Spending
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">
                    $
                    {total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <FaArrowUp className="text-emerald-500" />
                    Current account spending
                  </p>
                </div>

                {/* BUDGET */}

                <button
                  type="button"
                  onClick={openBudgetModal}
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition
                    hover:border-emerald-200
                    hover:shadow-md
                    dark:border-gray-800
                    dark:bg-[#101917]
                    dark:hover:border-emerald-900
                  "
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-emerald-50
                        text-xl text-emerald-600
                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                      "
                    >
                      <FaChartBar />
                    </div>

                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {budget > 0 ? `${Math.round(budgetProgress)}%` : "Set"}
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Budget Progress
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    $
                    {remainingBudget.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    left
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="
                        h-full rounded-full bg-emerald-500
                        transition-all duration-500
                      "
                      style={{
                        width: `${budgetProgress}%`,
                      }}
                    />
                  </div>
                </button>

                {/* RECEIPTS */}

                <div
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-full
                      bg-blue-50
                      text-xl text-blue-500
                      dark:bg-blue-950/30
                    "
                  >
                    <FaReceipt />
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Receipts
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">
                    {expenses.length}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <FaArrowUp className="text-emerald-500" />
                    Stored in your account
                  </p>
                </div>

                {/* AVERAGE */}

                <div
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-full
                      bg-purple-50
                      text-xl text-purple-500
                      dark:bg-purple-950/30
                    "
                  >
                    $
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Average Receipt
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">
                    $
                    {averageReceipt.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <FaArrowDown className="text-emerald-500" />
                    Per transaction
                  </p>
                </div>
              </div>

              {/* =================================================
                  SPENDING + AI INSIGHT
              ================================================= */}

              <section id="analytics" className="mt-6 scroll-mt-24">
                <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
                  {/* SPENDING OVERVIEW */}

                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border border-gray-200
                      bg-white
                      shadow-sm
                      dark:border-gray-800
                      dark:bg-[#101917]
                    "
                  >
                    <div className="flex items-center justify-between p-5 pb-2">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          Spending Overview
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Understand where your money is going.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="
                          flex items-center gap-2
                          rounded-lg
                          border border-gray-200
                          px-3 py-2
                          text-xs font-semibold
                          text-gray-600
                          dark:border-gray-700
                          dark:text-gray-300
                        "
                      >
                        This Month
                        <FaChevronDown className="text-[9px]" />
                      </button>
                    </div>

                    <div className="p-4 sm:p-5">
                      <ExpenseCharts expenses={expenses} />
                    </div>
                  </div>

                  {/* AI INSIGHT */}

                  <div
                    id="insights"
                    className="
                      scroll-mt-24
                      overflow-hidden
                      rounded-2xl
                      border border-emerald-100
                      bg-gradient-to-br
                      from-emerald-50
                      to-white
                      shadow-sm
                      dark:border-emerald-950
                      dark:from-[#0c2922]
                      dark:to-[#101917]
                    "
                  >
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            bg-emerald-500/10
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          <FaLightbulb />
                        </div>

                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            AI Insight
                          </h2>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Personalized spending analysis
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAnalyzeExpenses}
                        disabled={isAnalyzing || !expenses.length}
                        className="
                          text-xs font-semibold
                          text-emerald-600
                          hover:text-emerald-700
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          dark:text-emerald-400
                        "
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze"}
                      </button>
                    </div>

                    <div className="px-5 pb-5">
                      {insights ? (
                        <AIInsights
                          insights={insights}
                          onAnalyze={handleAnalyzeExpenses}
                          isLoading={isAnalyzing}
                          hasExpenses={expenses.length > 0}
                          expenses={expenses}
                          budget={budget}
                          total={total}
                        />
                      ) : (
                        <div
                          className="
                            rounded-2xl
                            bg-white/70
                            p-5
                            dark:bg-gray-900/40
                          "
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Your financial assistant is ready.
                          </p>

                          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Analyze your expenses to discover spending patterns,
                            unusual activity, and possible savings.
                          </p>

                          <button
                            type="button"
                            onClick={handleAnalyzeExpenses}
                            disabled={!expenses.length || isAnalyzing}
                            className="
                              mt-4
                              rounded-xl
                              bg-emerald-500
                              px-4 py-2.5
                              text-sm font-bold
                              text-[#031815]
                              transition
                              hover:bg-emerald-400
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            {isAnalyzing
                              ? "Analyzing..."
                              : "Analyze My Expenses"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CATEGORY / ANALYTICS */}

                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  <div
                    className="
                      rounded-2xl
                      border border-gray-200
                      bg-white
                      p-5
                      shadow-sm
                      dark:border-gray-800
                      dark:bg-[#101917]
                    "
                  >
                    <CategorySummary expenses={expenses} />
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border border-gray-200
                      bg-white
                      p-5
                      shadow-sm
                      dark:border-gray-800
                      dark:bg-[#101917]
                    "
                  >
                    <AnalyticsCards expenses={expenses} />
                  </div>
                </div>
              </section>

              {/* =================================================
                  RECENT EXPENSES
              ================================================= */}

              <section id="expenses" className="mt-6 scroll-mt-24">
                <div
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <div
                    className="
                      flex flex-col gap-4
                      border-b border-gray-100
                      p-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      dark:border-gray-800
                    "
                  >
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Recent Expenses
                      </h2>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your latest business transactions
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={openExpenseModal}
                      className="
                        flex w-fit
                        items-center gap-2
                        rounded-xl
                        bg-emerald-500
                        px-4 py-2.5
                        text-xs font-bold
                        text-[#031815]
                        transition
                        hover:bg-emerald-400
                      "
                    >
                      <FaPlus />
                      Add Expense
                    </button>
                  </div>

                  <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                    <ExpenseFilters
                      search={search}
                      setSearch={setSearch}
                      category={category}
                      setCategory={setCategory}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                    />
                  </div>

                  <div className="p-5">
                    <ExpenseTable
                      expenses={filteredExpenses.slice(0, 5)}
                      onDeleteExpense={handleDeleteExpense}
                      onEditExpense={handleEditExpense}
                    />
                  </div>
                </div>
              </section>

              {/* =================================================
                  EXPORT
              ================================================= */}

              <section id="export" className="mt-6 scroll-mt-24">
                <div
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-[#101917]
                  "
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                    Your data
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    Export Financial Records
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Download your expense information for reporting or
                    bookkeeping.
                  </p>

                  <div className="mt-5">
                    <ExportButtons
                      disabled={expenses.length === 0}
                      onExportCSV={handleExportCSV}
                      onExportPDF={handleExportPDF}
                    />
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* =====================================================
            FOOTER
            IMPORTANT:
            Footer is inside the desktop content area so it
            cannot be hidden underneath DashboardNav.
        ===================================================== */}

        <Footer />
      </div>

      {/* =====================================================
          ADD / EDIT RECEIPT MODAL
      ===================================================== */}

      {isExpenseModalOpen && (
        <div
          className="
            fixed inset-0 z-[120]
            flex items-center justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeExpenseModal();
            }
          }}
        >
          <div
            className="
              relative
              w-full max-w-2xl
              max-h-[calc(100vh-2rem)]
              overflow-hidden
              rounded-3xl
              border border-gray-200
              bg-white
              shadow-2xl
              dark:border-gray-800
              dark:bg-[#101917]
            "
          >
            <div
              className="
                max-h-[calc(100vh-2rem)]
                overflow-y-auto
                p-6
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {/* MODAL HEADER */}

              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p
                    className="
                      text-xs font-semibold
                      uppercase tracking-[0.16em]
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    Receipt management
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {editingExpense ? "Edit Expense" : "Add New Receipt"}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Let AI categorize your purchase automatically.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeExpenseModal}
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                    dark:hover:bg-gray-800
                    dark:hover:text-white
                  "
                  aria-label="Close receipt form"
                >
                  <FaTimes />
                </button>
              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="
                    mb-5
                    rounded-xl
                    border border-red-200
                    bg-red-50
                    p-4
                    text-sm text-red-700
                    dark:border-red-900/50
                    dark:bg-red-950/30
                    dark:text-red-300
                  "
                >
                  {error}
                </div>
              )}

              {/* AI CATEGORIZATION */}

              {isCategorizing && (
                <div
                  className="
                    mb-5
                    flex items-center gap-3
                    rounded-xl
                    border border-emerald-200
                    bg-emerald-50
                    p-4
                    dark:border-emerald-900/60
                    dark:bg-emerald-950/30
                  "
                >
                  <div
                    className="
                      h-5 w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-emerald-600
                      border-t-transparent
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm font-semibold
                        text-emerald-700
                        dark:text-emerald-300
                      "
                    >
                      AI is reading your receipt...
                    </p>

                    <p
                      className="
                        mt-1 text-xs
                        text-emerald-600
                        dark:text-emerald-500
                      "
                    >
                      Identifying the most suitable expense category.
                    </p>
                  </div>
                </div>
              )}

              {/* FORM */}

              <ExpenseForm
                onAddExpense={handleAddExpense}
                onUpdateExpense={handleUpdateExpense}
                editingExpense={editingExpense}
                isCategorizing={isCategorizing}
                onCancelEdit={closeExpenseModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BUDGET MODAL
      ===================================================== */}

      {isBudgetModalOpen && (
        <div
          className="
            fixed inset-0 z-[120]
            flex items-center justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeBudgetModal();
            }
          }}
        >
          <div
            className="
              relative
              w-full max-w-xl
              max-h-[calc(100vh-2rem)]
              overflow-hidden
              rounded-3xl
              border border-gray-200
              bg-white
              shadow-2xl
              dark:border-gray-800
              dark:bg-[#101917]
            "
          >
            <div
              className="
                max-h-[calc(100vh-2rem)]
                overflow-y-auto
                p-6
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {/* MODAL HEADER */}

              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p
                    className="
                      text-xs font-semibold
                      uppercase tracking-[0.16em]
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    Financial planning
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Manage Your Budget
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Set a spending limit and keep track of your progress.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeBudgetModal}
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                    dark:hover:bg-gray-800
                    dark:hover:text-white
                  "
                  aria-label="Close budget"
                >
                  <FaTimes />
                </button>
              </div>

              {/* BUDGET CARD */}

              <BudgetCard
                totalSpent={total}
                budget={budget}
                onSaveBudget={(value) => {
                  handleSaveBudget(value);
                  closeBudgetModal();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AI CHAT
      ===================================================== */}

      <AIChat
        expenses={expenses}
        budget={budget}
        total={total}
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />
    </main>
  );
}

export default Dashboard;
