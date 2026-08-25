import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProfileMenu() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

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
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // REFRESH USER
  // =====================================================

  const refreshUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Unable to refresh profile:", error);
      return;
    }

    setUser(user);
  };

  // =====================================================
  // SIGN OUT
  // =====================================================

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      return;
    }

    navigate("/signin");
  };

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {
    return null;
  }

  // =====================================================
  // USER INFORMATION
  // =====================================================

  const email = user.email || "User";

  const avatarLetter = email.charAt(0).toUpperCase();

  const avatarUrl = user.user_metadata?.avatar_url || "";

  return (
    <div ref={menuRef} className="relative">
      {/* =================================================
          PROFILE BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={async () => {
          await refreshUser();
          setIsOpen((prev) => !prev);
        }}
        className="
          flex items-center gap-2.5
          rounded-xl
          border border-gray-200
          bg-white
          px-2.5 py-2
          transition-all duration-200
          hover:border-emerald-200
          hover:bg-emerald-50

          dark:border-gray-700
          dark:bg-gray-900
          dark:hover:border-emerald-900
          dark:hover:bg-emerald-950/30
        "
        aria-expanded={isOpen}
        aria-label="Open profile menu"
      >
        {/* Avatar */}

        <div
          className="
            flex h-8 w-8
            shrink-0
            items-center justify-center
            overflow-hidden
            rounded-lg
            bg-emerald-500
            text-sm font-bold
            text-white
          "
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            avatarLetter
          )}
        </div>

        {/* User Information */}

        <span className="hidden max-w-[150px] text-left sm:block">
          <span
            className="
              block truncate
              text-xs font-semibold
              text-gray-800
              dark:text-gray-200
            "
          >
            {email}
          </span>

          <span
            className="
              block text-[10px]
              font-medium uppercase
              tracking-wider
              text-gray-400
            "
          >
            Account
          </span>
        </span>

        {/* Arrow */}

        <FaChevronDown
          className={`
            hidden
            text-[10px]
            text-gray-400
            transition-transform
            sm:block
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* =================================================
          DROPDOWN
      ================================================== */}

      {isOpen && (
        <div
          className="
            absolute right-0 top-full z-[100]
            mt-2 w-64
            overflow-hidden
            rounded-2xl
            border border-gray-200
            bg-white
            shadow-xl
            shadow-gray-900/10

            dark:border-gray-800
            dark:bg-[#101917]
            dark:shadow-black/30
          "
        >
          {/* =================================================
              USER HEADER
          ================================================== */}

          <div
            className="
              border-b border-gray-100
              bg-gray-50
              px-4 py-4

              dark:border-gray-800
              dark:bg-gray-900/60
            "
          >
            <div className="flex items-center gap-3">
              {/* Larger Avatar */}

              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  bg-emerald-500
                  text-sm font-bold
                  text-white
                "
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              {/* User Details */}

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {email}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  SmartReceipts account
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MENU ITEMS
          ================================================== */}

          <div className="p-2">
            {/* My Profile */}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate("/profile");
              }}
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                text-left
                text-sm font-medium
                text-gray-600
                transition

                hover:bg-gray-50
                hover:text-gray-900

                dark:text-gray-300
                dark:hover:bg-gray-800
                dark:hover:text-white
              "
            >
              <span
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-gray-100
                  text-gray-500

                  dark:bg-gray-800
                  dark:text-gray-400
                "
              >
                <FaUser />
              </span>

              <span>My Profile</span>
            </button>
          </div>

          {/* =================================================
              SIGN OUT
          ================================================== */}

          <div
            className="
              border-t
              border-gray-100
              p-2

              dark:border-gray-800
            "
          >
            <button
              type="button"
              onClick={handleSignOut}
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                text-left
                text-sm font-semibold
                text-red-500
                transition

                hover:bg-red-50
                hover:text-red-600

                dark:hover:bg-red-950/20
                dark:hover:text-red-400
              "
            >
              <span
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-red-50
                  text-red-500

                  dark:bg-red-950/30
                "
              >
                <FaSignOutAlt />
              </span>

              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
