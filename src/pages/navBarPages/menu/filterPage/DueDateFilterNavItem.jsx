import OptionGroup from "./OptionGroup";
import FilterNavItem from "./FilterNavItem";

const dueDateOptions = [
  { label: "weeks", options: ["1 week", "2-3 weeks"] },
  {
    label: "months",
    options: ["1 month", "2-3 months", "3-6 months", "6-9 months"],
  },
  { label: "years", options: ["year"] },
  { label: "overdue", options: ["overdue"] },
];

function DueDateFilterNavItem({ onClick }) {
  return (
    <>
      {dueDateOptions.map((group) => (
        <OptionGroup label={group.label} myKey={group.label}>
          {group.options.map((option) => (
            <FilterNavItem key={option} label={option} onClick={onClick}>
              {option}
            </FilterNavItem>
          ))}
        </OptionGroup>
      ))}
    </>
  );
}

export default DueDateFilterNavItem;
