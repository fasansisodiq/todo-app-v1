import { MdCancel } from "react-icons/md";

function Modal({ isOpen, onClose, children }) {
  return (
    <div
      className={`  absolute inset-0 sm:inset-4 md:inset-x-2  flex justify-center items-center transition-colors z-50 
       
      `}
    >
      <div
        // onClick={(e) => e.stopPropagation()}
        className={` shadow-lg rounded-xl transition-all ${
          isOpen ? " scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
      <button
        onClick={onClose}
        className=" absolute top-2 right-3 sm:-top-24 sm:right-38 md:-top-24 md:right-29 lg:right-104 lg:-top-34 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl"
      >
        <MdCancel />
      </button>
    </div>
  );
}

export default Modal;
