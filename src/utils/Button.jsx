function Button({ label, onClick, disabled, type }) {
  return (
    <button
      type={type}
      className="text-center w-[8rem]  h-8  md:w-[14rem] md:h-15 
       border-2 rounded-lg border-emerald-600 shadow-0.5 bg-emerald-600
        text-lg md:text-3xl font-bold text-[#fff] capitalize transition
         duration-0.4s ease-in-out hover:bg-emerald-800 
          hover:w-full focus:outline-3 focus:outline-offset-3
           focus:outline-emerald-600 md:focus:w-[20rem]
            active:bg-emerald-600 "
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
