function CustomButton({
  type,
  size,
  bg,
  label,
  txtColor,
  hoverClass,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
    
    ${
      size === "sm" &&
      "w-16 h-6 text-[0.8rem] sm:w-18 sm:h-8  sm:text-[0.9rem] md:w-20 md:h-8 md:text-sm lg:w-25 lg:h-10 lg:text-lg xl:w-25 xl:h-10 xl:text-lg"
    }
     ${
       size === "md" &&
       "xl:w-35 xl:h-12 xl:text-xl lg:w-35 lg:h-12 lg:text-xl md:w-30 md:h-10 md:text-lg"
     }
      ${size === "lg" && "w-45 h-13 text-2xl "}
       ${size === "xl" && "w-55 h-14 text-3xl pb-2 font-extrabold"}
       ${size === "2xl" && "w-65 h-14 text-3xl pb-2 font-extrabold"}
        ${
          type === "primary" &&
          "rounded bg-emerald-700 hover:bg-emerald-800 text-white hover:text-white  focus:outline-none  focus:ring  focus:ring-offset-3  focus:ring-emerald-700 focus:bg-emerald-700"
        }
        ${
          type === "others" &&
          ` ${bg}   ${txtColor} ${hoverClass} focus:outline-none focus:ring focus:ring-offset-3 focus:${bg}  rounded`
        }
        ${
          type === "secondary" &&
          `rounded border-2 border-gray-400  bg-white  text-gray-400 focus:outline-none focus:ring focus:ring-offset-3 focus:ring-gray-300`
        }
   
   
p-1 flex justify-center items-center font-bold  capitalize shadow
    `}
    >
      {label}
    </button>
  );
}

export default CustomButton;
