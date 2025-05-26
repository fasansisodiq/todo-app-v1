import OptionGroup from "./OptionGroup";
import FilterNavItem from "./FilterNavItem";
import { useTasks } from "../../../../customHooks/tasks/useTasks";

function AssigneeFilterNavItem({ onClick }) {
  const { uniqueAssignees } = useTasks();

  // Sort assignees alphabetically (case-insensitive)
  const sortedAssignees = [...uniqueAssignees].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  return (
    <OptionGroup label="assignee">
      {sortedAssignees.map((assignee) => (
        <FilterNavItem key={assignee} label={assignee} onClick={onClick}>
          {assignee}
        </FilterNavItem>
      ))}
    </OptionGroup>
  );
}

export default AssigneeFilterNavItem;
