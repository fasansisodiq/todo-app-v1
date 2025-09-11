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
import { serverTimestamp } from "firebase/firestore";

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  const [updateCanceled, setUpdateCanceled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  // Memoized reference to user's notifications subcollection
  const getUserNotificationsRef = useCallback(
    (userId) =>
      userId
        ? collection(db, "users", userId, "notifications")
        : currentUser
        ? collection(db, "users", currentUser.uid, "notifications")
        : null,
    [currentUser]
  );
  const wasDueSoonNotifiedToday = useCallback(
    (taskId) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return notifications.some((notif) => {
        if (
          notif.type === "due_soon" &&
          notif.taskData?.id === taskId &&
          notif.createdAt
        ) {
          // Handle Firestore Timestamp or JS Date/string
          let notifDate =
            typeof notif.createdAt.toDate === "function"
              ? notif.createdAt.toDate()
              : new Date(notif.createdAt);
          notifDate.setHours(0, 0, 0, 0);
          return notifDate.getTime() === today.getTime();
        }
        return false;
      });
    },
    [notifications]
  );

  // Add notification to user's subcollection
  // const addNotification = useCallback(async (notification) => {
  //   const userNotificationsRef = collection(
  //     db,
  //     "users",
  //     notification.userId,
  //     "notifications"
  //   );
  //   if (!userNotificationsRef) return;
  //   await addDoc(userNotificationsRef, {
  //     ...notification,
  //     createdAt: serverTimestamp(),
  //     read: false,
  //   });
  // }, []);
  const addNotification = useCallback(
    async (notification) => {
      const userNotificationsRef = getUserNotificationsRef(notification.userId);
      if (!userNotificationsRef) return;
      try {
        await addDoc(userNotificationsRef, {
          ...notification,
          createdAt: serverTimestamp(),
          read: false,
        });
      } catch (err) {
        console.error("Failed to add notification:", err);
      }
    },
    [getUserNotificationsRef]
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

  // Utility function to capitalize and highlight message
  function formatMessage(msg) {
    // Uppercase and highlight important words (like task/subtask titles)

    return msg
      .toUpperCase()
      .replace(
        /"([^"]+)"/g,
        (match, p1) =>
          `<span class="text-[#059669] font-bold">"${p1.toUpperCase()}"</span>`
      );
  }
  //Add a new notification for various team actions
  const addTeamNotifications = useCallback(
    async ({ userId, type, invitationData }) => {
      if (!userId || !invitationData) {
        console.error(
          "Missing userId or invitationData in addTeamNotifications",
          { userId, invitationData }
        );
        return;
      }
      let title = "";
      let message = "";

      switch (type) {
        case "team-invite":
          title = "TEAM INVITATION";
          message = `Hi ${formatMessage(
            invitationData.inviteeName
          )}, you've been invited to collaborate on the ${formatMessage(
            invitationData.teamName
          )} project. Please review the tasks and let me know if you have any questions. Thanks!`;
          break;
        case "accepted-invite":
          title = "INVITATION ACCEPTED";
          message = `Hi ${invitationData.inviterName}, ${
            invitationData.inviteeName
          } has accepted your invitation to join the "${formatMessage(
            invitationData.teamName
          )}" project.`;
          break;

        default:
          title = "TEAM NOTIFICATION";
          message = formatMessage(
            `Team ${formatMessage(invitationData.teamName)} has an update.`
          );
      }

      try {
        console.log("Adding team notification for userId:", userId);
        await addNotification({
          userId,
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
    [addNotification]
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
          title = "TASK ADDED";
          message = `Task ${formatMessage(task.title)} was added.`;
          break;
        case "update":
          title = "TASK UPDATED";
          message = `Task ${formatMessage(task.title)} was updated.`;
          break;
        case "trash":
          title = "TASK TRASHED";
          message = `Task ${formatMessage(task.title)} was moved to trash.`;
          break;
        case "delete":
          title = "TASK DELETED";
          message = `Task ${formatMessage(
            task.title
          )} was permanently deleted.`;
          break;
        case "restore":
          title = "TASK RESTORED";
          message = `Task ${formatMessage(task.title)} was restored.`;
          break;
        case "due_soon": {
          // Block if already sent today
          if (wasDueSoonNotifiedToday(task.id)) return;
          // Compose message
          title = "TASK DUE SOON";
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
          title = "TASK NOTIFICATION";
          message = `Task ${formatMessage(task.title)} has an update.`;
      }

      try {
        await addNotification({
          userId: currentUser.uid,
          title,
          message,
          taskData: {
            id: task.id || "",
            title: task.title || "",
            description: task.description || "",
            dueDate: task.dueDate || "",
            assignee: task.assignee || "",
            taskClass: task.taskClass || "",
            priority: task.priority || "",
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
    [currentUser, addNotification, updateCanceled, wasDueSoonNotifiedToday]
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
          title = "SUBTASK ADDED";
          message = `Subtask ${formatMessage(
            subtask.title
          )} was added to task "${task.title}".`;
          break;
        case "update_subtask":
          title = "SUBTASK UPDATED";
          message = `Subtask ${formatMessage(
            subtask.title
          )} was updated in task "${task.title}".`;
          break;
        case "trash_subtask":
          title = "SUBTASK TRASHED";
          message = `Subtask ${formatMessage(
            subtask.title
          )} was moved to trash from task "${task.title}".`;
          break;
        case "restore_subtask":
          title = "SUBTASK RESTORED";
          message = `Subtask ${formatMessage(
            subtask.title
          )} was restored to task "${task.title}".`;
          break;
        case "delete_subtask":
          title = "SUBTASK DELETED";
          message = formatMessage(
            `Subtask "${subtask.title}" was permanently deleted from task "${task.title}".`
          );
          break;
        default:
          title = "SUBTASK NOTIFICATION";
          message = `Subtask ${formatMessage(subtask.title)} in task "${
            task.title
          }" has an update.`;
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
