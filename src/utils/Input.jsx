import { useFocus } from "../customHooks/tasks/useFocus";

function Input({
  type,
  placeholder,
  name,
  id,
  value,
  defaultValue,
  onChange,
  width,
  error,
  className,
  maxLength,
  pattern,
  inputMode,
}) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const inputRef = useFocusOnMouseOver(isFocused);
  return (
    <div>
      <input
        ref={inputRef}
        onMouseEnter={() => type === "text" && setIsFocused(true)}
        onMouseLeave={() => type === "text" && setIsFocused(false)}
        className={`${
          !width ? "w-60  sm:w-65 md:w-80 lg:w-120 xl:w-130 " : width
        }md:h-8 h-6 lg:h-12 p-4 border-2 rounded-3xl
         border-[#fff] outline-0 shadow-0.5 bg-[#fff] 
          hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2
          text-slate-800 shadow placeholder:text-[0.8rem] 
           lg:placeholder:text-xl md:placeholder:text-xsm
            ${
              error ? "focus:ring-red-700" : "focus:ring-emerald-700"
            } ${className} `}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        required
      />
    </div>
  );
}

export default Input;
