import { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) return;
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError("Could not send reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-[#23272f] dark:to-[#1a1d23] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#23272f] rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
          Forgot your password?
        </h1>
        <p className="text-slate-500 dark:text-emerald-100 mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        {sent ? (
          <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 text-emerald-700 dark:text-emerald-200 text-center mb-4">
            ✨ Password reset link sent!
            <br />
            Please check your inbox (and spam folder).
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400 focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!email}
            >
              Send Reset Link
            </button>
          </form>
        )}
        <div className="mt-6 flex justify-between text-sm">
          <Link
            to="/login"
            className="text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            Back to Login
          </Link>
          <Link
            to="/signup"
            className="text-slate-500 dark:text-emerald-200 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
