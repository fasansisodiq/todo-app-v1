function Table({ bg, children }) {
  return (
    <div
      className={`w-full grid grid-cols-6 text-center md:w-full   rounded py-1 md:my-0 md:ml-0   lg:my-4  lg:ml-2 lg:mt-4 lg:gap-10 capitalize text-[0.6rem] font-semibold ${bg}  lg:text-xl border-1 border-slate-200 border-x-0  `}
    >
      {children}
    </div>
  );
}

export default Table;
