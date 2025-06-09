import { useEffect, useState } from "react";
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

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  // Reference to the user's notifications subcollection
  const userNotificationsRef = currentUser
    ? collection(db, "users", currentUser.uid, "notifications")
    : null;

  // Add notification to user's subcollection
  const addNotification = async (notification) => {
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
  };

  // Real-time updates for notifications
  useEffect(() => {
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
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notifs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, userNotificationsRef]);

  // Mark notification as read
  async function markAsRead(id) {
    if (!currentUser || !userNotificationsRef) return;
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
  }

  // Add a new notification for various task actions
  async function addNotifications({ type, task }) {
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
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        markAsRead,
        addNotifications,
        enableNotifications,
        setEnableNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
