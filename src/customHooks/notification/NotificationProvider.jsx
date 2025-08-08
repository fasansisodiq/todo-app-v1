import { useEffect, useState, useCallback } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  addDoc,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import NotificationContext from "./NotificationContext";
import { useAuth } from "../../authentication/useAuth";
import capitalizer ;
import { useTeamCollab } from "../team-collaboration/useTeamCollab";

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  // const { teamName } = useTeamCollab();
  const [updateCanceled, setUpdateCanceled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  // Memoized reference to user's notifications subcollection
  const getUserNotificationsRef = useCallback(
    (userId) =>
      currentUser
        ? collection(
            db,
            "users",
            userId ? userId : currentUser.uid,
            "notifications"
          )
        : null,
    [currentUser]
  );
  // //Memoized reference to team notifications subcollection
  // const getTeamNotificationsRef = useCallback(
  //   (teamId) =>
  //     currentUser
  //       ? collection(
  //           db,
  //           "teams",
  //           teamId ? teamId : currentUser.uid,
  //           "notifications"
  //         )
  //       : null,
  //   [currentUser]
  // );

  // //add notification to team's subcollection
  // const addTeamNotification = useCallback(
  //   async (teamId, notification) => {
  //     const teamNotificationsRef = getTeamNotificationsRef(teamId);
  //     if (!currentUser || !teamNotificationsRef) return;
  //     try {
  //       await addDoc(teamNotificationsRef, {
  //         ...notification,
  //         createdAt: new Date().toISOString(),
  //         status: "pending",
  //       });
  //     } catch (err) {
  //       console.error("Failed to add team notification:", err);
  //     }
  //   },
  //   [currentUser, getTeamNotificationsRef]
  // );

  // Add notification to user's subcollection
  const addNotification = useCallback(
    async (notification) => {
      const userNotificationsRef = getUserNotificationsRef(notification.userId);
      if (!currentUser || !userNotificationsRef) return;
      try {
        await addDoc(userNotificationsRef, {
          ...notification,
          createdAt: new Date().toISOString(),
          read: false,
        });
      } catch (err) {
        console.error("Failed to add notification:", err);
      }
    },
    [currentUser, getUserNotificationsRef]
  );

  // Real-time updates for notifications
  useEffect(() => {
    setLoading(true);
    const userNotificationsRef = getUserNotificationsRef();
    if (!currentUser || !userNotificationsRef) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const q = query(
      userNotificationsRef,
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notifs);
        setLoading(false);
      },
      (err) => {
        setNotifications([]);
        setLoading(false);
        console.error("Notification listener error:", err);
      }
    );

    return () => unsubscribe();
  }, [currentUser, getUserNotificationsRef]);

  // Mark notification as read
  const markAsRead = useCallback(
    async (id) => {
      if (!currentUser) return;
      try {
        const notifDoc = doc(db, "users", currentUser.uid, "notifications", id);
        await updateDoc(notifDoc, { read: true });
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        );
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    },
    [currentUser]
  );
  // Change invite status
  const changeInviteStatus = useCallback(
    async (id) => {
      if (!currentUser) return;
      try {
        const notifDoc = doc(db, "users", currentUser.uid, "notifications", id);
        await updateDoc(notifDoc, { status: "accepted" });
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, status: "accepted" } : notif
          )
        );
      } catch (error) {
        console.error("Failed to change invitation status:", error);
      }
    },
    [currentUser]
  );
  //Add a new notification for various team actions
  const addTeamNotifications = useCallback(
    async ({ type, invitationData }) => {
      if (!currentUser || !invitationData) return;
      let title = "";
      let message = "";

      switch (type) {
        case "team-invite":
          title = "Team Invitation";
          message = `Hi ${
            invitationData.inviteeName
          } you've been invited to collaborate on the ${capitalizer(
            invitationData.teamName
          )} project. Please review the tasks and let me know if you have any questions. Thanks! ".`; //
          break;
        case "accepted-invite":
          title = "Invitation Accepted";
          message = `Hi ${invitationData.inviterName}, ${
            invitationData.inviteeName
          } has accepted your invitation to join the ${capitalizer(
            invitationData.teamName
          )} project.`;
          break;

        default:
          title = "Team Notification";
          message = `Team "${invitationData.teamName}" has an update.`; //
      }

      try {
        await addNotification({
          userId: currentUser.uid,
          title,
          message,
          invitationData: {
            id: invitationData.teamId || "",
            to: invitationData.inviteeEmail,
            type: invitationData.type,
            teamId: invitationData.teamId,
            teamName: invitationData.teamName,
            inviterEmail: invitationData.inviterEmail,
            inviteeEmail: invitationData.inviteeEmail,
            createdAt: invitationData.createdAt,
            inviterName:
              invitationData.inviterName || invitationData.inviterEmail,
            status: invitationData.status,
          },
          type,
        });
      } catch (error) {
        console.error("Failed to add notification:", error);
      }
    },
    [currentUser, addNotification]
  );
  // Add a new notification for various task actions
  const addNotifications = useCallback(
    async ({ type, task }) => {
      if (!currentUser || !task) return;
      if (updateCanceled) return;
      let title = "";
      let message = "";

      switch (type) {
        case "add":
          title = "Task Added";
          message = `Task "${task.title}" was added.`;
          break;
        case "update":
          title = "Task Updated";
          message = `Task "${task.title}" was updated.`;
          break;
        case "trash":
          title = "Task Trashed";
          message = `Task "${task.title}" was moved to trash.`;
          break;
        case "delete":
          title = "Task Deleted";
          message = `Task "${task.title}" was permanently deleted.`;
          break;
        case "restore":
          title = "Task Restored";
          message = `Task "${task.title}" was restored.`;
          break;
        case "due_soon": {
          // Check if a due_soon notification for this task was already sent today
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          // Find if a due_soon notification for this task and today already exists
          const alreadySent = notifications.some(
            (notif) =>
              notif.type === "due_soon" &&
              notif.taskData?.id === task.id &&
              notif.createdAt &&
              new Date(notif.createdAt).setHours(0, 0, 0, 0) === today.getTime()
          );
          if (alreadySent) return;
          // Compose message
          title = "Task Due Soon";
          let daysLeft = null;
          if (task.dueDate) {
            const due = new Date(task.dueDate);
            const now = new Date();
            due.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);
            daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
          }
          if (daysLeft === 1) {
            message = `Task "${task.title}" is due tomorrow.`;
          } else if (daysLeft === 0) {
            message = `Task "${task.title}" is due today.`;
          } else if (daysLeft > 1) {
            message = `Task "${task.title}" is due in ${daysLeft} days.`;
          } else if (daysLeft < 0) {
            message = `Task "${task.title}" is overdue!`;
          } else {
            message = `Task "${task.title}" is due soon.`;
          }
          break;
        }
        default:
          title = "Task Notification";
          message = `Task "${task.title}" has an update.`;
      }

      try {
        await addNotification({
          userId: currentUser.uid,
          title,
          message,
          taskData: {
            id: task.id || "",
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            assignee: task.assignee,
            taskClass: task.taskClass,
            priority: task.priority,
            completed: task.completed || false,
            pending: task.pending || false,
            status: task.status || "in progress",
          },
          type,
        });
      } catch (error) {
        console.error("Failed to add notification:", error);
      }
    },
    [currentUser, addNotification, updateCanceled, notifications]
  );

  // Add a new notification for various subtask actions
  const addSubtaskNotifications = useCallback(
    async ({ type, subtask, task }) => {
      if (!currentUser || !subtask || !task) return;
      if (updateCanceled) return;
      let title = "";
      let message = "";

      switch (type) {
        case "add_subtask":
          title = "Subtask Added";
          message = `Subtask "${subtask.title}" was added to task "${task.title}".`;
          break;
        case "update_subtask":
          title = "Subtask Updated";
          message = `Subtask "${subtask.title}" was updated in task "${task.title}".`;
          break;
        case "trash_subtask":
          title = "Subtask Trashed";
          message = `Subtask "${subtask.title}" was moved to trash from task "${task.title}".`;
          break;
        case "restore_subtask":
          title = "Subtask Restored";
          message = `Subtask "${subtask.title}" was restored to task "${task.title}".`;
          break;
        case "delete_subtask":
          title = "Subtask Deleted";
          message = `Subtask "${subtask.title}" was permanently deleted from task "${task.title}".`;
          break;
        default:
          title = "Subtask Notification";
          message = `Subtask "${subtask.title}" in task "${task.title}" has an update.`;
      }

      try {
        await addNotification({
          userId: currentUser.uid,
          title,
          message,
          subtaskData: {
            id: subtask.id || "",
            title: subtask.title || "no title",
            description: subtask.description || "no description",
            dueDate: subtask.dueDate || "No due date",
            assignee: subtask.assignee || "unassigned",
            priority: subtask.priority || "low",
            completed: subtask.completed || false,
            parentTaskId: task.id || "",
            parentTaskTitle: task.title || " no title",
            parentTaskClass: task.taskClass || "",
          },
          taskData: {
            id: task.id || "",
            title: task.title,
          },
          type,
        });
      } catch (error) {
        console.error("Failed to add subtask notification:", error);
      }
    },
    [currentUser, addNotification, updateCanceled]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        markAsRead,
        changeInviteStatus,
        addNotifications,
        addSubtaskNotifications,
        addTeamNotifications,
        enableNotifications,
        setEnableNotifications,
        updateCanceled,
        setUpdateCanceled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
