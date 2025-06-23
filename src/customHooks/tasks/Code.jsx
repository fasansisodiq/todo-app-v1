import { useEffect, useMemo, useState } from "react";
import TasksContext from "./TasksContext";
import { todoTasks } from "./Tasks";
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

  // Helper to get user subcollection reference for tasks
  const userTasksRef = currentUser
    ? collection(db, "users", currentUser.uid, "tasks")
    : null;

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

  // Unique assignees (case-insensitive)
  const uniqueAssignees = useMemo(() => {
    const assignees = taskData
      ?.map((task) => task.assignee && task.assignee.toLowerCase())
      .filter(Boolean);
    return [...new Set(assignees)];
  }, [taskData]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fetch tasks from Firestore (initial load)
  useEffect(() => {
    if (!currentUser) return;
    const fetchTasks = async () => {
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
  }, [currentUser]);

  // Real-time updates for tasks
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(userTasksRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskData(newData);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Add new task
  const addNewTask = async (taskData) => {
    if (!currentUser) return;
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
      alertDueTasks(taskData);
      alert("Task added successfully!");
    } catch (error) {
      setError(error);
      alert("Failed to add task.");
    }
  };

  // Update task (including complete/pending)
  const updateTask = async (taskId, updatedTaskData) => {
    if (!currentUser) return;
    try {
      const taskDocRef = doc(db, "users", currentUser.uid, "tasks", taskId);

      let dataToUpdate = { ...updatedTaskData };
      if (updatedTaskData.completed === true && !updatedTaskData.completedAt) {
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
        user: currentUser.username || "You",
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

  // Format date function
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
    const q = query(userActivitiesRef, orderBy("timestamp", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const acts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(acts);
    });
    return () => unsubscribe();
  }, [currentUser, userActivitiesRef]);

  // Log an activity (as user subcollection)
  const logActivity = async (activity) => {
    if (!currentUser) return;
    try {
      await addDoc(userActivitiesRef, {
        ...activity,
        user: currentUser.displayName || "You",
        userId: currentUser.uid,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // function to Share task with another user ---
  const shareTaskWithUser = async (taskId, recipientUserId) => {
    if (!currentUser) return;
    try {
      // Get the task data
      const taskDoc = await getDocs(
        query(userTasksRef, (docSnap) => docSnap.id === taskId)
      );
      let taskToShare = null;
      taskDoc.forEach((docSnap) => {
        if (docSnap.id === taskId) {
          taskToShare = { id: docSnap.id, ...docSnap.data() };
        }
      });
      if (!taskToShare) throw new Error("Task not found");

      // Add to recipient's sharetasks subcollection
      const shareRef = collection(db, "users", recipientUserId, "sharetasks");
      await addDoc(shareRef, {
        ...taskToShare,
        sharedBy: currentUser.uid,
        sharedAt: new Date().toISOString(),
      });

      await addNotifications({
        type: "shared",
        task: taskToShare,
        recipient: recipientUserId,
      });

      alert("Task shared successfully!");
    } catch (error) {
      setError(error);
      alert("Failed to share task.");
    }
  };

  //  Get shared tasks for current user ---
  useEffect(() => {
    if (!currentUser) return;
    const shareRef = collection(db, "users", currentUser.uid, "sharetasks");
    const unsubscribe = onSnapshot(shareRef, (snapshot) => {
      const shared = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSharedTasks(shared);
    });
    return () => unsubscribe();
  }, [currentUser]);

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
        todoTasks,
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
