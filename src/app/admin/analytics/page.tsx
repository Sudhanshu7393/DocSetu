import { BarChart3, TrendingUp, Users, FileText, Download, Clock } from "lucide-react";

const dailyData = [
  { day: "Mon", docs: 423 },
  { day: "Tue", docs: 581 },
  { day: "Wed", docs: 492 },
  { day: "Thu", docs: 738 },
  { day: "Fri", docs: 864 },
  { day: "Sat", docs: 712 },
  { day: "Sun", docs: 391 },
];

const maxVal = Math.max(...dailyData.map((d) => d.docs));

const categoryBreakdown = [
  { name: "Property & Rental", pct: 38, count: "19,842" },
  { name: "Legal & Affidavits", pct: 24, count: "12,531" },
  { name: "Business & Commerce", pct: 19, count: "9,920" },
  { name: "Employment", pct: 12, count: "6,270" },
  { name: "Student / Education", pct: 7, count: "3,656" },
];

const categoryColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-rose-500",
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform usage metrics and trends</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Docs This Week", value: "4,201", sub: "+18% vs last week", icon: FileText, color: "text-blue-400" },
          { label: "New Users (7d)", value: "832", sub: "+11% vs last week", icon: Users, color: "text-green-400" },
          { label: "Downloads (7d)", value: "2,947", sub: "+27% vs last week", icon: Download, color: "text-purple-400" },
          { label: "Avg Completion", value: "6.4 min", sub: "Per document wizard", icon: Clock, color: "text-amber-400" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon size={16} className={color} />
              <TrendingUp size={12} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            <p className="text-xs text-green-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" /> Documents Created — Last 7 Days
          </h2>
          <span className="text-xs text-slate-500">Daily volume</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {dailyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-[10px] text-slate-500 font-medium">{d.docs}</p>
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg transition-all"
                style={{ height: `${(d.docs / maxVal) * 120}px` }}
              />
              <p className="text-xs text-slate-500">{d.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
          <BarChart3 size={16} className="text-purple-400" /> Documents by Category
        </h2>
        <div className="space-y-4">
          {categoryBreakdown.map((cat, i) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${categoryColors[i]}`} />
                  <span className="text-sm text-slate-300">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{cat.count}</span>
                  <span className="text-xs font-bold text-slate-400 w-8 text-right">{cat.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${categoryColors[i]} rounded-full transition-all`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth notice */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-3">
        <TrendingUp size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-300">Growth Trend</p>
          <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
            Document creation is up 42% month-over-month. Rent Agreement remains the most popular category. 
            Consider adding more property-related templates — the user demand data supports it.
          </p>
        </div>
      </div>
    </div>
  );
}
