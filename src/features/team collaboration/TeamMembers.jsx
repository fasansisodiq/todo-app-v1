import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";

export default function TeamMembers() {
  const { activeTeamId, teamMembers, onRemove, onRoleChange, currentUserId } =
    useTeamCollab();
  if (!activeTeamId) return null;
  return (
    <div>
      <h3 className="font-semibold text-emerald-700 dark:text-emerald-200 mb-2">
        Team Members
      </h3>
      <ul className="flex flex-col gap-1">
        {teamMembers?.map((member) => (
          <li
            key={member.userId}
            className="flex items-center justify-between px-2 py-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-800"
          >
            <span className="text-slate-700 dark:text-emerald-100">
              {member.email}
            </span>
            <div className="flex items-center gap-2">
              <select
                value={member.role}
                onChange={(e) =>
                  onRoleChange && onRoleChange(member.userId, e.target.value)
                }
                className="rounded border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-xs px-2 py-1"
                disabled={
                  currentUserId !== member.userId &&
                  member.role === "team leader"
                }
              >
                <option value="team leader">Team leader</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                {/* <option></option>
                <option></option> */}
              </select>
              {onRemove && member.role !== "team leader" && (
                <button
                  onClick={() => onRemove(member.userId)}
                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
