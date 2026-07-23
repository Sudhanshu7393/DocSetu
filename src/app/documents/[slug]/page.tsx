import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Stamp,
  Shield,
  Info,
} from "lucide-react";
import { getDocumentBySlug, documents } from "@/data/documents";
import { getCategoryBySlug } from "@/data/categories";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return { title: "Not Found" };
  return {
    title: doc.name,
    description: doc.description,
  };
}

export async function generateStaticParams() {
  return documents.map((d) => ({ slug: d.slug }));
}

export default async function DocumentDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) notFound();

  const category = getCategoryBySlug(doc.categoryId);

  const requirements = [
    doc.stampRequired && {
      icon: Stamp,
      label: "Stamp Paper Required",
      detail: doc.submissionGuidance.stampPaper,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    doc.witnessRequired && {
      icon: Users,
      label: "Witnesses Required",
      detail: doc.submissionGuidance.witnesses,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    doc.notaryRecommended && {
      icon: Shield,
      label: "Notarization Recommended",
      detail: doc.submissionGuidance.notary,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-200">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/categories"
            className="hover:text-slate-600 dark:hover:text-slate-200"
          >
            Categories
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-slate-600 dark:hover:text-slate-200"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-700 dark:text-slate-300 font-medium">{doc.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {category && (
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${category.bgColor} ${category.color}`}
                  >
                    {category.icon} {category.name}
                  </span>
                )}
                {doc.isPopular && <span className="badge-popular">Popular</span>}
                {doc.isNew && <span className="badge-new">New</span>}
                {!doc.isPremium && <span className="badge-free">Free</span>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {doc.name}
              </h1>

              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {doc.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> ~{doc.estimatedTime} to complete
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={14} /> {doc.steps.length} sections
                </span>
              </div>
            </div>

            {/* Purpose */}
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-2 mb-3">
                <Info size={17} className="text-blue-600 dark:text-blue-400" />
                <h2 className="font-semibold text-blue-900 dark:text-blue-300">
                  What is this document?
                </h2>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                {doc.purpose}
              </p>
            </div>

            {/* What you'll fill */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                What you&apos;ll need to fill
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doc.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40"
                  >
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps overview */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Document Sections
              </h2>
              <div className="space-y-3">
                {doc.steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission guidance */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Before You Submit
              </h2>
              {requirements.length > 0 && (
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {requirements.map((req: any) => (
                    <div
                      key={req.label}
                      className={`p-4 rounded-xl border ${req.bg}`}
                    >
                      <div className={`flex items-center gap-2 mb-1 ${req.color}`}>
                        <req.icon size={15} />
                        <span className="font-semibold text-sm">{req.label}</span>
                      </div>
                      {req.detail && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 ml-5">
                          {req.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-3">
                  Documents You&apos;ll Need
                </h3>
                <ul className="space-y-2">
                  {doc.submissionGuidance.documentsRequired.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400" />
                  <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                    Important Notes
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {doc.submissionGuidance.importantNotes.map((note) => (
                    <li
                      key={note}
                      className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2"
                    >
                      <span className="flex-shrink-0 mt-0.5">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* CTA Card */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                  Create this document
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                  Takes about {doc.estimatedTime}. Guided questions, no jargon.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    "Step-by-step guided wizard",
                    "Professional PDF download",
                    "Word (DOCX) download",
                    "Submission guidance included",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/documents/${doc.slug}/generate`}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-blue-600/30"
                >
                  Create {doc.name}
                  <ArrowRight size={17} />
                </Link>

                {doc.isPremium && (
                  <p className="text-xs text-center text-amber-600 dark:text-amber-400 mt-3">
                    ⚡ Premium document — upgrade to access
                  </p>
                )}
                {!doc.isPremium && (
                  <p className="text-xs text-center text-green-600 dark:text-green-400 mt-3">
                    ✓ Free — no credit card required
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5">
                  Related Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                Documents generated by DocSetu are based on expert-reviewed templates.
                They are not legal advice. Consult a qualified lawyer for complex matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
