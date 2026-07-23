import Link from "next/link";
import { Download, FileText, ArrowRight, Clock, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document History – DocSetu",
};

const historyDocs = [
  { id: "1", name: "Rent Agreement", icon: "🏠", status: "complete", createdAt: "20 Jul 2025", downloads: 2, slug: "rent-agreement" },
  { id: "2", name: "NDA", icon: "💼", status: "complete", createdAt: "18 Jul 2025", downloads: 1, slug: "nda" },
  { id: "3", name: "Offer Letter", icon: "👔", status: "draft", createdAt: "15 Jul 2025", downloads: 0, slug: "offer-letter" },
  { id: "4", name: "General Affidavit", icon: "⚖️", status: "complete", createdAt: "10 Jul 2025", downloads: 3, slug: "general-affidavit" },
  { id: "5", name: "Study Gap Affidavit", icon: "🎓", status: "complete", createdAt: "5 Jul 2025", downloads: 1, slug: "study-gap-affidavit" },
];

export default function DashboardHistoryPage() {
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
                  { href: "/dashboard/history", label: "History", active: true },
                  { href: "/dashboard/saved", label: "Saved" },
                  { href: "/dashboard/settings", label: "Settings" },
                ].map(({ href, label, active }) => (
                  <Link key={href} href={href} className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
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
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Document History</h1>
                <p className="text-sm text-slate-500 mt-0.5">All documents you have created</p>
              </div>
              <Link href="/categories" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                + New Document
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-sm text-slate-500">{historyDocs.length} documents</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {historyDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0">
                      {doc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{doc.name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Clock size={10} /> {doc.createdAt}
                        {doc.downloads > 0 && <span>· {doc.downloads} download{doc.downloads !== 1 ? "s" : ""}</span>}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${doc.status === "complete" ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"}`}>
                      {doc.status === "complete" ? "Complete" : "Draft"}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link href={`/preview/${doc.slug}`} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors">
                        <Download size={14} />
                      </Link>
                      <Link href={`/documents/${doc.slug}/generate`} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
