import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaReceipt,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (error) {
        throw error;
      }

      console.log("Account created:", data);

      navigate("/dashboard");
    } catch (err) {
      console.error("Sign up error:", err);

      setError(err.message || "Unable to create your account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-gray-900 transition-colors duration-300 dark:bg-[#080f0d] dark:text-gray-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT — PRODUCT INTRO
        ====================================================== */}

        <section className="relative hidden overflow-hidden bg-[#0b1513] lg:flex lg:flex-col lg:justify-between">
          {/* Decorative glow */}

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
              Take control of
              <br />
              <span className="text-emerald-400">every expense.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-400">
              Create your SmartReceipts workspace and bring your expenses,
              budgets, reports, and AI-powered financial insights together.
            </p>

            {/* Benefits */}

            <div className="mt-8 space-y-3">
              {[
                "Organize all your business receipts",
                "Automatically categorize expenses with AI",
                "Understand your spending with smart analytics",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <FaCheck className="text-[10px]" />
                  </span>

                  {benefit}
                </div>
              ))}
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
            RIGHT — SIGN UP
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile brand */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">
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

            {/* Heading */}

            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FaUser />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Start managing your business finances with SmartReceipts.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {/* Full Name */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  className="
                    w-full rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-3.5
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
                  "
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>

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
                    px-4 py-3.5
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
                  "
                />
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                    "
                  />

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

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
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
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  group
                  mt-2
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
                "
              >
                {isLoading ? "Creating account..." : "Create Account"}
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Terms */}

            <p className="mt-5 text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
              By creating an account, you agree to use SmartReceipts responsibly
              and keep your account information secure.
            </p>

            {/* Sign In */}

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="
                font-semibold
                text-emerald-600
                hover:text-emerald-700
                dark:text-emerald-400
                dark:hover:text-emerald-300
                "
              >
                Sign in
              </Link>
            </p>

            {/* Security */}

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
              <FaShieldAlt className="mt-0.5 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                Your account will use secure authentication. We'll connect this
                form to the real authentication service next.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignUp;
