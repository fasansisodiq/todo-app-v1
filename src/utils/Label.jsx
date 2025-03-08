function Label({ name, children }) {
  return (
    <label className="text-[#183a1f] text-xl opacity-80  mb-1" htmlFor={name}>
      {children}
    </label>
  );
}

export default Label;
