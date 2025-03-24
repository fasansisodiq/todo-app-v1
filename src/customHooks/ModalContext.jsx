import { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext();
function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const onIsOpen = useCallback(
    function handleIsOpen() {
      setIsOpen(!isOpen);
    },
    [setIsOpen, isOpen]
  );
  function handleOpenChild() {
    setOpenChild(true);
  }
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        onIsOpen,
        openChild,
        setOpenChild,
        handleOpenChild,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useModal was used outside ModalContext");
  return context;
}
export { useModal, ModalProvider };
