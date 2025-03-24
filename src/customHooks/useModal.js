import { useRef, useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState();
  const [openChild, setOpenChild] = useState(false);

  // const [operation, setOperation] = useState(false);

  function handleIsOpen(id) {
    setIsOpen(id);
  }
  function handleClose() {
    setIsOpen(null);
  }

  function handleOpenChild(id) {
    setOpenChild(id);
  }
  function handleCloseChild() {
    setOpenChild(null);
  }
  return {
    isOpen,
    setIsOpen,
    onOpen: handleIsOpen,
    onClose: handleClose,
    openChild,
    setOpenChild,
    onOpenChild: handleOpenChild,
    onCloseChild: handleCloseChild,
  };
}
