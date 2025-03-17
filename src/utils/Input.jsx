function Input({ type, placeholder, name, id, value, onChange }) {
  return (
    <div>
      <input
        className="w-50 h-6 sm:w-65 md:w-80 lg:w-120 xl:w-130 md:h-8 lg:h-10 xl:12  p-4 border-2 rounded-3xl
         border-[#fff] outline-0 shadow-0.5 bg-[#fff] 
          hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2
           focus:outline-emerald-700 text-slate-800 shadow placeholder:text-[0.8rem] 
           lg:placeholder:text-lg
           md:placeholder:text-xsm"
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Input;
