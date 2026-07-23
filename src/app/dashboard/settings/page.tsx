"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Bell, Lock, CreditCard, Globe, Trash2, CheckCircle, Save } from "lucide-react";
import type { Metadata } from "next";

export default function DashboardSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "User Name",
    email: "user@example.com",
    phone: "",
    language: "en",
    emailNotifications: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3 p-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">U</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{form.name}</p>
                  <p className="text-xs text-slate-500">Free Plan</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/dashboard/history", label: "History" },
                  { href: "/dashboard/saved", label: "Saved" },
                  { href: "/dashboard/settings", label: "Settings", active: true },
                ].map(({ href, label, active }) => (
                  <Link key={href} href={href} className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-5">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>

            {/* Profile */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-5">
                <User size={16} className="text-slate-500" />
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Profile Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone Number (optional)", key: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className={key === "phone" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Globe size={16} className="text-slate-500" />
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Language</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "en", label: "English", flag: "🇬🇧" },
                  { value: "hi", label: "हिन्दी (Hindi)", flag: "🇮🇳" },
                ].map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setForm({ ...form, language: lang.value })}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      form.language === lang.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    {lang.label}
                    {form.language === lang.value && <CheckCircle size={14} className="ml-auto text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Bell size={16} className="text-slate-500" />
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Document ready & download notifications", desc: "Get notified when your document is ready" },
                  { key: "marketingEmails", label: "Product updates & new documents", desc: "Be the first to know about new document types" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                      className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${form[key as keyof typeof form] ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form[key as keyof typeof form] ? "translate-x-4" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={16} className="text-slate-500" />
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Subscription</h2>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Free Plan</p>
                  <p className="text-xs text-slate-500 mt-0.5">3 documents/month</p>
                </div>
                <Link href="/pricing" className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                  Upgrade to Premium
                </Link>
              </div>
            </div>

            {/* Save */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {}}
                className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                <Trash2 size={14} /> Delete Account
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
