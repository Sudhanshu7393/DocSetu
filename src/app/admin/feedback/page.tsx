import { Star, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const mockFeedback = [
  { id: "1", doc: "Rent Agreement", user: "Priya M.", rating: 5, comment: "So easy! Created my rent agreement in 8 minutes. Very professional.", time: "2h ago" },
  { id: "2", doc: "NDA", user: "Rahul K.", rating: 5, comment: "Saved me ₹3000 in lawyer fees. The document looks completely professional.", time: "5h ago" },
  { id: "3", doc: "Offer Letter", user: "HR Manager", rating: 4, comment: "Great template. Would love more customization options for salary breakdowns.", time: "1d ago" },
  { id: "4", doc: "General Affidavit", user: "Anjali S.", rating: 5, comment: "The step-by-step wizard made it so simple. The submission guidance was very helpful.", time: "2d ago" },
  { id: "5", doc: "Rent Agreement", user: "Deepak R.", rating: 3, comment: "Good but the Hindi translation for some fields could be improved.", time: "3d ago" },
  { id: "6", doc: "Study Gap Affidavit", user: "Student", rating: 5, comment: "Exactly what I needed for my visa application. Perfect format!", time: "4d ago" },
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-700"} />
      ))}
    </div>
  );
}

export default function AdminFeedbackPage() {
  const avg = (mockFeedback.reduce((s, f) => s + f.rating, 0) / mockFeedback.length).toFixed(1);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">User Feedback</h1>
        <p className="text-sm text-slate-500 mt-0.5">Ratings and comments from document creators</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-white mb-1">{avg}</p>
          <div className="flex justify-center gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-500">Average Rating</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-white mb-1">{mockFeedback.length}</p>
          <p className="text-xs text-slate-500 mt-4">Total Reviews</p>
        </div>
        <div className="bg-slate-900 border border-green-500/20 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-green-400 mb-1">
            {Math.round((mockFeedback.filter((f) => f.rating >= 4).length / mockFeedback.length) * 100)}%
          </p>
          <p className="text-xs text-slate-500 mt-4">Satisfaction Rate (4★+)</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {mockFeedback.map((f) => (
          <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {f.user[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{f.user}</p>
                  <p className="text-xs text-blue-400">on {f.doc}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarDisplay rating={f.rating} />
                <p className="text-[10px] text-slate-600">{f.time}</p>
              </div>
            </div>
            {f.comment && (
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{f.comment}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-green-400 transition-colors px-2 py-1 rounded-lg hover:bg-green-400/10">
                <ThumbsUp size={12} /> Helpful
              </button>
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-400/10">
                <ThumbsDown size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
