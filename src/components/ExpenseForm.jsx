import { useEffect, useState } from "react";
import {
  FaImage,
  FaTimes,
  FaPlus,
  FaEdit,
  FaUpload,
  FaReceipt,
} from "react-icons/fa";

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

  const inputClasses = `
    w-full
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    px-4
    py-3.5
    text-sm
    font-medium
    text-gray-900
    outline-none
    transition-all
    duration-200

    placeholder:text-gray-400

    hover:border-gray-300

    focus:border-emerald-500
    focus:bg-white
    focus:ring-4
    focus:ring-emerald-500/10

    disabled:cursor-not-allowed
    disabled:opacity-60

    dark:border-gray-700
    dark:bg-gray-900
    dark:text-white
    dark:placeholder:text-gray-600

    dark:hover:border-gray-600

    dark:focus:border-emerald-500
    dark:focus:bg-gray-950
    dark:focus:ring-emerald-500/10
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* =====================================================
          FORM HEADER
      ====================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          p-4
          dark:border-gray-800
          dark:bg-gray-900/60
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600
              dark:bg-emerald-950/50
              dark:text-emerald-400
            "
          >
            {editingExpense ? <FaEdit /> : <FaPlus />}
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {editingExpense
                ? "Update your expense details below."
                : "Record a new expense and let AI categorize it."}
            </p>
          </div>
        </div>

        {editingExpense && (
          <span
            className="
              hidden
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-emerald-700
              sm:inline-flex
              dark:border-emerald-900/60
              dark:bg-emerald-950/40
              dark:text-emerald-400
            "
          >
            Editing
          </span>
        )}
      </div>

      {/* =====================================================
          EXPENSE DETAILS
      ====================================================== */}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Item Name */}

        <div className="sm:col-span-2">
          <label
            htmlFor="expense-item-name"
            className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              dark:text-gray-400
            "
          >
            Item or Expense Name
          </label>

          <input
            id="expense-item-name"
            type="text"
            placeholder="e.g. Printer Ink"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            disabled={isCategorizing}
            className={inputClasses}
          />

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Enter a clear name so AI can categorize the expense accurately.
          </p>
        </div>

        {/* Price */}

        <div>
          <label
            htmlFor="expense-price"
            className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              dark:text-gray-400
            "
          >
            Amount
          </label>

          <div className="relative">
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-sm
                font-bold
                text-gray-500
                dark:text-gray-400
              "
            >
              $
            </span>

            <input
              id="expense-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isCategorizing}
              className={`${inputClasses} pl-8`}
            />
          </div>
        </div>

        {/* AI Category Notice */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-emerald-100
            bg-emerald-50/70
            px-4
            py-3
            dark:border-emerald-900/40
            dark:bg-emerald-950/20
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-emerald-600
              shadow-sm
              dark:bg-gray-800
              dark:text-emerald-400
            "
          >
            <FaReceipt />
          </div>

          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              AI Categorization
            </p>

            <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
              Your expense will be categorized automatically.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECEIPT UPLOAD
      ====================================================== */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              dark:text-gray-400
            "
          >
            Receipt
          </label>

          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            Optional
          </span>
        </div>

        {!receiptImage ? (
          <label
            className={`
              group
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              px-6
              py-8
              text-center
              transition-all
              duration-200

              ${
                isCategorizing
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-gray-800 dark:bg-gray-900"
                  : "border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-gray-700 dark:bg-gray-900/60 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20"
              }
            `}
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white
                text-emerald-600
                shadow-sm
                transition-transform
                duration-200
                group-hover:scale-105
                dark:bg-gray-800
                dark:text-emerald-400
              "
            >
              <FaUpload />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Upload a receipt
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Click to browse your device
            </p>

            <span
              className="
                mt-3
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-[10px]
                font-medium
                text-gray-500
                dark:bg-gray-800
                dark:text-gray-400
              "
            >
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
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              p-3
              dark:border-gray-700
              dark:bg-gray-900
            "
          >
            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                dark:border-gray-700
                dark:bg-gray-950
              "
            >
              <img
                src={receiptImage}
                alt="Receipt preview"
                className="
                  max-h-72
                  w-full
                  object-contain
                "
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-50
                    text-emerald-600
                    dark:bg-emerald-950/50
                    dark:text-emerald-400
                  "
                >
                  <FaImage className="text-xs" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    Receipt attached
                  </p>

                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    Image ready to save
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveReceipt}
                disabled={isCategorizing}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  text-red-500
                  transition-all
                  duration-200
                  hover:bg-red-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-red-900/50
                  dark:bg-red-950/30
                  dark:text-red-400
                  dark:hover:bg-red-950/50
                "
                aria-label="Remove receipt"
                title="Remove receipt"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row dark:border-gray-800">
        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCategorizing}
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-3.5
              text-sm
              font-semibold
              text-gray-600
              transition-all
              duration-200
              hover:border-gray-300
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-gray-300
              dark:hover:bg-gray-800
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isCategorizing}
          className="
            group
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-6
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-emerald-700
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:bg-gray-400
            disabled:shadow-none
            dark:bg-emerald-500
            dark:text-gray-950
            dark:hover:bg-emerald-400
          "
        >
          {isCategorizing ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                  dark:border-gray-900/40
                  dark:border-t-gray-900
                "
              />

              <span>Categorizing expense...</span>
            </>
          ) : (
            <>
              {editingExpense ? <FaEdit /> : <FaPlus />}

              <span>{editingExpense ? "Update Expense" : "Add Expense"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
