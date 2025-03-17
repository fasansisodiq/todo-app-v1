function Table({ bg, children, col, className }) {
  return (
    <div
      className={`w-full grid grid-cols-${col} items-center gap-4 justify-between  grid-rows-1 text-center  capitalize text-[0.6rem] font-semibold ${bg} sm:text-sm md:text-lg  lg:text-xl border-1 border-slate-200 border-t-0 border-x-0
       ${className} `}
    >
      {children}
    </div>
  );
}

export default Table;
  // lg:my-4  lg:ml-2 lg:mt-4 