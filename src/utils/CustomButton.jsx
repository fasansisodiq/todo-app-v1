

function CustomButton({type,size, bg,label, txtColor}) {
  return (
    <button className={`
    
    ${size === "sm" && "w-18 h-6 text-[0.8rem] sm:w-20 sm:h-6 sm:text-[1rem] md:w-23 md:h-8 md:text-sm lg:w-25 lg:h-10 lg:text-lg xl:w-25 xl:h-10 xl:text-lg"}
     ${size === "md" && "xl:w-35 xl:h-12 xl:text-xl lg:w-35 lg:h-12 lg:text-xl md:w-30 md:h-10 md:text-lg"}
      ${size === "lg" && "w-45 h-13 text-2xl "}
       ${size === "xl" && "w-55 h-14 text-3xl pb-2 font-extrabold"}
       ${size === "2xl" && "w-65 h-14 text-3xl pb-2 font-extrabold"}
        ${type === "primary" && "rounded bg-emerald-700 hover:bg-emerald-800 text-white hover:text-white"}
        ${type === "others" && " ${bg} bg-rose-600 text-white rounded"}
        ${type === "secondary" && "rounded border-2 border-slate-400  bg-slate-50  text-slate-600"}
   
   
p-1 flex justify-center items-center font-bold  capitalize shadow
    `}>
      {label}
    </button> 
  )
}

export default CustomButton
