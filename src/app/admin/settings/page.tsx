"use client";
import { useState } from "react";
import { Save, Shield, Bell, Database, Mail, Globe, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "DocSetu",
    tagline: "Making Official Documents Easy",
    supportEmail: "support@docsetu.in",
    maxFreeDocsPerMonth: "3",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    defaultLanguage: "en",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Platform configuration and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
        </button>
      </div>

      {/* General */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe size={15} className="text-blue-400" />
          <h2 className="font-semibold text-white text-sm">General Settings</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "siteName", label: "Site Name" },
            { key: "tagline", label: "Tagline" },
            { key: "supportEmail", label: "Support Email" },
            { key: "maxFreeDocsPerMonth", label: "Free Documents per Month" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
              <input
                value={settings[key as keyof typeof settings] as string}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield size={15} className="text-amber-400" />
          <h2 className="font-semibold text-white text-sm">Security & Access</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to all users", danger: true },
            { key: "allowRegistrations", label: "Allow New Registrations", desc: "Allow users to create new accounts" },
            { key: "emailNotifications", label: "Email Notifications", desc: "Send transactional emails via Resend" },
          ].map(({ key, label, desc, danger }) => (
            <div key={key} className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-slate-200"}`}>{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] })}
                className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${settings[key as keyof typeof settings] ? (danger ? "bg-red-600" : "bg-blue-600") : "bg-slate-700"}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[key as keyof typeof settings] ? "translate-x-4" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Database size={15} className="text-green-400" />
          <h2 className="font-semibold text-white text-sm">System Information</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Platform", value: "Next.js 16 (Turbopack)" },
            { label: "Database", value: "Supabase PostgreSQL" },
            { label: "Storage", value: "Cloudinary" },
            { label: "Email", value: "Resend" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm text-slate-300 mt-0.5 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance warning */}
      {settings.maintenanceMode && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-400">Maintenance Mode is ON</p>
            <p className="text-xs text-red-300/70 mt-0.5">All non-admin users will see a maintenance page. Remember to turn this off when done.</p>
          </div>
        </div>
      )}
    </div>
  );
}
