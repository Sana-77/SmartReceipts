function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  const inputClasses =
    "rounded-xl border border-gray-300 bg-white p-3 text-gray-800 outline-none transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white";

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`${inputClasses} dark:placeholder-gray-500`}
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={inputClasses}
      >
        <option value="All">All Categories</option>
        <option>Office Supplies</option>
        <option>Travel</option>
        <option>Meals</option>
        <option>Software</option>
        <option>Utilities</option>
        <option>Marketing</option>
        <option>Equipment</option>
        <option>Transportation</option>
        <option>Miscellaneous</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={inputClasses}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Price</option>
        <option value="lowest">Lowest Price</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  );
}

export default ExpenseFilters;
