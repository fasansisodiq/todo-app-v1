import { useModal } from "../customHooks/useModal";

function ChildModal({ modal, childModal, mClassName, tittle }) {
  const { openChild, setOpenChild } = useModal();
  return (
    <div
      className=" w-full h-fit   relative cursor-pointer "
      onMouseEnter={() => setOpenChild(tittle)}
      onMouseLeave={() => setOpenChild(null)}
    >
      {modal}
      {openChild === tittle && (
        <span
          className={` absolute 
             flex justify-center items-center  z-40  ${mClassName}`}
        >
          {childModal}
        </span>
      )}
    </div>
  );
}

export default ChildModal;
