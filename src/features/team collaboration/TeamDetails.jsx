// TeamDetails.jsximport useTeam from "../hooks/useTeam";

import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";

export default function TeamDetails() {
  const { teams } = useTeamCollab();

  if (!teams)
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 dark:text-emerald-200">
        Loading teams...
      </div>
    );

  return (
    <section className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-white dark:bg-[#23272f] rounded-xl shadow-md mt-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
        {/* Team Icon */}
        <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-full w-20 h-20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-emerald-600 dark:text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5.13a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        {/* Team Info */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-200 mb-1 break-words">
            {teams.name}
          </h2>
          <div className="flex flex-wrap gap-2 items-center text-sm text-slate-500 dark:text-emerald-400 mb-2">
            <span>
              Created by:{" "}
              <span className="font-semibold">{teams.createdBy}</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              {teams.members?.length || 0} member
              {teams.members?.length === 1 ? "" : "s"}
            </span>
          </div>
          {/* Members List */}
          <div className="flex flex-wrap gap-2 mt-2">
            {teams.members?.map((m, idx) => (
              <span
                key={m.userId || idx}
                className="bg-emerald-50 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {m.email || m.userId}
                {m.role ? (
                  <span className="ml-1 text-emerald-400">({m.role})</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
