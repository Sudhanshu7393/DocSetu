import Link from "next/link";
import {
  FileText, Clock, Download, Star, Plus, ArrowRight,
  LayoutDashboard, History, Bookmark, Settings, Crown
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your DocSetu documents",
};

// Simulated dashboard data — replace with real API calls
const recentDocs = [
  {
    id: "1", name: "Rent Agreement", category: "Property & Rental",
    icon: "🏠", status: "complete", updatedAt: "2 hours ago", slug: "rent-agreement",
  },
  {
    id: "2", name: "NDA", category: "Business",
    icon: "💼", status: "draft", updatedAt: "Yesterday", slug: "nda",
  },
  {
    id: "3", name: "Offer Letter", category: "Employment",
    icon: "👔", status: "complete", updatedAt: "3 days ago", slug: "offer-letter",
  },
];

const quickCreate = [
  { name: "Rent Agreement", slug: "rent-agreement", icon: "🏠" },
  { name: "General Affidavit", slug: "general-affidavit", icon: "⚖️" },
  { name: "NDA", slug: "nda", icon: "💼" },
  { name: "Offer Letter", slug: "offer-letter", icon: "👔" },
];

const stats = [
  { label: "Documents Created", value: "3", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { label: "Downloads", value: "7", icon: Download, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40" },
  { label: "Drafts Saved", value: "2", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { label: "Saved Templates", value: "5", icon: Bookmark, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/40" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* User */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">User Name</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Free Plan</p>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-lg border border-amber-200 dark:border-amber-800/40 hover:bg-amber-100 transition-colors"
                >
                  <Crown size={12} /> Upgrade to Premium
                </Link>
              </div>
              {/* Nav */}
              <nav className="p-3 space-y-1">
                {[
                  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
                  { href: "/dashboard/history", label: "History", icon: History, active: false },
                  { href: "/dashboard/saved", label: "Saved", icon: Bookmark, active: false },
                  { href: "/dashboard/settings", label: "Settings", icon: Settings, active: false },
                ].map(({ href, label, icon: Icon, active }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "sidebar-active text-blue-700 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={16} /> {label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back! Manage your documents here.</p>
              </div>
              <Link
                href="/categories"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Plus size={15} /> New Document
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                    <Icon size={17} className={color} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Quick create */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Quick Create</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickCreate.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/documents/${doc.slug}/generate`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group text-center"
                  >
                    <span className="text-2xl">{doc.icon}</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
                      {doc.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent documents */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white text-sm">Recent Documents</h2>
                <Link href="/dashboard/history" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">
                      {doc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category} · {doc.updatedAt}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        doc.status === "complete"
                          ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                      }`}>
                        {doc.status === "complete" ? "Complete" : "Draft"}
                      </span>
                      <Link
                        href={`/preview/${doc.slug}`}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Download size={14} />
                      </Link>
                      <Link
                        href={`/documents/${doc.slug}/generate`}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan usage */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Free Plan</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">3 of 3 documents used this month</p>
                </div>
                <Link href="/pricing" className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Upgrade
                </Link>
              </div>
              <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-full" />
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                ✦ Upgrade to Premium for unlimited documents, priority support, and more.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
