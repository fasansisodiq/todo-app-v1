import { createContext, useContext, useReducer, useState } from "react";

const TodosContext = createContext();
const initialState = {
  openViewDesc: false,
  openDelTask: false,
  openMarkTaskComp: false,
  openMarkTaskPend: false,
  tasks: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "childModal/openViewDesc":
      return {
        ...state,
        openViewDesc: true,
        openDelTask: false,
        openMarkTaskComp: false,
        openMarkTaskPend: false,
      };
    case "childModal/openDelTask":
      return {
        ...state,
        openDelTask: true,
      };
    case "childModal/openMarkTaskComp":
      return {
        ...state,
        openMarkTaskComp: true,
      };
    case "childModal/openMarkTaskPend":
      return {
        ...state,

        openMarkTaskPend: true,
      };
    case "task/deleted":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id === action.payload),
      };
    default:
      throw new Error("Unknown action type");
  }
}

function TodosProvider({ children }) {
  const [isOpen, setIsOpen] = useState(null);
  // const [openChild, setOpenChild] = useState(false);

  const [
    { openViewDesc, openDelTask, openMarkTaskComp, openMarkTaskPend, tasks },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleIsOpen(id) {
    setIsOpen((prev) => prev.id === id);
  }
  function handleClose() {
    setIsOpen(null);
  }
  function handleOpenViewTaskDesc() {
    dispatch({ type: "childModal/openViewDesc" });
  }
  function handleOpenDelTask() {
    dispatch({ type: "childModal/openDelTask" });
  }
  function handleOpenMarkTaskComp() {
    dispatch({ type: "childModal/openMarkTaskComp" });
  }
  function handleOpenMarkTaskPend() {
    dispatch({ type: "childModal/openMarkTaskPend" });
  }
  return (
    <TodosContext.Provider
      value={{
        openViewDesc,
        openDelTask,
        openMarkTaskComp,
        openMarkTaskPend,
        onViewDesc: handleOpenViewTaskDesc,
        onDelTask: handleOpenDelTask,
        onMarkTaskComp: handleOpenMarkTaskComp,
        onMarkTaskPend: handleOpenMarkTaskPend,
        dispatch,
        isOpen,
        setIsOpen,
        onOpen: handleIsOpen,
        onClose: handleClose,
        tasks,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("useTodos was used outside TodosContext");
  return context;
}

export { TodosProvider, useTodos };
