import NotifBtn from "./NotifBtn";
import { Link } from "react-router";

const taskNotificationDatas = [
  { label: "task name", value: "title" },
  { label: "description", value: "description" },
  { label: "status", value: "status" },
  { label: "assignee", value: "assignee" },
  { label: "due date", value: "dueDate" },
  { label: "priority", value: "priority" },
];
const teamNotifDatas = [
  { label: "team name", value: "teamName" },
  { label: "to", value: "to" },
  { label: "from", value: "inviterEmail" },
  { label: "status", value: "status" },
];

const subtaskNotificationDatas = [
  { label: "subtask name", value: "title" },
  { label: "description", value: "description" },
  { label: "due date", value: "dueDate" },
  { label: "priority", value: "priority" },
  { label: "assignee", value: "assignee" },
];

function NotificationCard({
  notifications,
  onMarkAsRead,
  currentUser,
  onAcceptTeamInvite,
  onChangeInviteStatus,
}) {
  if (!notifications) return null;

  //accept invite handler
  async function handleAcceptInvite() {
    // Get teamId from the notification's invitationData
    const teamId = notifications?.invitationData?.teamId;
    // Build invitee object from currentUser (or notification data if needed)
    const invitee = {
      email: currentUser?.email,
      name: currentUser?.displayName || currentUser?.email,
      userId: currentUser?.uid,
    };

    onMarkAsRead(notifications.id);
    onChangeInviteStatus(notifications.id);
    // Pass  teamId and invitee object
    onAcceptTeamInvite(teamId, invitee);
  }

  // Helper to display High/Low for priority
  const getPriorityLabel = (priority) => {
    if (priority === true || priority === "on" || priority === "high")
      return "High";
    return "Low";
  };
  // Choose best text color for bg
  const messageTextColor = notifications.read
    ? "text-slate-600 dark:text-yellow-100"
    : "text-emerald-900 dark:text-yellow-200";

  return (
    <div
      className={`w-full p-1 sm:p-4 rounded-xl shadow mb-3 flex ${
        !notifications.read &&
        teamNotifDatas &&
        notifications?.invitationData &&
        "flex-col"
      } items-center justify-between transition-colors duration-200
        ${
          notifications.read
            ? "bg-slate-100 dark:bg-[#656b66]"
            : "bg-emerald-50 dark:bg-[#39403b]"
        }`}
    >
      <div>
        <div className="font-semibold text-emerald-700 dark:text-yellow-300">
          {notifications.title}
        </div>
        {/* Highlighted message */}
        <div
          className={`text-sm mt-1 mb-2 leading-relaxed ${messageTextColor}`}
          dangerouslySetInnerHTML={{ __html: notifications.message }}
        />
        <>
          {notifications.taskData && !notifications.subtaskData && (
            <div className="text-xs mt-2">
              {taskNotificationDatas.map((data) => (
                <div key={data.label} className={`${notifications.read && "text-slate-200/70 dark:text-yellow-200/70"}`}>
                  {data.label}:{" "}
                  <span className={`font-semibold ${notifications.read && " text-slate-400 dark:text-yellow-100"}`}>
                    {notifications.taskData[data.value]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {notifications.subtaskData && notifications.taskData && (
            <div className="text-xs mt-2">
              <div className="font-semibold text-emerald-700 dark:text-yellow-200 mb-1">
                Task:{" "}
                <span className="font-semibold dark:text-yellow-100">
                  {notifications.taskData.title}
                </span>
              </div>
              {subtaskNotificationDatas.map((data) => (
                <div key={data.label} className="dark:text-yellow-200/70">
                  {data.label}:{" "}
                  <span className="font-semibold dark:text-yellow-100">
                    {notifications.subtaskData[data.value]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {notifications.invitationData &&
            teamNotifDatas?.map((data) => (
              <div key={data.value} className="dark:text-yellow-200/70 ">
                {data.label}:{" "}
                <span className="font-semibold dark:text-yellow-100">
                  {notifications?.invitationData[data.value]}
                </span>
              </div>
            ))}
        </>
        <div className="flex flex-col text-xs text-slate-400 dark:text-yellow-500">
          {notifications.createdAt && (
            <div>
              {typeof notifications.createdAt.toDate === "function"
                ? notifications.createdAt.toDate().toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : new Date(notifications.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
            </div>
          )}
          {notifications.taskData && notifications.taskData.id && (
            <Link
              to={
                (notifications?.taskData?.status !== "in progress" &&
                  `/layout/${notifications?.taskData?.status}`) ||
                `/layout/${
                  notifications?.taskData?.taskClass ||
                  notifications?.subtaskData?.parentTaskClass
                }`
              }
              className="text-blue-600 hover:text-blue-800 font-semibold pt-1 underline"
            >
              view task details
            </Link>
          )}
        </div>
      </div>
      {/* mark as read btn */}
      {!notifications.read &&
        taskNotificationDatas &&
        notifications.taskData && (
          <NotifBtn
            label="Mark as read"
            onClick={() => onMarkAsRead(notifications.id)}
          />
        )}
      {/* accept notification btn */}
      {!notifications.read &&
        teamNotifDatas &&
        notifications?.invitationData &&
        notifications.type === "team-invite" && (
          <span className="self-end">
            <NotifBtn label="Accept invite" onClick={handleAcceptInvite} />
          </span>
        )}
      {/* For accepted-invite, show mark as read */}
      {!notifications.read &&
        teamNotifDatas &&
        notifications?.invitationData &&
        notifications.type === "accepted-invite" && (
          <span className="self-end">
            <NotifBtn
              label="Mark as read"
              onClick={() => onMarkAsRead(notifications.id)}
            />
          </span>
        )}
    </div>
  );
}
export default NotificationCard;
