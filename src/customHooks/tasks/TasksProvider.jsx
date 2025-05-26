import { useEffect, useMemo, useState } from "react";
import TasksContext from "./TasksContext";
import { todoTasks } from "./Tasks";
import { db } from "../../firebase";
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

  // Get unique assignees (case-insensitive)
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

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
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
  }, []);

  // Real-time updates for tasks
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskData(newData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch trashed tasks
  useEffect(() => {
    const fetchTrashedTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trash"));
        const trash = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrashData(trash);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrashedTasks();
  }, []);

  // Real-time updates for trash
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "trash"), (snapshot) => {
      const trash = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrashData(trash);
    });
    return () => unsubscribe();
  }, []);

  // Add new task
  const addNewTask = async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), taskData);
      // Log activity
      await logActivity({
        type: "created",
        taskId: docRef.id,
        taskTitle: taskData.title,
        // user: taskData.assignee || "Unknown",
      });
      alert("Task added successfully!");
    } catch (error) {
      setError(error);
      alert("Failed to add task.");
    }
  };

  // Update task
  // Update task
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);

      // If marking as completed, add completedAt timestamp
      let dataToUpdate = { ...updatedTaskData };
      if (
        updatedTaskData.completed === true &&
        !updatedTaskData.completedAt // Only set if not already present
      ) {
        dataToUpdate.completedAt = new Date().toISOString();
      }
      await updateDoc(taskDocRef, dataToUpdate);
      // Log activity
      await logActivity({
        type: updatedTaskData.completed ? "completed" : "updated",
        taskId,
        taskTitle: updatedTaskData.title,
        // user: updatedTaskData.assignee || "Unknown",
      });
      alert("Task updated successfully!");
    } catch (error) {
      setError(error);
      alert("Failed to update task.");
    }
  };

  // Delete task (from trash)
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "trash", taskId));
      // Log activity
      await logActivity({
        type: "deleted",
        taskId,
        // user: "Unknown",
      });
      alert("Task deleted successfully");
    } catch (error) {
      setError(error);
      alert("Error deleting task.");
    }
  };

  // Move task to trash
  const trashTask = async (taskId, deletedTaskData) => {
    try {
      await setDoc(doc(collection(db, "trash"), taskId), deletedTaskData);
      await deleteDoc(doc(db, "tasks", taskId));
      alert("Task moved to trash.");
    } catch (error) {
      setError(error);
      alert("Task move to trash unsuccessful.");
    }
  };

  // Restore task from trash
  const restoreTrashTask = async (taskId, deletedTaskData) => {
    try {
      await deleteDoc(doc(db, "trash", taskId));
      await setDoc(doc(collection(db, "tasks"), taskId), deletedTaskData);

      // Log activity
      await logActivity({
        type: "restored",
        taskId,
        taskTitle: deletedTaskData.title,
        // user: deletedTaskData.assignee || "Unknown",
      });

      alert("Task restored successfully");
    } catch (error) {
      setError(error);
      alert("Task restoration unsuccessful.");
    }
  };
  //format date function
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
  // Fetch recent activities (last 10)
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
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
  }, []);
  // Real-time updates for activities
  useEffect(() => {
    const q = query(
      collection(db, "activities"),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const acts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(acts);
    });
    return () => unsubscribe();
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    displayName: "Unknown",
  };
  // Log an activity
  const logActivity = async (activity) => {
    try {
      await addDoc(collection(db, "activities"), {
        ...activity,
        user: currentUser.displayName || "Unknown",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
    }
  };
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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
