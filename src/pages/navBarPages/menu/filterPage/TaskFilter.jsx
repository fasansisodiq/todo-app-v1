import { FiFilter } from "react-icons/fi";
import MenuItem from "../MenuItem";

function TaskFilter() {
  return (
    <MenuItem label={"filter"} icon={<FiFilter />} to={"/layout/filter"} />
  );
}

export default TaskFilter;
