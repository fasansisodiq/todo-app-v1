import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";

export default function TeamList({ onSelect, activeTeamId }) {
  const { teams } = useTeamCollab();
  return (
    <ul className="flex flex-col gap-1 mt-4">
      {teams.length === 0 && (
        <li className="text-slate-400 dark:text-emerald-200 text-sm px-3 py-2">
          No teams yet.
        </li>
      )}
      {teams.map((team) => (
        <li
          key={team.id}
          className={`px-3 py-2 rounded-lg cursor-pointer transition
            ${
              activeTeamId === team.id
                ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 font-bold"
                : "hover:bg-emerald-50 dark:hover:bg-emerald-800 text-slate-700 dark:text-emerald-100"
            }`}
          onClick={() => onSelect(team.id)}
        >
          {team.name}
        </li>
      ))}
    </ul>
  );
}
