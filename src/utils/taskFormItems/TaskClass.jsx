import Label from "../Label";

function TaskClass({ defaultValue, value, onChange }) {
  const bgStyle = "hover:bg-[#c0efe3] ";
  return (
    <div className=" flex items-center gap-5">
      <span>
        <Label htmlFor="task type"> task class:</Label>
      </span>
      <select
        name="taskClass"
        id="taskClass"
        required
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="capitalize border-0  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 p-0.5 lg:p-1 text-[0.8rem] sm:text-[1rem] md:text-sm lg:text-lg xl:text-lg rounded-2xl bg-[#fff] shadow "
      >
        <option className="flex justify-center items-center" value={""}>
          --please choose task class--
        </option>
        <option className={bgStyle} value={"work"}>
          work
        </option>
        <option className={bgStyle} value={"planned"}>
          planned
        </option>
        <option className={bgStyle} value={"assigned"}>
          assigned
        </option>
        <option className="hover:bg-amber-600" value={"project"}>
          project
        </option>
        <option className={bgStyle} value={"personal"}>
          personal
        </option>
        <option className={bgStyle} value={"house"}>
          house
        </option>
        <option className={bgStyle} value={"friend"}>
          friend
        </option>
        <option className={bgStyle} value={"social"}>
          social
        </option>
      </select>
    </div>
  );
}

export default TaskClass;
