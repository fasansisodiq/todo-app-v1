import { useReducer, useState } from "react";
import OperationContext from "./OperationContext";

const initialState = {
  openDesc: false,
  openEdit: false,
  openDelete: false,
  openMarkComp: false,
  openMarkPend: false,
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
    default:
      return state;
  }
};

export function OperationProvider({ children }) {
  const [openModal, setOpenModal] = useState(null);
  // const [openDesc, setOpenDesc] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  // const [openMarkComp, setOpenMarkComp] = useState(false);
  // const [openMarkPend, setOpenMarkPend] = useState(false);
  // const [openEdit, setEdit] = useState(false);

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

  const [
    { openDesc, openEdit, openDelete, openMarkComp, openMarkPend },
    dispatch,
  ] = useReducer(operationReducer, initialState);

  return (
    <OperationContext.Provider
      value={{
        openModal,
        setOpenModal,

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
      }}
    >
      {children}
    </OperationContext.Provider>
  );
}
