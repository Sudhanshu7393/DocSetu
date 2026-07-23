"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Clock, Crown, Filter, X } from "lucide-react";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "free" | "premium">("all");

  const results = documents.filter((doc) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    const matchQuery =
      doc.name.toLowerCase().includes(q) ||
      doc.nameHi.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat = catFilter === "all" || doc.categoryId === catFilter;
    const matchType =
      typeFilter === "all" ||
      (typeFilter === "free" && !doc.isPremium) ||
      (typeFilter === "premium" && doc.isPremium);
    return matchQuery && matchCat && matchType;
  });

  const suggestions = [
    "rent agreement", "affidavit", "NDA", "offer letter",
    "lease", "employment", "gap certificate", "income certificate",
  ];

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Search bar header */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-slate-900 py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-6">
            Find the Right Document
          </h1>
          <div className="relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: rent agreement, affidavit, NDA…"
              autoFocus
              className="w-full pl-14 pr-14 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Suggestions */}
          {!hasQuery && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 self-center">Try:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {hasQuery && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Filter size={13} />
                <span>Filter:</span>
              </div>

              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {(["all", "free", "premium"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors",
                      typeFilter === t
                        ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {results.length === 0
                ? `No results for "${query}"`
                : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
            </p>

            {/* Results */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((doc) => {
                  const cat = categories.find((c) => c.id === doc.categoryId);
                  return (
                    <Link
                      key={doc.id}
                      href={`/documents/${doc.slug}`}
                      className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-200 hover:-translate-y-0.5 card-glow"
                    >
                      {cat && (
                        <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color} mb-3`}>
                          {cat.icon} {cat.name}
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                          {doc.name}
                        </h3>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0 mt-0.5 ml-2" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={10} /> {doc.estimatedTime}
                        </span>
                        {doc.isPremium ? (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/50 flex items-center gap-0.5">
                            <Crown size={9} /> PRO
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800/50">
                            FREE
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Try different keywords or browse all categories.
                </p>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Browse All Documents
                </Link>
              </div>
            )}
          </>
        )}

        {/* Browse by category (shown when no search) */}
        {!hasQuery && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all group"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{cat.documentCount} docs</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
