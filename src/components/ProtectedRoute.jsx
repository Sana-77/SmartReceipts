import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Authentication check failed:", error);
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7f6] dark:bg-[#080f0d]">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-emerald-500
              text-lg font-bold
              text-white
              shadow-lg
              shadow-emerald-500/20
            "
          >
            S
          </div>

          {/* Spinner */}
          <div
            className="
              h-5 w-5
              animate-spin
              rounded-full
              border-2
              border-emerald-500
              border-t-transparent
            "
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated
  return children;
}

export default ProtectedRoute;
