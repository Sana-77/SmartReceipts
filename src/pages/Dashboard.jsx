import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaPlusCircle } from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import AIInsights from "../components/AIInsights";

import { getExpenses, saveExpenses } from "../services/localStorage";

import { categorizeExpense, analyzeExpenses } from "../services/aiService";

function Dashboard() {
  // -------------------------
  // State
  // -------------------------

  const [expenses, setExpenses] = useState(getExpenses());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [insights, setInsights] = useState("");

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

  const handleAddExpense = async ({ itemName, price }) => {
    setIsLoading(true);

    try {
      const aiCategory = await categorizeExpense(itemName);

      const newExpense = {
        id: crypto.randomUUID(),
        itemName,
        price,
        aiCategory,
        createdAt: new Date().toISOString(),
      };

      setExpenses((prev) => [...prev, newExpense]);
    } catch (err) {
      console.error(err);

      setError("AI categorization failed. Saved as Miscellaneous.");

      const newExpense = {
        id: crypto.randomUUID(),
        itemName,
        price,
        aiCategory: "Miscellaneous",
        createdAt: new Date().toISOString(),
      };

      setExpenses((prev) => [...prev, newExpense]);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------
  // Delete Expense
  // -------------------------

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // -------------------------
  // AI Analysis
  // -------------------------

  const handleAnalyzeExpenses = async () => {
    if (!expenses.length) return;

    setIsLoading(true);

    try {
      const result = await analyzeExpenses(expenses);
      setInsights(result);
    } catch (err) {
      console.error(err);

      setInsights("Unable to analyze expenses at this time.");
    } finally {
      setIsLoading(false);
    }
  };

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-emerald-600">SmartReceipts</h1>

          <p className="mt-2 text-lg text-gray-600">
            AI-Powered Business Expense Tracker
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Track • Categorize • Analyze
          </p>

          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <FaCalendarAlt />
            <span>{today}</span>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Last Updated: {currentTime}
          </p>
        </header>

        {/* Summary */}

        <DashboardCard total={total} expenseCount={expenses.length} />

        {/* AI Insights */}

        <div className="mt-8">
          <AIInsights
            insights={insights}
            onAnalyze={handleAnalyzeExpenses}
            isLoading={isLoading}
            hasExpenses={expenses.length > 0}
          />
        </div>

        {/* Main Layout */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Form */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <FaPlusCircle className="text-xl text-emerald-600" />
              <h2 className="text-xl font-semibold">Add Expense</h2>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>

                <div>
                  <p className="font-medium text-emerald-700">
                    AI is categorizing your expense...
                  </p>

                  <p className="text-sm text-emerald-600">Please wait...</p>
                </div>
              </div>
            )}

            <ExpenseForm
              onAddExpense={handleAddExpense}
              isLoading={isLoading}
            />
          </section>

          {/* Expense List */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaClipboardList className="text-xl text-emerald-600" />

                <h2 className="text-xl font-semibold">Recent Expenses</h2>
              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {expenses.length} Expense
                {expenses.length !== 1 ? "s" : ""}
              </span>
            </div>

            <ExpenseTable
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
