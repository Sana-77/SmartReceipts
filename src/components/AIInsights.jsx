function AIInsights({ insights, onAnalyze, isLoading, hasExpenses }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">✨ AI Financial Insights</h2>

        <button
          onClick={onAnalyze}
          disabled={isLoading || !hasExpenses}
          className="rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Analyzing..." : "Analyze Spending"}
        </button>
      </div>

      {!hasExpenses ? (
        <p className="text-gray-500">
          Add some expenses before requesting AI insights.
        </p>
      ) : insights ? (
        <div className="whitespace-pre-wrap rounded-xl bg-emerald-50 p-4 text-gray-700">
          {insights}
        </div>
      ) : (
        <p className="text-gray-500">
          Click "Analyze Spending" to receive AI-powered financial insights.
        </p>
      )}
    </div>
  );
}

export default AIInsights;
