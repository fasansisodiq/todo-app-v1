// import { useOperation } from "../customHooks/operation/useOperation";
import CloseBtn from "./CloseBtn";

function Modal({ isOpen, onClose, children, alertingModalOpen = false }) {
  // const { openDesc, openEdit, openDelete, openMarkComp, openMarkPend } =
  //   useOperation();

  // Hide Modal if AlertingModal is open
  if (!isOpen || alertingModalOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 flex justify-center items-center bg-black/30 backdrop-blur-sm transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-white border border-emerald-100 rounded-2xl shadow-2xl
          flex flex-col items-center justify-center
          p-6 md:p-8 gap-6
          w-[90vw] max-w-md
          transition-all duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"}
        `}
      >
        {/* Close Button at top right */}
        <div className="absolute top-3 right-3 z-10">
          <CloseBtn
            isOpen={isOpen}
            onClick={onClose}
            mClassName="text-lg h-8 w-8"
            btnPosition=""
          />
        </div>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
