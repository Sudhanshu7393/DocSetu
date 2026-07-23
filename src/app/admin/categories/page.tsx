"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Eye, Trash2, ToggleLeft, ToggleRight, Search, FolderOpen } from "lucide-react";
import { categories } from "@/data/categories";
import { getDocumentsByCategory } from "@/data/documents";

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, true]))
  );

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) =>
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {categories.length} categories · Manage document categories
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Documents</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Featured</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((cat) => {
                const docs = getDocumentsByCategory(cat.id);
                const isActive = activeStates[cat.id];
                return (
                  <tr key={cat.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${cat.bgColor} flex items-center justify-center text-lg flex-shrink-0`}>
                          {cat.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{cat.name}</p>
                          <p className="text-xs text-slate-500">{cat.nameHi}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-300">{docs.length} / {cat.documentCount}</span>
                    </td>
                    <td className="px-5 py-4">
                      {cat.featured ? (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggle(cat.id)} className="flex items-center gap-2 text-sm">
                        {isActive ? (
                          <>
                            <ToggleRight size={18} className="text-green-400" />
                            <span className="text-green-400 text-xs">Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={18} className="text-slate-600" />
                            <span className="text-slate-600 text-xs">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/categories/${cat.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                          title="View"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
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

      {/* Coming soon categories */}
      <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen size={15} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-400">Planned Categories (Coming Soon)</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Healthcare", "Societies", "Banking", "Tax", "Insurance"].map((name) => (
            <div key={name} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              {name}
            </div>
          ))}
          <button className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-xs flex items-center gap-1.5 hover:bg-blue-500/20 transition-colors">
            <Plus size={11} /> Add to roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
