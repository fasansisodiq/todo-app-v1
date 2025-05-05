function Question({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-2  hover:bg-emerald-200 cursor-pointer
      sm:text-[0.7rem] md:text-[0.8rem]        
      `}
    >
      {children}
    </div>
  );
}

export default Question;
