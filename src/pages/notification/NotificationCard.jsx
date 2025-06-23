import { doc, onSnapshot } from "firebase/firestore";
import NotifBtn from "./NotifBtn";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const taskNotificationDatas = [
  { label: "task name", value: "title" },
  { label: "description", value: "description" },
  // { label: "status", value: "priority" },
  { label: "assignee", value: "assignee" },
  { label: "due date", value: "dueDate" },
  { label: "created at", value: "createdAt" },
  { label: "updated at", value: "updatedAt" },
];
const teamNotifDatas = [
  { label: "team name", value: "teamName" },
  { label: "to", value: "to" },
  { label: "from", value: "inviterEmail" },
  { label: "status", value: "status" },
];

function NotificationCard({
  notifications,
  onMarkAsRead,
  currentUser,
  activeTeamId,
  onAcceptTeamInvite,
  onChangeInviteStatus,
}) {
  // const [inviteeData, setInviteeData] = useState(null);

  // useEffect(() => {
  //   const docRef = doc(db, "teams", activeTeamId);
  //   const unsubscribe = onSnapshot(docRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       setInviteeData(docSnap.data().invites || []);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });

  //   // Cleanup the listener when the component unmounts
  //   return () => unsubscribe();
  // }, [activeTeamId]);
  // console.log(inviteeData);
  if (!notifications) return null;

  //accept invite handler
  async function handleAcceptInvite() {
    onMarkAsRead(notifications.id);
    onChangeInviteStatus(notifications.id);
    onAcceptTeamInvite(activeTeamId, currentUser);
  }
  // Helper to display High/Low for priority
  const getPriorityLabel = (priority) => {
    if (priority === true || priority === "on" || priority === "high")
      return "High";
    return "Low";
  };
  return (
    <div
      className={`p-4 rounded-xl shadow mb-3 flex ${
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
        <div className="text-slate-600 dark:text-yellow-100 text-sm">
          {notifications.message}
        </div>
        <>
          {notifications.taskData && (
            <div className="text-xs mt-2">
              {taskNotificationDatas.map((data) => (
                <div key={data.value} className="dark:text-yellow-200/70">
                  {data.label}:{" "}
                  <span className="font-semibold dark:text-yellow-100">
                    {notifications.taskData[data.value]}
                  </span>
                </div>
              ))}
              <div>
                <span className="font-semibold dark:text-yellow-200/70">
                  Priority:
                </span>{" "}
                <span
                  className={
                    getPriorityLabel(notifications.taskData.priority) === "High"
                      ? "text-red-600 dark:text-red-400 font-bold"
                      : "text-slate-500 dark:text-yellow-400 font-bold"
                  }
                >
                  {getPriorityLabel(notifications.taskData.priority)}
                </span>
              </div>
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
        <div className="text-xs text-slate-400 dark:text-yellow-500">
          {new Date(notifications.createdAt).toLocaleString()}
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
        notifications?.invitationData && (
          <span className="self-end">
            <NotifBtn label="Accept invite" onClick={handleAcceptInvite} />
          </span>
        )}
    </div>
  );
}
export default NotificationCard;
