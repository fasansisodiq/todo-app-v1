import React from "react";
import ChildModal from "../utils/childModal";
import ModalBtn from "../utils/ModalBtn";
import { MdEdit } from "react-icons/md";

function EditTaskOperation({ setIsOpen, openChild, setOpenChild }) {
  return (
    <div>
      <ChildModal
        setIsOpen={setIsOpen}
        openChild={openChild}
        setOpenChild={setOpenChild}
        modal={
          <ModalBtn
            onClickHandler={() => setOpenChild(true)}
            onClick={() => {}}
            leftIcon={<MdEdit />}
          >
            Edit
          </ModalBtn>
        }
        childModal={""}
      />
    </div>
  );
}

export default EditTaskOperation;
