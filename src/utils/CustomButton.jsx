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
      aria-label={label}
      className={`
        flex items-center justify-center gap-2 font-semibold capitalize shadow-md hover:shadow-lg transition-all duration-200
        rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2
        text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl
        ${
          size === "sm"
            ? "px-3 py-1 text-xs sm:text-sm"
            : size === "md"
            ? "px-5 py-2 text-sm sm:text-base"
            : size === "lg"
            ? "px-7 py-3 text-base md:text-lg"
            : size === "xl"
            ? "px-10 py-4 text-lg lg:text-xl"
            : ""
        }
<<<<<<< HEAD
        ${size === "md" && "md:px-6 py-2 text-base"}
        ${size === "lg" && "px-8 py-3 text-lg"}
        ${size === "xl" && "px-10 py-4 text-xl"}
=======
>>>>>>> 62f9fd032727d3c2b77cf99896cea68d9107e1ca
        ${
          btnType === "primary"
            ? "bg-emerald-500 text-white hover:bg-emerald-700 focus:ring-emerald-400 dark:bg-emerald-800 dark:text-yellow-200 dark:hover:bg-emerald-900 dark:focus:ring-yellow-400"
            : btnType === "secondary"
            ? "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 focus:ring-emerald-200 dark:bg-[#232b25] dark:text-yellow-200 dark:border-yellow-200 dark:hover:bg-[#181f1b] dark:focus:ring-yellow-400 rounded-2xl shadow-md hover:shadow-lg"
            : btnType === "others"
            ? `${bg} ${txtColor} ${hoverClass}`
            : ""
        }
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
<<<<<<< HEAD
      {icon && <span className="text-sm">{icon}</span>}
      {label}
=======
      {icon && <span className="text-lg md:text-xl">{icon}</span>}
      <span className="truncate">{label}</span>
>>>>>>> 62f9fd032727d3c2b77cf99896cea68d9107e1ca
    </button>
  );
}

export default CustomButton;
