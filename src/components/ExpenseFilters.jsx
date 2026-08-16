import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  const inputClasses = `
    w-full
    rounded-xl
    border border-gray-200
    bg-gray-50
    px-4 py-3
    text-sm
    text-gray-800
    outline-none
    transition-all duration-200
    placeholder:text-gray-400
    hover:border-gray-300
    focus:border-emerald-500
    focus:bg-white
    focus:ring-4
    focus:ring-emerald-500/10
    dark:border-gray-800
    dark:bg-[#0c1513]
    dark:text-gray-100
    dark:placeholder:text-gray-600
    dark:hover:border-gray-700
    dark:focus:border-emerald-500
    dark:focus:bg-[#101917]
  `;

  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-gray-50/70
        p-4
        dark:border-gray-800
        dark:bg-[#0c1513]
      "
    >
      <div className="mb-4 flex items-center gap-2">
        <FaFilter className="text-xs text-emerald-500" />

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
          Filter & organize receipts
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <FaSearch
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              text-xs
              text-gray-400
              dark:text-gray-600
            "
          />

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClasses} pl-10`}
          />
        </div>

        {/* Category */}
        <div className="relative">
          <FaFilter
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              text-xs
              text-gray-400
              dark:text-gray-600
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClasses} cursor-pointer appearance-none pl-10`}
          >
            <option value="All">All Categories</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Software">Software</option>
            <option value="Utilities">Utilities</option>
            <option value="Marketing">Marketing</option>
            <option value="Equipment">Equipment</option>
            <option value="Transportation">Transportation</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          <FaSortAmountDown
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              text-xs
              text-gray-400
              dark:text-gray-600
            "
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${inputClasses} cursor-pointer appearance-none pl-10`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Price</option>
            <option value="lowest">Lowest Price</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;
