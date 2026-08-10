import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaPlusCircle } from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import AIInsights from "../components/AIInsights";
import ExpenseFilters from "../components/ExpenseFilters";
import CategorySummary from "../components/CategorySummary";
import AnalyticsCards from "../components/AnalyticsCards";
import ExpenseCharts from "../components/ExpenseCharts";
import BudgetCard from "../components/BudgetCard";
import ExportButtons from "../components/ExportButtons";
import DashboardNav from "../components/DashboardNav";
import AIChat from "../components/AIChat";

import { exportCSV, exportPDF } from "../utils/exportReport";
import { getExpenses, saveExpenses } from "../services/localStorage";
import { getBudget, saveBudget } from "../services/budgetStorage";
import { categorizeExpense, analyzeExpenses } from "../services/aiService";

function Dashboard() {
  // -------------------------
  // State
  // -------------------------

  const [expenses, setExpenses] = useState(getExpenses());
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState("");
  const [insights, setInsights] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [budget, setBudget] = useState(getBudget);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // -------------------------
  // Save to Local Storage
  // -------------------------

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // -------------------------
  // Clear Error
  // -------------------------

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  // -------------------------
  // Add Expense
  // -------------------------

  const handleAddExpense = async ({ itemName, price, receiptImage = null }) => {
    setIsCategorizing(true);
    setError("");

    try {
      const aiCategory = await categorizeExpense(itemName);

      const newExpense = {
        id: crypto.randomUUID(),
        itemName,
        price,
        aiCategory,
        receiptImage,
        createdAt: new Date().toISOString(),
      };

      setExpenses((prev) => [...prev, newExpense]);
    } catch (err) {
      console.error("AI categorization failed:", err);

      setError("AI categorization failed. Expense was saved as Miscellaneous.");

      const newExpense = {
        id: crypto.randomUUID(),
        itemName,
        price,
        aiCategory: "Miscellaneous",
        receiptImage,
        createdAt: new Date().toISOString(),
      };

      setExpenses((prev) => [...prev, newExpense]);
    } finally {
      setIsCategorizing(false);
    }
  };

  // -------------------------
  // Edit Expense
  // -------------------------

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setError("");
  };

  // -------------------------
  // Update Expense
  // -------------------------

  const handleUpdateExpense = (id, updatedData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              itemName: updatedData.itemName,
              price: updatedData.price,

              // Keep the existing receipt unless
              // a new receipt was provided.
              receiptImage:
                updatedData.receiptImage !== undefined
                  ? updatedData.receiptImage
                  : expense.receiptImage,
            }
          : expense,
      ),
    );

    setEditingExpense(null);
  };

  // -------------------------
  // Delete Expense
  // -------------------------

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // -------------------------
  // Budget Management
  // -------------------------

  const handleSaveBudget = (amount) => {
    setBudget(amount);
    saveBudget(amount);
  };

  // -------------------------
  // AI Analysis
  // -------------------------

  const handleAnalyzeExpenses = async () => {
    if (!expenses.length) return;

    setIsAnalyzing(true);

    try {
      const result = await analyzeExpenses(expenses);

      // AI returns a structured insights object
      setInsights(result);
    } catch (err) {
      console.error("Expense analysis failed:", err);

      // Keep the same structure expected by AIInsights.jsx
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

  // -------------------------
  // Export CSV
  // -------------------------

  const handleExportCSV = () => {
    exportCSV(expenses);
  };

  // -------------------------
  // Export PDF
  // -------------------------

  const handleExportPDF = () => {
    exportPDF(expenses, total, budget, insights);
  };

  // -------------------------
  // Filtered Expenses
  // -------------------------

  const filteredExpenses = [...expenses]
    .filter((expense) => {
      const matchesSearch = expense.itemName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || expense.aiCategory === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "highest":
          return b.price - a.price;

        case "lowest":
          return a.price - b.price;

        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "az":
          return a.itemName.localeCompare(b.itemName);

        case "za":
          return b.itemName.localeCompare(a.itemName);

        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  // -------------------------
  // Dashboard Summary
  // -------------------------

  const total = expenses.reduce((sum, expense) => sum + expense.price, 0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main
      className="
      min-h-screen
      bg-[#f5f7f6]
      text-gray-900
      transition-colors duration-300
      dark:bg-[#080f0d]
      dark:text-gray-100
    "
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* =====================================================
          NAVIGATION
      ====================================================== */}
        <DashboardNav onOpenChat={() => setIsChatOpen(true)} />
        {/* =====================================================
          HERO / HEADER
      ====================================================== */}
        <header className="mb-8 mt-8">
          <div
            className="
            relative overflow-hidden
            rounded-3xl
            border border-gray-200
            bg-white
            px-6 py-7
            shadow-sm
            transition-colors duration-300
            dark:border-gray-800
            dark:bg-[#101917]
            sm:px-8 sm:py-8
          "
          >
            {/* Decorative AI glow */}
            <div
              className="
              pointer-events-none
              absolute -right-20 -top-20
              h-56 w-56
              rounded-full
              bg-emerald-500/10
              blur-3xl
              dark:bg-emerald-400/10
            "
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="
                    rounded-full
                    border border-emerald-200
                    bg-emerald-50
                    px-3 py-1
                    text-xs font-semibold
                    uppercase tracking-wider
                    text-emerald-700
                    dark:border-emerald-900
                    dark:bg-emerald-950/50
                    dark:text-emerald-400
                  "
                  >
                    AI Financial Workspace
                  </span>
                </div>

                <h1
                  className="
                  text-3xl font-bold tracking-tight
                  text-gray-950
                  dark:text-white
                  sm:text-4xl
                "
                >
                  Smart<span className="text-emerald-500">Receipts</span>
                </h1>

                <p className="mt-2 max-w-xl text-base text-gray-600 dark:text-gray-400">
                  Intelligent expense tracking that helps you understand,
                  categorize, and optimize your business spending.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="text-emerald-500" />
                    <span>{today}</span>
                  </div>

                  <span className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 sm:block" />

                  <span className="text-gray-400 dark:text-gray-500">
                    Last updated {currentTime}
                  </span>
                </div>
              </div>

              {/* AI Status */}
              <div
                className="
                flex w-fit items-center gap-3
                rounded-2xl
                border border-emerald-200
                bg-emerald-50
                px-4 py-3
                dark:border-emerald-900/60
                dark:bg-emerald-950/30
              "
              >
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15">
                  <span className="absolute h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    AI Assistant Active
                  </p>

                  <p className="text-xs text-emerald-600/70 dark:text-emerald-500/70">
                    Ready to analyze
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
          OVERVIEW
      ====================================================== */}
        <section id="overview" className="scroll-mt-28">
          <DashboardCard total={total} expenseCount={expenses.length} />
        </section>

        {/* =====================================================
          BUDGET + AI INSIGHTS
      ====================================================== */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Budget */}
          <section id="budget" className="scroll-mt-28">
            <BudgetCard
              totalSpent={total}
              budget={budget}
              onSaveBudget={handleSaveBudget}
            />
          </section>

          {/* AI Insights */}
          <section id="insights" className="scroll-mt-28">
            <AIInsights
              insights={insights}
              onAnalyze={handleAnalyzeExpenses}
              isLoading={isAnalyzing}
              hasExpenses={expenses.length > 0}
            />
          </section>
        </div>

        {/* =====================================================
              AI COMPANION
        ====================================================== */}
        <AIChat
          expenses={expenses}
          budget={budget}
          total={total}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
        {/* =====================================================
          ANALYTICS
      ====================================================== */}
        <section id="analytics" className="mt-8 scroll-mt-28">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Financial intelligence
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              Spending Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Understand where your business money is going.
            </p>
          </div>

          <div className="space-y-8">
            <CategorySummary expenses={expenses} />

            <AnalyticsCards expenses={expenses} />

            <ExpenseCharts expenses={expenses} />
          </div>
        </section>

        {/* =====================================================
          EXPENSE WORKSPACE
      ====================================================== */}
        <section id="expenses" className="mt-10 scroll-mt-28">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Receipt management
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              Manage Your Receipts
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add, categorize, search, and manage your business expenses.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* =================================================
              ADD EXPENSE
          ================================================== */}
            <section
              id="expense-form"
              className="
              scroll-mt-28
              rounded-3xl
              border border-gray-200
              bg-white
              p-6
              shadow-sm
              transition-all duration-300
              dark:border-gray-800
              dark:bg-[#101917]
              sm:p-7
            "
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div
                    className="
                    mb-3 flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-950/50
                    dark:text-emerald-400
                  "
                  >
                    <FaPlusCircle className="text-lg" />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingExpense ? "Edit Expense" : "Add New Receipt"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Let AI categorize your purchase automatically.
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="
                  mb-5 rounded-2xl
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

              {/* AI Categorization */}
              {isCategorizing && (
                <div
                  className="
                  mb-5 flex items-start gap-3
                  rounded-2xl
                  border border-emerald-200
                  bg-emerald-50
                  p-4
                  dark:border-emerald-900/60
                  dark:bg-emerald-950/30
                "
                >
                  <div
                    className="
                    mt-0.5 h-5 w-5 shrink-0
                    animate-spin rounded-full
                    border-2
                    border-emerald-600
                    border-t-transparent
                    dark:border-emerald-400
                    dark:border-t-transparent
                  "
                  />

                  <div>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      AI is reading your receipt...
                    </p>

                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
                      Identifying the most suitable expense category.
                    </p>
                  </div>
                </div>
              )}

              <ExpenseForm
                onAddExpense={handleAddExpense}
                onUpdateExpense={handleUpdateExpense}
                editingExpense={editingExpense}
                isCategorizing={isCategorizing}
                onCancelEdit={() => setEditingExpense(null)}
              />
            </section>

            {/* =================================================
              RECEIPT LEDGER
          ================================================== */}
            <section
              className="
              scroll-mt-28
              rounded-3xl
              border border-gray-200
              bg-white
              p-6
              shadow-sm
              transition-all duration-300
              dark:border-gray-800
              dark:bg-[#101917]
              lg:col-span-2
              sm:p-7
            "
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-emerald-50
                      text-emerald-600
                      dark:bg-emerald-950/50
                      dark:text-emerald-400
                    "
                    >
                      <FaClipboardList />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Recent Receipts
                      </h2>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your latest business transactions
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className="
                  w-fit rounded-full
                  border border-emerald-200
                  bg-emerald-50
                  px-3 py-1.5
                  text-xs font-semibold
                  text-emerald-700
                  dark:border-emerald-900/60
                  dark:bg-emerald-950/40
                  dark:text-emerald-300
                "
                >
                  {expenses.length}{" "}
                  {expenses.length === 1 ? "Receipt" : "Receipts"}
                </span>
              </div>

              {/* Filters */}
              <div className="mb-5">
                <ExpenseFilters
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>

              {/* Table */}
              <ExpenseTable
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
                onEditExpense={handleEditExpense}
              />
            </section>
          </div>
        </section>

        {/* =====================================================
          EXPORT
      ====================================================== */}
        <section id="export" className="mt-10 scroll-mt-28">
          <div
            className="
            rounded-3xl
            border border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-gray-800
            dark:bg-[#101917]
          "
          >
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Your data
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                Export Financial Records
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Download your expense information for reporting or bookkeeping.
              </p>
            </div>

            <ExportButtons
              disabled={expenses.length === 0}
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
