function CustomButton({
  btnType = "primary",
  size = "md",
  bg = "",
  label = "",
  txtColor = "",
  hoverClass = "",
  onClick,
  icon,
  type,
  disabled = false,
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 font-bold capitalize shadow transition-all duration-200
        rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          size === "sm" &&
          "px-2 lg:px-4 py-1 text-[0.5rem] sm:text-[0.8rem] lg:text-sm"
        }
        ${size === "md" && "px-6 py-2 text-base"}
        ${size === "lg" && "px-8 py-3 text-lg"}
        ${size === "xl" && "px-10 py-4 text-xl"}
        ${
          btnType === "primary"
            ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400 dark:bg-emerald-800 dark:text-yellow-200 dark:hover:bg-emerald-900 dark:focus:ring-yellow-400"
            : btnType === "secondary"
            ? "bg-white border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-200 dark:bg-[#232b25] dark:border-yellow-400 dark:text-yellow-200 dark:hover:bg-[#181f1b] dark:focus:ring-yellow-400"
            : btnType === "others"
            ? `${bg} ${txtColor} ${hoverClass}`
            : ""
        }
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}

export default CustomButton;
