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
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <Label name={name}> {label}</Label>
      <Input
        type={type}
        id={id}
        name={name}
        width={"w-50 sm:w-65 md:w-80 lg:w-170 xl:w-170"}
        defaultValue={defaultValue}
        onChange={onChange || ((e) => setFunc(e.target.value))}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
      />
    </div>
  );
}

export default ProfileItem;
