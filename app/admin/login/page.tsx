"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-6">
            <Lock className="w-4 h-4 text-[#FCDF59]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
              Admin Portal
            </span>
          </div>
          <h1
            className="text-3xl font-bold text-[#FCDF59]"
            style={{ fontFamily: "NeueMachina, serif" }}
          >
            Rotify Admin
          </h1>
          <p className="mt-2 text-sm text-[#FCDF59]/50">
            Sign in to manage orders and customers
          </p>
        </div>

        {/* Login Card - Double Bezel */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-[#FCDF59]/20 via-white/10 to-[#971303]/20">
          <div className="relative rounded-2xl bg-black/90 backdrop-blur-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm text-[#FCDF59]/80">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FCDF59]/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59] placeholder:text-[#FCDF59]/30 outline-none focus:border-[#FCDF59]/50 transition-colors duration-300"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm text-[#FCDF59]/80">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FCDF59]/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59] placeholder:text-[#FCDF59]/30 outline-none focus:border-[#FCDF59]/50 transition-colors duration-300"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[#FF000D] text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#971303] to-[#FF000D] text-[#FCDF59] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#FCDF59]/30 border-t-[#FCDF59] rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
