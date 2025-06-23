import { useTasks } from "../customHooks/tasks/useTasks";
import OptionGroup from "../pages/navBarPages/menu/filterPage/OptionGroup";
import FilterNavItem from "../pages/navBarPages/menu/filterPage/FilterNavItem";
import { useOperation } from "../customHooks/operation/useOperation";
import ShareTaskModal from "../features/share-task/ShareTaskModal";

function UniqueAssignees({ onClick, useFor, task, recipientIdentifier }) {
  const { uniqueAssignees } = useTasks();
  const { openShare, onOpenShare } = useOperation();

  // Sort assignees alphabetically (case-insensitive)
  const sortedAssignees = [...uniqueAssignees].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  return (
    <>
      <OptionGroup label="assignees">
        {sortedAssignees.map((assignee) => (
          <FilterNavItem
            key={assignee}
            label={assignee}
            onClick={useFor === "share" ? onOpenShare : onClick}
          >
            {assignee}
          </FilterNavItem>
        ))}
      </OptionGroup>
      {openShare && (
        <ShareTaskModal
          title={task.title}
          id={task.id}
          recipientIdentifier={recipientIdentifier}
        />
      )}
    </>
  );
}

export default UniqueAssignees;
