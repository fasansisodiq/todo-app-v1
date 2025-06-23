import React, { useState } from "react";

export default function TaskComment({ comments = [], onAddComment }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    // TODO: Add Firestore logic to add comment
    // await onAddComment(comment);
    setComment("");
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h4 className="font-semibold text-emerald-700 dark:text-emerald-200 mb-2">
        Comments
      </h4>
      <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
        {comments.length === 0 && (
          <li className="text-slate-400 dark:text-emerald-200">
            No comments yet.
          </li>
        )}
        {comments.map((c, i) => (
          <li
            key={i}
            className="bg-emerald-50 dark:bg-emerald-900/40 rounded px-3 py-2 text-slate-700 dark:text-emerald-100"
          >
            <span className="font-bold">{c.authorName}:</span> {c.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          className="flex-1 rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
