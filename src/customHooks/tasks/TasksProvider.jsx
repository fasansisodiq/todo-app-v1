import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNotifications } from "../notification/useNotifications";
import { useAuth } from "../../authentication/useAuth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

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
  priority: "please select",
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
  const [taskMenuId, setTaskMenuId] = useState(null);
  const [targetLabel, setTargetLabel] = useState("");
  const [taskModal, setTaskModal] = useState({
    open: false,
    task: null,
  });
  const [subtasksMap, setSubtasksMap] = useState({ subtaskTrash: [] });
  const {
    addNotifications,
    addSubtaskNotifications,
    notifications,
    updateCanceled,
  } = useNotifications();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // task modal handlers
  const handleTaskModalOpen = (t) => setTaskModal({ open: true, task: t });
  const handleTaskModalClose = () => setTaskModal({ open: false, task: null });

  // task menu handlers
  const handleTaskMenuOpen = (taskId) => setTaskMenuId(taskId);
  const handleTaskMenuClose = () => setTaskMenuId(null);

  // Helper to check if a due-soon notification was already sent today for a task
  const wasDueSoonNotifiedToday = useCallback(
    (taskId) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return notifications.some(
        (notif) =>
          notif.type === "due_soon" &&
          notif.taskData?.id === taskId &&
          notif.createdAt &&
          new Date(notif.createdAt).setHours(0, 0, 0, 0) === today.getTime()
      );
    },
    [notifications]
  );

  // Helper to check if a task is due soon (within 3 days)
  const isDueSoon = useCallback((dueDate) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const now = new Date();
    due.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 7;
  }, []);

  // Track last checked date to avoid running multiple times per day
  const lastCheckedRef = useRef(null);
  useEffect(() => {
    if (!currentUser || !taskData?.length) return;

    const todayStr = new Date().toDateString();
    if (lastCheckedRef.current === todayStr) return; // Already checked today

    taskData.forEach((task) => {
      if (isDueSoon(task.dueDate) && !wasDueSoonNotifiedToday(task.id)) {
        addNotifications({ type: "due_soon", task });
      }
    });

    lastCheckedRef.current = todayStr;
  }, [
    currentUser,
    taskData,
    notifications,
    addNotifications,
    wasDueSoonNotifiedToday,
    isDueSoon,
  ]);
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
  // function alertDueTasks(task) {
  //   const dueDate = new Date(task.dueDate);
  //   const now = new Date();
  //   const twoWeeksFromNow = new Date();
  //   twoWeeksFromNow.setDate(now.getDate() + 14);

  //   if (dueDate <= twoWeeksFromNow && dueDate >= now) {
  //     addNotifications({ type: "due_soon", task });
  //   }
  // }

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

  // helper function to remove undefined values from an object
  // This is useful to avoid writing undefined values to Firestore
  // which can cause issues with Firestore rules and data integrity
  function removeUndefined(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
  }

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
        // createdBy: currentUser.uid,
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
      setTask(taskData);
      toast("Task added successfully!");
    } catch (error) {
      setError(error);
      toast("Failed to add task.!");
    }
  };

  // Real-time updates for subtasks of a specific task
  // This function listens to changes in the subtasks of a specific task
  // and updates the subtasksMap state accordingly.
  const listenToSubtasks = (taskId) => {
    if (!currentUser || !taskId) return () => {};
    const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
    return onSnapshot(
      taskDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSubtasksMap((prev) => ({
            ...prev,
            [taskId]: docSnap.data().subtasks || [],
          }));
        } else {
          setSubtasksMap((prev) => ({
            ...prev,
            [taskId]: [],
          }));
        }
      },
      (err) => setError(err)
    );
  };

  // Get subtasks for a specific task
  // This function retrieves subtasks from the subtasksMap state
  const getSubtasksForTask = (taskId) => subtasksMap[taskId] || [];

  // Add new subtask to a task's subtasks array field
  const addNewSubtask = async (taskId, subtaskData) => {
    if (!currentUser) return;
    try {
      const newId = uuidv4();
      // Get the task document reference
      const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);

      // Fetch current subtasks array
      const taskSnap = await getDocs(
        query(
          collection(db, "users", currentUser.uid, "tasks"),
          where("__name__", "==", taskId)
        )
      );
      let currentSubtasks = [];
      let taskTitle = "";
      let taskClass = "";
      taskSnap.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          currentSubtasks = docSnap.data().subtasks || [];
          taskTitle = docSnap.data().title || "";
          taskClass = docSnap.data().taskClass || "";
        }
      });

      // Add the new subtask to the array
      const updatedSubtasks = [
        ...currentSubtasks,
        { ...subtaskData, id: newId },
      ];

      // Update the task document with the new subtasks array
      await updateDoc(taskDocRef, { subtasks: updatedSubtasks });

      // Log activity
      await logActivity({
        type: "subtask_added",
        taskId,
        taskTitle,
        subtaskId: subtaskData.id,
        subtaskTitle: subtaskData.title,
        timestamp: new Date(),
        user: currentUser.displayName || "You",
      });

      // Add notification
      await addSubtaskNotifications({
        type: "add_subtask",
        subtask: { ...subtaskData, id: newId },
        task: { id: taskId, title: taskTitle, taskClass },
      });

      toast("Subtask added successfully!");
    } catch (error) {
      setError(error);
      toast("Failed to add subtask!");
    }
  };

  // Update a subtask in a task's subtasks array, with notifications and activity log
  const updateSubtask = async (taskId, subtaskId, updatedFields) => {
    if (!currentUser) return;
    try {
      const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
      const taskSnap = await getDoc(taskDocRef);
      const currentSubtasks = taskSnap.exists()
        ? taskSnap.data().subtasks || []
        : [];
      const updatedSubtasks = currentSubtasks.map((sub) =>
        sub.id === subtaskId ? { ...sub, ...updatedFields } : sub
      );
      const taskTitle = taskSnap.exists() ? taskSnap.data().title || "" : "";
      const taskClass = taskSnap.exists()
        ? taskSnap.data().taskClass || ""
        : "";
      await updateDoc(taskDocRef, { subtasks: updatedSubtasks });

      // Log activity
      logActivity({
        type: "subtask_updated",
        taskId,
        subtaskId,
        taskTitle,
        subtaskTitle: updatedFields.title || subtaskId,
        timestamp: new Date(),
        user: currentUser.uid,
      });

      // Add notification
      await addSubtaskNotifications({
        type: "subtask_updated",
        subtask: { ...removeUndefined(updatedFields), subtaskId },
        task: { id: taskId, title: taskTitle, taskClass },
      });

      toast("Subtask updated successfully!");
    } catch (error) {
      setError(error);
      toast("Failed to update subtask!");
    }
  };

  // Move a subtask to user's trash sub-collection
  const trashSubtask = async (taskId, subtaskId) => {
    if (!currentUser) return;
    try {
      const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
      const taskSnap = await getDoc(taskDocRef);
      const currentSubtasks = taskSnap.exists()
        ? taskSnap.data().subtasks || []
        : [];
      const subtaskToTrash = currentSubtasks.find(
        (sub) => sub.id === subtaskId
      );

      if (!subtaskToTrash) throw new Error("Subtask not found.");

      // Remove subtask from task
      const updatedSubtasks = currentSubtasks.filter(
        (sub) => sub.id !== subtaskId
      );
      const taskTitle = taskSnap.exists() ? taskSnap.data().title || "" : "";
      const taskClass = taskSnap.exists()
        ? taskSnap.data().taskClass || ""
        : "";
      await updateDoc(taskDocRef, { subtasks: updatedSubtasks });

      // Add subtask to user's trash subcollection for subtasks
      const trashRef = doc(
        db,
        "users",
        currentUser.uid,
        "subtaskTrash",
        subtaskId
      );
      await setDoc(trashRef, {
        ...subtaskToTrash,
        parentTaskId: taskId,
        trashedAt: new Date().toISOString(),
      });

      // Log activity
      await logActivity({
        type: "subtask_trashed",
        taskId,
        subtaskId,
        taskTitle,
        subtaskTitle: subtaskToTrash.title,
        timestamp: new Date(),
        user: currentUser.uid,
      });

      // Add notification
      await addSubtaskNotifications({
        type: "subtask_trashed",
        subtask: { ...subtaskToTrash, id: subtaskId },
        task: {
          id: taskId,
          title: taskTitle,
          taskClass,
        },
        timestamp: new Date(),
        user: currentUser.uid,
      });

      toast("Subtask moved to trash.");
    } catch (error) {
      setError(error);
      toast("Failed to move subtask to trash.");
    }
  };

  // Real-time updates for subtask trash
  useEffect(() => {
    if (!currentUser) return;
    const subtaskTrashRef = collection(
      db,
      "users",
      currentUser.uid,
      "subtaskTrash"
    );
    const unsubscribe = onSnapshot(
      subtaskTrashRef,
      (snapshot) => {
        const trashedSubtasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubtasksMap((prev) => ({
          ...prev,
          subtaskTrash: trashedSubtasks,
        }));
      },
      (err) => setError(err)
    );
    return () => unsubscribe();
  }, [currentUser]);

  // Restore a subtask from user's trash subcollection back to its parent task
  const restoreTrashedSubtask = async (taskId, subtaskId) => {
    if (!currentUser) return;
    try {
      // Get subtask from trash
      const trashRef = doc(
        db,
        "users",
        currentUser.uid,
        "subtaskTrash",
        subtaskId
      );
      const trashSnap = await getDoc(trashRef);
      if (!trashSnap.exists()) throw new Error("Subtask not found in trash.");
      const trashedSubtask = trashSnap.data();

      // Add subtask back to its parent task
      const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
      const taskSnap = await getDoc(taskDocRef);
      const currentSubtasks = taskSnap.exists()
        ? taskSnap.data().subtasks || []
        : [];
      const updatedSubtasks = [...currentSubtasks, trashedSubtask];
      const taskTitle = taskSnap.exists() ? taskSnap.data().title || "" : "";
      const taskClass = taskSnap.exists()
        ? taskSnap.data().taskClass || ""
        : "";
      await updateDoc(taskDocRef, { subtasks: updatedSubtasks });

      // Remove subtask from trash
      await deleteDoc(trashRef);

      // Log activity
      await logActivity({
        type: "subtask_restored",
        taskId,
        subtaskId,
        taskTitle,
        subtaskTitle: trashedSubtask.title,
        timestamp: new Date(),
        user: currentUser.uid,
      });

      // Add notification
      await addSubtaskNotifications({
        type: "subtask_restored",
        subtask: { ...trashedSubtask, id: subtaskId },
        task: {
          id: taskId,
          title: taskTitle,
          taskClass,
        },
      });

      toast("Subtask restored successfully.");
    } catch (error) {
      setError(error);
      toast("Failed to restore subtask.");
    }
  };

  // Update task (including complete/pending)
  const updateTask = async (taskId, updatedTaskData) => {
    if (!currentUser) return;
    if (updateCanceled) return;
    const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);
    try {
      let dataToUpdate = { ...updatedTaskData };
      if (updatedTaskData.completed && !updatedTaskData.completedAt) {
        dataToUpdate.completedAt = new Date().toISOString();
      } else if (
        updatedTaskData.pending === true ||
        (updatedTaskData.status === "pending" && !updatedTaskData.dueDate)
      ) {
        updatedTaskData.status = "in progress";
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
        task: {
          ...removeUndefined(dataToUpdate),
          id: taskId,
        },
      });
      // toast(`Task ${updatedTaskData.title} updated successfully`);
    } catch (error) {
      setError(error);
      toast("Failed to update task!");
    }
  };

  // Move task to trash as a user subcollection
  const trashTask = async (taskId, deletedTaskData) => {
    if (!currentUser) return;
    try {
      // Optimistically update UI
      setTaskData((prev) => prev.filter((task) => task.id !== taskId));
      setTrashData((prev) => [
        ...prev,
        { ...removeUndefined(deletedTaskData), id: taskId },
      ]);

      // Firestore operations
      await setDoc(
        doc(db, "users", currentUser.uid, "trash", taskId),
        removeUndefined(deletedTaskData)
      );
      await deleteDoc(doc(db, "users", currentUser.uid, "tasks", taskId));

      await logActivity({
        type: "trashed",
        taskId,
        taskTitle: deletedTaskData.title,
        user: currentUser.displayName || "You",
      });

      await addNotifications({
        type: "trash",
        task: { ...removeUndefined(deletedTaskData), id: taskId },
      });

      toast("Task moved to trash.");
    } catch (error) {
      setError(error);
      toast("Task move to trash unsuccessful.");
    }
  };

  // real-time updates for trash
  useEffect(() => {
    if (!currentUser) return;
    const trashRef = collection(db, "users", currentUser.uid, "trash");
    const unsubscribe = onSnapshot(
      trashRef,
      (snapshot) => {
        const trashed = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrashData(trashed);
      },
      (err) => setError(err)
    );
    return () => unsubscribe();
  }, [currentUser]);

  // Restore task from trash as a user subcollection
  const restoreTrashTask = async (taskId, deletedTaskData) => {
    if (!currentUser) return;
    try {
      // Remove from user's trash subcollection
      await deleteDoc(doc(db, "users", currentUser.uid, "trash", taskId));
      // Restore to user's tasks subcollection
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
      toast("Task restored successfully");
    } catch (error) {
      setError(error);
      toast("Task restoration unsuccessful.");
    }
  };

  // Delete task (from trash as user subcollection)
  const deleteTask = async (taskId) => {
    if (!currentUser) return;
    try {
      // Fetch the task data from user's trash subcollection before deleting
      const taskDocRef = doc(db, "users", currentUser.uid, "trash", taskId);
      const taskSnap = await getDocs(
        query(
          collection(db, "users", currentUser.uid, "trash"),
          where("__name__", "==", taskId)
        )
      );
      let deletedTaskData = null;
      taskSnap.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          deletedTaskData = { id: docSnap.id, ...docSnap.data() };
        }
      });

      // Delete from user's trash subcollection
      await deleteDoc(taskDocRef);

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

      toast("Task deleted successfully");
    } catch (error) {
      setError(error);
      toast("Error deleting task.");
    }
  };

  // Delete a subtask from a task's subtaskytrash , with notifications and activity log(from trash as user subcollection)
  const deleteSubtask = async (taskId, subtaskId) => {
    if (!currentUser) return;
    try {
      // Fetch the subtask data from user's subtasktrash subcollection before deleting
      const subtaskDocRef = doc(
        db,
        "users",
        currentUser.uid,
        "subtaskTrash",
        taskId
      );
      const taskSnap = await getDocs(
        query(
          collection(db, "users", currentUser.uid, "subtaskTrash"),
          where("__name__", "==", taskId)
        )
      );
      let deletedSubTaskData = null;
      let taskTitle = "";
      let taskClass = "";
      taskSnap.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          deletedSubTaskData = { id: docSnap.id, ...docSnap.data() };
          taskTitle = docSnap.data().title || "";
          taskClass = docSnap.data().taskClass || "";
        }
      });

      // Delete from user's subtasktrash subcollection
      await deleteDoc(subtaskDocRef);

      // Log activity
      await logActivity({
        type: "subtask_deleted",
        taskId,
        subtaskId,
        taskTitle,
        subtaskTitle: deletedSubTaskData?.title || subtaskId,
        timestamp: new Date(),
        user: currentUser.uid,
      });

      // Only add notification if we have the full subtask data
      if (deletedSubTaskData) {
        await addSubtaskNotifications({
          type: "subtask_deleted",
          subtask: {
            ...deletedSubTaskData,
            id: subtaskId,
            title: deletedSubTaskData?.title || "",
          },
          task: { id: taskId, title: taskTitle, taskClass },
        });
      }

      toast("Subtask deleted successfully!");
    } catch (error) {
      setError(error);
      toast("Failed to delete subtask!");
    }
  };

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
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = (route) => {
    navigate(`/layout/${route}`);
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
        handleInputChange,
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
        toast,
        ToastContainer,
        handleCancel,
        initialTaskState,
        addNewSubtask,
        listenToSubtasks,
        getSubtasksForTask,
        updateSubtask,
        deleteSubtask,
        trashSubtask,
        restoreTrashedSubtask,
        subtasksMap,
        taskModal,
        handleTaskModalOpen,
        handleTaskModalClose,
        taskMenuId,
        handleTaskMenuClose,
        handleTaskMenuOpen,
        targetLabel,
        setTargetLabel,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
