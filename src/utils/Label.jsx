function Label({ name, children }) {
  return (
    <label
      className="text-slate-700 dark:text-yellow-100  text-sm md:text-base lg:text-lg font-semibold mb-1 capitalize tracking-wide"
      htmlFor={name}
    >
      {children}
    </label>
  );
}

export default Label;
