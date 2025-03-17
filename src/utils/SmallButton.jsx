function SmallButton({ label, onClick, bg }) { 
  return (
   
      <button
        className={`w-20 h-10 border-1 border-[#fff]
         {${label === 'cancel' && ' bg-stone-400 text-stone-800 '}  ${label === 'submit' && 'bg-emerald-400' } ${bg}} text-[0.6rem] text-stone-800 font-bold rounded-lg capitalize p-0.5 px-1 shadow-1 hover:bg-emerald-700 hover:text-[#fff] active:text-[#fff] active:bg-emerald-700
         md:w-30 md:h-14 md:text-2xl 
          `}
        onClick={onClick}
      >
        {label}
      </button>
  
  );
}

export default SmallButton;
