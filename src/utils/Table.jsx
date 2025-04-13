function Table({ bg, children, col, className }) {
  return (
    <div
      className={`w-full grid grid-cols-${col} grid-rows-1  items-center lg:gap-4 xl:gap-4 justify-between   text-center  capitalize text-[0.6rem]  ${bg} sm:text-[0.7rem] md:text-[0.8rem]  lg:text-xl border-1 border-slate-200 border-t-0 border-x-0
       ${className} `}
    >
      {children}
    </div>
  );
}

export default Table;
