"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, FileText, Sun, Moon, ChevronDown,
  User, LayoutDashboard, LogOut, Settings, Search,
  ArrowRight, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";

const navLinks = [
  { href: "/categories", label: "Documents" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fake auth state — replace with real NextAuth session
  const isLoggedIn = false;

  // Hide header on admin pages
  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage) return null;

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close search on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handle);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener("mousedown", handle);
  }, [searchOpen]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Live search results (top 5)
  const searchResults = searchQuery.trim().length > 1
    ? documents
        .filter((d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60"
            : "bg-white dark:bg-slate-900"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <FileText size={16} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Doc<span className="text-blue-600 dark:text-blue-400">Setu</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === href || pathname.startsWith(href + "/")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Dark mode */}
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      U
                    </div>
                    <ChevronDown size={14} className="text-slate-500" />
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50">
                      {[
                        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { href: "/dashboard/settings", label: "Settings", icon: Settings },
                      ].map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Icon size={15} className="text-slate-400" /> {label}
                        </Link>
                      ))}
                      <hr className="my-1 border-slate-100 dark:border-slate-800" />
                      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full">
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm hover:shadow-blue-600/25"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 py-4" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents… e.g. rent agreement, affidavit, NDA"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>

              {/* Live results */}
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-1">
                  {searchResults.map((doc) => {
                    const cat = categories.find((c) => c.id === doc.categoryId);
                    return (
                      <Link
                        key={doc.id}
                        href={`/documents/${doc.slug}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <span className="text-xl flex-shrink-0">{cat?.icon || "📄"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={10} /> {doc.estimatedTime}
                            {doc.isPremium && <span className="text-amber-500 ml-1">· PRO</span>}
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                      </Link>
                    );
                  })}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="flex items-center justify-center gap-2 py-2.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    See all results for "{searchQuery}" <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              {/* Popular searches */}
              {searchQuery.trim().length === 0 && (
                <div className="mt-3">
                  <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Popular</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Rent Agreement", "Affidavit", "NDA", "Offer Letter", "Lease Deed"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSearchQuery(s)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    pathname === href
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {label}
                </Link>
              ))}
              <hr className="my-2 border-slate-100 dark:border-slate-800" />
              {!isLoggedIn && (
                <>
                  <Link
                    href="/login"
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-3 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
