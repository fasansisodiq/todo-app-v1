import { useCallback, useEffect, useMemo, useState } from "react";

import TasksContext from "./TasksContext";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

import { useNotifications } from "../notification/useNotifications";
import { useAuth } from "../../authentication/useAuth";
const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date();
const todayDate = today.toLocaleDateString("en-US");
const initialTaskState = {
  title: "",
  assignee: "",
  dueDate: "",
  taskClass: "",
  priority: false,
  description: "",
  completed: false,
  pending: false,
};

export function TasksProvider({ children }) {
  const [taskData, setTaskData] = useState([]);
  const [trashData, setTrashData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState(today.toLocaleDateString("en-US", options));
  const [task, setTask] = useState(initialTaskState);
  const [sharedTasks, setSharedTasks] = useState(null);
  const { addNotifications, notifications } = useNotifications();
  const { currentUser } = useAuth();

  // Helper: Get user subcollection reference
  const getUserTasksRef = useCallback(
    () =>
      currentUser ? collection(db, "users", currentUser.uid, "tasks") : null,
    [currentUser]
  );
  const getUserActivitiesRef = useCallback(
    () =>
      currentUser
        ? collection(db, "users", currentUser.uid, "activities")
        : null,
    [currentUser]
  );
  //function to alert the user for tasks due in two weeks
  function alertDueTasks(task) {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(now.getDate() + 14);

    if (dueDate <= twoWeeksFromNow && dueDate >= now) {
      addNotifications({ type: "due_soon", task });
    }
  }

  // Sort tasks by a given field
  const sortTasks = (tasks, sortBy) =>
    [...tasks].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  const handleSort = (sortBy) => {
    setTaskData((prev) => sortTasks(prev, sortBy));
  };

  // Fetch tasks from Firestore (initial load)
  useEffect(() => {
    if (!currentUser) return;
    const userTasksRef = getUserTasksRef();
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(userTasksRef);
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaskData(newData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [currentUser, getUserActivitiesRef, getUserTasksRef]);

  // Real-time updates for tasks
  useEffect(() => {
    if (!currentUser) return;
    const userTasksRef = getUserTasksRef();
    const unsubscribe = onSnapshot(
      userTasksRef,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaskData(newData);
      },
      (err) => setError(err)
    );
    return () => unsubscribe();
  }, [currentUser, getUserActivitiesRef, getUserTasksRef]);

  // Add new task
  const addNewTask = async (taskData) => {
    if (!currentUser) return;
    const userTasksRef = getUserTasksRef();
    try {
      const dataToSave = {
        ...taskData,
        createdBy: currentUser.uid,
      };
      const docRef = await addDoc(userTasksRef, dataToSave);

      await logActivity({
        type: "added",
        taskId: docRef.id,
        taskTitle: taskData.title,
        user: currentUser.displayName || "You",
      });

      await addNotifications({
        type: "add",
        task: { ...taskData, id: docRef.id },
      });
    } catch (error) {
      setError(error);
      alert("Failed to add task.");
    }
  };

  // Update task (including complete/pending)
  const updateTask = async (taskId, updatedTaskData) => {
    if (!currentUser) return;
    const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
    try {
      let dataToUpdate = { ...updatedTaskData };
      if (updatedTaskData.completed && !updatedTaskData.completedAt) {
        dataToUpdate.completedAt = new Date().toISOString();
      }
      await updateDoc(taskDocRef, dataToUpdate);

      await logActivity({
        type:
          dataToUpdate.completed === true
            ? "completed"
            : dataToUpdate.pending === true
            ? "pending"
            : "updated",
        taskId,
        taskTitle: dataToUpdate.title,
        user: currentUser.displayName || "You",
      });

      await addNotifications({
        type: "update",
        task: { ...dataToUpdate, id: taskId },
      });
      alertDueTasks(dataToUpdate);
      alert("Task updated successfully!");
    } catch (error) {
      setError(error);
      alert("Failed to update task.");
    }
  };
  // Move task to trash
  const trashTask = async (taskId, deletedTaskData) => {
    if (!currentUser) return;
    try {
      await setDoc(doc(collection(db, "trash"), taskId), deletedTaskData);
      await deleteDoc(doc(db, "users", currentUser.uid, "tasks", taskId));

      await logActivity({
        type: "trashed",
        taskId,
        taskTitle: deletedTaskData.title,
        user: currentUser.displayName || "You",
      });

      await addNotifications({
        type: "delete",
        task: { ...deletedTaskData, id: taskId },
      });

      alert("Task moved to trash.");
    } catch (error) {
      setError(error);
      alert("Task move to trash unsuccessful.");
    }
  };

  // Restore task from trash
  const restoreTrashTask = async (taskId, deletedTaskData) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, "trash", taskId));
      await setDoc(
        doc(db, "users", currentUser.uid, "tasks", taskId),
        deletedTaskData
      );

      await logActivity({
        type: "restored",
        taskId,
        taskTitle: deletedTaskData.title,
        user: currentUser.displayName || "You",
      });

      await addNotifications({
        type: "restore",
        task: { ...deletedTaskData, id: taskId },
      });
      alert("Task restored successfully");
    } catch (error) {
      setError(error);
      alert("Task restoration unsuccessful.");
    }
  };
  // Delete task (from trash)
  const deleteTask = async (taskId) => {
    if (!currentUser) return;
    try {
      // Fetch the task data from trash before deleting
      const taskDoc = await getDocs(
        query(collection(db, "trash"), (doc) => doc.id === taskId)
      );
      let deletedTaskData = null;
      taskDoc.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          deletedTaskData = { id: docSnap.id, ...docSnap.data() };
        }
      });

      await deleteDoc(doc(db, "trash", taskId));

      await logActivity({
        type: "deleted",
        taskId,
        user: currentUser.displayName || "You",
      });

      // Only add notification if we have the full task data
      if (deletedTaskData) {
        await addNotifications({
          type: "delete",
          task: deletedTaskData,
        });
      }

      alert("Task deleted successfully");
    } catch (error) {
      setError(error);
      alert("Error deleting task.");
    }
  };
  // Delete task
  // const deleteTask = async (taskId) => {
  //   if (!currentUser) return;
  //   const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
  //   try {
  //     await deleteDoc(taskDocRef);
  //     await logActivity({
  //       type: "deleted",
  //       taskId,
  //       user: currentUser.displayName || "You",
  //     });
  //     // Optionally notify
  //   } catch (error) {
  //     setError(error);
  //     alert("Error deleting task.");
  //   }
  // };

  // Helper to get user subcollection reference for activities
  const userActivitiesRef = currentUser
    ? collection(db, "users", currentUser.uid, "activities")
    : null;

  // Fetch activities (initial load)
  useEffect(() => {
    if (!currentUser) return;
    const fetchActivities = async () => {
      try {
        const q = query(
          userActivitiesRef,
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const acts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(acts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchActivities();
  }, [currentUser, userActivitiesRef]);

  // Real-time updates for activities
  useEffect(() => {
    if (!currentUser) return;
    const userActivitiesRef = getUserActivitiesRef();
    const q = query(userActivitiesRef, orderBy("timestamp", "desc"), limit(10));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const acts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(acts);
      },
      (err) => setError(err)
    );
    return () => unsubscribe();
  }, [currentUser, getUserActivitiesRef]);

  // Log an activity (as user subcollection)
  const logActivity = async (activity) => {
    if (!currentUser) return;
    const userActivitiesRef = getUserActivitiesRef();
    try {
      await addDoc(userActivitiesRef, {
        ...activity,
        user: currentUser.displayName || "You",
        userId: currentUser.uid,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(err);
    }
  };

  // Share task with another user by username or email
  const shareTaskWithUser = async (taskId, recipientId) => {
    console.log("shareTaskWithUser called", {
      taskId,
      recipientId,
      currentUser,
    });
    if (!currentUser) {
      alert("You must be logged in to share a task.");
      console.log("Error: currentUser is not defined.");
      return;
    }
    try {
      //  Find recipient by username or email
      const usersRef = collection(db, "users");
      let q = query(usersRef, where("username", "==", recipientId));
      let querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        q = query(usersRef, where("email", "==", recipientId));
        querySnapshot = await getDocs(q);
      }

      let recipientUser = null;
      querySnapshot.forEach((docSnap) => {
        recipientUser = { id: docSnap.id, ...docSnap.data() };
      });

      if (!recipientUser) {
        alert("No user found with that username or email.");
        console.log("Error: Recipient not found for identifier:", recipientId);
        return;
      }

      //  Fetch the task to share
      const userTasksRef = collection(db, "users", currentUser.uid, "tasks");
      const taskQuery = query(userTasksRef, where("__name__", "==", taskId));
      const taskSnap = await getDocs(taskQuery);

      let taskToShare = null;
      taskSnap.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          taskToShare = { id: docSnap.id, ...docSnap.data() };
        }
      });

      if (!taskToShare) {
        alert("Task not found.");
        console.log("Error: Task not found for taskId:", taskId);
        return;
      }

      //  Prepare document data
      const documentData = {
        ...taskToShare,
        sharedBy: currentUser.uid,
        sharedAt: new Date().toISOString(),
      };

      // Log document data and Firestore path before writing
      console.log("Sharing task with document data:", documentData);
      console.log("Firestore path:", `users/${recipientUser.id}/sharetasks`);

      //  Add to recipient's sharetasks subcollection
      const shareRef = collection(db, "users", recipientUser.id, "sharetasks");
      await addDoc(shareRef, documentData);

      alert(
        `Task shared successfully with ${
          recipientUser.username || recipientUser.email
        }!`
      );
    } catch (error) {
      // console.error("Failed to share task:", error);
      alert("Failed to share task. Please try again.");
      throw error;
    }
  };

  // // Share task with another user by username or email
  // const shareTaskWithUser = async (taskId, recipientId) => {
  //   if (!currentUser) {
  //     alert("You must be logged in to share a task.");
  //     return;
  //   }
  //   try {
  //     // Find the recipient user by username or email
  //     const usersRef = collection(db, "users");
  //     const q = query(usersRef, where("username", "==", recipientId));

  //     let querySnapshot = await getDocs(q);

  //     if (querySnapshot.empty) {
  //       // Try searching by email if not found by username
  //       const emailQuery = query(
  //         usersRef,
  //         where("email", "==", recipientId)
  //       );
  //       querySnapshot = await getDocs(emailQuery);
  //     }

  //     let recipientUser = null;
  //     querySnapshot.forEach((docSnap) => {
  //       recipientUser = { id: docSnap.id, ...docSnap.data() };
  //     });

  //     if (!recipientUser) {
  //       alert("No user found with that username or email.");
  //       return;
  //     }

  //     // Get the task data
  //     const userTasksRef = collection(db, "users", currentUser.uid, "tasks");
  //     const taskQuery = query(userTasksRef, where("__name__", "==", taskId));
  //     const taskSnap = await getDocs(taskQuery);

  //     let taskToShare = null;
  //     taskSnap.forEach((docSnap) => {
  //       if (docSnap.id === taskId) {
  //         taskToShare = { id: docSnap.id, ...docSnap.data() };
  //       }
  //     });
  //     if (!taskToShare) throw new Error("Task not found.");
  //     console.log(taskToShare);

  //     // Add to recipient's sharetasks subcollection
  //     const shareRef = collection(db, "users", recipientUser.id, "sharetasks");
  //     await addDoc(shareRef, {
  //       ...taskToShare,
  //       sharedBy: currentUser.uid,
  //       sharedAt: new Date().toISOString(),
  //     });

  //     await addNotifications({
  //       type: "shared",
  //       task: taskToShare,
  //       recipient: recipientUser.id,
  //     });

  //     alert(
  //       `Task shared successfully with ${
  //         recipientUser.username || recipientUser.email
  //       }!`
  //     );
  //   } catch (error) {
  //     setError(error);
  //     console.log(error);
  //     alert("Failed to share task.");
  //   }
  // };

  // Get shared tasks for current user
  useEffect(() => {
    if (!currentUser) return;
    const shareRef = collection(db, "users", currentUser.uid, "sharetasks");
    const unsubscribe = onSnapshot(
      shareRef,
      (snapshot) => {
        const shared = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSharedTasks(shared);
      },
      (err) => setError(err)
    );
    return () => unsubscribe();
  }, [currentUser]);

  // Memoized unique assignees (case-insensitive)
  const uniqueAssignees = useMemo(() => {
    const assignees = taskData
      ?.map((task) => task.assignee && task.assignee.toLowerCase())
      .filter(Boolean);
    return [...new Set(assignees)];
  }, [taskData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //date formatting
  function formatDate(dateString) {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateString))
      return dateString.replace(/\//g, "-");
    let [day, month, year] =
      (dateString.includes("-") && dateString.split("-")) ||
      (dateString.includes("/") && dateString.split("/"));
    if (year && month && day) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return "";
  }

  function getDateObj(date) {
    return new Date(formatDate(date));
  }

  return (
    <TasksContext.Provider
      value={{
        task,
        setTask,
        error,
        handleChange,
        addNewTask,
        deleteTask,
        updateTask,
        date,
        setDate,
        taskData,
        setTaskData,
        isLoading,
        setIsLoading,
        todayDate,
        trashTask,
        trashData,
        restoreTrashTask,
        searchQuery,
        setSearchQuery,
        uniqueAssignees,
        handleSort,
        formatDate,
        getDateObj,
        activities,
        logActivity,
        shareTaskWithUser,
        sharedTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
