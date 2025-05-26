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
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/30 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl border border-emerald-100 flex flex-col items-center gap-4 px-6 py-8 animate-fade-in">
        {/* Close Button at top right */}
        <div className="absolute top-3 right-3 z-10">
          <CloseBtn
            isOpen={isOpen}
            onClick={onClick}
            btnPosition=""
            mClassName="text-lg h-8 w-8"
          />
        </div>
        {/* Icon */}
        <span
          className={`flex items-center justify-center text-3xl sm:text-4xl md:text-5xl ${iconColor} ${animation}`}
        >
          {icon}
        </span>
        {/* Message */}
        <p className="text-slate-900 font-bold text-center text-lg sm:text-xl">
          {modalMessage}
        </p>
        {/* Title */}
        {title && (
          <span className="text-slate-400 text-sm sm:text-base mb-2">
            {title} task
          </span>
        )}
        {/* Actions */}
        <div className="flex justify-center items-center gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AlertingModal;
