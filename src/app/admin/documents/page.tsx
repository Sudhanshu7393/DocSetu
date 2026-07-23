"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Edit, Eye, Trash2, Crown, Star, Sparkles, Filter } from "lucide-react";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";

type FilterType = "all" | "free" | "premium" | "popular" | "new";

export default function AdminDocumentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = documents.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "free" && !doc.isPremium) ||
      (filter === "premium" && doc.isPremium) ||
      (filter === "popular" && doc.isPopular) ||
      (filter === "new" && doc.isNew);
    const matchCat = catFilter === "all" || doc.categoryId === catFilter;
    return matchSearch && matchFilter && matchCat;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {documents.length} templates · Manage all document types
          </p>
        </div>
        <Link
          href="/admin/documents/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={15} /> New Document
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-700 rounded-xl">
          {(["all", "free", "premium", "popular", "new"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500">Showing {filtered.length} documents</p>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Document</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Time</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Steps</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Flags</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((doc) => {
                const cat = categories.find((c) => c.id === doc.categoryId);
                return (
                  <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{doc.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-48">{doc.description}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {cat && (
                        <span className={`flex items-center gap-1 text-xs font-medium ${cat.color} px-2 py-1 rounded-lg ${cat.bgColor} w-fit`}>
                          {cat.icon} {cat.name}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {doc.isPremium ? (
                        <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                          <Crown size={11} /> Premium
                        </span>
                      ) : (
                        <span className="text-xs text-green-400 font-medium">Free</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400">{doc.estimatedTime}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400">{doc.steps.length} sections</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {doc.isPopular && (
                          <span title="Popular">
                            <Star size={13} className="text-amber-400" />
                          </span>
                        )}
                        {doc.isNew && (
                          <span title="New">
                            <Sparkles size={13} className="text-blue-400" />
                          </span>
                        )}
                        {doc.stampRequired && <span title="Stamp Required" className="text-[10px] text-orange-400">🔖</span>}
                        {doc.witnessRequired && <span title="Witnesses" className="text-[10px] text-purple-400">👥</span>}
                        {doc.notaryRecommended && <span title="Notary" className="text-[10px] text-indigo-400">🔏</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/documents/${doc.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <Eye size={14} />
                        </Link>
                        <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
