import CloseBtn from "./CloseBtn";

function AlertingModal({
  icon,
  children,
  iconColor,
  title,
  animation,
  modalMessage,
  onClick,
  isOpen,
}) {
  return (
    <div
      className={`  fixed inset-0  z-20 flex justify-center items-center transition-colors  ${
        isOpen ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className=" flex justify-center items-center  absolute w-60 h-50 sm:w-70 sm:h-65 md:h-70 lg:h-70 xl:h-70 xl:w-70  flex-col gap-3  xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 md:text-[1rem] lg:text-lg">
        <span
          className={`text-lg pt-4 sm:text-xl md:text-2xl  lg:text-3xl xl:text-4xl ${iconColor} ${animation}`}
        >
          {icon}
        </span>
        <p className="text-slate-900 font-bold text-wrap text-center sm:text-xl">
          {modalMessage}
        </p>
        <span className="text-slate-400 text-sm sm:text-lg">{title} task</span>
        <div className="flex justify-center items-center gap-4">{children}</div>
        <CloseBtn
          isOpen={isOpen}
          onClick={onClick}
          btnPosition={
            "bottom-34 left-23 sm:bottom-49 sm:left-26 md:bottom-51 md:left-27 lg:bottom-50 lg:left-23"
          }
          mClassName={
            " bottom-36 left-12 sm:bottom-49 sm:left-9 sm:text-lg sm:h-7 md:bottom-52 md:left-11 lg:bottom-54  lg:left-10 xl:bottom-64 xl:left-21 lg:h-8 h-4 "
          }
        />
      </div>
    </div>
  );
}

export default AlertingModal;
