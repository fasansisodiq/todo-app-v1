import CustomButton from "./CustomButton";

function AlertingModal({
  icon,
  children,
  iconColor,
  tittle,
  animation,
  modalMessage,
}) {
  return (
    <div className=" flex justify-center items-center absolute w-60 h-40 sm:h-50 md:h-60 lg:h-70 xl:h-fit xl:w-70  flex-col gap-3  xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 md:text-[1rem] lg:text-lg">
      <span
        className={`text-sm sm:text-lg md:text-2xl xl:text-3xl ${iconColor} ${animation}`}
      >
        {icon}
      </span>
      <p className="text-slate-900 font-bold text-wrap text-center">
        {modalMessage}
      </p>
      <span className="text-slate-400 text-sm">{tittle} task</span>
      <div className="flex justify-center items-center gap-4">{children}</div>
    </div>
  );
}

export default AlertingModal;
