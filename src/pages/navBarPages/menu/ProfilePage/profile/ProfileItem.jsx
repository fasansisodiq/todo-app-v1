import Label from "../../../../../utils/Label";
import Input from "../../../../../utils/Input";

function ProfileItem({
  label,
  type,
  id,
  name,
  value,
  setFunc,
  placeholder,
  onChange,
  className = "",
  labelClassName = "",
}) {
  const handleChange =
    onChange || (setFunc ? (e) => setFunc(e.target.value) : undefined);
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <Label name={name} className={labelClassName}>
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="rounded-lg border  dark:bg-[#181f1b] dark:focus:border-yellow-400 dark:ring-yellow-400 dark:border-yellow-100 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-100 px-4 py-2 text-base transition-all shadow-sm bg-white"
      />
    </div>
  );
}

export default ProfileItem;
