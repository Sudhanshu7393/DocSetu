import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  Bell,
  ChevronRight,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel – DocSetu",
  description: "DocSetu Administration Dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/documents", label: "Documents", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="block">
            <Image
              src="/logo.jpg"
              alt="DocSetu Admin"
              width={140}
              height={40}
              className="h-8 w-auto object-contain rounded-lg bg-white/5 p-1"
            />
          </Link>
        </div>

        {/* Back to Website Home button */}
        <div className="px-3 pt-3 pb-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 text-xs font-semibold transition-colors"
          >
            <Home size={14} />
            <span>Back to Main Website</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
            >
              <Icon size={16} className="group-hover:text-blue-400 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@docsetu.in</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-red-400 transition-colors mt-1"
          >
            <LogOut size={13} /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">DocSetu</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
              <Bell size={14} className="text-slate-400" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
