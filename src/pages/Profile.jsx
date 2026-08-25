import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCamera,
  FaCheck,
  FaEnvelope,
  FaShieldAlt,
  FaUser,
  FaTrash,
} from "react-icons/fa";

import { supabase } from "../lib/supabase";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (!user) {
          navigate("/signin", { replace: true });
          return;
        }

        setUser(user);
        setAvatarUrl(user.user_metadata?.avatar_url || "");
        // Read existing profile name
        setFullName(
          user.user_metadata?.full_name || user.user_metadata?.name || "",
        );
      } catch (err) {
        console.error("Profile loading error:", err);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    setError("");
    setSuccess("");

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Maximum 2 MB
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile photo must be smaller than 2 MB.");
      return;
    }

    setIsUploading(true);

    try {
      // One permanent avatar path for each user
      const filePath = `${user.id}/avatar`;

      // Upload / replace existing avatar
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: "3600",
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Add cache-busting timestamp
      const avatarUrl = `${publicUrl}?t=${Date.now()}`;

      // Save URL to Supabase Auth metadata
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: avatarUrl,
        },
      });

      if (updateError) {
        throw updateError;
      }

      // Update local state immediately
      setUser(data.user);
      setAvatarUrl(avatarUrl);

      setSuccess("Profile photo updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError(err.message || "Unable to upload profile photo.");
    } finally {
      setIsUploading(false);

      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: trimmedName,
        },
      });

      if (error) {
        throw error;
      }

      setUser(data.user);
      setFullName(
        data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          "",
      );

      setSuccess("Your profile has been updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message || "Unable to update your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7f6] dark:bg-[#080f0d]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
            S
          </div>

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  // =====================================================
  // USER INFORMATION
  // =====================================================

  const email = user.email || "No email";

  const avatarLetter = email.charAt(0).toUpperCase();

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-gray-900 transition-colors duration-300 dark:bg-[#080f0d] dark:text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* =====================================================
            TOP BAR
        ====================================================== */}

        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              flex items-center gap-2
              rounded-xl
              border border-gray-200
              bg-white
              px-4 py-2.5
              text-sm font-semibold
              text-gray-600
              shadow-sm
              transition
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:text-emerald-600

              dark:border-gray-800
              dark:bg-[#101917]
              dark:text-gray-300
              dark:hover:border-emerald-900
              dark:hover:bg-emerald-950/30
              dark:hover:text-emerald-400
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to Dashboard
          </button>
        </div>

        {/* =====================================================
            PROFILE HEADER
        ====================================================== */}

        <section
          className="
            relative overflow-hidden
            rounded-3xl
            border border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-gray-800
            dark:bg-[#101917]
            sm:p-8
          "
        >
          {/* Decorative glow */}

          <div
            className="
              pointer-events-none
              absolute -right-24 -top-24
              h-64 w-64
              rounded-full
              bg-emerald-500/10
              blur-3xl
            "
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}

            <div className="relative">
              <div
                className="
    flex h-24 w-24
    items-center justify-center
    overflow-hidden
    rounded-3xl
    bg-emerald-500
    text-3xl font-bold
    text-white
    shadow-lg
    shadow-emerald-500/20
  "
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className="
    absolute -bottom-2 -right-2
    flex h-9 w-9
    cursor-pointer
    items-center justify-center
    rounded-xl
    border-4
    border-white
    bg-gray-900
    text-xs
    text-white
    transition
    hover:bg-emerald-500
    dark:border-[#101917]
  "
                title="Change profile photo"
              >
                {isUploading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <FaCamera />
                )}

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* User information */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                My Account
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {fullName || "Welcome to SmartReceipts"}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaEnvelope className="text-emerald-500" />
                {email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active account
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}

          <section
            className="
              rounded-3xl
              border border-gray-200
              bg-white
              p-6
              shadow-sm
              dark:border-gray-800
              dark:bg-[#101917]
              lg:col-span-2
            "
          >
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FaUser />
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Update the information associated with your SmartReceipts
                account.
              </p>
            </div>

            {/* Success */}

            {success && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                <FaCheck />
                {success}
              </div>
            )}

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Form */}

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Full name */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="
                    w-full rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-3.5
                    text-sm text-gray-900
                    outline-none
                    transition
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

                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-gray-50
                      py-3.5 pl-10 pr-4
                      text-sm text-gray-500
                      outline-none

                      dark:border-gray-700
                      dark:bg-gray-900/60
                      dark:text-gray-500
                    "
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Your email is managed by your authentication provider.
                </p>
              </div>

              {/* Save */}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="
                    rounded-xl
                    bg-emerald-500
                    px-5 py-3
                    text-sm font-bold
                    text-[#06110e]
                    shadow-lg
                    shadow-emerald-500/10
                    transition
                    hover:-translate-y-0.5
                    hover:bg-emerald-400
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================== */}

          <section
            className="
              rounded-3xl
              border border-gray-200
              bg-white
              p-6
              shadow-sm
              dark:border-gray-800
              dark:bg-[#101917]
            "
          >
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FaShieldAlt />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Account
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your SmartReceipts account information.
            </p>

            <div className="mt-6 space-y-4">
              {/* Status */}

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Account status
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Active
                </p>
              </div>

              {/* Member since */}

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Member since
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {createdAt}
                </p>
              </div>

              {/* Authentication */}

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Authentication
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Secure Supabase Auth
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            SECURITY
        ====================================================== */}

        <section
          className="
            mt-8
            rounded-3xl
            border border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-gray-800
            dark:bg-[#101917]
          "
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FaShieldAlt />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Security & Privacy
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Your SmartReceipts account is protected using Supabase
                authentication. Your expenses are associated with your
                authenticated account and protected by database security
                policies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
