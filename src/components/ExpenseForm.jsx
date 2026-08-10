import { useEffect, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  isCategorizing,
  onCancelEdit,
}) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);

  useEffect(() => {
    if (editingExpense) {
      setItemName(editingExpense.itemName);
      setPrice(String(editingExpense.price));
      setReceiptImage(editingExpense.receiptImage || null);
    } else {
      setItemName("");
      setPrice("");
      setReceiptImage(null);
    }
  }, [editingExpense]);

  const handleReceiptChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Receipt image must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setReceiptImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveReceipt = () => {
    setReceiptImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName.trim() || !price) {
      alert("Please enter an item name and price.");
      return;
    }

    const expenseData = {
      itemName: itemName.trim(),
      price: Number(price),
      receiptImage,
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense.id, expenseData);
    } else {
      onAddExpense(expenseData);
    }

    setItemName("");
    setPrice("");
    setReceiptImage(null);
  };

  const handleCancel = () => {
    setItemName("");
    setPrice("");
    setReceiptImage(null);

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Item Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Item Name
        </label>

        <input
          type="text"
          placeholder="e.g. Printer Ink"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          disabled={isCategorizing}
          className={`${inputClasses} disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800`}
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Price ($)
        </label>

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isCategorizing}
          className={`${inputClasses} disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800`}
        />
      </div>

      {/* Receipt Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Receipt Image
        </label>

        {!receiptImage ? (
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-center transition dark:border-gray-600 ${
              isCategorizing
                ? "cursor-not-allowed bg-gray-100 opacity-60 dark:bg-gray-800"
                : "hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <FaImage className="mb-2 text-2xl text-emerald-600" />

            <span className="font-medium text-gray-700 dark:text-gray-200">
              Upload Receipt
            </span>

            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG or WEBP • Max 2MB
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleReceiptChange}
              disabled={isCategorizing}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-900">
            <img
              src={receiptImage}
              alt="Receipt preview"
              className="max-h-64 w-full rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={handleRemoveReceipt}
              disabled={isCategorizing}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Remove receipt"
            >
              <FaTimes />
            </button>

            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Receipt attached
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isCategorizing}
          className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${
            isCategorizing
              ? "cursor-not-allowed bg-gray-400"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isCategorizing
            ? "Categorizing..."
            : editingExpense
              ? "Update Expense"
              : "Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCategorizing}
            className="rounded-xl bg-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
