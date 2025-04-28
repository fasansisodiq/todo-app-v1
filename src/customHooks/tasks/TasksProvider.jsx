import React, { useEffect, useState } from "react";

import TasksContext from "./TasksContext";
import { todoTasks } from "./Tasks";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getPersistentCacheIndexManager,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// const API__URL = "http://localhost:7000";
const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date();
const todayDate = today.toLocaleDateString("en-US");

export function TasksProvider({ children }) {
  const [taskData, setTaskData] = useState([]);
  const [trashData, setTrashData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trash, setTrash] = useState("");
  const [date, setDate] = useState(today.toLocaleDateString("en-US", options));
  const [task, setTask] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    taskClass: "",
    priority: "",
    description: "",
    completed: false,
    pending: false,
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaskData(newData);
        console.log(newData);
        return newData;
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskData(newData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchTrashedTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trash"));
        const trash = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrashData(trash);
        console.log(trash);
        return trash;
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrashedTasks();
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "trash"), (snapshot) => {
      const trash = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrashData(trash);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  //add new task
  const addNewTask = async (taskData) => {
    try {
      const taskRef = await addDoc(collection(db, "tasks"), taskData);
      console.log("Task written with ID: ", taskRef.id);
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task.");
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await updateDoc(taskDocRef, updatedTaskData);
      console.log("Task updated successfully!");
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // const addDataToTrash = async (data) => {
  //   try {
  //     const collectionRef = collection(db, "trash");
  //     const docRef = await addDoc(collectionRef, data);
  //     console.log("Document written with ID: ", docRef.id);
  //     // return docRef;
  //   } catch (e) {
  //     console.error("Error adding task to trash: ", e);
  //     throw e;
  //   }
  // };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "trash", taskId);
      const trashedTask = await deleteDoc(taskRef);
      setTrash(trashedTask);
      console.log(trash);
      console.log(`Task with ID ${taskId} deleted successfully `);
      alert("Task deleted successfully ");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const trashTask = async (taskId, deletedTaskData) => {
    try {
      // Add the task to the trash collection
      const collectionRef = collection(db, "trash");
      const docRef = await setDoc(doc(collectionRef, taskId), deletedTaskData);

      // Delete the task from the tasks collection
      await deleteDoc(doc(db, "tasks", taskId));
      alert("Task moved to trash. ");
      console.log("Task moved to trash successfully.");
      return docRef;
    } catch (error) {
      alert("Task moved to trash unsuccessful.");
      console.error("Error moving task trash: ", error);
    }
  };

  const restoreTrashTask = async (taskId, deletedTaskData) => {
    try {
      // Delete the task from the trash collection
      await deleteDoc(doc(db, "trash", taskId));
      console.log("Task deleted from  trash successfully.");
      // Add the task to the tasks collection
      const collectionRef = collection(db, "tasks");
      const docRef = await setDoc(doc(collectionRef, taskId), deletedTaskData);
      console.log("Task restored back to tasks collection");
      alert("Task restored successfully");
      return docRef;
    } catch (error) {
      alert("Task restoration unsuccessful.");
      console.error("Error restoring the task : ", error);
    }
  };

  useEffect(() => {
    const indexManager = getPersistentCacheIndexManager(db);
    if (indexManager) {
      indexManager.enableIndexAutoCreation();
    }
  }, []);
  useEffect(() => {
    const indexManager = getPersistentCacheIndexManager(db);
    if (indexManager) {
      indexManager.enableIndexAutoCreation();
    } else {
      console.warn("Persistent cache index manager is not available.");
    }
  }, []);

  const searchData = async (searchTerm) => {
    const collectionRef = collection(db, "tasks");
    const q = query(
      collectionRef,
      where("taskClass", "==", searchTerm),
      where("dueDate", "==", searchTerm),
      where("title", "==", searchTerm),
      where("assignee", "==", searchTerm)
    );
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  };
  return (
    <TasksContext.Provider
      value={{
        task,
        trash,
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
        searchData,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
