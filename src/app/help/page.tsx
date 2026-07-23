import Link from "next/link";
import { Search, ChevronRight, BookOpen, MessageCircle, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center – DocSetu",
  description: "Find answers, guides, and support for DocSetu.",
};

const faqCategories = [
  {
    title: "Getting Started",
    icon: "🚀",
    faqs: [
      { q: "How do I create my first document?", a: "Click 'Browse All Documents', choose a category, select a document, and follow the guided questionnaire. It takes 3–10 minutes depending on the document." },
      { q: "Do I need an account to create documents?", a: "You need an account to save and re-download documents. However, you can preview documents without signing in." },
      { q: "What formats can I download?", a: "DocSetu provides Professional PDF and Word (DOCX) downloads for all documents." },
    ],
  },
  {
    title: "Documents & Templates",
    icon: "📄",
    faqs: [
      { q: "Are the templates legally valid?", a: "Our templates are reviewed by legal professionals and follow standard formats used across India. However, for complex situations, we recommend consulting a lawyer." },
      { q: "Can I edit the document after generating it?", a: "Yes! You can go back to the wizard and change your answers, then regenerate the document. Premium users can save and re-edit anytime." },
      { q: "What is the difference between a Draft and a Complete document?", a: "Drafts are auto-saved incomplete forms. Complete documents have all fields filled and are ready to download." },
    ],
  },
  {
    title: "Stamp Paper & Submission",
    icon: "🔏",
    faqs: [
      { q: "Where do I get stamp paper?", a: "Stamp paper is available at licensed stamp vendors (found near court complexes), e-stamping kiosks (like SHCIL), and some banks and post offices." },
      { q: "How do I know what denomination of stamp paper to use?", a: "DocSetu shows stamp paper requirements for every document, including the value needed. This varies by state and document type." },
      { q: "Do I need to get the document notarized?", a: "Notarization requirements are shown for each document. Affidavits typically require notarization; rent agreements generally do not (unless registration is needed)." },
    ],
  },
  {
    title: "Account & Billing",
    icon: "💳",
    faqs: [
      { q: "How do I upgrade to Premium?", a: "Go to Pricing page and click 'Start Premium'. You can pay via UPI, card, or net banking." },
      { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from your account settings. You'll retain Premium access until the end of your billing period." },
      { q: "Is my data safe?", a: "Yes. All data is encrypted. We never share or sell your personal information. See our Privacy Policy for details." },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">
          Find answers to common questions or reach out to our team.
        </p>
        <div className="max-w-md mx-auto px-4 relative">
          <Search size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none shadow-lg text-sm"
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, label: "Documentation", desc: "Detailed guides", href: "/help/guides", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
            { icon: MessageCircle, label: "Live Chat", desc: "Talk to us now", href: "#chat", color: "text-green-600 bg-green-50 dark:bg-green-950/40" },
            { icon: Mail, label: "Email Support", desc: "support@docsetu.in", href: "mailto:support@docsetu.in", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
          ].map(({ icon: Icon, label, desc, href, color }) => (
            <Link key={label} href={href} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ by category */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <span>{cat.icon}</span> {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.faqs.map(({ q, a }) => (
                  <details key={q} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="font-medium text-slate-900 dark:text-white text-sm pr-4">{q}</span>
                      <ChevronRight size={16} className="text-slate-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 text-center">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Still need help?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Our support team is available Monday–Saturday, 10 AM – 7 PM IST.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="mailto:support@docsetu.in" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              <Mail size={15} /> Email Us
            </a>
            <a href="tel:+917393011350" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Phone size={15} /> +91 73930 11350
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
