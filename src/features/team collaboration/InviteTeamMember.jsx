import React, { useState } from "react";
import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";

export default function InviteTeamMember({ onInvite, teamId, inviter }) {
  const { email, setEmail, loading, setLoading } = useTeamCollab();
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await onInvite(teamId, email);
    setEmail("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleInvite} className="flex gap-2 mt-4">
      <input
        className="flex-1 rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400"
        placeholder="Invite by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        type="email"
      />
      <button
        type="submit"
        disabled={loading || !email.trim()}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Inviting..." : "Invite"}
      </button>
    </form>
  );
}
