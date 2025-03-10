function Label({ name, children }) {
  return (
    <label
      className="text-slate-800 text-[0.8rem] lg:text-xl font-semibold  mb-1"
      htmlFor={name}
    >
      {children}
    </label>
  );
}

export default Label;
