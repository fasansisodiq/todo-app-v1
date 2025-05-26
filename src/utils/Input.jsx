import { useFocus } from "../customHooks/tasks/useFocus";

function Input({
  type = "text",
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
  autoComplete = "off",
}) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const inputRef = useFocusOnMouseOver(isFocused);

  return (
    <div className={`relative w-full`}>
      <input
        ref={inputRef}
        onMouseEnter={() =>
          type !== "email" && type !== "date" && setIsFocused(true)
        }
        onMouseLeave={() =>
          type !== "email" && type !== "date" && setIsFocused(false)
        }
        className={`
          ${width ? width : "w-full"}
          h-12 px-4 py-2
          rounded-full border-2
          ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-emerald-200 focus:ring-emerald-400"
          }
          bg-white/90 text-slate-800
          placeholder:text-emerald-300 placeholder:font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-0
          shadow transition-all duration-200
          ${className}
        `}
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
        autoComplete={autoComplete}
        required
      />
      {/* Fancy focus ring */}
      <span
        className={`
          pointer-events-none absolute left-0 top-0 w-full h-full rounded-full
          transition-all duration-200
          ${
            isFocused
              ? error
                ? "ring-2 ring-red-400"
                : "ring-2 ring-emerald-300"
              : ""
          }
        `}
      />
    </div>
  );
}

export default Input;
