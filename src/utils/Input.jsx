function Input({ type, placeholder, name, id, value, onChange }) {
  return (
    <div>
      <input
        className="w-50 md:w-80 lg:w-90 md:h-6 lg:h-7 h-4 px-4 py-2 pb-2.5 border-2 rounded-3xl
         border-[#fff] outline-0 shadow-0.5 bg-[#fff] 
          hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2
           focus:outline-emerald-700 text-slate-800 shadow placeholder:text-[0.7rem] md:placeholder:text-xsm"
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
