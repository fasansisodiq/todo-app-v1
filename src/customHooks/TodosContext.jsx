import { createContext, useContext, useReducer, useState } from "react";

const TodosContext = createContext();
const modalInitialState = {
  openViewDesc: false,
  openDelTask: false,
  openMarkTaskComp: false,
  openMarkTaskPend: false,
  
};
// const taskInitial = {tasks: {}}
function modalReducer(state, action) {
  switch (action.type) {
    
    case "childModal/openViewDesc":
      return {
        ...state,
        openViewDesc: true,
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
    case  "openViewDesc/close" :
      return {...state,
     openViewDesc: false,
  // openDelTask: false,
  // openMarkTaskComp: false,
  // openMarkTaskPend: false,
      }
      
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
  const [hide, setHide] = useState(null)
  const [
    { openViewDesc, openDelTask, openMarkTaskComp, openMarkTaskPend, tasks },
    dispatch,
  ] = useReducer(modalReducer, modalInitialState);


  function handleIsOpen(id) {
    setIsOpen(id);
    // setHide(true)
  }
  function handleClose() {
    setIsOpen(null);
  }
//   function handleHide () {
// setHide(true)
//   }
  function handleOpenViewTaskDesc() {
      dispatch({ type: "childModal/openViewDesc" });
  }
  function handleCloseViewTaskDesc() {
      dispatch({ type: "childModal/close" });
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
  function handleCloseViewDesc(e){
e.preventDefault()
    dispatch({ type: "openViewDesc/close" });
  }
 
  return (
    <TodosContext.Provider
      value={{
         isOpen,
        setIsOpen,
        setHide,
        onOpen: handleIsOpen,
        onClose: handleClose,
        openViewDesc,
        openDelTask,
        openMarkTaskComp,
        openMarkTaskPend,
        onCloseViewDesc : handleCloseViewTaskDesc,
        onCloseDesc : handleCloseViewDesc,
        onViewDesc: handleOpenViewTaskDesc,
        onDelTask: handleOpenDelTask,
        onMarkTaskComp: handleOpenMarkTaskComp,
        onMarkTaskPend: handleOpenMarkTaskPend,
        dispatch,
        hide,
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
