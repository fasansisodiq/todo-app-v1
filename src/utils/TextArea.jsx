import { useFocus } from "../customHooks/tasks/useFocus";

function TextArea({
  onChange,
  defaultValue,
  value,
  className = "",
  rows = 2,
  required,
  placeholder,
}) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const focusRef = useFocusOnMouseOver(isFocused);
  return (
    <>
      <textarea
        ref={focusRef}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        required={required}
        rows={rows}
        className={`
            w-full min-h-[100px] px-4 py-3 rounded-xl
            border-2
            ${
              isFocused
                ? "border-emerald-400 ring-2 ring-emerald-200 dark:ring-yellow-400 dark:border-yellow-500"
                : "border-emerald-100 dark:border-emerald-800"
            }
            bg-white text-slate-800
            placeholder:text-emerald-300 placeholder:font-medium
            focus:outline-none focus:ring-2 focus:ring-emerald-400  dark:focus:ring-yellow-400  dark:bg-[#232b25]/90 dark:text-yellow-100
            shadow transition-all duration-200 dark:placeholder:text-yellow-400 dark:placeholder:opacity-55
            resize-y
            ${className}
          `}
        placeholder={placeholder}
        name="description"
        id="description"
      />
    </>
  );
}

export default TextArea;
