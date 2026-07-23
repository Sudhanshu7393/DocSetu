import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getDocumentsByCategory } from "@/data/documents";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} Documents`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const docs = getDocumentsByCategory(category.id);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/40 dark:to-slate-900 py-14 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-6"
          >
            <ArrowLeft size={14} /> All Categories
          </Link>

          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center text-4xl shadow-sm`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {category.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {docs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">📄</p>
            <p className="text-slate-500 dark:text-slate-400">
              Documents for this category are coming soon!
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              {docs.length} documents in this category
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {docs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.slug}`}
                  className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-0.5 card-glow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-1.5">
                      {doc.isPopular && <span className="badge-popular">Popular</span>}
                      {doc.isNew && <span className="badge-new">New</span>}
                      {!doc.isPremium && <span className="badge-free">Free</span>}
                      {doc.isPremium && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">
                          PRO
                        </span>
                      )}
                    </div>
                    <ArrowRight
                      size={15}
                      className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>

                  <h2 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {doc.estimatedTime}
                    </span>
                    {doc.stampRequired && (
                      <span className="flex items-center gap-1 text-amber-500">
                        ⚠ Stamp required
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
