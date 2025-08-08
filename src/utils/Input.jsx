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
  required = false,
  autoComplete = "off",
}) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const inputRef = useFocusOnMouseOver(isFocused);

  return (
    <div className={`relative w-full`}>
      <input
        ref={inputRef}
        onMouseEnter={() =>
          type !== "email" &&
          type !== "date" &&
          type !== "checkbox" &&
          setIsFocused(true)
        }
        onMouseLeave={() =>
          type !== "email" &&
          type !== "date" &&
          type !== "checkbox" &&
          setIsFocused(false)
        }
        className={`
           
          ${
            width
              ? width
              : type === "checkbox"
              ? "w-5 h-5 accent-emerald-600 dark:accent-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500 rounded-lg border-0 dark:border dark:border-emerald-700 focus:outline-none"
              : "w-full  h-12 px-4 py-2"
          }
         
          rounded-full border-2
          ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-emerald-200 focus:ring-emerald-400 dark:border-emerald-800 dark:focus:ring-yellow-400"
          }
          bg-white/90 text-slate-800 dark:bg-[#232b25]/90 dark:text-yellow-100
          placeholder:text-emerald-300 dark:placeholder:text-yellow-400 dark:placeholder:opacity-55 placeholder:font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-0
          shadow transition-all duration-200 ${
            type === "date" ? "dark:[color-scheme:dark]" : ""
          }
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
        required={required}
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
                : " ring-emerald-300 dark:ring-yellow-400"
              : ""
          }
        `}
      />
    </div>
  );
}

export default Input;
