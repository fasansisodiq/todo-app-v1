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
import { useTeamCollab } from "../team-collaboration/useTeamCollab";

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  // const { teamName } = useTeamCollab();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  // Memoized reference to user's notifications subcollection
  const getUserNotificationsRef = useCallback(
    () =>
      currentUser
        ? collection(db, "users", currentUser.uid, "notifications")
        : null,
    [currentUser]
  );

  // Add notification to user's subcollection
  const addNotification = useCallback(
    async (notification) => {
      const userNotificationsRef = getUserNotificationsRef();
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
          //  [Team Member Name],  "Website Redesign" project.
          message = `Hi ${invitationData.inviteeName} you've been invited to collaborate on the ${invitationData.teamName} project. Please review the tasks and let me know if you have any questions. Thanks! ".`; //
          break;
        // case "invite-sent":
        //   title = "Invitation sent";
        //   message = `you sent an invite to ${invitationData.inviteeEmail}  to collaborate on the " ${invitationData.teamName}" .`; //
        //   break;

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
        case "delete":
          title = "Task Deleted";
          message = `Task "${task.title}" was permanently deleted.`;
          break;
        case "restore":
          title = "Task Restored";
          message = `Task "${task.title}" was restored.`;
          break;
        case "due_soon": {
          title = "Task Due Soon";
          let daysLeft = null;
          if (task.dueDate) {
            const due = new Date(task.dueDate);
            const now = new Date();
            due.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);
            daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
          }
          if (daysLeft !== null && daysLeft >= 0) {
            message = `Task "${task.title}" is due in ${daysLeft} day${
              daysLeft === 1 ? "" : "s"
            }.`;
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
            completed: task.completed,
            pending: task.pending,
          },
          type,
        });
      } catch (error) {
        console.error("Failed to add notification:", error);
      }
    },
    [currentUser, addNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        markAsRead,
        changeInviteStatus,
        addNotifications,
        addTeamNotifications,
        enableNotifications,
        setEnableNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
