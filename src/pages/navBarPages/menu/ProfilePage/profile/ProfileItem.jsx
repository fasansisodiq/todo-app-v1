import Label from "../../../../../utils/Label";
import Input from "../../../../../utils/Input";

function ProfileItem({
  label,
  type,
  id,
  name,
  defaultValue,
  setFunc,
  placeholder,
  onChange,
  maxLength,
  pattern,
  inputMode,
  className = "",
  labelClassName = "",
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <Label name={name} className={labelClassName}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        width="w-full"
        defaultValue={defaultValue}
        onChange={onChange || ((e) => setFunc(e.target.value))}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        className="rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-emerald-100 px-4 py-2 text-base transition-all shadow-sm bg-white"
      />
    </div>
  );
}

export default ProfileItem;
