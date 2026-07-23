import Link from "next/link";
import { CheckCircle, ArrowRight, Zap, Crown, Building } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – DocSetu",
  description: "Simple, transparent pricing. Create official documents for free or upgrade to Premium for unlimited access.",
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "Perfect for occasional use",
    icon: Zap,
    color: "text-slate-700 dark:text-slate-200",
    buttonClass: "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800",
    buttonText: "Get Started Free",
    href: "/register",
    highlight: false,
    features: [
      "3 documents per month",
      "All document categories",
      "PDF & DOCX download",
      "Submission guidance",
      "Basic support",
      "7-day document history",
    ],
    disabled: [],
  },
  {
    name: "Premium",
    price: "₹299",
    period: "/month",
    description: "For individuals with regular needs",
    icon: Crown,
    color: "text-blue-600 dark:text-blue-400",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25",
    buttonText: "Start Premium",
    href: "/register?plan=premium",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited documents",
      "All document categories",
      "PDF & DOCX download",
      "Submission guidance",
      "Priority support",
      "Unlimited document history",
      "Save & re-edit documents",
      "Multi-language support (Hindi)",
      "Early access to new documents",
      "Share document links",
    ],
    disabled: [],
  },
  {
    name: "Business",
    price: "₹999",
    period: "/month",
    description: "For teams and businesses",
    icon: Building,
    color: "text-purple-600 dark:text-purple-400",
    buttonClass: "border border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/20",
    buttonText: "Contact Sales",
    href: "/contact",
    highlight: false,
    features: [
      "Everything in Premium",
      "Up to 5 team members",
      "Shared document workspace",
      "Custom company branding",
      "Admin dashboard",
      "API access (coming soon)",
      "Bulk document generation",
      "Dedicated account manager",
      "Custom template requests",
      "Priority phone support",
    ],
    disabled: [],
  },
];

const faq = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.",
  },
  {
    q: "Are the documents legally valid?",
    a: "Our documents are based on expert-reviewed templates and follow standard legal formats. However, they are tools to help you create documents, not a substitute for legal advice.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and EMI options via Razorpay.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never share or sell your personal information.",
  },
  {
    q: "Can I get a refund?",
    a: "We offer a 7-day money-back guarantee for Premium and Business plans if you're not satisfied.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-slate-900 py-16 text-center">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Start for free. Upgrade when you need more. No hidden fees, no surprises.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 lg:p-8 ${
                plan.highlight
                  ? "border-blue-500 dark:border-blue-600 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                plan.highlight ? "bg-blue-100 dark:bg-blue-950/50" : "bg-slate-100 dark:bg-slate-800"
              }`}>
                <plan.icon size={20} className={plan.color} />
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
              </div>

              <Link
                href={plan.href}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all mb-8 ${plan.buttonClass}`}
              >
                {plan.buttonText} <ArrowRight size={15} />
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Annual discount note */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          💡 Save <strong>20%</strong> with annual plans — Premium at ₹2,868/year, Business at ₹9,588/year.{" "}
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</Link>
        </p>
      </div>

      {/* FAQ */}
      <div className="bg-slate-50 dark:bg-slate-800/20 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
