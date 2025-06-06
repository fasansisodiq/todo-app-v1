function Table({ bg, children, className, height, type }) {
  return (
    <div
      className={`w-full flex items-stretch lg:gap-4 xl:gap-4  justify-between   text-center  capitalize text-[0.6rem]  ${bg} sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] ${
        type === "header" ? "" : "border-1"
      } border-slate-200 border-t-0 border-x-0
       ${className} ${height} `}
    >
      {children}
    </div>
  );
}

export default Table;
// grid grid-cols-${col} grid-rows-1
