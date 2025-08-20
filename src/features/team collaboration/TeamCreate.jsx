import { useState } from "react";
import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";
import { useAuth } from "../../authentication/useAuth";

export default function TeamCreate() {
  // const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const { createTeam, teamName, setTeamName } = useTeamCollab();
  const { currentUser } = useAuth();
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setLoading(true);
    await createTeam(teamName.trim(), currentUser);
    // console.log(teamName);
    setTeamName("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-2">
      <input
        className="flex-1 rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400 capitalize "
        placeholder="New team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !teamName.trim()}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
