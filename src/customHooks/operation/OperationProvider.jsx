import { useReducer, useState } from "react";
import OperationContext from "./OperationContext";

const initialState = {
  openDesc: false,
  openEdit: false,
  openDelete: false,
  openMarkComp: false,
  openMarkPend: false,
  openRestore: false,
  openTrash: false,
  openShare: false,
  openSubTask: false,
  openEditSubTask: false,
};
const operationReducer = (state, action) => {
  switch (action.type) {
    case "operation/setOpenDesc":
      return { ...state, openDesc: action.payload };
    case "operation/setOpenEdit":
      return { ...state, openEdit: action.payload };
    case "operation/setOpenDelete":
      return { ...state, openDelete: action.payload };
    case "operation/setOpenMarkComp":
      return { ...state, openMarkComp: action.payload };
    case "operation/setOpenMarkPend":
      return { ...state, openMarkPend: action.payload };
    case "operation/setOpenRestore":
      return { ...state, openRestore: action.payload };
    case "operation/setOpenTrash":
      return { ...state, openTrash: action.payload };
    case "operation/setOpenShare":
      return { ...state, openShare: action.payload };
    case "operation/setOpenSubTask":
      return { ...state, openSubTask: action.payload };
    case "operation/subtask/setOpenEditSubtask":
      return { ...state, openEditSubTask: action.payload };
    default:
      return state;
  }
};

export function OperationProvider({ children }) {
  const [openModal, setOpenModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  function handleOpenDesc() {
    dispatch({ type: "operation/setOpenDesc", payload: true });
  }
  function handleCloseDesc() {
    dispatch({ type: "operation/setOpenDesc", payload: false });
  }

  function handleOpenEdit() {
    dispatch({ type: "operation/setOpenEdit", payload: true });
  }
  function handleCloseEdit() {
    dispatch({ type: "operation/setOpenEdit", payload: false });
  }

  function handleOpenDelete() {
    dispatch({ type: "operation/setOpenDelete", payload: true });
  }
  function handleCloseDelete() {
    dispatch({ type: "operation/setOpenDelete", payload: false });
  }

  function handleOpenMarkComp() {
    dispatch({ type: "operation/setOpenMarkComp", payload: true });
  }
  function handleCloseMarkComp() {
    dispatch({ type: "operation/setOpenMarkComp", payload: false });
  }

  function handleOpenMarkPend() {
    dispatch({ type: "operation/setOpenMarkPend", payload: true });
  }
  function handleCloseMarkPend() {
    dispatch({ type: "operation/setOpenMarkPend", payload: false });
  }

  function handleOpenRestore() {
    dispatch({ type: "operation/setOpenRestore", payload: true });
  }
  function handleCloseRestore() {
    dispatch({ type: "operation/setOpenRestore", payload: false });
  }

  function handleOpenTrash() {
    dispatch({ type: "operation/setOpenTrash", payload: true });
  }
  function handleCloseTrash() {
    dispatch({ type: "operation/setOpenTrash", payload: false });
  }
  function handleOpenShare() {
    dispatch({ type: "operation/setOpenShare", payload: true });
  }
  function handleCloseShare() {
    dispatch({ type: "operation/setOpenShare", payload: false });
  }
  function handleOpenSubTask() {
    dispatch({ type: "operation/setOpenSubTask", payload: true });
  }
  function handleCloseSubTask() {
    dispatch({ type: "operation/setOpenSubTask", payload: false });
  }
  function handleOpenEditSubTask() {
    dispatch({ type: "operation/subtask/setOpenEditSubtask", payload: true });
  }
  function handleCloseEditSubTask() {
    dispatch({ type: "operation/subtask/setOpenEditSubtask", payload: false });
  }

  const [
    {
      openDesc,
      openEdit,
      openDelete,
      openMarkComp,
      openMarkPend,
      openRestore,
      openTrash,
      openShare,
      openSubTask,
      openEditSubTask,
    },
    dispatch,
  ] = useReducer(operationReducer, initialState);

  return (
    <OperationContext.Provider
      value={{
        openModal,
        setOpenModal,
        darkMode,
        setDarkMode,
        openDesc,
        // setOpenDesc,
        onCloseDesc: handleCloseDesc,
        onOpenDesc: handleOpenDesc,
        openEdit,
        //setOpenEdit,
        onOpenEdit: handleOpenEdit,
        onCloseEdit: handleCloseEdit,
        openDelete,
        // setOpenDelete,
        onOpenDelete: handleOpenDelete,
        onCloseDelete: handleCloseDelete,
        openMarkComp,
        // setOpenMarkComp,
        onOpenMarkComp: handleOpenMarkComp,
        onCloseMarkComp: handleCloseMarkComp,
        openMarkPend,
        // setOpenMarkPend,
        onOpenMarkPend: handleOpenMarkPend,
        onCloseMarkPend: handleCloseMarkPend,

        openRestore,
        onOpenRestore: handleOpenRestore,
        onCloseRestore: handleCloseRestore,

        openTrash,
        onOpenTrash: handleOpenTrash,
        onCloseTrash: handleCloseTrash,

        openShare,
        onOpenShare: handleOpenShare,
        onCloseShare: handleCloseShare,

        openSubTask,
        onOpenSubTask: handleOpenSubTask,
        onCloseSubTask: handleCloseSubTask,

        openEditSubTask,
        onOpenEditSubTask: handleOpenEditSubTask,
        onCloseEditSubTask: handleCloseEditSubTask,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
}
