function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        mt-auto
        border-t
        border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-[#0b1210]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          justify-center
          gap-2
          px-5
          py-5
          text-center
          sm:flex-row
          sm:gap-3
        "
      >
        <span
          className="
            text-xs
            text-gray-400
            dark:text-gray-500
          "
        >
          © {currentYear} SmartReceipts
        </span>

        <span
          className="
            hidden
            text-gray-300
            sm:block
            dark:text-gray-700
          "
        >
          •
        </span>

        <span
          className="
            text-xs
            text-gray-400
            dark:text-gray-500
          "
        >
          AI Money Tracker
        </span>

        <span
          className="
            hidden
            text-gray-300
            sm:block
            dark:text-gray-700
          "
        >
          •
        </span>

        <span
          className="
            text-xs
            text-gray-400
            dark:text-gray-500
          "
        >
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default AuthFooter;
