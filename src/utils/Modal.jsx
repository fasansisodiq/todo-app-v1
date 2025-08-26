import CloseBtn from "./CloseBtn";

function Modal({ isOpen, onClose, children, alertingModalOpen = false }) {
  if (!isOpen || alertingModalOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`w-screen fixed inset-0 z-60 flex justify-center items-center bg-black/30 dark:bg-bg-[#181f1b] dark:rounded-2xl backdrop-blur-sm transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-white dark:bg-[#181f1b] border border-emerald-100 dark:border-yellow-300  rounded-2xl shadow-2xl
          flex flex-col items-center justify-center
          p-6 max-w-screen mx-auto
          transition-all duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"}
        `}
      >
        {/* Close Button at top right */}
        <div className="absolute -top-1 right-14 z-10 dark:text-yellow-300 text-slate-900">
          <CloseBtn
            isOpen={isOpen}
            onClick={onClose}
            mClassName="text-lg h-fit w-fit left-0 top-0 sm:left-2 sm:top-2 md:left-3 md:top-3 lg:left-5  lg:top-9"
            btnPosition=" left-0 top-0 sm:left-2 sm:top-2 md:left-3 md:top-3 lg:left-4 lg:top-2"
          />
        </div>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
