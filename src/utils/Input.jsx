function Input({ type, placeholder, name, id, value, onChange }) {
  return (
    <div>
      <input
        className="w-[20rem] md:w-[30rem] lg:w-[40rem] md:h-14  h-10 px-4 py-2 border-2 rounded-3xl
         border-[#fff] outline-0 shadow-0.5 bg-[#fff] 
          hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2
           focus:outline-emerald-700 text-[#183a1f] shadow md:placeholder:text-xl"
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
