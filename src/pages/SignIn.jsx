import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaReceipt,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

function SignIn() {
  const navigate = useNavigate();

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while user is typing
    if (error) {
      setError("");
    }
  };

  // =====================================================
  // HANDLE SIGN IN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Signed in successfully:", data);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign in error:", err);

      setError(
        err.message ||
          "Unable to sign in. Please check your email and password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-gray-900 transition-colors duration-300 dark:bg-[#080f0d] dark:text-gray-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT — BRAND / PRODUCT INTRO
        ====================================================== */}

        <section className="relative hidden overflow-hidden bg-[#0b1513] lg:flex lg:flex-col lg:justify-between">
          {/* Decorative gradients */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          {/* Brand */}

          <div className="relative z-10 p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
                S
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-white">
                  Smart<span className="text-emerald-400">Receipts</span>
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  Financial workspace
                </p>
              </div>
            </div>
          </div>

          {/* Main message */}

          <div className="relative z-10 px-10 pb-10 xl:px-14 xl:pb-14">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <FaReceipt className="text-2xl" />
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Smarter spending.
              <br />
              <span className="text-emerald-400">
                Better financial decisions.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-400">
              Manage your business expenses, understand your spending patterns,
              and use AI-powered insights to make smarter financial decisions.
            </p>

            {/* Feature highlights */}

            <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
              {/* Feature 1 */}

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <FaReceipt />
                </div>

                <p className="text-sm font-semibold text-white">
                  Smart expense tracking
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Keep all your business receipts organized in one place.
                </p>
              </div>

              {/* Feature 2 */}

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <FaShieldAlt />
                </div>

                <p className="text-sm font-semibold text-white">
                  AI-powered insights
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Discover patterns and opportunities to improve spending.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="relative z-10 border-t border-white/5 px-10 py-5 xl:px-14">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} SmartReceipts. Financial workspace.
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT — SIGN IN FORM
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* =================================================
                MOBILE BRAND
            ================================================== */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
                S
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Smart<span className="text-emerald-500">Receipts</span>
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                  Financial workspace
                </p>
              </div>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FaUser />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to SmartReceipts
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Access your expenses, budgets, analytics, and AI financial
                insights.
              </p>
            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================== */}

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {/* =================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* =================================================
                  EMAIL
              ================================================== */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white
                      py-3.5 pl-10 pr-4
                      text-sm text-gray-900
                      outline-none
                      transition-all duration-200
                      placeholder:text-gray-400
                      focus:border-emerald-500
                      focus:ring-4
                      focus:ring-emerald-500/10
                      dark:border-gray-700
                      dark:bg-gray-900
                      dark:text-white
                      dark:placeholder:text-gray-600
                      dark:focus:border-emerald-500
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      // Forgot password will be connected
                      // to Supabase in the next step.
                      console.log("Forgot password clicked");
                    }}
                    className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white
                      py-3.5 pl-10 pr-12
                      text-sm text-gray-900
                      outline-none
                      transition-all duration-200
                      placeholder:text-gray-400
                      focus:border-emerald-500
                      focus:ring-4
                      focus:ring-emerald-500/10
                      dark:border-gray-700
                      dark:bg-gray-900
                      dark:text-white
                      dark:placeholder:text-gray-600
                      dark:focus:border-emerald-500
                    "
                  />

                  {/* Show / Hide Password */}

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  group
                  flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-emerald-500
                  px-5 py-3.5
                  text-sm font-bold
                  text-[#06110e]
                  shadow-lg
                  shadow-emerald-500/10
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-emerald-400
                  hover:shadow-xl
                  hover:shadow-emerald-500/20
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:translate-y-0
                  disabled:opacity-60
                "
              >
                {isLoading ? (
                  <>
                    <span
                      className="
                        h-4 w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-[#06110e]/30
                        border-t-[#06110e]
                      "
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                DIVIDER
            ================================================== */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />

              <span className="text-xs font-medium text-gray-400">
                Secure workspace
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* =================================================
                SIGN UP
            ================================================== */}

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="
                  font-semibold
                  text-emerald-600
                  transition-colors
                  hover:text-emerald-700
                  dark:text-emerald-400
                  dark:hover:text-emerald-300
                "
              >
                Create an account
              </Link>
            </div>

            {/* =================================================
                SECURITY NOTE
            ================================================== */}

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
              <FaShieldAlt className="mt-0.5 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                Your financial workspace is protected with secure authentication
                through Supabase. Your account credentials are securely handled
                by the authentication service.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignIn;
