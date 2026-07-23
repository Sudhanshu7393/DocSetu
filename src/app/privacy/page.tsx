import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DocSetu",
  description: "How DocSetu collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      items: [
        { sub: "Account Information", text: "When you register, we collect your name, email address, and optionally your phone number." },
        { sub: "Document Data", text: "The information you enter into document forms is stored securely to generate your documents. We do not share this data with third parties." },
        { sub: "Usage Data", text: "We collect information about how you interact with the Platform including pages visited, features used, and time spent." },
        { sub: "Payment Data", text: "Payment information is processed by Razorpay. We do not store your card details on our servers." },
        { sub: "Device & Log Data", text: "We collect IP addresses, browser type, operating system, and access timestamps for security and analytics." },
      ],
    },
    {
      title: "2. How We Use Your Information",
      items: [
        { sub: "Service Delivery", text: "To generate, store, and deliver your documents." },
        { sub: "Account Management", text: "To manage your account, process subscriptions, and send transactional emails." },
        { sub: "Improvement", text: "To understand how users use the Platform and improve our features and templates." },
        { sub: "Communications", text: "To send you service updates, new document announcements, and support responses. You can opt out at any time." },
        { sub: "Legal Compliance", text: "To comply with applicable Indian laws and court orders." },
      ],
    },
    {
      title: "3. Data Storage & Security",
      items: [
        { sub: "Storage", text: "Your data is stored on Supabase (PostgreSQL) hosted on AWS infrastructure in the ap-south-1 (Mumbai) region." },
        { sub: "Encryption", text: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256)." },
        { sub: "Access Control", text: "Access to your personal data is strictly limited to authorized DocSetu personnel on a need-to-know basis." },
        { sub: "Breach Notification", text: "In the event of a data breach affecting your information, we will notify you within 72 hours." },
      ],
    },
    {
      title: "4. Data Sharing",
      items: [
        { sub: "No Selling", text: "We never sell your personal data to third parties." },
        { sub: "Service Providers", text: "We share data only with service providers (Razorpay for payments, Resend for email, Cloudinary for files) who are contractually bound to protect your data." },
        { sub: "Legal Requirements", text: "We may disclose your data if required by law, court order, or governmental authority." },
      ],
    },
    {
      title: "5. Your Rights (under IT Act 2000 & DPDP Act 2023)",
      items: [
        { sub: "Access", text: "You can request a copy of the personal data we hold about you." },
        { sub: "Correction", text: "You can update or correct your personal information through your account settings." },
        { sub: "Deletion", text: "You can request deletion of your account and associated data. Some data may be retained for legal purposes." },
        { sub: "Portability", text: "You can export your document data in standard formats." },
        { sub: "Opt-Out", text: "You can opt out of marketing communications at any time via the unsubscribe link in emails." },
      ],
    },
    {
      title: "6. Cookies",
      items: [
        { sub: "Essential Cookies", text: "Required for authentication and session management." },
        { sub: "Analytics Cookies", text: "We use privacy-friendly analytics (Plausible) to understand usage trends without tracking individuals." },
        { sub: "Preference Cookies", text: "Used to remember your dark mode preference and language settings." },
      ],
    },
    {
      title: "7. Children's Privacy",
      items: [
        { sub: "Age Restriction", text: "DocSetu is not intended for users under 18 years of age. We do not knowingly collect personal information from minors." },
      ],
    },
    {
      title: "8. Contact & Grievance Officer",
      items: [
        { sub: "Grievance Officer", text: "As per the Information Technology Act, our Grievance Officer can be reached at: legal@docsetu.in, DocSetu, New Delhi 110001. Response time: within 30 days." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: July 2025 · Compliant with IT Act 2000 & DPDP Act 2023</p>
          <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800/30">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              🔒 Your privacy matters. We are committed to protecting your personal information and being transparent about how we use it.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {sections.map(({ title, items }) => (
            <section key={title}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
              <div className="space-y-4">
                {items.map(({ sub, text }) => (
                  <div key={sub} className="flex gap-3">
                    <div className="w-1 bg-blue-200 dark:bg-blue-800 rounded-full flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{sub}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
          <Link href="/terms" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Terms of Service →</Link>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
