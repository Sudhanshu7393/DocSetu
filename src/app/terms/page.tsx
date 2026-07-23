import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – DocSetu",
  description: "Terms and conditions for using DocSetu's document creation platform.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using DocSetu ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Platform. These Terms apply to all visitors, users, and others who access or use the Platform.`,
    },
    {
      title: "2. Description of Service",
      content: `DocSetu provides a guided document creation platform that helps users generate official documents using professionally designed templates. The Platform is NOT a law firm and does not provide legal advice. Documents generated through DocSetu are based on standard templates and should be reviewed by a qualified legal professional for complex matters.`,
    },
    {
      title: "3. User Accounts",
      content: `You may create an account to access additional features. You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. DocSetu reserves the right to terminate accounts that violate these Terms.`,
    },
    {
      title: "4. No Legal Advice",
      content: `DocSetu is a document generation tool. The documents, templates, and information provided through the Platform do not constitute legal advice. We are not a law firm. For legal matters, consult a qualified advocate licensed in your jurisdiction. The Platform's content is for informational purposes only.`,
    },
    {
      title: "5. Intellectual Property",
      content: `The Platform and its original content (excluding user-generated content) are the exclusive property of DocSetu and are protected by copyright, trademark, and other intellectual property laws. Our templates and proprietary systems may not be copied, reproduced, or used without written permission.`,
    },
    {
      title: "6. User Responsibilities",
      content: `You agree to: (a) provide accurate and truthful information in documents; (b) use the Platform only for lawful purposes; (c) not impersonate any person or entity; (d) not use the Platform to create fraudulent documents; (e) comply with all applicable Indian laws and regulations.`,
    },
    {
      title: "7. Privacy",
      content: `Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.`,
    },
    {
      title: "8. Disclaimer of Warranties",
      content: `The Platform is provided "as is" without warranties of any kind. We do not warrant that documents generated will be legally valid in all jurisdictions, that the Platform will be error-free, or that results will meet your specific requirements. Your use of the Platform is at your sole risk.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `To the maximum extent permitted by applicable law, DocSetu shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform. Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim.`,
    },
    {
      title: "10. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.`,
    },
    {
      title: "11. Changes to Terms",
      content: `We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Platform. Continued use of the Platform after changes constitutes acceptance of the modified Terms.`,
    },
    {
      title: "12. Contact",
      content: `For questions about these Terms, please contact us at: legal@docsetu.in or by mail at: DocSetu Legal Team, New Delhi – 110001, India.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Terms of Service</h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: July 2025 · Effective: July 20, 2025</p>
          <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/30">
            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
              ⚠️ DocSetu is a document creation tool, not a law firm. Documents generated are templates and do not constitute legal advice.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
          <Link href="/privacy" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Privacy Policy →</Link>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Contact Us →</Link>
        </div>
      </div>
    </div>
  );
}
