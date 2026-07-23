import Link from "next/link";
import { FileText, ExternalLink, Mail, Phone, MapPin } from "lucide-react";


const footerLinks = {
  Documents: [
    { href: "/categories/property-rental", label: "Property & Rental" },
    { href: "/categories/legal", label: "Legal Documents" },
    { href: "/categories/business", label: "Business" },
    { href: "/categories/employment", label: "Employment" },
    { href: "/categories/student", label: "Student" },
    { href: "/categories/government", label: "Government" },
  ],
  Company: [
    { href: "/about", label: "About DocSetu" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
  ],
  Support: [
    { href: "/help", label: "Help Center" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclaimer", label: "Legal Disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-xl text-white">
                  Doc<span className="text-blue-400">Setu</span>
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Making Official Documents Easy
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              India&apos;s trusted guided document creation platform. Answer simple
              questions and get professionally formatted official documents in minutes.
            </p>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail size={13} className="text-blue-400" />
                <span>support@docsetu.in</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone size={13} className="text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin size={13} className="text-blue-400" />
                <span>New Delhi, India 110001</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: "#", label: "Twitter / X" },
                { href: "#", label: "LinkedIn" },
                { href: "#", label: "GitHub" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-300 text-xs font-bold"
                >
                  {label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DocSetu Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 text-center">
              Documents generated are not legal advice. Always consult a qualified professional.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Made with</span>
            <span className="text-red-400">♥</span>
            <span>for India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
