"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, FileText, ArrowRight, Globe, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const perks = [
    "3 free documents per month",
    "Save & re-download documents",
    "Document history dashboard",
    "Submission guidance for every doc",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Doc<span className="text-blue-400">Setu</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Create your free account</h1>
          <p className="text-slate-400 text-sm">Join 50,000+ Indians creating documents on DocSetu</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
          {/* Perks */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-xs text-slate-300">
                <CheckCircle size={11} className="text-green-400 flex-shrink-0" /> {p}
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm transition-all shadow-sm mb-6">
            <Globe size={18} />
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-xs text-slate-400">or with email</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone (Optional)</label>
                <div className="flex">
                  <span className="px-3 py-3 bg-white/5 border border-white/20 border-r-0 rounded-l-xl text-slate-400 text-sm">+91</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-3 rounded-r-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-11"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? "Creating account..." : <>Create Free Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </div>
        <p className="text-center text-xs text-slate-600 mt-4">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-slate-500 hover:text-slate-400">Terms</Link> &{" "}
          <Link href="/privacy" className="text-slate-500 hover:text-slate-400">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
