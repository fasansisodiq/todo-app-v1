import { useState } from "react";
import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";
import Modal from "../../utils/Modal";

export default function TeamMembers() {
  const [otherUserRole, setOtherUserRole] = useState(false);
  const [newRole, setNewRole] = useState("");
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
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value={newRole} onClick={() => setOtherUserRole(true)}>
                  Others
                </option>
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
      {otherUserRole && (
        <Modal onClose={() => setOtherUserRole(false)} isOpen={otherUserRole}>
          <h4 className="font-semibold text-emerald-700 dark:text-emerald-200 mb-2">
            Other User Role
          </h4>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter custom role"
            className="w-full border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-sm px-2 py-1 rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                if (newRole.trim() && onRoleChange) {
                  onRoleChange(otherUserRole.userId, newRole.trim());
                }
                setOtherUserRole(false);
                setNewRole("");
              }}
              className="px-4 py-2 bg-emerald-600 text-white dark:text-yellow-200 font-semibold rounded hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={() => {
                setOtherUserRole(false);
                setNewRole("");
              }}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
