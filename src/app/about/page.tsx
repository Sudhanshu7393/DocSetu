import Link from "next/link";
import { Shield, Target, Users, Star, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DocSetu – Making Official Documents Easy",
  description: "Learn about DocSetu's mission to make official document creation simple, guided, and accessible for every Indian.",
};

const team = [
  { name: "Sudhanshu Pandey", role: "Founder & CEO", initials: "SP", bg: "from-blue-600 to-indigo-700" },
];

const values = [
  { icon: Shield, title: "Trust", desc: "Every template is reviewed by legal professionals. We never compromise on quality or accuracy.", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
  { icon: Target, title: "Simplicity", desc: "We turn complex legal language into simple guided questions that anyone can answer.", color: "text-green-600 bg-green-50 dark:bg-green-950/40" },
  { icon: Star, title: "Accuracy", desc: "Our documents follow the latest legal requirements and are updated regularly.", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  { icon: Users, title: "Accessibility", desc: "Designed for every Indian, from first-time users to experienced professionals.", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-slate-900 py-20 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
            Making Official Documents <br className="hidden sm:block" />
            <span className="gradient-text">Easy for India</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            DocSetu was born from a simple frustration: Why is creating an official document in India so confusing, expensive, and time-consuming? We set out to fix that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Mission</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              Documents Shouldn&apos;t Require a Law Degree
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              In India, millions of people need official documents every day — rent agreements, affidavits, employment letters, and more. Yet most people either pay expensive lawyers for simple documents or struggle with confusing templates.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              DocSetu&apos;s mission is to change this. Our guided platform walks you through every question in plain language. You get a professionally formatted document in minutes, not days.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
            <div className="text-5xl mb-4">🇮🇳</div>
            <p className="text-3xl font-bold mb-2">1.4 Billion</p>
            <p className="text-blue-100">People in India who deserve simple, accessible legal documents</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 dark:bg-slate-800/20 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="mb-8">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Leadership</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">Founder & Leadership</h2>
        </div>
        <div className="flex justify-center">
          {team.map((member) => (
            <div key={member.name} className="text-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 max-w-xs w-full shadow-sm">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md`}>
                {member.initials}
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">{member.role}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Leading DocSetu&apos;s mission to make official document creation simple, guided, and accessible for everyone in India.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Document?</h2>
          <p className="text-blue-100 mb-8">Join thousands of Indians who trust DocSetu for their official documents.</p>
          <Link href="/categories" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors">
            Browse Documents <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
