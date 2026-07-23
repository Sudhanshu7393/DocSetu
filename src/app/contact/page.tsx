"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-slate-900 py-14 border-b border-slate-200 dark:border-slate-800 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Contact Us</h1>
        <p className="text-slate-500 dark:text-slate-400">We&apos;re here to help. Reach out anytime.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Have a question, feedback, or need help with a document? We&apos;d love to hear from you.
              </p>
            </div>
            {[
              { icon: Mail, label: "Email", value: "support@docsetu.in", href: "mailto:support@docsetu.in" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: MapPin, label: "Address", value: "New Delhi, India 110001", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value}</p>
                </div>
              </a>
            ))}
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
              Support hours: Monday–Saturday, 10 AM – 7 PM IST
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                  We&apos;ll get back to you within 24 hours. Thank you for reaching out!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your issue or question in detail..." rows={6} required className="input-field resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-70">
                  {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
