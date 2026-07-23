"use client";
import { useState } from "react";
import Link from "next/link";
import { Bookmark, Search, ArrowRight, Clock, Crown, Trash2, FolderOpen } from "lucide-react";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";

// Mock saved documents (in production these come from DB)
const savedSlugs = ["rent-agreement", "general-affidavit", "power-of-attorney", "employment-contract"];

export default function DashboardSavedPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(savedSlugs);

  const savedDocs = documents
    .filter((d) => saved.includes(d.slug))
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  const removeSaved = (slug: string) => setSaved((prev) => prev.filter((s) => s !== slug));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3 p-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">U</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">User Name</p>
                  <p className="text-xs text-slate-500">Free Plan</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/dashboard/history", label: "History" },
                  { href: "/dashboard/saved", label: "Saved", active: true },
                  { href: "/dashboard/settings", label: "Settings" },
                ].map(({ href, label, active }) => (
                  <Link key={href} href={href}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bookmark size={22} className="text-blue-500" /> Saved Documents
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">{saved.length} saved documents</p>
              </div>
              <Link href="/categories" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                + Browse More
              </Link>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search saved documents..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {savedDocs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <FolderOpen size={40} className="text-slate-300 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {search ? "No results found" : "No saved documents yet"}
                </h3>
                <p className="text-sm text-slate-500 mb-5">
                  {search ? "Try different keywords" : "Browse documents and click the bookmark icon to save them here"}
                </p>
                <Link href="/categories" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                  Browse Documents <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedDocs.map((doc) => {
                  const cat = categories.find((c) => c.id === doc.categoryId);
                  return (
                    <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
                      {cat && (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color} mb-3`}>
                          {cat.icon} {cat.name}
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{doc.name}</h3>
                        <button
                          onClick={() => removeSaved(doc.slug)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                          title="Remove from saved"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 mb-3 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={10} /> {doc.estimatedTime}
                          </span>
                          {doc.isPremium && (
                            <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                              <Crown size={9} /> PRO
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/documents/${doc.slug}/generate`}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Create <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
