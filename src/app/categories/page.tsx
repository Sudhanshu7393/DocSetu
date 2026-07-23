import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { categories } from "@/data/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Document Categories",
  description:
    "Browse all document categories — Property, Legal, Business, Government, Student, Employment, Finance and more. Create official documents in minutes.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/40 dark:to-slate-900 py-14 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            All Categories
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
            Browse Document Categories
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Find the right document category for your needs. Expert-reviewed templates for every
            official requirement.
          </p>
          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-0.5 card-glow"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl ${cat.bgColor} flex items-center justify-center text-3xl`}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h2>
                  <ArrowRight
                    size={16}
                    className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {cat.description}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-slate-400 dark:text-slate-500">
                  {cat.documentCount} documents available
                </span>
              </div>
            </Link>
          ))}

          {/* Coming Soon */}
          {["Healthcare", "Societies", "Banking", "Tax", "Insurance"].map((name) => (
            <div
              key={name}
              className="flex items-start gap-5 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 opacity-60"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-3xl opacity-40">
                🔜
              </div>
              <div>
                <p className="font-semibold text-slate-500 dark:text-slate-500">{name}</p>
                <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
