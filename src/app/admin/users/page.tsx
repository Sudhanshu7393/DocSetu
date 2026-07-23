"use client";
import { useState } from "react";
import { Search, Filter, MoreVertical, Crown, Users, Ban, Check, Mail } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Priya Mehta", email: "priya@example.com", plan: "PREMIUM", docs: 24, joinDate: "Jan 2024", status: "active" },
  { id: "2", name: "Rahul Kumar", email: "rahul@example.com", plan: "FREE", docs: 3, joinDate: "Mar 2024", status: "active" },
  { id: "3", name: "Anjali Singh", email: "anjali@example.com", plan: "BUSINESS", docs: 87, joinDate: "Nov 2023", status: "active" },
  { id: "4", name: "Deepak Rathi", email: "deepak@example.com", plan: "FREE", docs: 1, joinDate: "Apr 2024", status: "suspended" },
  { id: "5", name: "Meera Tiwari", email: "meera@example.com", plan: "PREMIUM", docs: 15, joinDate: "Feb 2024", status: "active" },
  { id: "6", name: "Vikram Patel", email: "vikram@example.com", plan: "BUSINESS", docs: 112, joinDate: "Sep 2023", status: "active" },
  { id: "7", name: "Sunita Agarwal", email: "sunita@example.com", plan: "FREE", docs: 2, joinDate: "May 2024", status: "active" },
  { id: "8", name: "Arjun Sharma", email: "arjun@example.com", plan: "PREMIUM", docs: 31, joinDate: "Dec 2023", status: "active" },
];

const planBadge: Record<string, string> = {
  FREE: "bg-slate-700 text-slate-300",
  PREMIUM: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  BUSINESS: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || u.plan === planFilter;
    return matchSearch && matchPlan;
  });

  const summary = {
    total: mockUsers.length,
    premium: mockUsers.filter((u) => u.plan !== "FREE").length,
    active: mockUsers.filter((u) => u.status === "active").length,
    suspended: mockUsers.filter((u) => u.status === "suspended").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage registered users and subscriptions</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: summary.total, color: "text-blue-400" },
          { label: "Paid Users", value: summary.premium, color: "text-amber-400" },
          { label: "Active", value: summary.active, color: "text-green-400" },
          { label: "Suspended", value: summary.suspended, color: "text-red-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Plans</option>
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
          <option value="BUSINESS">Business</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">User</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Plan</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Documents</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Joined</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg w-fit ${planBadge[user.plan]}`}>
                      {user.plan !== "FREE" && <Crown size={10} />}
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-300">{user.docs}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-500">{user.joinDate}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${
                      user.status === "active" ? "text-green-400" : "text-red-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === "active" ? "bg-green-400" : "bg-red-400"
                      }`} />
                      {user.status === "active" ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-colors" title="Email user">
                        <Mail size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-green-400 transition-colors" title="Activate">
                        <Check size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors" title="Suspend">
                        <Ban size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {mockUsers.length} users</p>
          <div className="flex gap-1.5">
            <button className="px-3 py-1 text-xs bg-slate-800 text-slate-400 rounded-lg">Prev</button>
            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 text-xs bg-slate-800 text-slate-400 rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
