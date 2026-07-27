import { useState } from "react";

function ExpenseForm({ onAddExpense, isLoading }) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName.trim() || !price) {
      alert("Please enter an item name and price.");
      return;
    }

    onAddExpense({
      itemName: itemName.trim(),
      price: Number(price),
    });

    setItemName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Item Name
        </label>

        <input
          type="text"
          placeholder="e.g. Printer Ink"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Price ($)
        </label>

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full rounded-xl py-3 font-semibold text-white transition ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isLoading ? "Categorizing..." : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
