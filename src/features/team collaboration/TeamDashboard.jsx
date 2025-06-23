// TeamDashboard.jsx
import { useState } from "react";
import TeamList from "./TeamList";
import TeamCreate from "./TeamCreate";
import TeamMembers from "./TeamMembers";
import TeamTaskBoard from "./TeamTaskBoard";
import TaskDetails from "./TaskDetails";
import TaskComments from "./TaskComments";
import InviteTeamMember from "./InviteTeamMember";
import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";
import { useAuth } from "../../authentication/useAuth";
import TeamDetails from "./TeamDetails";

export default function TeamDashboard() {
  // const [activeTeamId, setActiveTeamId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { currentUser } = useAuth();
  const {
    activeTeamId,
    setActiveTeamId,
    teamMembers,
    onRemove,
    onInvite,
    onRoleChange,
    currentUserId,
  } = useTeamCollab();

  return (
    <div className="flex h-screen bg-emerald-50 dark:bg-[#181c23] transition-colors">
      {/* Sidebar */}
      <aside className="w-72 md:w-100 bg-white dark:bg-[#23272f] border-r border-emerald-100 dark:border-emerald-900 flex flex-col">
        <div className="p-4 border-b border-emerald-100 dark:border-emerald-900">
          <TeamCreate />
        </div>
        <TeamList onSelect={setActiveTeamId} activeTeamId={activeTeamId} />
        {activeTeamId && (
          <div className="p-4 border-t border-emerald-100 dark:border-emerald-900">
            <TeamMembers
              teamMembers={teamMembers}
              onRemove={onRemove}
              currentUserId={currentUserId}
              onRoleChange={onRoleChange}
            />
            {/* <TeamDetails teamId={activeTeamId} /> */}
            <InviteTeamMember
              onInvite={onInvite}
              teamId={activeTeamId}
              inviter={currentUser}
            />
          </div>
        )}
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {activeTeamId ? (
          <TeamTaskBoard
            teamId={activeTeamId}
            onTaskSelect={setSelectedTaskId}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-emerald-200">
            Select or create a team to get started.
          </div>
        )}
      </main>
      {/* Task Details & Comments */}
      {selectedTaskId && (
        <aside className="w-[400px] max-w-full bg-white dark:bg-[#23272f] border-l border-emerald-100 dark:border-emerald-900 flex flex-col">
          <TaskDetails taskId={selectedTaskId} teamId={activeTeamId} />
          <TaskComments taskId={selectedTaskId} teamId={activeTeamId} />
        </aside>
      )}
    </div>
  );
}
//
