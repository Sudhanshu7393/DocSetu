import Link from "next/link";
import {
  FileText, Users, FolderOpen, Download, TrendingUp,
  ArrowUpRight, ArrowDownRight, Eye, Plus, Activity,
  Star, AlertCircle,
} from "lucide-react";
import { categories } from "@/data/categories";
import { documents } from "@/data/documents";

const stats = [
  {
    label: "Active Document Templates",
    value: String(documents.length),
    change: "Live",
    up: true,
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    label: "Document Categories",
    value: String(categories.length),
    change: "Active",
    up: true,
    icon: FolderOpen,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    label: "System Health & Uptime",
    value: "100%",
    change: "Operational",
    up: true,
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    label: "Engine Status",
    value: "Online",
    change: "PDF + DOCX",
    up: true,
    icon: Download,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

const recentActivity = [
  { user: "Priya M.", action: "Created Rent Agreement", time: "2 min ago", type: "create" },
  { user: "Rahul K.", action: "Downloaded NDA (PDF)", time: "5 min ago", type: "download" },
  { user: "Anjali S.", action: "Registered new account", time: "12 min ago", type: "register" },
  { user: "Deepak R.", action: "Created Offer Letter", time: "18 min ago", type: "create" },
  { user: "Meera T.", action: "Submitted feedback (5★)", time: "25 min ago", type: "feedback" },
  { user: "Vikram P.", action: "Upgraded to Premium", time: "31 min ago", type: "upgrade" },
];

const topDocuments = [
  { name: "Rent Agreement", count: 18240, pct: 92 },
  { name: "General Affidavit", count: 11830, pct: 70 },
  { name: "NDA", count: 9450, pct: 58 },
  { name: "Offer Letter", count: 7120, pct: 44 },
  { name: "Study Gap Affidavit", count: 5840, pct: 36 },
  { name: "Income Certificate App", count: 3200, pct: 22 },
];

const activityColor: Record<string, string> = {
  create: "bg-blue-500",
  download: "bg-purple-500",
  register: "bg-green-500",
  feedback: "bg-amber-500",
  upgrade: "bg-indigo-500",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Platform health at a glance · Last updated: just now
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/documents/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus size={15} /> New Document
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`rounded-2xl border p-5 ${bg}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon size={17} className={color} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  up ? "text-green-400" : "text-red-400"
                }`}
              >
                {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Documents */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-400" /> Top Documents
            </h2>
            <Link href="/admin/documents" className="text-xs text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {topDocuments.map((doc, i) => (
              <div key={doc.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 w-4">{i + 1}</span>
                    <span className="text-sm text-slate-300 font-medium">{doc.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{doc.count.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden ml-6">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                    style={{ width: `${doc.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Activity size={16} className="text-green-400" /> Live Activity
            </h2>
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColor[item.type]}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {item.user}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{item.action}</p>
                </div>
                <span className="text-[10px] text-slate-600 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { href: "/admin/categories", label: "Manage Categories", icon: FolderOpen, count: categories.length },
          { href: "/admin/documents", label: "Manage Documents", icon: FileText, count: documents.length },
          { href: "/admin/users", label: "Manage Users", icon: Users, count: "18.2k" },
          { href: "/admin/feedback", label: "Review Feedback", icon: Star, count: "4.9★" },
        ].map(({ href, label, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col gap-3 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <Icon size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              <ArrowUpRight size={13} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* System status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle size={15} className="text-green-400" /> System Status
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "API", status: "Operational", ok: true },
            { label: "Database", status: "Operational", ok: true },
            { label: "PDF Engine", status: "Operational", ok: true },
            { label: "Storage", status: "Operational", ok: true },
          ].map(({ label, status, ok }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${ok ? "bg-green-400" : "bg-red-400"}`} />
              <div>
                <p className="text-xs font-medium text-slate-300">{label}</p>
                <p className={`text-[10px] ${ok ? "text-green-400" : "text-red-400"}`}>{status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
