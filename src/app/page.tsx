"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  Shield,
  Clock,
  FileCheck,
  Download,
  Star,
  Users,
  ChevronRight,
  Zap,
  CheckCircle,
  FileText,
  Sparkles,
  TrendingUp,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { categories, featuredCategories } from "@/data/categories";
import { getPopularDocuments } from "@/data/documents";
import { Category } from "@/types";

const popularDocs = getPopularDocuments(6);

const stats = [
  { value: "14+", label: "Official Templates", icon: FileText },
  { value: "9", label: "Document Categories", icon: FileCheck },
  { value: "100%", label: "Guided Questionnaires", icon: Shield },
  { value: "Instant", label: "PDF & DOCX Exports", icon: Download },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Document",
    description:
      "Browse our library of expert-reviewed document templates. Find exactly what you need from 9 categories.",
    icon: Search,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Answer Simple Questions",
    description:
      "Our guided wizard asks you plain-language questions. No legal jargon. No confusing forms.",
    icon: FileText,
    color: "from-violet-500 to-violet-600",
  },
  {
    step: "03",
    title: "Download Your Document",
    description:
      "Get a professionally formatted PDF and Word document in seconds. Plus submission guidance.",
    icon: Download,
    color: "from-purple-500 to-purple-600",
  },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Expert-Reviewed Templates",
    description:
      "Every document template is reviewed by legal professionals. Not AI-generated guesses.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data is encrypted. We never share or sell your document information.",
  },
  {
    icon: FileCheck,
    title: "Submission Guidance",
    description:
      "Know exactly what stamp paper, witnesses, and documents are needed before submission.",
  },
  {
    icon: TrendingUp,
    title: "Always Up-to-Date",
    description:
      "Templates are updated regularly to reflect the latest legal requirements across India.",
  },
];

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Small Business Owner, Mumbai",
    avatar: "PM",
    rating: 5,
    text: "Created a rent agreement in 5 minutes! The guided questions were so clear. No need for a lawyer for simple documents anymore.",
  },
  {
    name: "Rahul Singh",
    role: "Software Engineer, Bangalore",
    avatar: "RS",
    rating: 5,
    text: "DocSetu saved me ₹5,000 in lawyer fees. The NDA was exactly what I needed for my freelance project. Professional and perfect.",
  },
  {
    name: "Dr. Anjali Sharma",
    role: "Doctor, Delhi",
    avatar: "AS",
    rating: 5,
    text: "The submission guidance is the best part. I knew exactly what stamp paper to buy and what documents to carry. No surprises!",
  },
];

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      href={`/categories/${cat.slug}`}
      className="group relative p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-all duration-300 card-glow hover:-translate-y-0.5"
    >
      <div className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${cat.bgColor} mb-3 sm:mb-4 text-xl sm:text-2xl`}>
        {cat.icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm sm:text-base">
        {cat.name}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
        {cat.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {cat.documentCount} documents
        </span>
        <ChevronRight
          size={14}
          className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </Link>
  );
}

function MarqueeTicker() {
  const marqueeItems = [
    "📜 Rent Agreements & Lease Deeds",
    "🔏 Instant Online e-Stamping via SHCIL",
    "🛡️ General Affidavits & Declarations",
    "🤝 Non-Disclosure Agreements (NDA)",
    "💼 Employment Contracts & Offer Letters",
    "✍️ Step-by-Step Guided Questionnaires",
    "📄 Study Gap & Domicile Affidavits",
    "⚡ Instant PDF & Word (.docx) Exports",
    "🇮🇳 India's Guided Official Document Engine",
  ];

  return (
    <div className="py-3.5 bg-slate-900 text-white overflow-hidden border-y border-slate-800 relative select-none shadow-md">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-900 via-slate-900/90 to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 mx-4 sm:mx-6 text-xs sm:text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-100" />
        <div className="absolute inset-0 bg-radial-primary pointer-events-none" />

        {/* Floating background blur elements */}
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl float-animation" />
        <div
          className="hidden sm:block absolute bottom-1/3 left-1/3 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-5 sm:mb-8 max-w-full shadow-xs">
              <Sparkles size={14} className="flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate">India&apos;s Guided Document Creation Platform</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4 sm:mb-6">
              Make Official{" "}
              <span className="gradient-text">Documents</span>{" "}
              <br className="hidden sm:block" />
              Simple & Fast
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 px-1 sm:px-0">
              Answer guided plain-language questions. Get professionally formatted, expert-reviewed
              documents in minutes. No legal jargon. Instant PDF & Word exports.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-3 sm:mb-4 px-1 sm:px-0">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-800/95 rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-emerald-800/80 p-1.5 sm:p-2 shadow-xl shadow-emerald-600/10 dark:shadow-black/40 focus-within:border-emerald-500 transition-all">
                <Search className="ml-2.5 text-slate-400 flex-shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Search 25+ official document templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none text-xs sm:text-base py-1 px-1 sm:px-2"
                />
                <Link
                  href={`/search?q=${searchQuery}`}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 shadow-sm"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 px-2 sm:px-0">
              <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
              {["Rent Agreement", "NDA", "Affidavit", "Offer Letter", "Study Gap"].map((doc) => (
                <Link
                  key={doc}
                  href={`/search?q=${doc}`}
                  className="px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/80 transition-colors"
                >
                  {doc}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
              <Link
                href="/categories"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                Browse All Documents
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-slate-700 dark:text-slate-200 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-colors"
              >
                How It Works
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
              {[
                { icon: CheckCircle, text: "Expert-reviewed templates" },
                { icon: Shield, text: "100% secure & private" },
                { icon: FileCheck, text: "Submission guidance included" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Icon size={15} className="text-amber-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <MarqueeTicker />

      {/* ─── STATS ─── */}
      <section className="bg-gradient-to-r from-teal-800 via-emerald-800 to-emerald-900 dark:from-emerald-950 dark:to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md mb-3 border border-white/20">
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm font-medium text-indigo-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ─── CATEGORIES ─── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              Every Document You Need
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              From rental agreements to legal affidavits — we cover all official document needs
              for individuals and businesses across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
            {/* Future categories */}
            {["Healthcare", "Banking", "Tax"].map((name) => (
              <div
                key={name}
                className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col items-center justify-center text-center opacity-60"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 mb-4 flex items-center justify-center">
                  <span className="text-2xl opacity-40">🔜</span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-500">{name}</p>
                <p className="text-[10px] text-slate-400 mt-1">Coming Soon</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm hover:gap-3 transition-all"
            >
              View all categories <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-emerald-50/30 to-white dark:from-emerald-950/20 dark:to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              How DocSetu Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Three steps to your professional document. No experience required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700 z-0" />

            {howItWorks.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-6`}
                >
                  <step.icon size={28} className="text-white" />
                </div>
                <div className="absolute top-0 right-0 -translate-y-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 md:hidden">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR DOCUMENTS ─── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Most Used
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
                Popular Documents
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:gap-3 transition-all"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularDocs.map((doc) => {
              const category = categories.find((c) => c.id === doc.categoryId);
              return (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.slug}`}
                  className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 card-glow hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-2xl p-2.5 rounded-xl ${category?.bgColor}`}>
                      {category?.icon}
                    </div>
                    <div className="flex gap-1.5">
                      {doc.isPopular && <span className="badge-popular">Popular</span>}
                      {doc.isPremium && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/50">
                          PRO
                        </span>
                      )}
                      {!doc.isPremium && <span className="badge-free">Free</span>}
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={12} />
                      {doc.estimatedTime}
                    </div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Create <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TRUST FEATURES ─── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Why DocSetu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              Built for Trust & Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM HIGHLIGHTS ─── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Features & Quality
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-12">
            Why Individuals & Businesses Trust DocSetu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "No Plain Templates",
                desc: "Instead of downloading empty Word files, answer simple questions. Our engine formats the document automatically.",
                icon: FileCheck,
              },
              {
                title: "State Legal Guidance",
                desc: "Get clear instructions on exact stamp paper values, witness requirements, and notarization steps before execution.",
                icon: Shield,
              },
              {
                title: "Dual Format Download",
                desc: "Instantly export print-ready PDFs and fully editable Word (.docx) files for complete flexibility.",
                icon: Download,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-slate-800/40 border border-emerald-100 dark:border-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-6">
            <Sparkles size={13} />
            Fast, Guided & Reliable Document Creation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Create Your
            <br />
            First Document?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-xl mx-auto">
            Sign up free and create your first document in under 5 minutes.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Start for Free <ArrowRight size={18} />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/10 transition-colors"
            >
              Explore Documents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
