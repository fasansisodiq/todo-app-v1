function ModalBtn({ children, leftIcon, onClickHandler }) {
  return (
    <div className="w-full hover:w-full hover:bg-slate-200">
      <button
        onClick={onClickHandler}
        className=" flex justify-between items-center gap-2 py-3 w-full  xl:w-full sm:h-6 md:h-8 lg:h-9 xl:h-10  pl-8  h-fit  xl:pr-4   "
      >
        <div className="flex justify-center items-center gap-2">
          <span className="text-slate-700 ">{leftIcon}</span>
          <span>{children}</span>
        </div>
      </button>
    </div>
  );
}

export default ModalBtn;
