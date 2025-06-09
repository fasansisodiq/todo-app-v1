import CloseBtn from "./CloseBtn";

function AlertingModal({
  icon,
  children,
  iconColor = "text-emerald-600",
  title,
  animation = "",
  modalMessage,
  onClick,
  isOpen,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/30  backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md bg-white dark:bg-[#232b25] rounded-2xl shadow-2xl border border-emerald-100 flex flex-col items-center gap-4 px-6 dark:px-2 py-8 animate-fade-in">
        {/* Close Button at top right */}
        <div className="absolute -top-1 right-11 z-30 dark:text-yellow-300 text-slate-900">
          <CloseBtn
            isOpen={isOpen}
            onClick={onClick}
            btnPosition=""
            mClassName="text-lg h-fit w-fit left-0 top-0 sm:left-2 sm:top-2 md:left-3 md:top-3 lg:left-5  lg:top-9 "
          />
        </div>
        {/* Icon */}
        <span
          className={`flex items-center justify-center text-3xl sm:text-4xl md:text-5xl ${iconColor} ${animation}`}
        >
          {icon}
        </span>
        {/* Message */}
        <p className="text-slate-900 dark:text-yellow-300 font-bold text-center text-lg sm:text-xl">
          {modalMessage}
        </p>
        {/* Title */}
        {title && (
          <span className="text-slate-400 dark:text-yellow-100 dark:opacity-70 text-sm sm:text-base mb-2">
            {title} task
          </span>
        )}
        {/* Actions */}
        <div className="flex justify-center items-center gap-4 w-full dark:text-yellow-50">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AlertingModal;
