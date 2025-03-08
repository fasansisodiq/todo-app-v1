function Button({ label, onClick, disabled, type }) {
  return (
    <button
      type={type}
      className="text-center w-[8rem]  h-8  md:w-[14rem] md:h-15 
       border-2 rounded-lg border-[#50c269] shadow-0.5 bg-[#50c269]
        text-lg md:text-3xl font-bold text-[#fff] capitalize transition
         duration-0.4s ease-in-out hover:bg-emerald-800 
          md:hover:w-[20rem] focus:outline-2 focus:outline-offset-2
           focus:outline-emerald-700 md:focus:w-[20rem]
            active:bg-emerald-700 "
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
