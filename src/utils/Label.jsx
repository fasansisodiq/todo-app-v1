function Label({ name, children }) {
  return (
    <label
      className="text-slate-600 text-[0.8rem]  md:text-lg lg:text-xl xl:text-2xl font-semibold  mb-1 capitalize"
      htmlFor={name}
    >
      {children}
    </label>
  );
}

export default Label;
